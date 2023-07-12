import React, { useState } from "react"
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Button,
} from "@mui/material"
import { BigButton } from "components/BigButton"
import { FlexColumnContainer } from "components/AllHelpComponents"
import { StyledButton } from "components/StyledButton"
import { Link } from "react-router-dom"
import { ReactSVG } from "react-svg"
import applePay from "../../images/icons/applePay.png"
import googlePay from "../../images/icons/googlePay.png"

export function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")

  const onCreditCard = () => {}

  const onApplePay = () => {}

  const onGooglePay = () => {}

  return (
    <>
      <FlexColumnContainer
        sx={{ pt: "20px", backgroundColor: "#404040", gap: 2 }}
      >
        <Link to={"/creditCard"}>
          <StyledButton
            //  onClick={onCreditCard}
            variant="contained"
          >
            Credit Card
          </StyledButton>
        </Link>

        <Link to={"/applePay"}>
          <StyledButton
            //  onClick={onCreditCard}
            variant="contained"
          >
            Buy with <img src={applePay} alt="applePay" /> Pay
          </StyledButton>
        </Link>

        <Link to={"/googlePay"}>
          <StyledButton
            //  onClick={onCreditCard}
            variant="contained"
          >
            Buy with <img src={googlePay} alt="googlePay" /> Pay
          </StyledButton>
        </Link>
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
