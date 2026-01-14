// Example backend API server for shared catalog storage
// This is a simple Express.js server example
// You can use this as a reference or adapt it to your preferred backend framework

const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (for demo purposes)
// In production, use a proper database (PostgreSQL, MongoDB, etc.)
let catalogs = [];

// Load catalogs from file on startup (if using file-based storage)
const DATA_FILE = path.join(__dirname, 'catalogs.json');

async function loadCatalogsFromFile() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    catalogs = JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, start with empty array
    catalogs = [];
  }
}

async function saveCatalogsToFile() {
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(catalogs, null, 2));
  } catch (error) {
    console.error('Error saving catalogs to file:', error);
  }
}

// Initialize on startup
loadCatalogsFromFile();

// GET /api/catalogs - Get all catalogs
app.get('/api/catalogs', (req, res) => {
  res.json({ catalogs });
});

// POST /api/catalogs - Create a new catalog or update all catalogs
app.post('/api/catalogs', (req, res) => {
  if (req.body.catalog) {
    // Single catalog creation
    const newCatalog = req.body.catalog;
    catalogs.push(newCatalog);
    saveCatalogsToFile();
    res.json({ catalog: newCatalog });
  } else if (req.body.catalogs) {
    // Bulk update (for saving all catalogs)
    catalogs = req.body.catalogs;
    saveCatalogsToFile();
    res.json({ catalogs });
  } else {
    res.status(400).json({ error: 'Invalid request body' });
  }
});

// DELETE /api/catalogs/:id - Delete a catalog
app.delete('/api/catalogs/:id', (req, res) => {
  const { id } = req.params;
  const index = catalogs.findIndex(c => c.id === id);
  if (index !== -1) {
    catalogs.splice(index, 1);
    saveCatalogsToFile();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Catalog not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Catalog API server running on http://localhost:${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/api/catalogs`);
});

