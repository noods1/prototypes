interface CatalogData {
  id: string;
  name: string;
  catalogId: string;
  owner: string;
  status: string;
  statusColor: string;
  avatarSrc: string;
  catalogType?: string;
}

// API endpoint - can be configured via environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Fallback to localStorage if API is not available (for development)
const USE_LOCAL_STORAGE_FALLBACK = !import.meta.env.VITE_API_BASE_URL;

const CATALOGS_DB_KEY = 'catalogs_db';

// Local storage functions (fallback)
const loadCatalogsFromLocalStorage = (): CatalogData[] => {
  try {
    const stored = localStorage.getItem(CATALOGS_DB_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading catalogs from localStorage:', error);
  }
  return [];
};

const saveCatalogsToLocalStorage = (catalogs: CatalogData[]): void => {
  try {
    localStorage.setItem(CATALOGS_DB_KEY, JSON.stringify(catalogs));
  } catch (error) {
    console.error('Error saving catalogs to localStorage:', error);
  }
};

// API functions
export const loadCatalogs = async (): Promise<CatalogData[]> => {
  if (USE_LOCAL_STORAGE_FALLBACK) {
    return loadCatalogsFromLocalStorage();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/catalogs`);
    if (!response.ok) {
      throw new Error(`Failed to load catalogs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.catalogs || [];
  } catch (error) {
    console.error('Error loading catalogs from API, falling back to localStorage:', error);
    // Fallback to localStorage on error
    return loadCatalogsFromLocalStorage();
  }
};

export const saveCatalogs = async (catalogs: CatalogData[]): Promise<void> => {
  if (USE_LOCAL_STORAGE_FALLBACK) {
    saveCatalogsToLocalStorage(catalogs);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/catalogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ catalogs }),
    });
    if (!response.ok) {
      throw new Error(`Failed to save catalogs: ${response.statusText}`);
    }
    // Also save to localStorage as backup
    saveCatalogsToLocalStorage(catalogs);
  } catch (error) {
    console.error('Error saving catalogs to API, falling back to localStorage:', error);
    // Fallback to localStorage on error
    saveCatalogsToLocalStorage(catalogs);
  }
};

export const createCatalog = async (catalog: CatalogData): Promise<CatalogData> => {
  if (USE_LOCAL_STORAGE_FALLBACK) {
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = [...catalogs, catalog];
    saveCatalogsToLocalStorage(updatedCatalogs);
    return catalog;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/catalogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ catalog }),
    });
    if (!response.ok) {
      throw new Error(`Failed to create catalog: ${response.statusText}`);
    }
    const data = await response.json();
    // Also update localStorage as backup
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = [...catalogs, data.catalog];
    saveCatalogsToLocalStorage(updatedCatalogs);
    return data.catalog;
  } catch (error) {
    console.error('Error creating catalog via API, falling back to localStorage:', error);
    // Fallback to localStorage on error
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = [...catalogs, catalog];
    saveCatalogsToLocalStorage(updatedCatalogs);
    return catalog;
  }
};

export const deleteCatalog = async (id: string): Promise<void> => {
  if (USE_LOCAL_STORAGE_FALLBACK) {
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = catalogs.filter(catalog => catalog.id !== id);
    saveCatalogsToLocalStorage(updatedCatalogs);
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/catalogs/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete catalog: ${response.statusText}`);
    }
    // Also update localStorage as backup
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = catalogs.filter(catalog => catalog.id !== id);
    saveCatalogsToLocalStorage(updatedCatalogs);
  } catch (error) {
    console.error('Error deleting catalog via API, falling back to localStorage:', error);
    // Fallback to localStorage on error
    const catalogs = loadCatalogsFromLocalStorage();
    const updatedCatalogs = catalogs.filter(catalog => catalog.id !== id);
    saveCatalogsToLocalStorage(updatedCatalogs);
  }
};

export type { CatalogData };

