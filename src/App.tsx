import { useBackgroundSync } from './hooks/useBackgroundSync'
import { ProductTable } from './components/ProductTable/ProductTable'

function App() {
  useBackgroundSync()
  return <ProductTable />
}

export default App