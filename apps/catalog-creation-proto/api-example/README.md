# Catalog API Backend Setup

This directory contains an example backend API server for shared catalog storage.

## Quick Start

### Option 1: Simple Express.js Server (Example)

1. Install dependencies:
```bash
npm install express cors
```

2. Run the server:
```bash
node server.js
```

3. Set the environment variable in your frontend:
```bash
VITE_API_BASE_URL=http://localhost:3001/api
```

### Option 2: Use a Database

For production, replace the in-memory/file storage with a proper database:

- **PostgreSQL**: Use `pg` library
- **MongoDB**: Use `mongodb` or `mongoose`
- **Firebase**: Use Firebase Realtime Database or Firestore
- **Supabase**: Use Supabase client library

### Option 3: Serverless Functions

If deploying to Vercel, Netlify, or similar:

1. Create API routes in your deployment platform
2. Use their database service (Vercel Postgres, Netlify Functions, etc.)
3. Set `VITE_API_BASE_URL` to your API endpoint

## Environment Variables

In your frontend `.env` file:

```
VITE_API_BASE_URL=https://your-api-domain.com/api
```

If `VITE_API_BASE_URL` is not set, the app will fall back to localStorage (browser-specific storage).

## API Endpoints

- `GET /api/catalogs` - Get all catalogs
- `POST /api/catalogs` - Create a catalog or update all catalogs
- `DELETE /api/catalogs/:id` - Delete a catalog

## Production Recommendations

1. **Use a proper database** (PostgreSQL, MongoDB, etc.)
2. **Add authentication** to secure the API
3. **Add rate limiting** to prevent abuse
4. **Add error handling and logging**
5. **Use environment variables** for configuration
6. **Add CORS configuration** for your domain only

