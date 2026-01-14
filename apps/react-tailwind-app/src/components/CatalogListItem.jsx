import Avatar from './Avatar';
import StatusIndicator from './StatusIndicator';

function CatalogListItem({ 
  catalogName = "Product Catalog Name Product Catalog 112134",
  catalogId = "829382938238923",
  ownerName = "Shop Ads Testing Business Center",
  status = "Shopify Pause Sync",
  statusVariant = "warning",
  className = ""
}) {
  return (
    <div className={`bg-white border border-gray-300 rounded p-4 ${className}`}>
      <div className="flex items-center gap-4">
        {/* Avatar/Icon */}
        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and ID */}
          <div className="mb-2">
            <h3 className="text-base font-medium text-gray-900 leading-6">
              {catalogName}
            </h3>
            <p className="text-sm text-gray-500 mt-0.5">
              ID: {catalogId}
            </p>
          </div>

          {/* Owner and Status */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-gray-900">Owned by:</span>
            <span className="text-sm text-gray-500">{ownerName}</span>
            <StatusIndicator 
              variant={statusVariant} 
              text={status}
              showHelp={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CatalogListItem;

