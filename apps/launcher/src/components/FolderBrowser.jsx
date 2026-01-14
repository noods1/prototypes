import { useState } from 'react'

const FolderIcon = ({ isOpen }) => (
  <svg
    className={`w-5 h-5 mr-2 transition-transform ${isOpen ? 'rotate-90' : ''}`}
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
)

const FileIcon = () => (
  <svg
    className="w-5 h-5 mr-2 text-blue-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const FolderItem = ({ name, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="ml-4">
      <div
        className="flex items-center py-1 px-2 hover:bg-slate-50 rounded cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FolderIcon isOpen={isOpen} />
        <span className="text-slate-700 font-medium">{name}</span>
      </div>
      {isOpen && <div className="ml-2 border-l-2 border-slate-200 pl-2">{children}</div>}
    </div>
  )
}

const FileItem = ({ name, onClick, port }) => (
  <div
    className="flex items-center py-1 px-2 hover:bg-blue-50 rounded cursor-pointer group ml-4"
    onClick={onClick}
  >
    <FileIcon />
    <span className="text-slate-700 group-hover:text-blue-600">{name}</span>
    <span className="ml-auto text-xs text-slate-400 group-hover:text-blue-500">
      :{port}
    </span>
  </div>
)

function FolderBrowser({ apps }) {
  const handleAppClick = (app) => {
    const url = `http://localhost:${app.port}`
    window.open(url, '_blank')
  }

  return (
    <div className="font-mono text-sm">
      <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
        <div className="text-slate-500 mb-2">prototypes/</div>
        
        <FolderItem name="apps" defaultOpen={true}>
          {apps.map((app) => (
            <FolderItem key={app.name} name={app.name}>
              <FileItem
                name="package.json"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
              <FileItem
                name="README.md"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
              <FileItem
                name="src/"
                onClick={(e) => {
                  e.stopPropagation()
                }}
              />
              <div
                className="flex items-center py-1 px-2 hover:bg-green-50 rounded cursor-pointer group ml-4 border-l-2 border-green-400 pl-2"
                onClick={() => handleAppClick(app)}
              >
                <svg
                  className="w-5 h-5 mr-2 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-green-700 font-semibold">
                  ▶ Open {app.displayName}
                </span>
                <span className="ml-auto text-xs text-green-600">
                  localhost:{app.port}
                </span>
              </div>
            </FolderItem>
          ))}
        </FolderItem>
      </div>
    </div>
  )
}

export default FolderBrowser
