import { useState } from 'react'

const apps = [
  {
    name: 'adpreview-multishow',
    displayName: 'Ad Preview Multishow',
    description: 'Ad preview application',
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
  const [selectedApp, setSelectedApp] = useState(null)

  const handleAppClick = (app) => {
    // Open in new tab
    window.open(app.url, '_blank')
  }

  const handleAppView = (app) => {
    setSelectedApp(app)
  }

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedApp(null)}
              className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>Back to Launcher</span>
            </button>
            <h2 className="text-lg font-semibold text-gray-800">{selectedApp.displayName}</h2>
          </div>
          <button
            onClick={() => window.open(selectedApp.url, '_blank')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Open in New Tab
          </button>
        </div>
        <iframe
          src={selectedApp.url}
          className="w-full h-[calc(100vh-73px)] border-0"
          title={selectedApp.displayName}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            Prototypes Launcher
          </h1>
          <p className="text-slate-600">
            Click on any app to view it
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {apps.map((app) => (
            <div
              key={app.name}
              onClick={() => handleAppView(app)}
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
                <span>View App</span>
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
                    d="M9 5l7 7-7 7"
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
