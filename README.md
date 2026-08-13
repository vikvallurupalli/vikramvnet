# Vikram Vallurupalli — Personal Portfolio

A modern, minimalist personal portfolio built with Vite + React. CSS uses custom properties
(design tokens) for theming, with a functional dark/light mode toggle.

## File Structure 

```
.
├── index.html              # Vite entry HTML
├── vite.config.js
├── package.json
├── middleware.js            # Vercel Edge Middleware — server-side gate for the OP dashboard
├── public/
│   └── op/
│       └── OP_Simulation_Dashboard_corrected.html   # Password-gated project
├── src/
│   ├── main.jsx             # React root
│   ├── App.jsx               # Top-level layout + modal routing
│   ├── index.css              # Design tokens, layout, theme, animations
│   ├── useTheme.js            # Dark/light theme hook (localStorage + system preference)
│   ├── passwordGate.js        # Password gate logic shared by the gated modals
│   ├── data/resume.js         # All resume-derived content
│   └── components/
│       ├── Hero.jsx
│       ├── BlockGrid.jsx
│       ├── Modal.jsx           # Reusable animated modal wrapper
│       ├── PasswordGate.jsx    # Inline password prompt used inside gated modals
│       ├── AboutModal.jsx      # Gated
│       ├── WorkModal.jsx       # Gated
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
