import { useState, useCallback, useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { ButtonCounter } from "components/styled/ButtonCounter"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import Avatar from "@mui/material/Avatar"

import { Box, Typography } from "@mui/material"

const tele = window.Telegram.WebApp

import {
  FlexRowContainer,
  StyledTextField,
} from "components/styled/AllHelpComponents"
import { CartContext } from "App"
import { useContext } from "react"

export const Product = () => {
  const { t, i18n } = useTranslation()

  const { env } = useNavigator()
  const navigate = useNavigate()
  const location = useLocation()

  const { cartItems, setCartItems } = useContext(CartContext)
  const food = location?.state?.food

  useEffect(() => {
    tele.ready()
  })

  useEffect(() => {
    const exist = cartItems.find((x) => x.id === food.id)
    console.log("exist", exist)
    console.log("food", food)
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity } : x
        )
      )
    } else {
      setCartItems([...cartItems, { ...food, quantity: 1 }])
    }

    console.log("cartItems", cartItems)
  }, [])

  // const foodInCart = cartItems.find(
  //   (item) => item.id === food.id
  // )

  const onAdd = () => {
    // if (foodInCart.length === 0) {
    //   tele.MainButton.hide()
    // } else {
    //   tele.MainButton.show()
    // }

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

  const onRemove = () => {
    // if (food.length === 0) {
    //   tele.MainButton.hide()
    // } else {
    //   tele.MainButton.show()
    // }

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

  //=================================================

  const onSubmit = useCallback(() => {
    navigate("/")
  }, [cartItems])

  const onCancel = useCallback(() => {
    const exist = cartItems.find((x) => x.id === food.id)
    setCartItems(
      cartItems.map((x) => (x.id === food.id ? { ...exist, quantity: 0 } : x))
    )

    navigate("/")
  }, [cartItems])

  //=================================================

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

  const foodWithQuantity = cartItems.find((item) => item.id === food.id)
  const quantity = foodWithQuantity ? foodWithQuantity.quantity : 0

  return (
    <>
      <Box className="checkoutPage">
        {/* <h1 className="title">{food.title}</h1> */}

        <Typography
          sx={{ p: 2, textAlign: "center", fontSize: "calc(1.5em + 2vw)" }}
        >
          {" "}
          {food.title}{" "}
        </Typography>

        <ButtonCounter onAdd={onAdd} onRemove={onRemove} quantity={quantity} />

        <Box className="orderContainer">
          <Box className="imageContainer">
            <img src={food.image} alt={"orderImg"} />
          </Box>

          <Box className="textContainer">
            <Box className="text1">{food.description}</Box>
          </Box>
        </Box>

        {/* toppings_free_____________________ */}

        <Typography sx={{ p: 2, fontSize: "calc(0.5em + 2vw)" }}>
          {" "}
          {t("toppings_free")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {food.toppings.map((topping) => (
            <Box
              sx={{
                width: "100px",
                textAlign: "center",
              }}
              key={topping.title}
              role="button"
              tabIndex={0}
              onClick={() => toggleTopping(topping.title)}
              onKeyPress={(event) => handleKeyPress(event, topping.title)}
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

        <Typography sx={{ p: 2, fontSize: "calc(0.5em + 2vw)" }}>
          {t("toppings_paid")} 3 ₪{" "}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {food.paidToppings.map((topping) => (
            <Box
              sx={{
                width: "100px",
                textAlign: "center",
              }}
              key={topping.title}
              role="button"
              tabIndex={0}
              onClick={() => toggleTopping(topping.title)}
              onKeyPress={(event) => handleKeyPress(event, topping.title)}
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
              title={t("confirm")}
              onClick={onSubmit}
              backgroundColor={"#e0c521"}
            />
          </FlexRowContainer>
        )}
      </Box>
    </>
  )
}
