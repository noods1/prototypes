const apps = [
  {
    name: 'adpreview-multishow',
    displayName: 'Ad Preview Multishow',
    description: 'Ad preview application',
    // Use environment variable or construct URL based on deployment
    url: import.meta.env.VITE_ADPREVIEW_URL || `${window.location.origin}/adpreview-multishow`
  },
  {
    name: 'catalog-creation-proto',
    displayName: 'Catalog Creation',
    description: 'Catalog creation prototype',
    url: import.meta.env.VITE_CATALOG_URL || `${window.location.origin}/catalog-creation-proto`
  },
  {
    name: 'react-tailwind-app',
    displayName: 'React Tailwind App',
    description: 'React + Tailwind app',
    url: import.meta.env.VITE_REACT_TAILWIND_URL || `${window.location.origin}/react-tailwind-app`
  }
]

function App() {
  const handleAppClick = (app) => {
    // Open the app URL in a new tab
    // If apps are deployed as separate Vercel projects, use their full URLs
    // Otherwise, try the relative path (requires Vercel rewrites/proxy)
    window.open(app.url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Prototypes Launcher
          </h1>
          <p className="text-slate-600">
            Click on any app to open it in a new tab
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {apps.map((app) => (
            <div
              key={app.name}
              onClick={() => handleAppClick(app)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow border border-slate-200 hover:border-blue-400"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">
                      {app.displayName}
                    </h3>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-4">{app.description}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span>Open App</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
