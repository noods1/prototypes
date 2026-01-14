# Vercel Monorepo Setup

This monorepo contains multiple apps that need to be deployed separately on Vercel.

## Main Project (Launcher)

The root of this repository should be imported as the main Vercel project. It will deploy the launcher app.

**Settings:**
- Root Directory: Leave empty (root)
- Framework Preset: Vite
- Build Command: `cd apps/launcher && npm install && npm run build`
- Output Directory: `apps/launcher/dist`
- Install Command: `npm install`

## Individual App Projects

Each app should be added as a **separate project** in Vercel:

### Ad Preview Multishow
- Root Directory: `apps/adpreview-multishow`
- Framework Preset: Vite
- Build Command: `cd ../.. && npm install && cd apps/adpreview-multishow && npm run build`
- Output Directory: `dist`

### Catalog Creation Proto
- Root Directory: `apps/catalog-creation-proto`
- Framework Preset: Vite
- Build Command: `cd ../.. && npm install && cd apps/catalog-creation-proto && npm run build`
- Output Directory: `dist`

### React Tailwind App
- Root Directory: `apps/react-tailwind-app`
- Framework Preset: Vite
- Build Command: `cd ../.. && npm install && cd apps/react-tailwind-app && npm run build`
- Output Directory: `dist`

## How to Set Up in Vercel

1. **Import the main project:**
   - Go to Vercel Dashboard
   - Click "Add New Project"
   - Import `noods1/prototypes`
   - This will deploy the launcher

2. **Add each app as a separate project:**
   - Click "Add New Project" again
   - Select the same repository (`noods1/prototypes`)
   - In project settings, set the **Root Directory** to the app folder (e.g., `apps/adpreview-multishow`)
   - Configure the build settings as shown above
   - Repeat for each app

3. **Update Launcher Environment Variables:**
   - In the launcher project settings, add environment variables:
     - `VITE_ADPREVIEW_URL` = URL of adpreview-multishow deployment
     - `VITE_CATALOG_URL` = URL of catalog-creation-proto deployment
     - `VITE_REACT_TAILWIND_URL` = URL of react-tailwind-app deployment

## Alternative: Single Project with Subdirectories

If you prefer a single Vercel project, you can use Vercel's rewrites to route to different apps, but this is more complex and not recommended for separate deployments.
