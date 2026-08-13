// Shared time-based password logic.
// Password = word + hh:mm + am/pm (no punctuation, 2-digit hour and minute),
// anchored `offsetMinutes` ahead of "now", accepting any guess within
// `windowMinutes` of that anchor. Always evaluated in Central time (handles
// CST/CDT automatically) regardless of the visitor's or server's own
// timezone, so the password is predictable from wherever it's checked.
const TIME_ZONE = 'America/Chicago';

function centralHourMinute(date) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hourCycle: 'h23',
    hour: '2-digit',
    minute: '2-digit',
  }).formatToParts(date);
  const h = Number(parts.find((p) => p.type === 'hour').value);
  const m = Number(parts.find((p) => p.type === 'minute').value);
  return { h, m };
}

export function buildPasswordWord(word, date) {
  const { h, m } = centralHourMinute(date);
  const ampm = h >= 12 ? 'pm' : 'am';
  let h12 = h % 12;
  if (h12 === 0) h12 = 12;
  const hh = h12 < 10 ? '0' + h12 : String(h12);
  const mm = m < 10 ? '0' + m : String(m);
  return word + hh + mm + ampm;
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
