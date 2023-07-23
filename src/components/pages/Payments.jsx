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
const tele = window.Telegram.WebApp
import { serverIP } from "constants/api"
import axios from "axios"

export function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")
  const navigate = useNavigate()

  const location = useLocation()
  const state = location?.state
  console.log("state_in_payments", state)
  const { products, comment, totalPrice, address, discount } = state

  // const { cartItems, comment, totalPrice } = state
  // const data = { cartItems, comment, totalPrice }

  tele.MainButton.hide()
  tele.BackButton.show()

  const dataPay = {
    queryId: tele.initDataUnsafe?.query_id,
    products: products,
    totalPrice: totalPrice,
    comment: comment,
    address: address,
    discount: discount,
  }
  console.log("dataPay", dataPay)

  const onCreditCard = useCallback(() => {
    navigate("/creditCard", { state: { ...dataPay, paymentMethod: "card" } })
  }, [state])

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [state])

  tele.BackButton.onClick(onBackButtonClicked)

  const onApplePay = async () => {
    try {
      const response = await axios.post(serverIP + "/web-data", {
        ...dataPay,
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
        ...dataPay,
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
