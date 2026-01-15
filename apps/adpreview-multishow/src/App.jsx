import Navbar from './components/Navbar'
import BackToLauncher from './components/BackToLauncher'
import LeftRail from './components/LeftRail'
import AdNameSection from './components/AdNameSection'
import ProductDetailsCard from './components/ProductDetailsCard'
import CreateAdsForm from './components/CreateAdsForm'
import PreviewCard from './components/PreviewCard'
import RightRail from './components/RightRail'
import Watermark from './components/Watermark'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BackToLauncher />
      <Navbar />
      <div className="pt-[100px] flex">
        <div className="fixed left-0 top-[100px] bottom-0 w-[250px] bg-white border-r border-gray-200 overflow-y-auto">
          <LeftRail />
        </div>
        <div className="flex-1 ml-[250px] bg-[#F8F8F9] relative">
          <Watermark />
          <div className="flex justify-center w-full py-8 relative z-10">
            <div className="flex gap-4">
              {/* Left Rail - 740px */}
              <div className="w-[740px]">
                <AdNameSection />
                <ProductDetailsCard />
                <div className="mt-4 flex gap-[10px]">
                  {/* Left container for create ad functionalities */}
                  <div className="w-[427px]">
                    <CreateAdsForm />
                  </div>
                  {/* Right container - Preview Card */}
                  <div className="flex-1">
                    <PreviewCard />
                  </div>
                </div>
              </div>
              {/* Right Rail - 278px */}
              <div className="w-[278px]">
                <RightRail />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
