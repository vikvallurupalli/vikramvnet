# Vikram Vallurupalli — Personal Portfolio

A modern, minimalist personal portfolio built with Vite + React. CSS uses custom properties
(design tokens) for theming, with a functional dark/light mode toggle.

## File Structure

```
.
├── index.html              # Vite entry HTML
├── vite.config.js
├── package.json
├── public/
│   └── op/
│       └── OP_Simulation_Dashboard_corrected.html   # Password-gated project (see below)
├── src/
│   ├── main.jsx             # React root
│   ├── App.jsx               # Top-level layout + modal routing
│   ├── index.css              # Design tokens, layout, theme, animations
│   ├── useTheme.js            # Dark/light theme hook (localStorage + system preference)
│   ├── passwordGate.js        # Shared time-based password logic (word + offset + window)
│   ├── data/resume.js         # All resume-derived content
│   └── components/
│       ├── Hero.jsx
│       ├── BlockGrid.jsx
│       ├── Modal.jsx           # Reusable animated modal wrapper
│       ├── PasswordGate.jsx    # Inline password prompt used inside gated modals
│       ├── AboutModal.jsx      # Gated — see "In-app password protection" below
│       ├── WorkModal.jsx       # Gated — see "In-app password protection" below
│       ├── LikeModal.jsx
│       ├── ContactModal.jsx
│       └── Footer.jsx
└── README.md
```

Files in `public/` are served as-is at the site root by both the dev server and the production
build (e.g. `public/op/foo.html` → `/op/foo.html`), so `public/op/...` is the one folder that
isn't a React route.

## Running locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

Production build:

```bash
npm run build
npm run preview
```

## Updating content

All resume-derived content (skills, timeline, projects, interests) lives in
`src/data/resume.js` — edit it directly to update the site.

## Password protection

Two things on this site are behind a time-based password instead of a fixed one — the password
itself rotates automatically, so there's nothing to update or leak long-term.

**`public/op/OP_Simulation_Dashboard_corrected.html`** (the City of Overland Park project) has a
client-side gate injected directly into the file (a full-screen overlay + inline `<script>`, no
build step involved). Password: **`holly` + the current time**, e.g. `holly1135pm` for 11:35 PM.
Any guess within ±5 minutes of the visitor's local clock is accepted.

**The "About Myself" and "My Work" modals** are gated the same way, via the shared
`src/passwordGate.js` logic and the `PasswordGate` component. Password: **`vikramv` + the time
one hour from now**, e.g. if it's currently 2:20 PM the password is `vikramv320pm`. As with the
`op` gate, any guess within ±5 minutes of that (shifted) target time works.

Both gates are a lightweight visual/access control, not real security — anyone who views page
source, opens dev tools, or inspects the JS bundle can read the check and the underlying
content. Don't rely on this to protect sensitive data; it's meant to keep things from being
casually opened by people they weren't shared with.
