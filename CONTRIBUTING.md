# Contributing to ScreenSize

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

1. **Clone the repo**
   ```bash
   git clone https://github.com/marcusfequiere/ScreenSize.git
   cd ScreenSize
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the dev server**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/            # Next.js app router pages
├── components/     # React components (Toolbar, DeviceGrid, etc.)
├── store/          # Zustand state management
└── types/          # TypeScript interfaces
```

## How to Contribute

### Adding Device Presets

Device presets live in `src/store/index.ts` in the `DEVICE_PRESETS` array. Each preset needs:
- `id` — unique kebab-case identifier
- `name` — display name
- `width` / `height` — viewport dimensions in pixels
- `category` — one of: `phone`, `tablet`, `laptop`, `desktop`, `ultrawide`, `watch`, `automotive`
- `icon` — Lucide icon name

### Bug Reports & Feature Requests

Open an issue with a clear description and steps to reproduce (for bugs).

### Pull Requests

1. Fork the repo and create a feature branch
2. Make your changes with clear commit messages
3. Ensure `npm run build` passes
4. Open a PR with a description of what changed and why

## Code Style

- TypeScript strict mode
- Functional components with hooks
- Zustand for state management
- Tailwind CSS for styling

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
