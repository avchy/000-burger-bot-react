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
import { FlexColumnContainer, Layout } from "components/AllHelpComponents"

import { BigButton } from "components/BigButton"
import { StyledButton } from "components/StyledButton"
import { ReactSVG } from "react-svg"
import applePay from "../../images/icons/applePay.png"
import googlePay from "../../images/icons/googlePay.png"
const tele = window.Telegram.WebApp

export function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const navigate = useNavigate()

  const location = useLocation()
  const state = location?.state
  console.log("state_in_payments", state)
  // const { cartItems, comment, totalPrice } = state
  // const data = { cartItems, comment, totalPrice }

  const onCreditCard = useCallback(() => {
    console.log("data333", state)
    navigate("/creditCard", { state: state })
  }, [state])

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [state])

  tele.BackButton.onClick(onBackButtonClicked)

  const onApplePay = () => {
    tele.sendData(JSON.stringify(state))
  }
  const onGooglePay = () => {
    tele.sendData(JSON.stringify(state))
  }

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
          Credit Card
        </StyledButton>

        <StyledButton onClick={onApplePay} variant="contained">
          Buy with <img src={applePay} alt="applePay" /> Pay
        </StyledButton>

        <StyledButton onClick={onGooglePay} variant="contained">
          Buy with <img src={googlePay} alt="googlePay" /> Pay
        </StyledButton>
      </FlexColumnContainer>
    </>
  )
}

{
  /* <ReactSVG
              beforeInjection={(svg) => {
                svg.classList.add("svg-class-name")
                svg.setAttribute("style", "width: 20px", "height: 20px")
              }}
              className="wrapper-class-name"
              src={applePayLogoPath}
            /> */
}
