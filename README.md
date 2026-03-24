# ScreenSize

A responsive design testing tool. Enter any URL and preview it at multiple screen sizes simultaneously.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Features

- **Preset Device Sizes** — iPhone SE, iPhone 15, iPhone 15 Pro Max, Samsung Galaxy S24, iPad, iPad Pro, MacBook Air, Desktop 1080p, Desktop 1440p, Ultrawide
- **Custom Sizes** — Add any width × height
- **Live Preview** — Real-time iframe previews at each size
- **Portrait/Landscape** — Rotate any device with one click
- **Side-by-Side Compare** — Pick two devices and compare them directly
- **Ruler Overlay** — Pixel grid overlay for precision checking
- **Screenshot Placeholder** — Per-frame screenshot button (extensible)
- **Favorites** — Save frequently tested URLs (persisted in localStorage)
- **Dark/Light Mode** — Toggle between themes
- **Zoom Control** — Scale all previews from 15% to 100%

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://zustand-demo.pmnd.rs/) (state management)
- [Framer Motion](https://www.framer.com/motion/) (animations)
- [Lucide React](https://lucide.dev/) (icons)

## How It Works

All client-side. URLs are loaded in sandboxed iframes at their native resolution, then CSS-scaled to fit the preview grid. No server-side rendering or proxying — what you see is the real page.

> **Note:** Some sites block iframe embedding via `X-Frame-Options` or CSP headers. This is a browser security feature and cannot be bypassed client-side.

## License

[MIT](LICENSE)
