import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CatalogHeader } from './CatalogHeader';
import { CatalogFilters } from './CatalogFilters';
import { CatalogItem } from './CatalogItem';
import { CreateCatalogDrawer } from './CreateCatalogDrawer';
import { loadCatalogs, createCatalog, deleteCatalog, type CatalogData } from '@/services/catalogApi';

export const CatalogList: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [catalogs, setCatalogs] = useState<CatalogData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load catalogs on component mount
  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        setIsLoading(true);
        const loadedCatalogs = await loadCatalogs();
        setCatalogs(loadedCatalogs);
      } catch (error) {
        console.error('Error loading catalogs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCatalogs();
  }, []);

  const filteredCatalogs = catalogs.filter(catalog => {
    const matchesSearch = catalog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         catalog.catalogId.includes(searchTerm);
    
    // Filter by catalog type
    const matchesFilter = filterType === 'All' || 
      (catalog.catalogType && getCatalogTypeTitle(catalog.catalogType) === filterType);
    
    return matchesSearch && matchesFilter;
  });

  // Helper function to get catalog type title from value
  const getCatalogTypeTitle = (value: string): string => {
    const catalogTypeOptions = [
      { value: 'ecommerce', title: 'Ecommerce' },
      { value: 'auto-inventory', title: 'Auto - Inventory' },
      { value: 'auto-model', title: 'Auto - Model' },
      { value: 'media-entertainment', title: 'Media and entertainment' },
      { value: 'destination', title: 'Destination' },
      { value: 'hotel', title: 'Hotel' },
      { value: 'flight', title: 'Flight' },
      { value: 'live-events', title: 'Live Events' },
      { value: 'local-services', title: 'Local services' }
    ];
    return catalogTypeOptions.find(opt => opt.value === value)?.title || value;
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterType(value);
  };

  const handleCreateNew = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleCreateCatalog = async (catalogData: {
    name: string;
    catalogId: string;
    owner: string;
    catalogType: string;
  }) => {
    const newCatalog: CatalogData = {
      id: Date.now().toString(), // Unique ID for the catalog item
      name: catalogData.name,
      catalogId: catalogData.catalogId,
      owner: catalogData.owner,
      status: '', // Removed Shopify sync status
      statusColor: '',
      avatarSrc: 'https://api.builder.io/api/v1/image/assets/TEMP/6d6a8af27679edd318ea43b83ede071b0b884484?placeholderIfAbsent=true',
      catalogType: catalogData.catalogType
    };
    try {
      await createCatalog(newCatalog);
      setCatalogs(prev => [...prev, newCatalog]);
      setIsDrawerOpen(false);
      // Navigate to overview page
      navigate(`/catalog/${newCatalog.id}/overview`);
    } catch (error) {
      console.error('Error creating catalog:', error);
    }
  };

  const handleDeleteCatalog = async (id: string) => {
    try {
      await deleteCatalog(id);
      setCatalogs(prev => prev.filter(catalog => catalog.id !== id));
    } catch (error) {
      console.error('Error deleting catalog:', error);
    }
  };


  return (
    <main className="justify-center items-stretch flex w-full gap-2.5 overflow-hidden flex-1 h-full bg-[#F8F8F9] px-20 max-md:max-w-full max-md:px-5 relative">
      <CreateCatalogDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer} onCreate={handleCreateCatalog} />
      <div className="items-center flex min-w-60 w-full flex-col overflow-hidden flex-1 shrink basis-[0%] pb-6 max-md:max-w-full min-h-0">
        <CatalogHeader />
        <div className="flex w-full flex-col flex-1 max-md:max-w-full min-h-0 overflow-y-auto">
          <div className="min-w-[420px] w-full max-w-[1000px] bg-white rounded-xl mx-auto">
            <header className="justify-between items-center flex w-full gap-[40px_100px] flex-wrap pt-6 pb-4 px-6 max-md:max-w-full max-md:px-5">
              <div className="text-xl text-[#121415] font-medium whitespace-nowrap tracking-[0.3px] leading-[1.4] w-[82px]">
                <div className="items-center flex w-full gap-1">
                  <h2 className="text-[#121415]">Catalogs</h2>
                </div>
              </div>
              <CatalogFilters
                onSearchChange={handleSearchChange}
                onFilterChange={handleFilterChange}
                onCreateNew={handleCreateNew}
                availableCatalogTypes={Array.from(new Set(catalogs.map(c => c.catalogType).filter(Boolean)))}
                isDrawerOpen={isDrawerOpen}
              />
            </header>
            <section className="w-full p-6 max-md:max-w-full max-md:px-5">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <p className="text-[#6D6E70]" style={{
                    fontFamily: 'TikTok Sans, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}>
                    Loading catalogs...
                  </p>
                </div>
              ) : (
                <>
                  {filteredCatalogs.map((catalog, index) => (
                <div key={catalog.id} className={index > 0 ? 'mt-3' : ''}>
                  <CatalogItem
                    id={catalog.id}
                    name={catalog.name}
                    catalogId={catalog.catalogId}
                    owner={catalog.owner}
                    status={catalog.status}
                    statusColor={catalog.statusColor}
                    avatarSrc={catalog.avatarSrc}
                    catalogType={catalog.catalogType}
                    onDelete={handleDeleteCatalog}
                  />
                </div>
                  ))}
                  {filteredCatalogs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16">
                  <svg width="72" height="72" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_348_215446)">
                      <ellipse cx="36.0006" cy="36.0003" rx="28.5" ry="28.5" fill="#D9D9D9" fillOpacity="0.8"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M32.8688 17.5738C32.8688 15.1429 34.8394 13.1121 37.2704 13.1121C39.7013 13.1121 41.672 15.1429 41.672 17.5738H46.4149V22.2445H28.1198V17.5738H32.8688ZM37.297 17.0861C38.1587 17.0861 38.8572 16.3876 38.8572 15.526C38.8572 14.6643 38.1587 13.9658 37.297 13.9658C36.4354 13.9658 35.7369 14.6643 35.7369 15.526C35.7369 16.3876 36.4354 17.0861 37.297 17.0861Z" fill="#FF949B"/>
                      <path d="M37.297 33.6797C37.297 35.403 35.9 36.8 34.1767 36.8C32.4534 36.8 31.0564 35.403 31.0564 33.6797C31.0564 31.9564 32.4534 30.5594 34.1767 30.5594C35.9 30.5594 37.297 31.9564 37.297 33.6797Z" fill="#FF949B"/>
                      <path d="M49.5354 33.6797C49.5354 35.403 48.1384 36.8 46.4151 36.8C44.6918 36.8 43.2948 35.403 43.2948 33.6797C43.2948 31.9564 44.6918 30.5594 46.4151 30.5594C48.1384 30.5594 49.5354 31.9564 49.5354 33.6797Z" fill="#FF949B"/>
                      <path d="M59.2313 33.6797C59.2313 35.403 57.8343 36.8 56.111 36.8C54.3877 36.8 52.9907 35.403 52.9907 33.6797C52.9907 31.9564 54.3877 30.5594 56.111 30.5594C57.8343 30.5594 59.2313 31.9564 59.2313 33.6797Z" fill="#FF949B"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M26.1745 22.2661L24.3173 50.6367H46.1393L47.9965 22.2661H26.1745ZM24.7131 17.5857C23.0689 17.5857 21.7069 18.8615 21.5995 20.5021L19.538 51.993C19.4202 53.7927 20.8481 55.3171 22.6516 55.3171H47.6006C49.2448 55.3171 50.6069 54.0413 50.7143 52.4007L52.7758 20.9098C52.8936 19.1101 51.4656 17.5857 49.6621 17.5857H24.7131Z" fill="#5CD6D2"/>
                      <path d="M42.8979 17.5857C44.8403 17.5857 46.4149 19.1603 46.4149 21.1027V22.2445H28.1198V21.1027C28.1198 19.1603 29.6944 17.5857 31.6368 17.5857H42.8979Z" fill="#223E70"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M44.3172 41.294L27.9859 41.2947L27.9858 39.7345L44.3171 39.7339L44.3172 41.294Z" fill="#FFEFC7"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M37.2249 44.4957L27.9859 44.496L27.9858 42.9359L37.2248 42.9355L37.2249 44.4957Z" fill="#FFEFC7"/>
                      <path d="M47.05 36.735L47.4429 30.7334C48.66 31.1589 49.5354 32.3174 49.5354 33.6797C49.5354 35.1847 48.4677 36.4408 47.05 36.735Z" fill="#223E70"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_348_215446">
                        <rect width="71.9999" height="71.9999" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                  <p className="mt-4 text-[#6D6E70]" style={{
                    fontFamily: 'TikTok Sans, sans-serif',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}>
                    Create a new catalog to get started
                  </p>
                </div>
                  )}
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
