import { useState } from 'react';
import Navbar from '../components/Navbar';
import CatalogListItem from '../components/CatalogListItem';
import SearchIcon from '../components/SearchIcon';
import Dropdown from '../components/Dropdown';

function CatalogList() {
  const [selectedCatalogType, setSelectedCatalogType] = useState('all');
  const [selectedBusinessCenter, setSelectedBusinessCenter] = useState('business-center-1');

  const catalogTypeOptions = [
    { value: 'all', label: 'Catalog type: All' },
    { value: 'product', label: 'Product Catalog' },
    { value: 'dynamic', label: 'Dynamic Catalog' },
  ];

  const businessCenterOptions = [
    { value: 'business-center-1', label: 'Business center 1' },
    { value: 'business-center-2', label: 'Business center 2' },
    { value: 'business-center-3', label: 'Business center 3' },
  ];
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Product catalogs
          </h1>
          <p className="text-sm text-gray-500 max-w-2xl">
            Get closer to your first sale by adding products, or import your existing product inventory.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-lg border border-gray-300">
          {/* Card Header */}
          <div className="px-6 py-4 border-b border-gray-300 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Catalogs</h2>
            
            {/* Search and Filter Bar */}
            <div className="flex items-center gap-3">
              {/* Catalog Type Filter Dropdown */}
              <Dropdown
                options={catalogTypeOptions}
                value={selectedCatalogType}
                onChange={setSelectedCatalogType}
              />
              
              {/* Business Center Filter Dropdown */}
              <Dropdown
                options={businessCenterOptions}
                value={selectedBusinessCenter}
                onChange={setSelectedBusinessCenter}
              />

              {/* Search Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name or ID"
                  className="pl-10 pr-3 py-2 border border-gray-300 rounded h-9 w-60 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Create New Button */}
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors">
                Create new
              </button>
            </div>
          </div>

          {/* Catalog List */}
          <div className="p-6 space-y-3">
            <CatalogListItem />
            <CatalogListItem 
              catalogName="Product Catalog Name Product Catalog 112134"
              catalogId="829382938238923"
              ownerName="Shop Ads Testing Business Center"
              status="Shopify Pause Sync"
              statusVariant="warning"
            />
            <CatalogListItem 
              catalogName="Product Catalog Name Product Catalog 112134"
              catalogId="829382938238923"
              ownerName="Shop Ads Testing Business Center"
              status="Shopify Pause Sync"
              statusVariant="warning"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogList;

