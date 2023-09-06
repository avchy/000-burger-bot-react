import "./App.scss"
import { Routes, Route } from "react-router-dom"

import { Header } from "components/styled/Header"
import { ProductsPage } from "components/pages/ProductsPage"
import { Product } from "components/pages/Product"
import { OrderPage } from "components/pages/OrderPage"
import { CheckoutPage } from "components/pages/CheckoutPage"
import { CreditCard } from "components/pages/CreditCard"
import { Payments } from "components/pages/Payments"
import { Form } from "components/styled/Form"
import { createTheme, ThemeProvider } from "@mui/material/styles"

import { useTranslation } from "react-i18next"
import useLocalStorage from "./hooks/use-localstorage"
import i18n from "./helpers/i18n"

import React, { createContext, useState } from "react"

// const { getData } = require("./db/db")
// const cartItemsInitial = getData()

const tele = window.Telegram.WebApp
tele.isClosingConfirmationEnabled = "false"

tele.expand() //расширяем на все окно

const theme = createTheme({
  typography: {
    fontFamily: "Rubik, Arial, sans-serif",
  },
  backgroundAll: "#131415",
  backgroundElements: "#1a222c",
})

export const CartContext = createContext()

export function App() {
  const { t } = useTranslation()
  const [language, setLanguage] = useLocalStorage("language", "ru")
  const [cartItems, setCartItems] = useState([])

  return (
    <CartContext.Provider value={{ cartItems, setCartItems }}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <br />

          <Header />

          <Routes>
            <Route index element={<ProductsPage />} />
            <Route path={"order"} element={<OrderPage />} />
            <Route path={"checkout"} element={<CheckoutPage />} />
            <Route path={"payments"} element={<Payments />} />
            <Route path={"creditCard"} element={<CreditCard />} />
            <Route path={"product"} element={<Product />} />

            <Route path={"form"} element={<Form />} />
          </Routes>
        </div>
      </ThemeProvider>
    </CartContext.Provider>
  )
}
