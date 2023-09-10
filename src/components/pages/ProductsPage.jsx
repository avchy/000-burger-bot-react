import { useContext, useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { CardColumn } from "components/styled/CardColumn"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import { StyledButton } from "components/styled/StyledButton"
import { CartContext } from "App"

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
  // const [cartItems, setCartItems] = useState(location?.state?.cartItems || [])
  const navigate = useNavigate()

  const { cartItems, setCartItems } = useContext(CartContext)
  // const { query_id, setQueryId } = useContext(CartContext)

  useEffect(() => {
    tele.ready()
  })

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
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
        )
      )
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
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      )
    }
  }

  const onSubmit = useCallback(() => {
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
    tele.MainButton.text = t("VIEW ORDER")
    tele.isClosingConfirmationEnabled = false
  }, [])

  useEffect(() => {
    tele.MainButton.text = t("VIEW ORDER")
  })

  return (
    <>
      <div className="productsPage">
        <h1 className="title">{t("Falafel Shop")}</h1>
        <div className="cards_container">
          {foods.map((food) => {
            const foodWithQuantity = cartItems.find(
              (item) => item.id === food.id
            )
            const quantity = foodWithQuantity ? foodWithQuantity.quantity : 0
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
            title={t("Order")}
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
