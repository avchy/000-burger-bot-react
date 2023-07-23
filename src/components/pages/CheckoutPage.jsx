import { useState, useEffect, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
} from "@mui/material"

import "../../App.scss"
import { serverIP, port } from "constants/api.js"
import { BigButton } from "components/styled/BigButton"
import { CardRowSmall } from "components/styled/CardRowSmall"
import { useTelegram } from "hooks/useTelegram"
import orderImg from "../../images/orderImg.png"
import { useNavigator } from "hooks/useNavigator"
import axios from "axios"
import { StyledButton } from "components/styled/StyledButton"
import { discount } from "constants/constants"

const tele = window.Telegram.WebApp

export function CheckoutPage() {
  const { env } = useNavigator()

  const [address, setAddress] = useState("")
  const [tempError, setTempError] = useState("---")
  const [tempData, setTempData] = useState({})
  const [optionDelivery, setOptionDelivery] = useState("on_site")

  const query_id = window.Telegram.WebApp.initDataUnsafe?.query_id

  const location = useLocation()
  const cartItems = location?.state?.cartItems || []
  const comment = location?.state?.comment
  console.log("location?.state?", location?.state)

  const totalPrice = location?.state?.totalPrice
  const totalPriceWithDiscount = (totalPrice * (1 - discount)).toFixed(2)

  const navigate = useNavigate()

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [cartItems])

  tele.BackButton.onClick(onBackButtonClicked)

  const onSubmit = useCallback(() => {
    for (let i = 0; i < cartItems.length; i++) {
      delete cartItems[i].Image
    }

    const data = {
      products: cartItems,
      comment: comment,
      address: address,
      totalPrice: totalPriceWithDiscount,
      discount: discount,
    }

    navigate("/payments", { state: data })
  }, [cartItems, comment])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  useEffect(() => {
    if (optionDelivery == "take_away" && !address) {
      tele.MainButton.hide()
    } else {
      tele.MainButton.show()
    }
  }, [address])

  const onChangeAddress = (e) => {
    setAddress(e.target.value)
  }

  const onChangeOption = (e) => {
    setOptionDelivery(e.target.value)
  }

  useEffect(() => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    })
  }, [optionDelivery])

  useEffect(() => {
    tele.BackButton.show()
    tele.MainButton.setParams({ text: "PAY" })
  }, [])

  // const CssTextField = makeStyles({
  //   root: {
  //     "& label.Mui-focused": {
  //       color: "white",
  //     },
  //     "& .MuiInput-underline:after": {
  //       borderBottomColor: "yellow",
  //     },
  //     "& .MuiOutlinedInput-root": {
  //       "& fieldset": {
  //         borderColor: "white",
  //       },
  //       "&:hover fieldset": {
  //         borderColor: "white",
  //       },
  //       "&.Mui-focused fieldset": {
  //         borderColor: "yellow",
  //       },
  //     },
  //   },
  // })(TextField)
  return (
    <>
      {/* <div className="testWindow">
        <p className="testText">{`tempData ${JSON.stringify(
          tempData,
          null,
          2
        )}`}</p>
        <p className="testText">{`tempError ${tempError}`}</p>
      </div> */}

      <div className="checkoutPage">
        <h1 className="title">Checkout</h1>
        <div className="orderContainer">
          <div className="imageContainer">
            <img src={orderImg} alt={"orderImg"} />
          </div>

          <div className="textContainer">
            <div className="text1"> Order № 770770</div>
            <div className="text1"> Perfect lunch from Burger Bot.</div>
            <div className="text_small">{discount}% discount</div>
          </div>
        </div>

        {cartItems && cartItems.length > 0 && (
          <div className="cardsContainer">
            {cartItems.map((food) => {
              return <CardRowSmall food={food} key={food.id} />
            })}
          </div>
        )}

        <CardRowSmall
          key={9999}
          food={{ id: 9999, title: "Free delivery", textColor: "#4AF2A1" }}
        />
        <CardRowSmall
          key={9998}
          food={{
            id: 9998,
            title: "Discount",
            price: (totalPrice * discount).toFixed(2),
            textColor: "#4AF2A1",
          }}
        />
        <CardRowSmall
          key={9997}
          food={{
            id: 9997,
            title: "Total Price:",
            price: totalPriceWithDiscount,
          }}
        />
      </div>

      {comment && (
        <div className="comment_container">
          <div className="title_mini"> Your Comment : </div>
          <div className="text_small">{comment}</div>
        </div>
      )}

      <div className="form">
        <div className="title_mini" style={{ color: "white" }}>
          Choose where you eat
        </div>

        <FormControl
          className="select"
          style={{ borderColor: "white", color: "white" }}
        >
          <InputLabel style={{ borderColor: "white", color: "white" }}>
            Select Delivery Option
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
            <MenuItem value="on_site">On Site</MenuItem>
            <MenuItem value="take_away">Take Away</MenuItem>
          </Select>
        </FormControl>

        {optionDelivery === "take_away" && (
          <TextField
            sx={{
              "& label.Mui-focused": {
                color: "white",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "yellow",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "yellow",
                },
              },
            }}
            className="input"
            type="text"
            label="Address"
            value={address}
            onChange={onChangeAddress}
            placeholder="Enter address"
            InputLabelProps={{
              style: { color: "white" },
            }}
            InputProps={{
              style: { color: "white", borderColor: "white" },
            }}
            inputProps={{ style: { color: "white" } }}
          />
        )}
      </div>

      {console.log("env  :>> ", env)}

      {env === "browser" &&
        (optionDelivery === "on_site" ||
          (optionDelivery === "take_away" && address)) && (
          <BigButton
            title={`${"Payments"} `}
            type={"payments"}
            disable={cartItems.length === 0 ? true : false}
            onClick={onSubmit}
          />
        )}
    </>
  )
}
