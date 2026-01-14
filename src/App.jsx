import { useState } from 'react'

// Apps are built and served from the same container
const getAppUrl = (appName) => {
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  return `${origin}/${appName}`
}

const apps = [
  {
    name: 'adpreview-multishow',
    displayName: 'Ad Preview Multishow',
    description: 'Ad preview application',
    url: getAppUrl('adpreview-multishow')
  },
  {
    name: 'catalog-creation-proto',
    displayName: 'Catalog Creation',
    description: 'Catalog creation prototype',
    url: getAppUrl('catalog-creation-proto')
  },
  {
    name: 'react-tailwind-app',
    displayName: 'React Tailwind App',
    description: 'React + Tailwind app',
    url: getAppUrl('react-tailwind-app')
  }
]

function App() {
  const [selectedApp, setSelectedApp] = useState(null)
  const [iframeError, setIframeError] = useState(false)

  const handleAppClick = (app) => {
    // Open in new tab
    window.open(app.url, '_blank')
  }

  const handleAppView = (app) => {
    setSelectedApp(app)
    setIframeError(false)
  }

  const handleIframeLoad = () => {
    setIframeError(false)
  }

  const handleIframeError = () => {
    setIframeError(true)
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
          <div className="flex items-center space-x-4">
            <a
              href={selectedApp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Open in New Tab
            </a>
          </div>
        </div>
        <div className="relative w-full h-[calc(100vh-73px)] bg-gray-50">
          {iframeError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-white">
              <div className="text-center max-w-md p-8">
                <div className="text-red-500 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">App Not Available</h3>
                <p className="text-gray-600 mb-6">
                  The app couldn't be loaded. Make sure it's deployed as a separate Vercel project.
                </p>
                <div className="space-y-3">
                  <a
                    href={selectedApp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                  >
                    Try Opening in New Tab
                  </a>
                  <div>
                    <button
                      onClick={() => setSelectedApp(null)}
                      className="text-gray-600 hover:text-gray-800 text-sm"
                    >
                      ← Back to Launcher
                    </button>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-left">
                  <p className="text-xs text-gray-500 mb-2">Trying to load:</p>
                  <code className="text-xs text-gray-700 break-all">{selectedApp.url}</code>
                </div>
              </div>
            </div>
          ) : (
            <>
              <iframe
                src={selectedApp.url}
                className="w-full h-full border-0"
                title={selectedApp.displayName}
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation allow-modals"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 opacity-0 hover:opacity-100 transition-opacity">
                <a
                  href={selectedApp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Open in New Tab
                </a>
              </div>
            </>
          )}
        </div>
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
