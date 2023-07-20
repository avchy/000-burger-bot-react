import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import {
  FlexColumnContainer,
  StyledTextField,
} from "components/styled/AllHelpComponents"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { serverIP } from "constants/api"
import { Box } from "@mui/system"
import { StyledButton } from "components/styled/StyledButton"
import { useNavigator } from "hooks/useNavigator"

const tele = window.Telegram.WebApp

tele.MainButton.show()
tele.MainButton.setParams({ text: "PAY" })

export const CreditCard = () => {
  const [tempErrors, setTempErrors] = useState({})
  const { env } = useNavigator()

  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state
  console.log("state111", state)
  const { products, comment, totalPrice } = state
  // const data = { cartItems, comment, totalPrice }

  const onBackButtonClicked = useCallback(() => {
    navigate(-1)
  }, [products])

  tele.BackButton.onClick(onBackButtonClicked)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    setValue,
  } = useForm()

  const validateFields = (data) => {
    const errors = {}

    if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      setError("cardNumber", {
        type: "manual",
        message: "The card number is not correct",
      })
      errors.cardNumber = "The card number is not correct"
    }

    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      setError("expiryDate", {
        type: "manual",
        message: "Expiration date is not correct",
      })
      errors.expiryDate = "Expiration date is not correct"
    }

    if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      setError("cvv", {
        type: "manual",
        message: "CVV code is not correct",
      })
      errors.cvv = "CVV code is not correct"
    }

    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setError("email", {
        type: "manual",
        message: "Incorrect e-mail address",
      })
      errors.email = "Incorrect e-mail address"
    }
    return errors
  }

  const sendDataToServer = async (dataCard) => {
    try {
      const dataPay = {
        queryId: tele.initDataUnsafe?.query_id,
        products: products,
        totalPrice: totalPrice,
      }
      console.log("dataPay", dataPay)

      const response = await axios.post(serverIP + "/web-data", dataPay)
      console.log("success")
    } catch (error) {
      console.log("error", error)
    }
  }

  const onSubmit = (data) => {
    const validationErrors = validateFields(data)
    console.log("validationErrors", validationErrors)

    // if (errors === {}) {
    if (Object.keys(validationErrors).length === 0) {
      // if (Object.keys(validationErrors).length === 0) {

      // Отправка данных на сервер
      sendDataToServer(data)
      // tele.sendData(JSON.stringify(state))

      // Сброс формы после отправки
      reset()
    } else {
      // setErrors(validationErrors)
      // setTempErrors(validationErrors)
    }
  }

  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setCardData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }))
  // }

  const creditCardData = {
    cardNumber: "1234567890123456",
    expiryDate: "12/23",
    cvv: "123",
    email: "john.doe@example.com",
  }

  useEffect(() => {
    setValue("cardNumber", creditCardData.cardNumber)
    setValue("expiryDate", creditCardData.expiryDate)
    setValue("cvv", creditCardData.cvv)
    setValue("email", creditCardData.email)
  }, [setValue])

  
  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])
  
  
  useEffect(() => {
    console.log("errors", errors)
  }, [errors])

  return (
    <FlexColumnContainer
      sx={{
        pt: "20px",
        backgroundColor: "white",
        gap: 2,
        color: "black",
        height:
          "100vh" /* Set the container's height to 100% of the viewport height */,
        padding: "20px",
        justifyContent: "center" /* Vertically center the content */,
        alignItems: "center" /* Horizontally center the content */,
      }}
    >
      {/* <Typography>Card Payment</Typography> */}
      <h1 className="title">Card Payment </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledTextField
          {...register("cardNumber", { required: "Card number is required" })}
          label="Card Number"
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
          sx={{ width: "100%", mb: 2 }}
        />
        <Box sx={{ display: "flex", gap: "16px", pb: 2 }}>
          <StyledTextField
            {...register("expiryDate", { required: "Expiry date is required" })}
            label="Expiry Date"
            error={!!errors.expiryDate}
            helperText={errors.expiryDate?.message}
            sx={{ flex: 1, mr: 2 }}
          />
          <StyledTextField
            {...register("cvv", { required: "CVV code is required" })}
            label="CVV Code"
            error={!!errors.cvv}
            helperText={errors.cvv?.message}
            sx={{ flex: 1 }}
          />
        </Box>
        <StyledTextField
          {...register("email", { required: "Email is required" })}
          label="Email"
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{ width: "100%", mb: 2 }}
        />
        {env == "browser" && <StyledButton type="submit">Submit</StyledButton>}
      </form>
    </FlexColumnContainer>
  )
}
