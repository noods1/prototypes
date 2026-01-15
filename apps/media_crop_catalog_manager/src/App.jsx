import BackToLauncher from './components/BackToLauncher'
import Navbar from './components/Navbar'
import LeftNav from './components/LeftNav'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackToLauncher />
      <Navbar />
      <LeftNav />
      <div className="pt-[104px] ml-[240px]">
        {/* Main content container */}
        <div className="p-6">
          {/* Main content will go here */}
        </div>
      </div>
    </div>
  )
}

export default App
