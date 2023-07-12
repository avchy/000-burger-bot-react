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
// import { appleLogoPath } from "../images/apple_black.svg"

export function Payments() {
  const [paymentMethod, setPaymentMethod] = useState("")

  const onCreditCard = () => {}

  const onApplePay = () => {}

  const onGooglePay = () => {}

  return (
    <>
      <FlexColumnContainer>
        
        {/* <BigButton
          title={`${"CreditCard"} `}
          // disable={isEmptyCart ? true : false}
          onClick={onCreditCard}
        /> */}

        <Link to={"/creditCard"}>
          {/* <Link href='/'> */}
          <StyledButton
            //  onClick={onCreditCard}
            variant="contained"
            sx={{
              // fontFamily: 'Rubik',
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            CreditCard
          </StyledButton>
        </Link>

        {/* <ReactSVG src={appleLogoPath} /> */}

        {/* <StyledButton
          title={`${"ApplePay"} `}
          // disable={isEmptyCart ? true : false}
          onClick={onApplePay}
        />
        <StyledButton
          title={`${"GooglePay"} `}
          // disable={isEmptyCart ? true : false}
          onClick={onGooglePay}
        /> */}
        
        
      </FlexColumnContainer>
    </>
  )
}
