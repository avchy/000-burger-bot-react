import { useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { ButtonCounter } from "components/styled/ButtonCounter"
import { Topping } from "components/styled/Topping"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import Avatar from "@mui/material/Avatar"

const { getData } = require("db/db")
const foods = getData()

const tele = window.Telegram.WebApp

import {
  FlexRowContainer,
  StyledTextField,
} from "components/styled/AllHelpComponents"

export const Product = () => {
  const { t, i18n } = useTranslation()

  const { env } = useNavigator()
  const location = useLocation()
  const [food, setFood] = useState(location?.state?.food || {})
  console.log("food1111", food)
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

  const onCancel = useCallback(() => {
    console.log("onCancel = useCallback :>> ")
    console.log("cartItems111111 :>> ", cartItems)
    navigate("/", { state: { cartItems } })
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
    console.log("-----useEffect []")
  }, [])

  useEffect(() => {
    console.log("-----useEffect{},")
    tele.MainButton.text = t("VIEW ORDER")
  })

  //====================================================

  const [selectedToppings, setSelectedToppings] = useState([])

  const toggleTopping = (title) => {
    const isToppingSelected = selectedToppings.includes(title)
    if (isToppingSelected) {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping !== title)
      )
    } else {
      setSelectedToppings([...selectedToppings, title])
    }
  }

  const handleKeyPress = (event, title) => {
    if (event.key === "Enter") {
      toggleTopping(title)
    }
  }

  return (
    <>
      <div className="productsPage">
        <h1 className="title">{food.title}</h1>
        {/* <h1 className="title">{t("Burger Shop")}</h1> */}

        <ButtonCounter
          onAdd={onAdd}
          onRemove={onRemove}
          quantity={food.quantity}
        />

        <div className="imageContainer">
          <img src={food.image} alt={"orderImg"} />
        </div>

        <div className="textContainer">
          <div className="text1">{food.description}</div>
        </div>
      </div>

      {/* {food.toppings.map((topping) => {
        return <Topping topping={topping} key={topping.id} />
      })} */}

      <div>
        {food.toppings.map((topping) => (
          <div
            key={topping.title}
            role="button"
            tabIndex={0}
            onClick={() => toggleTopping(topping.title)}
            onKeyPress={(event) => handleKeyPress(event, topping.title)}
            style={{ display: "inline-block", margin: "10px" }}
          >
            

            <div
              className={`topping-circle ${
                selectedToppings.includes(topping.title) ? "selected" : ""
              }`}
            >
              <Avatar
                alt={topping.title}
                src={topping.image}
                sx={{ width: 66, height: 66 }}
              />
            </div>
            {topping.title}
          </div>
        ))}
        <style>
          {`
          .topping-circle {
            width: 100px;
            height: 100px;
            background-color: #ffe1e1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .topping-circle.selected {
            border: 4px solid orange;
          }
        `}
        </style>
      </div>

      {env == "browser" && (
        <FlexRowContainer>
          <BigButton title={`Order`} onClick={onSubmit} />

          <BigButton title={`Cancel`} onClick={onCancel} />
        </FlexRowContainer>
      )}
    </>
  )
}
