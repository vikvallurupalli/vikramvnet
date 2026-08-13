// Shared time-based password logic.
// Password = word + h:mm + am/pm (no punctuation), anchored `offsetMinutes`
// ahead of "now", accepting any guess within `windowMinutes` of that anchor.
export function buildPasswordWord(word, date) {
  const h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  const mm = m < 10 ? '0' + m : String(m);
  return word + h12 + mm + ampm;
}

export function isValidPassword(word, guessRaw, offsetMinutes = 0, windowMinutes = 5) {
  const guess = (guessRaw || '').trim().toLowerCase();
  if (!guess) return false;
  const anchor = new Date(Date.now() + offsetMinutes * 60000);
  for (let delta = -windowMinutes; delta <= windowMinutes; delta++) {
    const t = new Date(anchor.getTime() + delta * 60000);
    if (buildPasswordWord(word, t) === guess) return true;
  }
  return false;
}
