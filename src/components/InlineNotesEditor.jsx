import { useEffect, useRef, useState } from 'react';

/**
 * InlineNotesEditor - editable textarea with confirm control.
 * Props:
 * - value: string
 * - placeholder?: string
 * - onSave: async (newValue: string) => Promise<void>
 * - rows?: number
 * - autoSaveOnBlur?: boolean (default true)
 * - disabled?: boolean
 */
export default function InlineNotesEditor({
  value,
  placeholder = 'Add weekly notes... (click to edit)',
  onSave,
  rows = 3,
  autoSaveOnBlur = true,
  disabled = false
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value || '');
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setText(value || '');
  }, [value]);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  const commitSave = async () => {
    if (!dirty || saving || disabled) return;
    try {
      setSaving(true);
      await onSave?.(text);
      setDirty(false);
    } finally {
      setSaving(false);
    }
  };

  // Click outside behavior: if editing and autoSaveOnBlur, commit
  useEffect(() => {
    if (!editing) return;
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        if (autoSaveOnBlur) {
          commitSave();
        }
        setEditing(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [editing, autoSaveOnBlur, text, dirty]);

  return (
    <div 
      ref={containerRef} 
      className="inline-notes-editor" 
      style={{ position: 'relative' }}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {!editing ? (
        <div
          className="notes-display"
          onClick={() => !disabled && setEditing(true)}
          style={{
            fontSize: '0.85rem',
            color: 'var(--subtxt)',
            whiteSpace: 'pre-wrap',
            maxHeight: '6.5em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 5,
            WebkitBoxOrient: 'vertical',
            cursor: disabled ? 'default' : 'text'
          }}
        >
          {text && text.trim().length > 0 ? text : (
            <span style={{ color: 'var(--muted)' }}>{placeholder}</span>
          )}
        </div>
      ) : (
        <div style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={text}
            onChange={(e) => { setText(e.target.value); setDirty(true); }}
            rows={rows}
            disabled={disabled}
            placeholder={placeholder}
            style={{
              width: '100%',
              resize: 'vertical',
              padding: '0.75rem',
              background: 'var(--card)',
              color: 'var(--text)',
              border: '1px solid var(--muted)',
              borderRadius: 8,
              fontSize: '0.9rem',
              outline: 'none',
              boxShadow: '0 2px 12px #0004'
            }}
          />
          {(dirty || saving) && (
            <button
              type="button"
              className="confirm-btn"
              onClick={async () => { await commitSave(); setEditing(false); }}
              disabled={saving}
              title={saving ? 'Saving...' : 'Save notes'}
              style={{
                position: 'absolute',
                right: 16,
                bottom: 16,
                border: 'none',
                borderRadius: 8,
                padding: '6px 10px',
                background: 'var(--accent)',
                color: '#fff',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <i className={`fas fa-${saving ? 'spinner fa-spin' : 'check'}`}></i>
              <span>{saving ? 'Saving' : 'Save'}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
