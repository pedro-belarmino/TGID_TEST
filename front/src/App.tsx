import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './views/Home'
import Product from './views/Product'
import ConfirmBuy from './views/ConfirmBuy'
import ConfirmatedPurchase from './views/ConfirmatedPurchase'
import AddItem from './views/AddItem'
import Template from './views/Template'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Template />} >
            <Route path="/" element={<Home />} />
            <Route path="/item" element={<Product />} />
            <Route path="/adicionar-item" element={<AddItem />} />
          </Route>
          <Route path="/compra-confirmada" element={<ConfirmatedPurchase />} />
          <Route path="/compra" element={<ConfirmBuy />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
