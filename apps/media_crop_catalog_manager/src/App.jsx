import BackToLauncher from './components/BackToLauncher'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackToLauncher />
      <Navbar />
      <div className="pt-[104px]">
        {/* App content will go here */}
      </div>
    </div>
  )
}

export default App
