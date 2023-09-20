import React, { useState, useEffect, useCallback, useContext } from "react"
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
import DialogComponent from "components/styled/DialogComponent"
import CircularProgress from "@mui/material/CircularProgress"
import { CartContext } from "App"
const tele = window.Telegram.WebApp

import { useTranslation } from "react-i18next"

export const CreditCard = () => {
  const { t, i18n } = useTranslation()

  const [isSubmitting, setIsSubmitting] = useState(false)
  // const [dialogOpen, setDialogOpen] = useState(false)
  // const [tempErrors, setTempErrors] = useState({})
  // const [dialogText, setDialogText] = useState("")

  const { env } = useNavigator()
  const navigate = useNavigate()

  const {
    queryId,
    cartItems,
    comment,
    totalPrice,
    address,
    optionDelivery,
    user,
  } = useContext(CartContext)

   
  
  const state = {
    queryId,
    cartItems,
    comment,
    totalPrice,
    address,
    optionDelivery,

    user_id: user?.id || 0,
    user_name: user?.username || "",
    order_date: new Date(),
  }

  console.log("state_CreditCard", state)

  // const handleCloseDialog = () => {
  //   setDialogOpen(false)
  // }

  // const onBackButtonClicked = useCallback(() => {
  //   navigate(-1)
  // }, [cartItems])

  // tele.BackButton.onClick(onBackButtonClicked)

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

  // const validateFields = (data) => {
  //   const errors = {}

  //   if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
  //     setError("cardNumber", {
  //       type: "manual",
  //       message: t("incorrectCardNumber"),
  //     })
  //     errors.cardNumber = t("incorrectCardNumber")
  //   }

  //   if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
  //     setError("expiryDate", {
  //       type: "manual",
  //       message: t("incorrectExpiryDate"),
  //     })
  //     errors.expiryDate = t("incorrectExpiryDate")
  //   }

  //   if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
  //     setError("cvv", {
  //       type: "manual",
  //       message: t("incorrectCvvCode"),
  //     })
  //     errors.cvv = t("incorrectCvvCode")
  //   }

  //   if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
  //     setError("email", {
  //       type: "manual",
  //       message: t("incorrectEmail"),
  //     })
  //     errors.email = t("incorrectEmail")
  //   }
  //   return errors
  // }

  //======================================================================

  async function payCreditCard(dataPay) {
    try {
      const response = await axios.post(serverIP + "/pay_credit_card", dataPay)
      // Обработка успешного ответа
      console.log('Запрос "pay_credit_card" успешно выполнен')
      // Дополнительный код для обработки ответа
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка при выполнении запроса "pay_credit_card":', error)
      // Не выполняем следующие запросы из-за ошибки
      return
    }
  }

  async function createOrderDB(dataPay) {
    try {
      const response = await axios.post(serverIP + "/create_order_db", dataPay)
      // Обработка успешного ответа
      console.log('Запрос "create_order_db" успешно выполнен')
      // Дополнительный код для обработки ответа
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка при выполнении запроса "create_order_db":', error)
      // Не выполняем следующие запросы из-за ошибки
      return
    }
  }

  async function sendSMSTele(dataPay) {
    try {
      const response = await axios.post(serverIP + "/send_sms_tele", dataPay)
      // Обработка успешного ответа
      console.log('Запрос "send_sms_tele" успешно выполнен')
      // Дополнительный код для обработки ответа
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка при выполнении запроса "send_sms_tele":', error)
      // Не выполняем следующие запросы из-за ошибки
      return
    }
  }

  // Здесь вызывайте функции в нужной последовательности
  async function createOrder(dataPay) {
    await payCreditCard(dataPay)
    await createOrderDB(dataPay)
    await sendSMSTele(dataPay)

    // Другой код, который выполняется после завершения всех успешных запросов
  }

  //======================================================================

  const onSubmit = async (cardData) => {
    try {
      setIsSubmitting(true)

// Создаем новый массив cartItems без свойства "image"
const cartItemsWithoutImage = cartItems.map(item => {
  const { image, ...rest } = item; // Используем деструктуризацию, чтобы убрать свойство "image"
  return rest; // Возвращаем остальные свойства без "image"
});

const dataPay = {
  ...state,
  paymentMethod: "card",
  cartItems: cartItemsWithoutImage, // Заменяем "cartItems" новым массивом без "image"
}
    
      // const dataPay = {
      //   ...state,
      //   paymentMethod: "card",
      // }

      //       setDialogText(
      //         `
      //         serverIP =  ${serverIP}
      // ______________________________________________________

      //         dataPay =  ${JSON.stringify(dataPay, null, 2)}

      //       `
      //       )

      // setDialogOpen(true)
 

      createOrder(dataPay)

      // await axios.post(serverIP + "/orders", dataPay)

      // setDialogText(t("success"))
      // setDialogOpen(true)
    } catch (error) {
      console.log("error333", error)
      // setDialogText(JSON.stringify(error, null, 2))
    } finally {
      setIsSubmitting(false)
    }
  }

  const creditCardInitialData = {
    cardNumber: "1234567890123456",
    expiryDate: "12/23",
    cvv: "123",
    email: "john.doe@example.com",
  }

  useEffect(() => {
    setValue("cardNumber", creditCardInitialData.cardNumber)
    setValue("expiryDate", creditCardInitialData.expiryDate)
    setValue("cvv", creditCardInitialData.cvv)
    setValue("email", creditCardInitialData.email)
  }, [setValue])

  useEffect(() => {
    tele.onEvent("mainButtonClicked", onSubmit)
    // tele.onEvent("backButtonClicked", onBackButtonClicked)

    return () => {
      tele.offEvent("mainButtonClicked", onSubmit)
      // tele.offEvent("backButtonClicked", onBackButtonClicked)
    }
  }, [onSubmit])

  useEffect(() => {
    console.log("errors444", errors)
  }, [errors])

  useEffect(() => {
    tele.MainButton.show()
    tele.MainButton.setParams({ text: t("submitButton") })
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
          height: "100vh",
          padding: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1 className="title">{t("paymentHeading")}</h1>

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <StyledTextField
            {...register("cardNumber", {
              required: t("cardNumber is required"),
            })}
            label={t("cardNumberLabel")}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
            sx={{ width: "100%", mb: 2 }}
          />

          <Box sx={{ display: "flex", gap: "16px", pb: 2 }}>
            <StyledTextField
              {...register("expiryDate", {
                required: t("expiryDate is required"),
              })}
              label={t("expiryDateLabel")}
              error={!!errors.expiryDate}
              helperText={errors.expiryDate?.message}
              sx={{ flex: 1, mr: 2 }}
            />
            <StyledTextField
              {...register("cvv", { required: t("cvvCode is required") })}
              label={t("cvvCodeLabel")}
              error={!!errors.cvv}
              helperText={errors.cvv?.message}
              sx={{ flex: 1 }}
            />
          </Box>
          <StyledTextField
            {...register("email", { required: t("email is required") })}
            label={t("emailLabel")}
            error={!!errors.email}
            helperText={errors.email?.message}
            sx={{ width: "100%", mb: 2 }}
          />
          {env === "browser" && (
            <StyledButton type="submit">{t("submitButton")}</StyledButton>
          )}
        </Box>

        {/* <DialogComponent
          text={dialogText}
          buttonRight={t("ok")}
          open={dialogOpen}
          onClose={handleCloseDialog}
        /> */}

        {/* {isSubmitting ? (
          <CircularProgress size={16} color="primary" sx={{ marginRight: "1rem" }} />
        ) : null} */}
        {isSubmitting ? (
          <div id="fullscreen-overlay">
            <FlexColumnContainer>
              <Box sx={{ fontSize: 3 }}>Sending...</Box>
              <CircularProgress
                size={32}
                color="primary"
                sx={{ marginRight: "1rem" }}
              />
            </FlexColumnContainer>
          </div>
        ) : null}
      </FlexColumnContainer>
    </>
  )
}
