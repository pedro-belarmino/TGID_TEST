import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Product from './views/Product'
import ConfirmBuy from './views/ConfirmBuy'
import ConfirmatedPurchase from './views/ConfirmatedPurchase'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Product />} />
          <Route path="/compra" element={<ConfirmBuy />} />
          <Route path="/compra-confirmada" element={<ConfirmatedPurchase />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
