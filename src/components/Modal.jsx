import { useEffect, useRef } from 'react';

export default function Modal({ id, open, onClose, narrow, eyebrow, title, children }) {
  const closeRef = useRef(null);
  const lastFocused = useRef(null);

  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement;
      document.body.style.overflow = 'hidden';
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = '';
      lastFocused.current?.focus?.();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={`modal-overlay${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal${narrow ? ' modal--narrow' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${id}-title`}
      >
        <button className="modal__close" ref={closeRef} onClick={onClose} aria-label="Close dialog">
          &times;
        </button>
        <p className="modal__eyebrow">{eyebrow}</p>
        <h2 className="modal__title" id={`${id}-title`}>
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
