import "./App.scss"
import { Routes, Route } from "react-router-dom"

import { Header } from "components/Header"
import { ProductsPage } from "components/pages/ProductsPage"
import { OrderPage } from "components/pages/OrderPage"
import { CheckoutPage } from "components/pages/CheckoutPage"
import { PaymentCreditCard } from "components/pages/PaymentCreditCard"
import { Payments } from "components/pages/Payments"
import { Form } from "components/Form"

// const { getData } = require('./db/db')
// const foods = getData()

const tele = window.Telegram.WebApp
tele.isClosingConfirmationEnabled = "false"

tele.expand() //расширяем на все окно

export function App() {
  return (
    <>
      <div className="App">
        {/* <Header /> */}
        <Routes>
          <Route index element={<ProductsPage />} />
          <Route path={"order"} element={<OrderPage />} />
          <Route path={"checkout"} element={<CheckoutPage />} />
          <Route path={"payments"} element={<Payments />} />
          <Route path={"creditCard"} element={<PaymentCreditCard />} />

          <Route path={"form"} element={<Form />} />
        </Routes>
      </div>
    </>
  )
}
