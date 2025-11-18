# HIIT&FLOW

Mobile-first minimal React app guiding HIIT-inspired routines for vitality and longevity.

## Setup

```bash
npm install
npm run dev
```

Visit the printed localhost URL in a mobile browser or emulator. The UI is PWA-ready and optimized for Safari/Chrome mobile.

## Testing

Unit tests (Jest + React Testing Library):

```bash
npm test
```

E2E smoke (Cypress) – ensure the dev server is running (e.g., `npm run dev` in another terminal):

```bash
npm run test:e2e
```

## Features

- Access → Config → Workout → Complete flow
- Duration presets (10 min free; 7/15/20 gated as Premium coming soon)
- Female British voice by default with male/off options
- 60s drift-free per exercise, swipe next/prev, pause/stop controls
- Wake lock support with graceful fallback
- Quick Start uses last saved preferences (duration, music, voice) and keeps streak persistence
- Dark mode toggle via CSS tokens
