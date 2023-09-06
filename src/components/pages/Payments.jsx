import { useState, useEffect, useCallback } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
} from "@mui/material"
import {
  FlexColumnContainer,
  Layout,
} from "components/styled/AllHelpComponents"

import { BigButton } from "components/styled/BigButton"
import { StyledButton } from "components/styled/StyledButton"
import { ReactSVG } from "react-svg"
import applePay from "../../images/icons/applePay.png"
import googlePay from "../../images/icons/googlePay.png"
import appleSVG from "../../images/svg_icons/icons8-apple-logo.svg"
import googleSVG from "../../images/svg_icons/icons8-google.svg"
const tele = window.Telegram.WebApp
import { serverIP } from "constants/api"
import axios from "axios"
import { useTranslation } from "react-i18next"
import { CartContext } from "App"
import { useContext } from "react"

export function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()

  const location = useLocation()
  const state = location?.state
   // const {
  //   queryId,
  //   products,
  //   comment,
  //   totalPrice,
  //   address,
  //   discount,
  //   totalPriceWithDiscount,
  // } = state

  // const { cartItems, comment, totalPrice } = state
  // const data = { cartItems, comment, totalPrice }

  tele.MainButton.hide()
  tele.BackButton.show()

  // const dataPay = {
  //   queryId: queryId,
  //   products: products,
  //   totalPrice: totalPrice,
  //   totalPriceWithDiscount: totalPriceWithDiscount,
  //   comment: comment,
  //   address: address,
  //   discount: discount,
  // }

 
  const onCreditCard = useCallback(() => {
    navigate("/creditCard", { state: { ...state, paymentMethod: "card" } })
  }, [state])

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [state])

  tele.BackButton.onClick(onBackButtonClicked)

  const onApplePay = async () => {
    try {
      const response = await axios.post(serverIP + "/web-data", {
        ...state,
        paymentMethod: "applePay",
      })
      console.log("onApplePay_success")
    } catch (error) {
      console.log("applePay_error", error)
    }
  }

  const onGooglePay = async () => {
    try {
      const response = await axios.post(serverIP + "/web-data", {
        ...state,
        paymentMethod: "googlePay",
      })
      console.log("googlePay_success")
    } catch (error) {
      console.log("googlePay_error", error)
    }
  }

  useEffect(() => {
    tele.MainButton.hide()
  }, [])

  return (
    <>
      <FlexColumnContainer
        sx={{
          pt: "20px",
          backgroundColor: "#404040",
          gap: 2,
          height:
            "100vh" /* Set the container's height to 100% of the viewport height */,
          justifyContent: "center" /* Vertically center the content */,
          alignItems: "center" /* Horizontally center the content */,
        }}
      >
        <StyledButton onClick={onCreditCard} variant="contained">
          {t("Credit Card")}
        </StyledButton>

        <StyledButton onClick={onApplePay} variant="contained">
          {t("Buy with")}
          <img src={appleSVG} alt="applePay" /> Pay
          {/* <img src={applePay} alt="applePay" /> Pay */}
        </StyledButton>

        <StyledButton onClick={onGooglePay} variant="contained">
          {t("Buy with")} <img src={googleSVG} alt="googlePay" /> Pay
          {/* {t("Buy with")} <img src={googlePay} alt="googlePay" /> Pay */}
         </StyledButton>

       

        {/* <ReactSVG
          beforeInjection={(svg) => {
            svg.classList.add("svg-class-name")
            svg.setAttribute("style", "width: 20px", "height: 20px")
          }}
          className="wrapper-class-name"
          src={googleSVG}
        /> */}
      </FlexColumnContainer>
    </>
  )
}
