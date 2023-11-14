import { useContext, useState, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import 'App.scss'
import { CardColumn } from 'components/CardColumn'
import { BigButton } from 'components/BigButton'
import { useNavigator } from 'hooks/useNavigator'
import { useTranslation } from 'react-i18next'
import { StyledButton } from 'components/StyledButton'
import { FlexColumnContainer } from 'components/AllHelpComponents'
import { CartContext } from 'App'
import axios from 'axios'
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Paper,
  Typography,
} from '@mui/material'
// const { getData } = require("db/db")
// const foods = getData()
const tele = window.Telegram.WebApp
import queryString from 'query-string'

import { Cloudinary } from '@cloudinary/url-gen'
import { AdvancedImage } from '@cloudinary/react'

export const ProductsPage = () => {
  // const cld = new Cloudinary({cloud: {cloudName: 'dvb3cxb9h'}});
  // const myImage = new CloudinaryImage('sample', {cloudName: 'your-cloud-name'}).resize(fill().width(100).height(150));
  // <AdvancedImage cldImg={myImage} />
  const location = useLocation()

  const { t, i18n } = useTranslation()
  const [loading, setLoading] = useState(true)

  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language)
  // }

  const { env } = useNavigator()
  const [foods, setFoods] = useState([])
  const navigate = useNavigate()

  const { cartItems, setCartItems } = useContext(CartContext)
  // const { query_id, setQueryId } = useContext(CartContext)

  useEffect(() => {
    tele.ready()
  })

  const getMenu = async () => {
    const query = queryString.parse(location.search)
    console.log('query222', query)
    console.log('query.restaurant_name2222', query.restaurant_name)
    const url = 'https://burgerim.ru/menu/'
    const restaurant = query.restaurant_name
    // const restaurant = query.restaurant_name || "cafecafe"
    // const restaurant = 'cafecafe'

    try {
      // const response = await axios.get('https://burgerim.ru/menu/cafecafe')

      // console.log('url + restaurant :>> ', url + '?restaurant_name=' + restaurant)
      // const response = await axios.get(url + '?restaurant_name=' + restaurant)

      const response = await axios.get(url + restaurant)
      console.log('url + restaurant :>> ', url + restaurant)

      console.log('response.data', response.data)
      setFoods(response.data)

      console.log('Запрос "getMenu" успешно выполнен')
      setLoading(false)
    } catch (error) {
      console.error('Ошибка при выполнении запроса "getMenu":', error)
      setLoading(false)

      return
    }
  }
  useEffect(() => {
    tele.BackButton.hide()
    getMenu()
    // tele.MainButton.text = t("VIEW ORDER")
    // tele.isClosingConfirmationEnabled = false
  }, [])
  // useEffect(() => {
  //   setQueryId(tele.initDataUnsafe?.query_id || 0)
  // }, [])

  const onAdd = (food) => {
    if (food.length === 0) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }

    const exist = cartItems.find((x) => x.id === food.id)
    if (exist) {
      setCartItems(cartItems.map((x) => (x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x)))
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }])
    }
  }

  const onRemove = (food) => {
    if (food.length === 0) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }

    const exist = cartItems.find((x) => x.id === food.id)
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x.id !== food.id))
    } else {
      setCartItems(cartItems.map((x) => (x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x)))
    }
  }

  const onSubmit = useCallback(() => {
    navigate('/order')
  }, [cartItems])

  useEffect(() => {
    tele.onEvent('mainButtonClicked', onSubmit)

    return () => {
      tele.offEvent('mainButtonClicked', onSubmit)
    }
  }, [onSubmit])

  useEffect(() => {
    tele.MainButton.text = t('VIEW ORDER')
  })

  useEffect(() => {
    if (cartItems.length === 0) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }
  }, [cartItems])

  return (
    <>
      {loading ? (
        <div id='fullscreen-overlay'>
          <CircularProgress size={64} color='primary' sx={{ marginRight: '1rem' }} />
        </div>
      ) : (
        <div className='productsPage'>
          {/* <h1 className="title">{t("Falafel Shop")}</h1> */}
          <div className='cards_container'>
            {foods.map((food) => {
              const foodWithQuantity = cartItems.find((item) => item.id === food.id)
              const quantity = foodWithQuantity ? foodWithQuantity.quantity : 0
              return <CardColumn food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} quantity={quantity} />
            })}
          </div>
          {cartItems.length !== 0 && env == 'browser' && (
            <BigButton title={t('Order')} disable={cartItems.length === 0 ? true : false} onClick={onSubmit} />
            // <StyledButton
            //   title={`Order`}
            //   disable={cartItems.length === 0 ? true : false}
            //   onClick={onSubmit}
            // />
          )}
        </div>
      )}
    </>
  )
}
