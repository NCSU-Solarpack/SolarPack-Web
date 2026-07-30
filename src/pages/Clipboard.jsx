import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Check,
  Clipboard as ClipboardIcon,
  Copy,
  Eraser,
  Eye,
  EyeOff,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  LogOut,
  Plus,
  RefreshCcw,
  Save,
  Trash2,
  Underline
} from 'lucide-react'
import { supabaseService } from '../utils/supabase'

const createEmptyDraft = () => ({
  local_key: `draft-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  id: null,
  title: '',
  content_html: '',
  content_text: ''
})

const allowedTags = new Set([
  'A', 'B', 'BLOCKQUOTE', 'BR', 'CODE', 'DIV', 'EM', 'FONT', 'H1', 'H2', 'H3',
  'H4', 'H5', 'H6', 'HR', 'I', 'LI', 'OL', 'P', 'PRE', 'S', 'SPAN', 'STRONG',
  'SUB', 'SUP', 'TABLE', 'TBODY', 'TD', 'TFOOT', 'TH', 'THEAD', 'TR', 'U', 'UL'
])

const removableTags = new Set([
  'AUDIO', 'CANVAS', 'EMBED', 'FORM', 'IFRAME', 'IMG', 'INPUT', 'OBJECT',
  'PICTURE', 'SCRIPT', 'SOURCE', 'STYLE', 'SVG', 'TEXTAREA', 'VIDEO'
])

const allowedStyleProps = new Set([
  'background-color',
  'color',
  'font-family',
  'font-size',
  'font-style',
  'font-weight',
  'letter-spacing',
  'line-height',
  'margin-left',
  'text-align',
  'text-decoration',
  'text-indent',
  'text-transform',
  'white-space'
])

const normalizeCode = (code) => code.trim().replace(/\s+/g, '-').toUpperCase()

const bytesToHex = (buffer) => Array.from(new Uint8Array(buffer))
  .map(byte => byte.toString(16).padStart(2, '0'))
  .join('')

const hashCode = async (code) => {
  const normalized = normalizeCode(code)
  const data = new TextEncoder().encode(`solarpack-clipboard:${normalized}`)
  const digest = await window.crypto.subtle.digest('SHA-256', data)
  return bytesToHex(digest)
}

const getTextFromHtml = (html) => {
  const node = document.createElement('div')
  node.innerHTML = html || ''
  return (node.textContent || node.innerText || '').trim()
}

const createTitle = (html) => {
  const text = getTextFromHtml(html)
  if (!text) return 'Untitled'
  return text.length > 44 ? `${text.slice(0, 44).trim()}...` : text
}

const sanitizeStyle = (styleValue = '') => {
  return styleValue
    .split(';')
    .map(rule => {
      const [rawProp, ...rawValue] = rule.split(':')
      if (!rawProp || rawValue.length === 0) return ''

      const prop = rawProp.trim().toLowerCase()
      const value = rawValue.join(':').trim()

      if (!allowedStyleProps.has(prop)) return ''
      if (/url\s*\(|expression\s*\(|@import/i.test(value)) return ''

      return `${prop}: ${value}`
    })
    .filter(Boolean)
    .join('; ')
}

const isSafeHref = (href = '') => {
  if (!href) return false
  return /^(https?:|mailto:|tel:|#|\/)/i.test(href)
}

const sanitizeHtml = (html = '') => {
  const template = document.createElement('template')
  template.innerHTML = html

  const cleanNode = (node) => {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const tag = child.tagName

        if (removableTags.has(tag)) {
          child.remove()
          return
        }

        if (!allowedTags.has(tag)) {
          const parent = child.parentNode
          while (child.firstChild) parent.insertBefore(child.firstChild, child)
          child.remove()
          return
        }

        Array.from(child.attributes).forEach(attr => {
          const name = attr.name.toLowerCase()
          const value = attr.value

          if (name.startsWith('on')) {
            child.removeAttribute(attr.name)
            return
          }

          if (name === 'style') {
            const nextStyle = sanitizeStyle(value)
            if (nextStyle) child.setAttribute('style', nextStyle)
            else child.removeAttribute('style')
            return
          }

          if (tag === 'A' && name === 'href') {
            if (isSafeHref(value)) {
              child.setAttribute('target', '_blank')
              child.setAttribute('rel', 'noopener noreferrer')
            } else {
              child.removeAttribute(attr.name)
            }
            return
          }

          if (['colspan', 'rowspan'].includes(name) && /^(?:[1-9]|1[0-2])$/.test(value)) {
            return
          }

          child.removeAttribute(attr.name)
        })

        cleanNode(child)
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.remove()
      }
    })
  }

  cleanNode(template.content)
  return template.innerHTML
}

const insertHtmlAtCursor = (html) => {
  document.execCommand('insertHTML', false, html)
}

const generateCode = () => {
  const bytes = new Uint8Array(6)
  window.crypto.getRandomValues(bytes)
  const hex = bytesToHex(bytes).toUpperCase()
  return `SP-${hex.slice(0, 4)}-${hex.slice(4, 8)}-${hex.slice(8, 12)}`
}

const Clipboard = () => {
  const editorRef = useRef(null)
  const [codeInput, setCodeInput] = useState('')
  const [activeCode, setActiveCode] = useState('')
  const [accessHash, setAccessHash] = useState('')
  const [showCode, setShowCode] = useState(false)
  const [items, setItems] = useState([])
  const [draft, setDraft] = useState(() => createEmptyDraft())
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [copied, setCopied] = useState(false)

  const isOpen = Boolean(accessHash)
  const selectedId = draft.id || draft.local_key || 'new'

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
  }, [items])

  useEffect(() => {
    document.title = 'Clipboard'
    document.body.classList.add('clipboard-standalone-body')

    return () => {
      document.body.classList.remove('clipboard-standalone-body')
    }
  }, [])

  useEffect(() => {
    if (editorRef.current && document.activeElement !== editorRef.current) {
      editorRef.current.innerHTML = draft.content_html || ''
    }
  }, [draft.id])

  const loadItems = async (hash = accessHash) => {
    if (!hash) return
    setIsLoading(true)
    setMessage('')

    try {
      const nextItems = (await supabaseService.getClipboardItems(hash)).map(item => ({
        ...item,
        content_html: sanitizeHtml(item.content_html || ''),
        content_text: item.content_text || getTextFromHtml(item.content_html || '')
      }))
      setItems(nextItems)
      setDraft(nextItems[0] || createEmptyDraft())
      setMessage(nextItems.length ? 'Synced' : 'Ready')
    } catch (error) {
      console.error('Clipboard load failed:', error)
      setMessage(error.message || 'Could not open')
    } finally {
      setIsLoading(false)
    }
  }

  const openCode = async (code = codeInput) => {
    const normalized = normalizeCode(code)
    if (normalized.length < 6) {
      setMessage('Use a longer code')
      return
    }

    const nextHash = await hashCode(normalized)
    setActiveCode(normalized)
    setAccessHash(nextHash)
    setCodeInput('')
    await loadItems(nextHash)
  }

  const createCode = async () => {
    const nextCode = generateCode()
    setCodeInput(nextCode)
    await openCode(nextCode)
    setShowCode(true)
  }

  const closeCode = () => {
    setAccessHash('')
    setActiveCode('')
    setItems([])
    setDraft(createEmptyDraft())
    setMessage('')
  }

  const selectItem = (item) => {
    setDraft(item)
    setCopied(false)
  }

  const newItem = () => {
    const nextDraft = createEmptyDraft()
    setDraft(nextDraft)
    if (editorRef.current) {
      editorRef.current.innerHTML = ''
    }
    setCopied(false)
    setTimeout(() => editorRef.current?.focus(), 0)
  }

  const syncDraftFromEditor = () => {
    const html = sanitizeHtml(editorRef.current?.innerHTML || '')
    const text = getTextFromHtml(html)
    const nextDraft = {
      ...draft,
      title: draft.title.trim() || createTitle(html),
      content_html: html,
      content_text: text
    }
    setDraft(nextDraft)
    return nextDraft
  }

  const saveDraft = async () => {
    if (!accessHash) return

    const nextDraft = syncDraftFromEditor()
    const wasNewItem = !nextDraft.id
    if (!nextDraft.content_text) {
      setMessage('Nothing to save')
      return
    }

    setIsSaving(true)
    setMessage('')

    try {
      const saved = await supabaseService.saveClipboardItem(accessHash, nextDraft)
      setItems(prev => {
        const exists = prev.some(item => item.id === saved.id)
        if (exists) return prev.map(item => item.id === saved.id ? saved : item)
        return [saved, ...prev]
      })
      if (wasNewItem) {
        const blankDraft = createEmptyDraft()
        setDraft(blankDraft)
        if (editorRef.current) {
          editorRef.current.innerHTML = ''
        }
        setMessage('Saved')
      } else {
        setDraft(saved)
        setMessage('Synced')
      }
    } catch (error) {
      console.error('Clipboard save failed:', error)
      setMessage(error.message || 'Save failed')
    } finally {
      setIsSaving(false)
    }
  }

  const deleteDraft = async () => {
    if (!accessHash || !draft.id) {
      newItem()
      return
    }

    setIsSaving(true)

    try {
      await supabaseService.deleteClipboardItem(accessHash, draft.id)
      const nextItems = items.filter(item => item.id !== draft.id)
      setItems(nextItems)
      setDraft(nextItems[0] || createEmptyDraft())
      setMessage('Removed')
    } catch (error) {
      console.error('Clipboard delete failed:', error)
      setMessage(error.message || 'Delete failed')
    } finally {
      setIsSaving(false)
    }
  }

  const runCommand = (command, value = null) => {
    editorRef.current?.focus()
    document.execCommand(command, false, value)
    syncDraftFromEditor()
  }

  const addLink = () => {
    const url = window.prompt('Link')
    if (url) runCommand('createLink', url)
  }

  const clearFormatting = () => {
    const editor = editorRef.current
    if (!editor) return

    const plainText = editor.innerText || getTextFromHtml(editor.innerHTML)
    editor.textContent = plainText
    syncDraftFromEditor()
    editor.focus()
  }

  const handlePaste = (event) => {
    event.preventDefault()
    const clipboard = event.clipboardData
    const html = clipboard.getData('text/html')
    const text = clipboard.getData('text/plain')

    if (html) {
      insertHtmlAtCursor(sanitizeHtml(html))
    } else if (text) {
      insertHtmlAtCursor(text.replace(/[&<>"']/g, char => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[char])).replace(/\n/g, '<br>'))
    }

    syncDraftFromEditor()
  }

  const copyDraft = async () => {
    const nextDraft = syncDraftFromEditor()
    if (!nextDraft.content_text) return

    try {
      if (window.ClipboardItem) {
        const item = new window.ClipboardItem({
          'text/html': new Blob([nextDraft.content_html], { type: 'text/html' }),
          'text/plain': new Blob([nextDraft.content_text], { type: 'text/plain' })
        })
        await navigator.clipboard.write([item])
      } else {
        await navigator.clipboard.writeText(nextDraft.content_text)
      }
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch (error) {
      console.error('Clipboard copy failed:', error)
      setMessage('Copy failed')
    }
  }

  const copyCode = async () => {
    if (!activeCode) return
    await navigator.clipboard.writeText(activeCode)
    setMessage('Code copied')
  }

  return (
    <div className="clipboard-page">
      <style>{`
        body.clipboard-standalone-body {
          padding-top: 0;
          background: #000;
        }

        .clipboard-page {
          min-height: 100vh;
          width: 100%;
          color: #fff;
          background: #000;
          padding: 0 1rem;
        }

        .clipboard-shell {
          max-width: 1120px;
          margin: 0 auto;
          padding: 2rem 0 4rem;
        }

        .clipboard-lock {
          max-width: 440px;
          margin: 10vh auto 0;
          border: 1px solid #fff;
          background: #000;
          padding: 1rem;
        }

        .clipboard-lock h1,
        .clipboard-heading h1 {
          font-family: "DM Sans", Arial, sans-serif;
          font-size: 1.05rem;
          letter-spacing: 0;
          margin: 0;
          text-align: left;
          color: #fff;
        }

        .clipboard-lock-form {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.5rem;
          margin-top: 1rem;
        }

        .clipboard-input {
          min-width: 0;
          border: 1px solid #fff;
          background: #000;
          color: #fff;
          border-radius: 0;
          padding: 0.85rem;
          font: inherit;
        }

        .clipboard-input::placeholder {
          color: #999;
        }

        .clipboard-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          height: 2.6rem;
          min-height: 2.6rem;
          border: 1px solid #fff;
          border-radius: 0;
          background: #fff;
          color: #000;
          padding: 0.6rem 0.9rem;
          font: inherit;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
        }

        .clipboard-btn.secondary {
          background: #000;
          color: #fff;
        }

        .clipboard-btn.icon {
          width: 2.6rem;
          padding: 0;
        }

        .clipboard-btn:disabled {
          cursor: wait;
          opacity: 0.6;
        }

        .clipboard-lock-actions {
          display: flex;
          justify-content: space-between;
          gap: 0.5rem;
          margin-top: 0.75rem;
        }

        .clipboard-status {
          min-height: 1.25rem;
          margin-top: 0.85rem;
          color: #ccc;
          font-size: 0.9rem;
        }

        .clipboard-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          margin-bottom: 1rem;
          border-bottom: 1px solid #fff;
          padding-bottom: 0.75rem;
        }

        .clipboard-heading-left,
        .clipboard-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }

        .clipboard-code {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;
          height: 2.6rem;
          min-height: 2.6rem;
          border: 1px solid #fff;
          padding: 0 0.75rem;
          color: #fff;
          font-family: "Courier New", monospace;
          font-size: 0.86rem;
          line-height: 1;
        }

        .clipboard-grid {
          display: grid;
          grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
          gap: 1rem;
          min-height: 62vh;
        }

        .clipboard-list,
        .clipboard-editor-panel {
          border: 1px solid #fff;
          background: #000;
        }

        .clipboard-list {
          overflow: auto;
        }

        .clipboard-list-item {
          width: 100%;
          display: block;
          border: 0;
          border-bottom: 1px solid #333;
          background: #000;
          color: #fff;
          padding: 0.85rem;
          text-align: left;
          cursor: pointer;
        }

        .clipboard-list-item.active {
          background: #fff;
          color: #000;
        }

        .clipboard-list-title {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
        }

        .clipboard-list-meta {
          display: block;
          margin-top: 0.3rem;
          color: inherit;
          opacity: 0.7;
          font-size: 0.78rem;
        }

        .clipboard-empty {
          color: #999;
          padding: 1rem;
        }

        .clipboard-editor-panel {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .clipboard-title-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.75rem;
          border-bottom: 1px solid #fff;
          padding: 0.75rem;
        }

        .clipboard-title-row .clipboard-input {
          height: 2.6rem;
          border: 1px solid #fff;
          padding: 0 0.75rem;
        }

        .clipboard-title-row .clipboard-actions {
          gap: 0.65rem;
          justify-content: flex-end;
        }

        .clipboard-toolbar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
          padding: 0.55rem;
          border-bottom: 1px solid #fff;
        }

        .clipboard-tool {
          width: 2.25rem;
          height: 2.25rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #fff;
          background: #000;
          color: #fff;
          cursor: pointer;
        }

        .clipboard-editor {
          flex: 1;
          min-height: 420px;
          padding: 1rem;
          color: #fff;
          outline: none;
          overflow: auto;
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .clipboard-editor:empty::before {
          content: 'Paste here';
          color: #777;
        }

        .clipboard-editor a {
          color: #fff;
          text-decoration: underline;
        }

        .clipboard-editor table {
          border-collapse: collapse;
          max-width: 100%;
        }

        .clipboard-editor td,
        .clipboard-editor th {
          border: 1px solid #777;
          padding: 0.35rem;
        }

        @media (max-width: 780px) {
          .clipboard-shell {
            padding-top: 1rem;
          }

          .clipboard-heading,
          .clipboard-title-row {
            grid-template-columns: 1fr;
          }

          .clipboard-heading {
            align-items: flex-start;
            flex-direction: column;
          }

          .clipboard-grid {
            grid-template-columns: 1fr;
          }

          .clipboard-list {
            max-height: 220px;
          }

          .clipboard-lock-form {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {!isOpen ? (
        <section className="clipboard-lock" aria-labelledby="clipboard-lock-title">
          <h1 id="clipboard-lock-title">Clipboard</h1>
          <form
            className="clipboard-lock-form"
            onSubmit={(event) => {
              event.preventDefault()
              openCode()
            }}
          >
            <input
              className="clipboard-input"
              type={showCode ? 'text' : 'password'}
              value={codeInput}
              onChange={event => setCodeInput(event.target.value)}
              placeholder="Code"
              autoComplete="off"
            />
            <button className="clipboard-btn" type="submit" disabled={isLoading}>
              Open
            </button>
          </form>
          <div className="clipboard-lock-actions">
            <button className="clipboard-btn secondary" type="button" onClick={createCode}>
              <Plus size={16} /> New code
            </button>
            <button className="clipboard-btn secondary icon" type="button" onClick={() => setShowCode(value => !value)} title={showCode ? 'Hide code' : 'Show code'}>
              {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="clipboard-status">{message}</div>
        </section>
      ) : (
        <section className="clipboard-shell">
          <div className="clipboard-heading">
            <div className="clipboard-heading-left">
              <ClipboardIcon size={19} />
              <h1>Clipboard</h1>
              <span className="clipboard-code">{showCode ? activeCode : '********'} </span>
              <button className="clipboard-btn secondary icon" type="button" onClick={() => setShowCode(value => !value)} title={showCode ? 'Hide code' : 'Show code'}>
                {showCode ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button className="clipboard-btn secondary icon" type="button" onClick={copyCode} title="Copy code">
                <Copy size={16} />
              </button>
            </div>
            <div className="clipboard-actions">
              <button className="clipboard-btn secondary icon" type="button" onClick={() => loadItems()} title="Refresh" disabled={isLoading}>
                <RefreshCcw size={16} />
              </button>
              <button className="clipboard-btn secondary" type="button" onClick={newItem}>
                <Plus size={16} /> New
              </button>
              <button className="clipboard-btn secondary icon" type="button" onClick={closeCode} title="Close">
                <LogOut size={16} />
              </button>
            </div>
          </div>

          <div className="clipboard-grid">
            <aside className="clipboard-list" aria-label="Saved clips">
              {sortedItems.length === 0 ? (
                <div className="clipboard-empty">Empty</div>
              ) : sortedItems.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`clipboard-list-item ${selectedId === item.id ? 'active' : ''}`}
                  onClick={() => selectItem(item)}
                >
                  <span className="clipboard-list-title">{item.title || 'Untitled'}</span>
                  <span className="clipboard-list-meta">
                    {item.updated_at ? new Date(item.updated_at).toLocaleString() : ''}
                  </span>
                </button>
              ))}
            </aside>

            <div className="clipboard-editor-panel">
              <div className="clipboard-title-row">
                <input
                  className="clipboard-input"
                  value={draft.title}
                  onChange={event => setDraft(prev => ({ ...prev, title: event.target.value }))}
                  placeholder="Title"
                />
                <div className="clipboard-actions">
                  <button className="clipboard-btn secondary icon" type="button" onClick={copyDraft} title="Copy">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                  <button className="clipboard-btn secondary icon" type="button" onClick={deleteDraft} title="Delete" disabled={isSaving}>
                    <Trash2 size={16} />
                  </button>
                  <button className="clipboard-btn" type="button" onClick={saveDraft} disabled={isSaving}>
                    <Save size={16} /> {isSaving ? 'Saving' : 'Save'}
                  </button>
                </div>
              </div>

              <div className="clipboard-toolbar" aria-label="Formatting">
                <button className="clipboard-tool" type="button" onClick={() => runCommand('bold')} title="Bold"><Bold size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('italic')} title="Italic"><Italic size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('underline')} title="Underline"><Underline size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyLeft')} title="Left"><AlignLeft size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyCenter')} title="Center"><AlignCenter size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('justifyRight')} title="Right"><AlignRight size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('insertUnorderedList')} title="Bullets"><List size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={() => runCommand('insertOrderedList')} title="Numbers"><ListOrdered size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={addLink} title="Link"><LinkIcon size={15} /></button>
                <button className="clipboard-tool" type="button" onClick={clearFormatting} title="Clear formatting"><Eraser size={15} /></button>
              </div>

              <div
                ref={editorRef}
                className="clipboard-editor"
                contentEditable
                suppressContentEditableWarning
                onInput={syncDraftFromEditor}
                onBlur={syncDraftFromEditor}
                onPaste={handlePaste}
              />
            </div>
          </div>

          <div className="clipboard-status">{isLoading ? 'Syncing' : message}</div>
        </section>
      )}
    </div>
  )
}

export default Clipboard
