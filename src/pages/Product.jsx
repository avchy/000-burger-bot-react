const tele = window.Telegram.WebApp
import { useState, useCallback, useEffect, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import "App.scss"
import { ButtonCounter } from "components/ButtonCounter"
import { BigButton } from "components/BigButton"
import { useNavigator } from "hooks/useNavigator"
import { useTranslation } from "react-i18next"
import Avatar from "@mui/material/Avatar"
import { Box, Typography } from "@mui/material"
import { cloudinaryURL } from "constants/api"
import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg"
import isPhotoUrl from "helpers/isPhotoUrl"

import { FlexRowContainer } from "components/AllHelpComponents"
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
  const [selectedToppings, setSelectedToppings] = useState(
    exist?.selectedToppings || []
  )

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
    console.log("selectedToppings", selectedToppings)
    const exist = cartItems.find((x) => x.id === food.id)
    setCartItems(
      cartItems.map((x) =>
        x.id === food.id ? { ...exist, selectedToppings } : x
      )
    )

    navigate("/")
  }, [cartItems, selectedToppings])

  const onCancel = useCallback(() => {
    const exist = cartItems.find((x) => x.id === food.id)
    setCartItems(
      cartItems.map((x) => (x.id === food.id ? { ...exist, quantity: 0 } : x))
    )

    navigate("/")
  }, [cartItems])

  //=================================================

  const onBackButtonClicked = useCallback(() => {
    // navigate("/", { state: { cartItems } })
    setCartItems(cartItems.filter((x) => x.id !== food.id))

    navigate("/")
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
    tele.BackButton.show()
    tele.MainButton.show()
    //  tele.isClosingConfirmationEnabled = false
  }, [])

  useEffect(() => {
    tele.MainButton.text = t("confirm")
  })

  //====================================================

  const toggleTopping = (title) => {
    const exist = cartItems.find((x) => x.id === food.id)

    if (exist) {
      // Create a copy of the toppings array with updated counts
      const updatedToppings = exist.toppings.map((topping) => {
        if (topping.title === title) {
          return { ...topping, count: topping.count === 0 ? 1 : 0 }
        }
        return topping
      })

      console.log("updatedToppings", updatedToppings)

      // Update the item in the cart with the updated toppings
      const updatedCartItems = cartItems.map((item) =>
        item.id === exist.id ? { ...exist, toppings: updatedToppings } : item
      )

      // Update the cart items state
      setCartItems(updatedCartItems)
    }

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
          {t(food.title)}
        </Typography>

        <ButtonCounter
          onAdd={onAdd}
          onRemove={onRemove}
          quantity={quantityItem}
        />

        <Box className="orderContainer">
          <Box className="imageContainer">
            <img
              src={isPhotoUrl(food.image) ? cloudinaryURL +food.image : default_dish_img}
 
              alt={"orderImg"}
            />
          </Box>

          <Box className="textContainer">
            <Box className="text1"> {t(food.description)} </Box>
          </Box>
        </Box>

        {/* Toppings __________________________________________ */}

        <Typography
          sx={{ p: 2, fontSize: "calc(0.5em + 2vw)", fontWeight: 700 }}
        >
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
                margin: "10px",
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
                  src={
                    isPhotoUrl(topping.image) ? topping.image : default_dish_img
                  }
                  sx={{ width: 66, height: 66 }}
                />
              </Box>
              <Typography sx={{ m: 1 }}>
                {t(topping.title)}
                {topping.price !== 0 ? `${topping.price}₪` : ""}
              </Typography>
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
