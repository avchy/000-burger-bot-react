import "./App.scss"
import { Routes, Route } from "react-router-dom"

import { Header } from "./components/Header"
import { ProductsPage } from "./pages/ProductsPage"
import { OrderPage } from "./pages/OrderPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { Form } from "./components/Form"

// const { getData } = require('./db/db')
// const foods = getData()

const tele = window.Telegram.WebApp
tele.isClosingConfirmationEnabled = "false"

tele.expand() //расширяем на все окно

export function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path={"order"} element={<OrderPage />} />
          <Route path={"checkout"} element={<CheckoutPage />} />

          <Route path={"form"} element={<Form />} />
        </Routes>
      </div>
    </>
  )
}
