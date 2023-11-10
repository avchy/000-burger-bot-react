import "App.scss"
import { useState, useEffect, useCallback, useContext } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  Box,
} from "@mui/material"

import { BigButton } from "components/BigButton"
import { StyledTextField } from "components/StyledTextField"
import { CardRowSmall } from "components/CardRowSmall"
import orderImg from "images/orderImg.png"
import { useNavigator } from "hooks/useNavigator"
import { CartContext } from "App"
import { useTranslation } from "react-i18next"

export function CheckoutPage() {
  const tele = window.Telegram.WebApp
  const { t, i18n } = useTranslation()
  const { env } = useNavigator()
  const { cartItems, setCartItems } = useContext(CartContext)
  const { comment, setComment } = useContext(CartContext)
  const { totalPrice, setTotalPrice } = useContext(CartContext)
  const { queryId, setQueryId } = useContext(CartContext)
  const { optionDelivery, setOptionDelivery } = useContext(CartContext)
  const { address, setAddress } = useContext(CartContext)
  const { telephone, setTelephone } = useContext(CartContext)

  // useEffect(() => {
  //   const user = tele.initDataUnsafe?.user
  //   const queryIdTemp = tele.initDataUnsafe?.query_id

  //   console.log('user', user)
  //   console.log('queryIdTemp', queryIdTemp)
  //   console.log('window.Telegram.WebApp.initDataUnsafe?.query_id', window.Telegram.WebApp.initDataUnsafe?.query_id)

  //   setQueryId(queryIdTemp)
  //  }, [])

  // const comment = location?.state?.comment

  // const totalPrice = location?.state?.totalPrice
  // const totalPriceWithDiscount = (totalPrice * (1 - discount)).toFixed(2)

  const navigate = useNavigate()

  // const onBackButtonClicked = useCallback(() => {
  //   navigate(-1)
  // }, [cartItems])

  // tele.BackButton.onClick(onBackButtonClicked)

  const onSubmit = useCallback(() => {
    navigate("/payments")
  }, [cartItems, comment])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    // tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      // tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  useEffect(() => {
    if (optionDelivery == "delivery" && !address) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }
  }, [address])

  const onChangeAddress = (e) => {
    setAddress(e.target.value)
  }
  const onChangeTelephone = (e) => {
    setTelephone(e.target.value)
  }

  const onChangeOption = (e) => {
    setOptionDelivery(e.target.value)
  }

  // useEffect(() => {
  //   window.scrollTo({
  //     top: document.body.scrollHeight,
  //     behavior: "smooth",
  //   })
  // }, [optionDelivery])

  useEffect(() => {
    tele.BackButton.show()
    tele.MainButton.setParams({ text: t("PAY") })
  }, [])

  const currentTimestamp = Math.floor(Date.now() / 1000)
  return (
    <>
      <div className="checkoutPage">
        <h1 className="title">{t("Checkout")}</h1>
        <div className="orderContainer">
          <div className="imageContainer">
            <img src={orderImg} alt={"orderImg"} />
          </div>

          <div className="textContainer">
            <div className="text1">
              {" "}
              {t("Order")} № {currentTimestamp}
            </div>
            <div className="text1">
              {" "}
              {t("Perfect lunch from Falafel Shop.")}
            </div>
            {/* <div className="text_small">{`${discount}% ${t("discount")}`}</div> */}
          </div>
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="cardsContainer">
            {cartItems.map((food) => {
              return <CardRowSmall food={food} key={food.id} />
            })}
          </div>
        )}

        {/* <CardRowSmall
          key={9999}
          food={{ id: 9999, title: t("Free delivery"), textColor: "#4AF2A1" }}
        /> */}
        {/* <CardRowSmall
          key={9998}
          food={{
            id: 9998,
            title: t("Discount"),
            price: (totalPrice * discount).toFixed(2),
            textColor: "#4AF2A1",
          }}
        /> */}
        <CardRowSmall
          key={9997}
          food={{
            id: 9997,
            title: t("Total Price:"),
            price: totalPrice,
            // price: totalPriceWithDiscount,
          }}
        />
      </div>

      <div className="comment_container">
        <div className="title_mini"> {t("Your Comment :")} </div>
        <div className="text_small">{comment ? comment : "__no comment__"}</div>
      </div>

      <div className="form">
        <div className="title_mini" style={{ color: "white" }}>
          {t("Choose where you eat")}
        </div>

        <FormControl
          className="select"
          style={{ borderColor: "white", color: "white" }}
        >
          <InputLabel style={{ borderColor: "white", color: "white" }}>
            {t("Select Delivery Option")}
          </InputLabel>
          <Select
            value={optionDelivery}
            onChange={onChangeOption}
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255, 255, 255)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255, 255, 255)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgb(255, 255, 255)",
              },
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            labelId="select-filter-by-field-labe;"
            id="select-filter-by-field"
          >
            <MenuItem value="on_site">{t("On Site")}</MenuItem>
            <MenuItem value="take_away">{t("Take Away")}</MenuItem>
            <MenuItem value="delivery">{t("Delivery")}</MenuItem>
          </Select>
        </FormControl>

        {optionDelivery === "delivery" && (
          <Box>
            <StyledTextField
              label={t("Address")}
              value={address}
              onChange={onChangeAddress}
              placeholder={t("Enter address")}
            />
            <StyledTextField
              label={t("Telephone")}
              value={telephone}
              onChange={onChangeTelephone}
              placeholder={t("Enter Telephone")}
            />
          </Box>
        )}
      </div>

      {env === "browser" && (
        <BigButton
          title={t("Payments")}
          type={"payments"}
          disable={cartItems.length === 0 ? true : false}
          onClick={onSubmit}
        />
      )}

      {/* {env === "browser" &&
        (optionDelivery === "on_site" ||
          (optionDelivery === "take_away" && address)) && (
          <BigButton
            title={t("Payments")}
            type={"payments"}
            disable={cartItems.length === 0 ? true : false}
            onClick={onSubmit}
          />
        )} */}
    </>
  )
}
