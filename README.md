# Prototypes Monorepo

This is a monorepo containing multiple prototype applications built with modern web technologies.

## Structure

```
prototypes/
├── apps/
│   ├── starter/                    # Starter app with Vite + React + Tailwind CSS v4
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── src/
│   │   ├── vite.config.js
│   │   └── ...
│   ├── adpreview-multishow/        # Ad preview application
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── .gitignore
│   │   ├── src/
│   │   ├── vite.config.js
│   │   └── ...
│   ├── catalog-creation-proto/      # Catalog creation prototype
│   │   ├── package.json
│   │   ├── README.md
│   │   ├── .gitignore
│   │   ├── src/
│   │   ├── api-example/
│   │   ├── scripts/
│   │   └── ...
│   └── react-tailwind-app/         # React + Tailwind app
│       ├── package.json
│       ├── README.md
│       ├── .gitignore
│       ├── src/
│       └── ...
├── package.json                     # Root workspace configuration
├── .gitignore
└── README.md                        # This file
```

## Preserved Files

Each app retains all its original files including:
- ✅ `package.json` - Updated with workspace naming (`@prototypes/app-name`)
- ✅ `README.md` - Original documentation preserved
- ✅ `.gitignore` - Git ignore rules preserved
- ✅ `.env.example` - Environment example files (if present)
- ✅ `src/` - Complete source code directories
- ✅ All configuration files (vite.config.js, tailwind.config.js, etc.)
- ✅ All assets, components, and project-specific files

## Getting Started

### Install Dependencies

Install all dependencies for all apps:

```bash
npm install
```

### Development

**Launch the Launcher (Recommended):**

```bash
npm run dev
```

This opens the launcher at `http://localhost:3000` where you can:
- Browse all apps in a visual folder structure
- Click any app to open it in a new tab
- See app descriptions and ports

**Run Individual Apps:**

```bash
# Launcher (port 3000)
npm run dev:launcher

# Starter app (port 5173)
npm run dev:starter

# Ad Preview app (port 5174)
npm run dev:adpreview

# Catalog Creation app (port 5175)
npm run dev:catalog

# React Tailwind app (port 5176)
npm run dev:react-tailwind
```

**Run All Apps Simultaneously:**

```bash
npm run dev:all
```

This starts all apps at once so you can access them all through the launcher.

### Building

Build all apps:

```bash
npm run build
```

Build a specific app:

```bash
npm run build:starter
npm run build:adpreview
npm run build:catalog
npm run build:react-tailwind
```

### Linting

Lint all apps:

```bash
npm run lint
```

## Adding New Apps

To add a new app to the monorepo:

1. Move your app directory into `apps/`
2. Ensure it has a `package.json` with a unique name
3. Run `npm install` from the root to link it into the workspace
4. Add scripts to the root `package.json` if needed

## Workspace Management

This monorepo uses npm workspaces. All apps share the same `node_modules` at the root level, which helps with dependency management and reduces disk space.
