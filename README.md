A modern student council website built with React, Vite, Tailwind, and a component-driven UI structure.

## Overview

This project contains the Ascendrix Student Council website source code. It uses a component-based architecture inside `src/app`, with reusable UI components under `src/app/components/ui` and global styles in `src/styles`.

## Key Technologies

- React
- Vite
- Tailwind CSS
- Shadcn-style UI components
- Radix UI primitives
- React Router
- TypeScript-compatible setup

## Quick Start

### Install dependencies

Using `pnpm` (recommended):

```bash
pnpm install
```

Using `npm`:

```bash
npm install
```

### Run development server

```bash
npm run dev
```

or with `pnpm`:

```bash
pnpm dev
```

Then open the local URL shown in the terminal.

## Build for production

```bash
npm run build
```

or with `pnpm`:

```bash
pnpm build
```

## Project Structure

- `src/main.tsx` - application entry point
- `src/app/App.tsx` - main app shell
- `src/app/components/` - page sections and feature components
- `src/app/components/ui/` - reusable UI primitives and controls
- `src/styles/` - CSS globals and theme styles

## Notes

- This is a private workspace package configured for Vite and Tailwind.
- If you use `pnpm` in a monorepo, make sure `pnpm-workspace.yaml` is configured correctly.
- Update the `package.json` `name` and metadata if you rename or repurpose the project.
  
