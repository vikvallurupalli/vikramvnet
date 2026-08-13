import { next } from '@vercel/edge';
import { isValidPassword } from './src/passwordGate.js';

// Real, server-side gate for the OP dashboard. Runs on Vercel's edge before the
// static file is ever served, so the password check and content never reach the
// browser until a valid session cookie is presented.
//
// Password: `holly` + the current time (hh:mm am/pm, 2-digit hour and minute,
// e.g. `holly0122am` for 1:22 AM), computed server-side via the shared
// src/passwordGate.js logic - never shipped to the client. Any guess within
// +/-5 minutes of the visitor's request time is accepted.
//
// Required Vercel project environment variable (Project Settings -> Environment
// Variables), then redeploy:
//   OP_SESSION_SECRET - a long random string used to sign the session cookie
//
// Not enforced by `npm run dev` / `vite preview` - Edge Middleware only runs on
// Vercel's platform. Test this by deploying.

const PASSWORD_WORD = 'holly';
const PROTECTED_PATH = '/op/OP_Simulation_Dashboard_corrected.html';
const LOGIN_PATH = '/op/login';
const COOKIE_NAME = 'op_session';
const SESSION_HOURS = 12;

// Vercel statically analyzes this export at build time, so the matcher array
// must be literal strings (no identifiers) - keep in sync with PROTECTED_PATH
// and LOGIN_PATH above.
export const config = {
  matcher: ['/op/OP_Simulation_Dashboard_corrected.html', '/op/login'],
};

function toHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function sign(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return toHex(sig);
}

async function makeSessionCookie(secret) {
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const signature = await sign(String(expires), secret);
  return `${expires}.${signature}`;
}

async function isValidSession(cookieValue, secret) {
  if (!cookieValue) return false;
  const [expires, signature] = cookieValue.split('.');
  if (!expires || !signature) return false;
  if (Number(expires) < Date.now()) return false;
  const expected = await sign(expires, secret);
  return expected === signature;
}

function getCookie(request, name) {
  const header = request.headers.get('cookie') || '';
  const match = header.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function loginPage({ error = '' } = {}) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex, nofollow" />
<title>Protected Dashboard</title>
<style>
  html,body{height:100%;margin:0;}
  body{display:flex;align-items:center;justify-content:center;background:#0b0d12;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;}
  form{background:#151820;border:1px solid #262b36;border-radius:14px;padding:2.25rem 2rem;width:min(360px,90vw);box-shadow:0 24px 64px rgba(0,0,0,.5);text-align:center;box-sizing:border-box;}
  h1{font-size:1.05rem;font-weight:700;color:#f2f3f5;margin:0 0 .4rem;}
  p{font-size:.85rem;color:#9aa0ab;margin:0 0 1.25rem;line-height:1.4;}
  .input-wrap{position:relative;margin-bottom:.85rem;}
  input{width:100%;padding:.65rem 2.4rem .65rem .85rem;border-radius:8px;border:1px solid #2c313d;background:#0e0f13;color:#f2f3f5;font-size:.95rem;box-sizing:border-box;}
  button.toggle{position:absolute;top:50%;right:.5rem;transform:translateY(-50%);width:1.7rem;height:1.7rem;display:flex;align-items:center;justify-content:center;padding:0;border:none;background:none;color:#9aa0ab;cursor:pointer;}
  button.toggle svg{width:18px;height:18px;display:block;}
  button[type=submit]{width:100%;padding:.65rem .85rem;border-radius:8px;border:none;background:#4f46e5;color:#fff;font-weight:600;font-size:.9rem;cursor:pointer;}
  .error{min-height:1.1em;color:#f87171;font-size:.8rem;margin-top:.75rem;}
</style>
</head>
<body>
  <form method="POST" action="${LOGIN_PATH}">
    <h1>Protected Dashboard</h1>
    <p>This project is password protected. Enter the access password to continue.</p>
    <div class="input-wrap">
      <input id="pw" name="password" type="password" autocomplete="off" placeholder="Password" autofocus />
      <button type="button" class="toggle" id="toggle" aria-label="Show password" aria-pressed="false">
        <svg id="eye" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.36 0-10-7-10-7a18.4 18.4 0 0 1 4.22-5.19M9.9 4.24A9.12 9.12 0 0 1 12 4c6.36 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>
      </button>
    </div>
    <button type="submit">Unlock</button>
    <div class="error">${error}</div>
  </form>
  <script>
    var pw = document.getElementById('pw');
    var toggle = document.getElementById('toggle');
    var eye = document.getElementById('eye');
    var eyeOnIcon = '<path d="M2 12s3.64-7 10-7 10 7 10 7-3.64 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>';
    var eyeOffIcon = eye.innerHTML;
    toggle.addEventListener('click', function () {
      var showing = pw.type === 'text';
      pw.type = showing ? 'password' : 'text';
      toggle.setAttribute('aria-label', showing ? 'Show password' : 'Hide password');
      toggle.setAttribute('aria-pressed', String(!showing));
      eye.innerHTML = showing ? eyeOffIcon : eyeOnIcon;
      pw.focus();
    });
  </script>
</body>
</html>`;
}

function html(body, init) {
  return new Response(body, {
    ...init,
    headers: { 'content-type': 'text/html; charset=utf-8', ...(init && init.headers) },
  });
}

export default async function middleware(request) {
  const url = new URL(request.url);
  const secret = process.env.OP_SESSION_SECRET;

  if (!secret) {
    return new Response(
      'Dashboard gate is not configured: set OP_SESSION_SECRET in the Vercel project environment variables.',
      { status: 500 }
    );
  }

  if (url.pathname === LOGIN_PATH && request.method === 'POST') {
    const form = await request.formData();
    const guess = (form.get('password') || '').toString();
    if (isValidPassword(PASSWORD_WORD, guess)) {
      const cookieValue = await makeSessionCookie(secret);
      return new Response(null, {
        status: 302,
        headers: {
          Location: PROTECTED_PATH,
          'Set-Cookie': `${COOKIE_NAME}=${encodeURIComponent(cookieValue)}; Path=/op; Max-Age=${SESSION_HOURS * 3600}; HttpOnly; Secure; SameSite=Lax`,
        },
      });
    }
    return html(loginPage({ error: 'Incorrect password. Try again.' }), { status: 401 });
  }

  if (url.pathname === LOGIN_PATH) {
    return html(loginPage());
  }

  // url.pathname === PROTECTED_PATH
  const cookieValue = getCookie(request, COOKIE_NAME);
  if (await isValidSession(cookieValue, secret)) {
    return next();
  }
  return html(loginPage());
}
