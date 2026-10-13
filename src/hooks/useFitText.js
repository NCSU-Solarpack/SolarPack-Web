import { useLayoutEffect, useRef } from 'react'

// Sizes a one-line element so its text runs exactly the width of its parent.
// The CSS font-size stays as the no-JS fallback.
export default function useFitText(ratio = 1) {
  const ref = useRef(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const fit = () => {
      el.style.fontSize = ''
      const ps = getComputedStyle(el.parentElement)
      const inner = el.parentElement.clientWidth - parseFloat(ps.paddingLeft) - parseFloat(ps.paddingRight)
      const target = inner * ratio
      const start = parseFloat(getComputedStyle(el).fontSize)
      if (!el.scrollWidth) return
      el.style.fontSize = `${(start * target) / el.scrollWidth}px`
    }
    fit()
    document.fonts?.ready.then(fit)
    const ro = new ResizeObserver(fit)
    ro.observe(el.parentElement)
    return () => ro.disconnect()
  }, [ratio])
  return ref
}
