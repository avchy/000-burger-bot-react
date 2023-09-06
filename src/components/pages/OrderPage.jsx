import { useState, useCallback, useEffect, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "../../App.scss"
import { BigButton } from "components/styled/BigButton"
import { CardRow } from "components/styled/CardRow"
import { useTelegram } from "hooks/useTelegram"
import { useNavigator } from "hooks/useNavigator"
const tele = window.Telegram.WebApp
import { CartContext } from "App"

import { useTranslation } from "react-i18next"

const { getData } = require("../../db/db")
const products = getData()

export const OrderPage = () => {
  const { t, i18n } = useTranslation()

  // const { tele } = useTelegram()
  const navigate = useNavigate()
  const { env } = useNavigator()

  // const location = useLocation()
  //  const cartItems = location.state.cartItems
  const { cartItems, setCartItems } = useContext(CartContext)
  const [comment, setComment] = useState("")

  useEffect(() => {
    tele.ready()
  })

  useEffect(() => {
    tele.MainButton.text = t("CHECKOUT")
    tele.BackButton.text = t("Edit")
    tele.BackButton.show()
    console.log("cartItems", cartItems)
  }, [])

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  function calculateTotalPrice(products, order) {
    let totalPrice = 0

    for (const item of order) {
      const product = products.find((p) => p.id === item.id)
      if (product) {
        totalPrice += product.price * item.quantity

        if (item?.selectedToppings) {
          for (const topping of item.selectedToppings) {
            const toppingData = product.toppings.find(
              (t) => t.title === topping
            )
            if (toppingData) {
              totalPrice += toppingData.price * item.quantity
            }
          }
        }
      }
    }

    return totalPrice
  }

  const totalPrice = calculateTotalPrice(products, cartItems)

  const onSubmit = useCallback(() => {
    navigate("/checkout", { state: { cartItems, comment, totalPrice } })
  }, [cartItems, comment])

  const onBackButtonClicked = useCallback(() => {
    navigate("/", { state: { cartItems, comment, totalPrice } })
  }, [cartItems])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  const styles = {
    overflow: "hidden",
    overflowWrap: "break-word",
    height: "46px",
  }

  const isEmptyCart = cartItems.length === 0

  return (
    <div className="orderPage">
      <div className="orderHeaderEdit">
        <h1 className="title">{t("Your Order")}</h1>
        <Link
          onClick={(e) => {
            e.preventDefault()
            navigate("/", { state: { cartItems, comment, totalPrice } })
          }}
          title="Edit"
          className="navLinkEdit"
        >
          {t("Edit")}
        </Link>
      </div>

      <div className="cardsContainer">
        {cartItems.map((food) => {
          return <CardRow food={food} key={food.id} />
        })}
      </div>

      <div className="cafe-text-field-wrap">
        <input
          className="cafe-text-field js-order-comment-field cafe-block"
          rows="1"
          placeholder={t("Add comment")}
          style={styles}
          type="text"
          value={comment}
          onChange={handleChange}
        />

        <div className="cafe-text-field-hint">
          {t("Any special requests, details, final wishes etc.")}
        </div>
      </div>

      {env == "browser" && (
        <BigButton
          title={`${!isEmptyCart ? `Buy ${totalPrice} ₪` : ""} `}
          disable={isEmptyCart ? true : false}
          onClick={onSubmit}
        />
      )}
    </div>
  )
}
