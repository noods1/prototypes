# Prototypes Launcher

A web-based launcher for accessing all prototype applications in the monorepo.

## Features

- One-click access to all apps
- App cards with descriptions
- Opens apps in new tabs
- Vercel-ready deployment

## Usage

Run the launcher:

```bash
npm run dev:launcher
```

Then click on any app card to open it in a new tab.

## Vercel Deployment

### Environment Variables

Set these environment variables in your Vercel project settings:

- `VITE_ADPREVIEW_URL` - URL for Ad Preview Multishow app
- `VITE_CATALOG_URL` - URL for Catalog Creation app
- `VITE_REACT_TAILWIND_URL` - URL for React Tailwind App

If not set, the launcher will use default Vercel URLs based on app names.

### Deployment

Each app in the monorepo should be deployed separately on Vercel. The launcher will link to each deployed app's URL.
