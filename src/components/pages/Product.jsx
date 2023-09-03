import { useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { ButtonCounter } from "components/styled/ButtonCounter"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import Avatar from "@mui/material/Avatar"

import { Box, Typography } from "@mui/material"

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
    console.log('food_onAdd', food)
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
    console.log('cartItems_onAdd :>> ', cartItems)
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
     console.log("cartItems111111 :>> ", cartItems)

    // const exist = cartItems.find((x) => x.id === food.id)
    // if (exist) {
    //   setCartItems(
    //     cartItems.map((x) =>
    //       x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x
    //     )
    //   )
    // } else {
    //   setCartItems([...cartItems, { ...food, quantity: 1 }])
    // }

    // console.log("cartItems22222 :>> ", cartItems)
    navigate("/", { state: { cartItems } })
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
      <Box className="checkoutPage">
        <h1 className="title">{food.title}</h1>
        
        <ButtonCounter
          onAdd={onAdd}
          onRemove={onRemove}
          quantity={food.quantity}
        />
        
        <Box className="orderContainer">
          <Box className="imageContainer">
            <img src={food.image} alt={"orderImg"} />
          </Box>

          <Box className="textContainer">
            <Box className="text1">{food.description}</Box>
          </Box>
        </Box>

        <Typography sx={{ m: 1, fontSize:"20px" }}> {t("toppings_free")}</Typography>

  

        <Box>
          {food.toppings.map((topping) => (
            <Box
              key={topping.title}
              role="button"
              tabIndex={0}
              onClick={() => toggleTopping(topping.title)}
              onKeyPress={(event) => handleKeyPress(event, topping.title)}
              style={{ display: "inline-block", margin: "10px" }}
            >
              <Box
                className={`topping-circle ${
                  selectedToppings.includes(topping.title) ? "selected" : ""
                }`}
              >
                <Avatar
                  alt={topping.title}
                  src={topping.image}
                  sx={{ width: 66, height: 66 }}
                />
              </Box>
              <Typography sx={{ m: 1 }}> {t(topping.title)} </Typography>
            </Box>
          ))}
        </Box>

        <Typography sx={{ m: 1, fontSize:"20px" }}> {t("toppings_paid")}  3 ₪ </Typography>

 
        <Box>
          {food.paidToppings.map((topping) => (
            <Box
              key={topping.title}
              role="button"
              tabIndex={0}
              onClick={() => toggleTopping(topping.title)}
              onKeyPress={(event) => handleKeyPress(event, topping.title)}
              style={{ display: "inline-block", margin: "10px" }}
            >
              <Box
                className={`topping-circle ${
                  selectedToppings.includes(topping.title) ? "selected" : ""
                }`}
              >
                <Avatar
                  alt={topping.title}
                  src={topping.image}
                  sx={{ width: 66, height: 66 }}
                />
              </Box>
              <Typography sx={{ m: 1 }}> {t(topping.title)} </Typography>
 
               
            </Box>
          ))}
        </Box>
        
        
        {env == "browser" && (
          <FlexRowContainer>
            <BigButton
               title={t("Cancel")}

              onClick={onCancel}
              backgroundColor={"grey"}
            />

            <BigButton
               title={t("Order")}

              onClick={onSubmit}
              backgroundColor={"#e0c521"}
            />
          </FlexRowContainer>
        )}
      </Box>
    </>
  )
}
