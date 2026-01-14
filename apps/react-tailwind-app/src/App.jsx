import CatalogList from './pages/CatalogList'
import BackToLauncher from './components/BackToLauncher'

function App() {
  return (
    <div>
      <BackToLauncher />
      <div className="pt-10">
        <CatalogList />
      </div>
    </div>
  )
}

export default App
