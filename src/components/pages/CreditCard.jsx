import React, { useState, useEffect, useCallback } from "react"
import axios from "axios"
import {
  FlexColumnContainer,
  StyledTextField,
} from "components/styled/AllHelpComponents"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Typography, Grid } from "@mui/material"
import { useForm } from "react-hook-form"
import { serverIP } from "constants/api"
import { Box } from "@mui/system"
import { StyledButton } from "components/styled/StyledButton"
import { useNavigator } from "hooks/useNavigator"
import AlertDialog from "components/styled/AlertDialog"
import { DialogComponent } from "components/styled/DialogComponent"
import CircularProgress from "@mui/material/CircularProgress"

const tele = window.Telegram.WebApp

export const CreditCard = () => {
   const [isSubmitting, setIsSubmitting] = useState(false)

  const [dialogOpen, setDialogOpen] = useState(false)

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const [tempErrors, setTempErrors] = useState({})
  const [dialogText, setDialogText] = useState("")
  const { env } = useNavigator()

  const location = useLocation()
  const navigate = useNavigate()
  const state = location?.state
  console.log("state_CreditCard", state)
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
    // formState
    reset,
    setError,
    setValue,
  } = useForm()

  // const { register, handleSubmit, formState } = useForm(formOptions)

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

  // const sendDataToServer = async (dataCard) => {
  //   try {
  //     const dataPay = {
  //       queryId: tele.initDataUnsafe?.query_id,
  //       products: products,
  //       totalPrice: totalPrice,
  //     }
  //     console.log("dataPay", dataPay)
  //     setDialogText(JSON.stringify(state, null, 2))

  //     const response = await axios.post(serverIP + "/web-data", dataPay)

  //     setDialogText("response_success")
  //     setDialogOpen(true)

  //     // console.log("success")
  //   } catch (error) {
  //     setDialogText("error_in_response")
  //     setDialogOpen(true)

  //     // AlertDialog("error_in_response")
  //     // alert("error_in_response")

  //     console.log("error", error)
  //   }
  // }

  const onSubmit = async (cardData) => {
    try {
      setIsSubmitting(true)

      const dataPay = {
        queryId: tele.initDataUnsafe?.query_id,
        products: products,
        totalPrice: totalPrice,
      }

      setDialogText(JSON.stringify(dataPay, null, 2))
      setDialogOpen(true)
      setTimeout(() => {}, 5000)

      const response = await axios.post(serverIP + "/web-data", dataPay)

      setDialogText("success")
      setDialogOpen(true)
    } catch (error) {
      setDialogText("error")
      setDialogOpen(true)
      console.log("error333", error)
    } finally {
      setIsSubmitting(false)
    }
  }

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

  useEffect(() => {
    tele.MainButton.show()
    tele.MainButton.setParams({ text: "PAY" })
  }, [])

  // const validationSchema = Yup.object().shape({
  //   firstName: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   email: Yup.string()
  //     .matches(mailRegEx, 'Mail is not valid')
  //     .required('email is required'),
  //   password: Yup.string()
  //     .required('Password is required')
  //     .min(8, 'Password must be at least 8 characters'),

  //   // id: Yup.string()
  //   //   .test('is-valid-id', 'ID is not valid', (value) =>
  //   //     is_israeli_id_number(value)
  //   //   )
  //   //   .required('Passport Number is required'),

  //   id: Yup.string().when('environment', {
  //     termsAndConditions: Yup.boolean()
  //       .oneOf([true], 'You must accept the terms and conditions')
  //       .required('You must accept the terms and conditions'),

  //     is: 'production',
  //     then: Yup.string().test('is-valid-id', 'ID is not valid', (value) =>
  //       is_israeli_id_number(value)
  //     ),
  //     otherwise: Yup.string(),
  //   }),

  //   phoneNumber: Yup.string()
  //     .matches(phoneRegExp, 'Phone number is not valid')
  //     .required('Phone Number is required'),
  //   countryCode: Yup.string().required('Country Code is required'),
  //   city: Yup.string().required('City is required'),
  //   address: Yup.string().required('Address is required'),
  // })

  // const formOptions = { resolver: yupResolver(validationSchema) }
  // const { errors } = formState

  return (
    <>
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

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        
          <StyledTextField
            {...register("cardNumber", {
              required: "Card number is required",
            })}
            label="Card Number"
            defaultValue={creditCardData.cardNumber}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
            sx={{ width: "100%", mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: "16px", pb: 2 }}>
            <StyledTextField
              {...register("expiryDate", {
                required: "Expiry date is required",
              })}
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
          {env == "browser" && (
            <StyledButton type="submit">Submit</StyledButton>
          )}
       
        </Box>

           <AlertDialog
            text={dialogText}
            buttonRight={"ok"}
            open={dialogOpen}
            onClose={handleCloseDialog}
          />
 
        {isSubmitting ? (
          <CircularProgress
            size={16}
            color="primary"
            sx={{ marginRight: "1rem" }}
          />
        ) : null}
      </FlexColumnContainer>
    </>
  )
}
