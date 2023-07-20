import { useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"

import "../../App.scss"
import { BigButton } from "components/styled/BigButton"
import { CardRow } from "components/styled/CardRow"
import { useTelegram } from "hooks/useTelegram"
import { useNavigator } from "hooks/useNavigator"
const tele = window.Telegram.WebApp
tele.BackButton.show()

export const OrderPage = () => {
  // const { tele } = useTelegram()
  const navigate = useNavigate()
  const { env } = useNavigator()

  tele.enableClosingConfirmation()

  tele.MainButton.text = "CHECKOUT"
  const location = useLocation()
  console.log("location.state111", location.state)
  const cartItems = location.state.cartItems

  const [comment, setComment] = useState("")

  useEffect(() => {
    tele.ready()
  })
  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const totalPrice = cartItems
    .reduce((a, c) => a + c.price * c.quantity, 0)
    .toFixed(2)
    .toString()

  const onSubmit = useCallback(() => {
    navigate("/checkout", { state: { cartItems, comment, totalPrice } })
  }, [cartItems, comment])

  const onBackButtonClicked = useCallback(() => {
    // navigate(-1)
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
        <h1 className="title">Your Order </h1>
        <Link
          // to="/"
          onClick={(e) => {
            e.preventDefault()
            // navigate("/")
            navigate("/", { state: { cartItems, comment, totalPrice } })
          }}
          Ï
          title="Edit"
          className="navLinkEdit"
        >
          Edit
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
          placeholder="Add comment…"
          style={styles}
          type="text"
          value={comment}
          onChange={handleChange}
        />

        <div className="cafe-text-field-hint">
          Any special requests, details, final wishes etc.
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
