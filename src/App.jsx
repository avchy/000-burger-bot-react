import "App.scss"
import React, { createContext, useState, useEffect, useCallback } from "react"
import { Routes, Route, useNavigate, useLocation } from "react-router-dom"
import { Header } from "components/Header"
import { ProductsPage } from "pages/ProductsPage"
import { Product } from "components/Product"
import { OrderPage } from "pages/OrderPage"
import { Payments } from "pages/Payments"
import { Form } from "components/Form"
import { ThemeProvider } from "@mui/material/styles"
import { useTranslation } from "react-i18next"
import useLocalStorage from "./hooks/use-localstorage"
import queryString from "query-string"
import { CircularProgress } from "@mui/material"
import theme from "./styles/theme"
import axios from "axios"
import { baseURL } from "constants/api"
import { LoadingOverlay } from "components/LoadingOverlay"
const tele = window.Telegram.WebApp
tele.isClosingConfirmationEnabled = "false"

tele.expand() //расширяем на все окно

export const CartContext = createContext()

export function App() {
  const location = useLocation()
  const [foods, setFoods] = useState([])
  const [loading, setLoading] = useState(true)
  const [queryId, setQueryId] = useState(tele.initDataUnsafe?.query_id)
  const [user, setUser] = useState(tele.initDataUnsafe?.user)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [comment, setComment] = useState("")
  const [address, setAddress] = useState("")
  const [telephone, setTelephone] = useState("")
  const [optionDelivery, setOptionDelivery] = useState("on_site")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [settings, setSettings] = useState({})
  const [typesList, setTypesList] = useState([])

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
    const url = baseURL + "/dishes/" + restaurant_id
    // console.log("url :>> ", url);
    try {
      const response = await axios.get(url)

      console.log("getDishes_response.data", response.data)
      setFoods(response.data)

      console.log('Запрос "getDishes" успешно выполнен')
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getDishes":', error)
      setLoading(false)

      return
    }
  }

  const getSettings = async (restaurant_id) => {
    try {
      const response = await axios.get(
        "https://burgerim.ru/settings/" + restaurant_id
      )

      console.log("getSettings-response.data", response.data)
      setSettings(response.data[0])

      console.log('Запрос "getSettings" успешно выполнен')
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getSettings":', error)
      return
    }
  }

  const getTypes = async (restaurant_id) => {
    try {
      const response = await axios.get(`${baseURL}/types/` + restaurant_id)

      console.log("response.data2222 :>> ", response.data)
      setTypesList(response.data)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getTypes":', error)
    }
  }

  useEffect(() => {
    console.log("tele.initDataUnsafe--->", tele.initDataUnsafe)

    tele.BackButton.hide()
    tele.isClosingConfirmationEnabled = false

    const query = queryString.parse(location.search)
    const restaurant_id = query.restaurant_id

    getSettings(restaurant_id)
    getDishes(restaurant_id)
    getTypes(restaurant_id)
  }, [])

  return (
    <CartContext.Provider
      value={{
        typesList,
        setTypesList,
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
        paymentMethod,
        settings,
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <br />

          <Header />

          {loading ? (
            <LoadingOverlay />
          ) : (
            <Routes>
              <Route path={"/"} element={<ProductsPage />} />
              {/* <Route index element={<ProductsPage />} /> */}
              <Route path={"order"} element={<OrderPage />} />
              {/* <Route path={"order/:restaurant_name"} element={<OrderPage />} /> */}
              <Route path={"payments"} element={<Payments />} />
              <Route path={"product"} element={<Product />} />

              <Route path={"form"} element={<Form />} />
            </Routes>
          )}
        </div>
      </ThemeProvider>
    </CartContext.Provider>
  )
}
