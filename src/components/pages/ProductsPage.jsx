import { useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { CardColumn } from "components/styled/CardColumn"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import { StyledButton } from "components/styled/StyledButton"

const { getData } = require("db/db")
const foods = getData()
const tele = window.Telegram.WebApp

export const ProductsPage = () => {
  const { t, i18n } = useTranslation()

  // const changeLanguage = (language) => {
  //   i18n.changeLanguage(language)
  // }

  const { env } = useNavigator()
  const location = useLocation()
   const [cartItems, setCartItems] = useState(location?.state?.cartItems || [])
  const navigate = useNavigate()

  useEffect(() => {
    tele.ready()
  })

  const onAdd = (food) => {
    if (food.length === 0) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }

    const exist = cartItems.find((x) => x.id === food.id)
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }])
    }
    // console.log('cartItems :>> ', cartItems)
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
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      )
    }
  }

  const onSubmit = useCallback(() => {
    console.log("onSubmit = useCallback :>> ")
    console.log("cartItems111111 :>> ", cartItems)
    navigate("/order", { state: { cartItems } })
  }, [cartItems])

  const onBackButtonClicked = useCallback(() => {
    navigate("/", { state: { cartItems } })
  }, [cartItems])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  useEffect(() => {
    tele.BackButton.hide()
    tele.MainButton.text = "VIEW ORDER"
    // tele.enableClosingConfirmation()
  }, [])

  return (
    <>
 
      <div className="productsPage">
        <h1 className="title">{t("Burger Shop")}</h1>
        <div className="cards_container">
          {foods.map((food) => {
            const cartItemWithQuantity = cartItems.find(
              (item) => item.id === food.id
            )
            const quantity = cartItemWithQuantity
              ? cartItemWithQuantity.quantity
              : 0
            return (
              <CardColumn
                food={food}
                key={food.id}
                onAdd={onAdd}
                onRemove={onRemove}
                quantity={quantity}
              />
            )
          })}
        </div>
        {cartItems.length !== 0 && env == "browser" && (
          <BigButton
            title={`Order`}
            disable={cartItems.length === 0 ? true : false}
            onClick={onSubmit}
          />
          // <StyledButton
          //   title={`Order`}
          //   disable={cartItems.length === 0 ? true : false}
          //   onClick={onSubmit}
          // />
          
         
        )}
      </div>
    </>
  )
}
