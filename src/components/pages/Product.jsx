import { useState, useCallback, useEffect, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "../../App.scss"
import { ButtonCounter } from "components/styled/ButtonCounter"
import { BigButton } from "components/styled/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import Avatar from "@mui/material/Avatar"

import { Box, Typography } from "@mui/material"

const tele = window.Telegram.WebApp

import { FlexRowContainer } from "components/styled/AllHelpComponents"
import { CartContext } from "App"

export const Product = () => {
  const { t, i18n } = useTranslation()
  const { env } = useNavigator()
  const navigate = useNavigate()
  const location = useLocation()
  const { cartItems, setCartItems } = useContext(CartContext)

  const food = location?.state?.food
  const exist = cartItems.find((x) => x.id === food.id)

  const [quantityItem, setQuantityItem] = useState(exist?.quantity || 1)
  const [selectedToppings, setSelectedToppings] = useState([])

  useEffect(() => {
    tele.ready()
  })

  useEffect(() => {
    const exist = cartItems.find((x) => x.id === food.id)
    console.log("exist", exist)
    console.log("food", food)
    if (exist) {
      console.log("  exist111")

      setCartItems(
        cartItems.map((x) =>
          x.id === food.id ? { ...exist, quantity: exist.quantity } : x
        )
      )
      // setQuantityItem(exist.quantity)
    } else {
      console.log("no exist111")
      setCartItems([...cartItems, { ...food, quantity: 1 }])
      // setQuantityItem(1)
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

  const toggleTopping = (title) => {
    console.log('cartItems222', cartItems)
    const isToppingSelected = selectedToppings.includes(title)
    if (isToppingSelected) {
      setSelectedToppings(
        selectedToppings.filter((topping) => topping !== title)
      )
    } else {
      setSelectedToppings([...selectedToppings, title])
    }
  }

  return (
    <>
      <Box className="checkoutPage">
        <Typography
          sx={{ p: 2, textAlign: "center", fontSize: "calc(1.5em + 2vw)" }}
        >
          {food.title}{" "}
        </Typography>

        <ButtonCounter
          onAdd={onAdd}
          onRemove={onRemove}
          quantity={quantityItem}
        />

        <Box className="orderContainer">
          <Box className="imageContainer">
            <img src={food.image} alt={"orderImg"} />
          </Box>

          <Box className="textContainer">
            <Box className="text1">{food.description}</Box>
          </Box>
        </Box>

        {/* toppings __________________________________________ */}

        <Typography sx={{ p: 2, fontSize: "calc(0.5em + 2vw)",fontWeight:700 }}>
          {" "}
          {t("toppings")}
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
              <Typography sx={{ m: 1 }}> {t(topping.title)} {topping.price !==0 ? `${topping.price}₪` : ""} </Typography>
            </Box>
          ))}
        </Box>

        {/* toppings_paid __________________________________________ */}
 

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
