import { useContext, useState, useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "App.scss"
import { CardColumn } from "components/CardColumn"
import { BigButton } from "components/BigButton"
import { useNavigator } from "hooks/useNavigator"

import { useTranslation } from "react-i18next"
import i18n from "helpers/i18n"
import { CartContext } from "App"
import { Box } from "@mui/material"
const tele = window.Telegram.WebApp

export const ProductsPage = () => {
  const { t } = useTranslation()
  const { env } = useNavigator()
  const navigate = useNavigate()
  const { cartItems, setCartItems, foods } = useContext(CartContext)

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
    navigate("/order")
  }, [cartItems])

  useEffect(() => {
    tele.ready()
    tele.MainButton.text = t("VIEW ORDER")
  })

  useEffect(() => {
    tele.BackButton.hide()
    // tele.isClosingConfirmationEnabled = false
  }, [])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
    }
  }, [onSubmit])

  useEffect(() => {
    if (cartItems.length === 0) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }
  }, [cartItems])

  const flexStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  }

  return (
    <>
      <Box sx={flexStyle}>
        <Box sx={flexStyle}>
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
        </Box>
        {cartItems.length !== 0 && env === "browser" && (
          <BigButton
            disable={cartItems.length === 0 ? true : false}
            onClick={onSubmit}
          >
            {t("Order")}
          </BigButton>
        )}
      </Box>
    </>

    // <>
    // 	<div className="productsPage">
    // 		{/* <h1 className="title">{t("Falafel Shop")}</h1> */}
    // 		<div className="cards_container">
    // 			{foods.map((food) => {
    // 				const foodWithQuantity = cartItems.find((item) => item.id === food.id);
    // 				const quantity = foodWithQuantity ? foodWithQuantity.quantity : 0;
    // 				return (
    // 					<CardColumn
    // 						food={food}
    // 						key={food.id}
    // 						onAdd={onAdd}
    // 						onRemove={onRemove}
    // 						quantity={quantity}
    // 					/>
    // 				);
    // 			})}
    // 		</div>
    // 		{cartItems.length !== 0 && env == "browser" && (
    // 			<BigButton
    // 				title={t("Order")}
    // 				disable={cartItems.length === 0 ? true : false}
    // 				onClick={onSubmit}
    // 			/>
    // 		)}
    // 	</div>
    // </>
  )
}
