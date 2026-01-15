import BackToLauncher from './components/BackToLauncher'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackToLauncher />
      <div className="pt-[40px]">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Media Crop Catalog Manager
          </h1>
          <p className="text-lg text-gray-600">
            Adding crop functionality to media files on catalog manager
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
