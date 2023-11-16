import "App.scss"
import React, { createContext, useState, useEffect, useCallback } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Header } from "components/Header"
import { ProductsPage } from "pages/ProductsPage"
import { Product } from "pages/Product"
import { OrderPage } from "pages/OrderPage"
import { CheckoutPage } from "pages/CheckoutPage"
import { CreditCard } from "pages/CreditCard"
import { Payments } from "pages/Payments"
import { Form } from "components/Form"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import useLocalStorage from "./hooks/use-localstorage"
// import i18n from "./helpers/i18n"
import queryString from "query-string"
import { CircularProgress } from "@mui/material"
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

  blue: "#1a3f6c",
  blue2: "#539acd",

  palette: {
    primary: {
      main: "#1a3f6c",
      secondary: "#539acd",
    },
    // Добавь другие цвета по необходимости
  },
})
import axios from "axios"

export const CartContext = createContext()

export function App() {
  const location = useLocation()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)

  const { t } = useTranslation()
  const [language, setLanguage] = useLocalStorage("language", "ru")
  const [queryId, setQueryId] = useState(tele.initDataUnsafe?.query_id)
  const [user, setUser] = useState(tele.initDataUnsafe?.user)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [comment, setComment] = useState("")
  const [address, setAddress] = useState("")
  const [telephone, setTelephone] = useState("")
  const [optionDelivery, setOptionDelivery] = useState("on_site")
  const [paymentMethod, setPaymentMethod] = useState("")
  // const [restaurant_id, setRestaurantId] = useState("")

  // i18n.changeLanguage(language)
  const navigate = useNavigate()

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [cartItems])

  useEffect(() => {
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onBackButtonClicked])

  const getDishes = async (restaurant_id) => {
    // const query = queryString.parse(location.search)
    // console.log('query222', query)
    // console.log('query.restaurant_id2222', query.restaurant_id)
    // const restaurant_id = query.restaurant_id

    // const restaurant_id= query.restaurant_id || "cafecafe"
    // const restaurant_id= 'cafecafe'

    try {
      // const response = await axios.get('https://burgerim.ru/dishes/cafecafe')

      // console.log('url + restaurant_id:>> ', url + '?restaurant_id=' + restaurant)
      // const response = await axios.get(url + '?restaurant_id=' + restaurant)

      const response = await axios.get("https://burgerim.ru/dishes/" + restaurant_id)
      console.log("url + restaurant_id:>> ", "https://burgerim.ru/dishes/" + restaurant_id)

      console.log("response.data", response.data)
      setFoods(response.data)

      console.log('Запрос "getDishes" успешно выполнен')
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getDishes":', error)
      setLoading(false)

      return
    }
  }

  useEffect(() => {
    console.log("tele.initDataUnsafe--->", tele.initDataUnsafe)

    tele.BackButton.hide()
    tele.isClosingConfirmationEnabled = false

    const query = queryString.parse(location.search)
    console.log("query222", query)
    // setRestaurantId(query.restaurant_id)

    getDishes(query.restaurant_id)
  }, [])

  return (
    <CartContext.Provider
      value={{
        foods,
        setFoods,

        cartItems,
        setCartItems,
        queryId,
        setQueryId,
        totalPrice,
        setTotalPrice,
        comment,
        setComment,
        address,
        setAddress,
        telephone,
        setTelephone,
        optionDelivery,
        setOptionDelivery,
        user,
        setUser,
        paymentMethod,
        setPaymentMethod,
        // restaurant_id,
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <br />

          <Header />

          {loading ? (
            <div id="fullscreen-overlay">
              <CircularProgress size={64} color="primary" sx={{ marginRight: "1rem" }} />
            </div>
          ) : (
            <Routes>
              <Route path={"/"} element={<ProductsPage />} />
              {/* <Route index element={<ProductsPage />} /> */}
              <Route path={"order"} element={<OrderPage />} />
              {/* <Route path={"order/:restaurant_name"} element={<OrderPage />} /> */}
              <Route path={"checkout"} element={<CheckoutPage />} />
              <Route path={"payments"} element={<Payments />} />
              <Route path={"creditCard"} element={<CreditCard />} />
              <Route path={"product"} element={<Product />} />

              <Route path={"form"} element={<Form />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </CartContext.Provider>
  )
}
