import { useState } from 'react';
import { isValidPassword } from '../passwordGate.js';

export default function PasswordGate({ word, offsetMinutes = 0, hint, onUnlock, children }) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

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
        <input
          type="password"
          autoComplete="off"
          placeholder="Password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
        />
        <button type="submit">Unlock</button>
      </form>
      {error && <p className="pw-gate-inline__error">{error}</p>}
    </div>
  );
}
