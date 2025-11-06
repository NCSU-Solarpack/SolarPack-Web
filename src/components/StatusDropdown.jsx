import { useEffect, useRef, useState } from 'react';

/**
 * Inline status dropdown badge.
 * Props:
 * - value: current status string
 * - options: array of status strings
 * - color: background color string for current value
 * - onChange: (newValue) => void
 * - disabled: boolean (read-only)
 * - className: optional extra class names
 */
export default function StatusDropdown({ value, options, color, onChange, disabled = false, className = '' }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const handleSelect = (opt) => {
    if (disabled) return;
    setOpen(false);
    if (opt !== value) onChange?.(opt);
  };

  return (
    <div 
      ref={containerRef}
      className={`status-dropdown ${className}`}
      style={{ position: 'relative', display: 'inline-block' }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="project-status"
        disabled={disabled}
        onClick={() => !disabled && setOpen(o => !o)}
        title={disabled ? value : `Change status (currently ${value})`}
        style={{ 
          backgroundColor: color,
          cursor: disabled ? 'default' : 'pointer',
          border: 'none'
        }}
      >
        {value?.toUpperCase?.() || String(value)}{!disabled && ' '} 
        {!disabled && <i className={`fas fa-chevron-${open ? 'up' : 'down'}`} style={{ marginLeft: 6 }} />}
      </button>

      {open && (
        <div
          className="status-dropdown-menu"
          style={{
            position: 'absolute',
            right: 0,
            top: '110%',
            background: 'var(--card)',
            border: '1px solid var(--muted)',
            borderRadius: 8,
            padding: 6,
            boxShadow: '0 8px 24px #0008',
            zIndex: 20,
            minWidth: 200
          }}
        >
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className="status-option"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                textAlign: 'left',
                padding: '8px 10px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text)',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              <span style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: opt === value ? 'var(--accent)' : 'var(--muted)'
              }} />
              <span style={{ fontWeight: opt === value ? 700 : 500 }}>
                {opt.toUpperCase()}
              </span>
              {opt === value && (
                <i className="fas fa-check" style={{ marginLeft: 'auto', color: 'var(--accent)' }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
