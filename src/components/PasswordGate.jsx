import { useState } from 'react';
import { isValidPassword } from '../passwordGate.js';

export default function PasswordGate({ word, offsetMinutes = 0, hint, onUnlock, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidPassword(word, value, offsetMinutes)) {
      setUnlocked(true);
      setError('');
      onUnlock && onUnlock();
    } else {
      setError('Incorrect password. Try again.');
      setValue('');
    }
  };

  return (
    <div className="pw-gate-inline">
      <div className="pw-gate-inline__title">Protected Section</div>
      <div className="pw-gate-inline__sub">{hint || 'Enter the access password to view this content.'}</div>
      <form className="pw-gate-inline__form" onSubmit={handleSubmit}>
        <div className="pw-gate-inline__input-wrap">
          <input
            type={visible ? 'text' : 'password'}
            autoComplete="off"
            placeholder="Password"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
          <button
            type="button"
            className="pw-gate-inline__toggle"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
            aria-pressed={visible}
          >
            {visible ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.64-7 10-7 10 7 10 7-3.64 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.36 0-10-7-10-7a18.4 18.4 0 0 1 4.22-5.19M9.9 4.24A9.12 9.12 0 0 1 12 4c6.36 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><path d="M1 1l22 22" /></svg>
            )}
          </button>
        </div>
        <button type="submit">Unlock</button>
      </form>
      {error && <p className="pw-gate-inline__error">{error}</p>}
    </div>
  );
}
