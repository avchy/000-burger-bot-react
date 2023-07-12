import React, { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { TextField, Button } from "@mui/material"
import { serverIP } from "constants/api"
import axios from "axios"
import { Box } from "@mui/system"

export const PaymentCreditCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm()

  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [tempErrors, setTempErrors] = useState({})

  function validateCreditCardFields(data) {
    const errors = {}

     if (!data.cardNumber || !/^\d{16}$/.test(data.cardNumber)) {
      errors.cardNumber = "Некорректный номер карты"
    }

     if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expiryDate)) {
      errors.expiryDate = "Некорректная дата истечения срока действия"
    }

     if (!data.cvv || !/^\d{3,4}$/.test(data.cvv)) {
      errors.cvv = "Некорректный CVV-код"
    }

    // // Почтовый индекс
    // if (data.zipCode && !/^\d{5}$/.test(data.zipCode)) {
    //   errors.zipCode = "Некорректный почтовый индекс"
    // }

    // // Адрес
    // if (
    //   data.address &&
    //   (data.address.length < 5 || data.address.length > 100)
    // ) {
    //   errors.address = "Некорректный адрес"
    // }

    // // Телефон
    // if (
    //   data.phoneNumber &&
    //   !/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(data.phoneNumber)
    // ) {
    //   errors.phoneNumber = "Некорректный номер телефона"
    // }

    // // Электронная почта
    // if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    //   errors.email = "Некорректный адрес электронной почты"
    // }

    return errors
  }

  const validateFields = (data) => {
    const errors = {}
    if (!data.name) {
      errors.name = "Name required"
    }

    if (!data.cardNumber) {
      errors.cardNumber = "The card number is mandatory"
    }
    if (!data.expiryDate) {
      errors.expiryDate = "Expiration date is mandatory"
    }
    if (!data.cvv) {
      errors.cvv = "CVV code is mandatory"
    }
    return errors
  }

  const sendDataToServer = async (cardData) => {
    // try {
    //   const response = await axios.post(serverIP + '/api/v1/auth/', cardData)

    // } catch (error) {
    //   console.log('error', error)
    // }

    console.log("success")
  }

  const onSubmit = (data) => {
    const validationErrors = validateFields(data)
    console.log("validationErrors", validationErrors)

    // const validationErrors = validateCreditCardFields(creditCardData)

    if (validationErrors === {}) {
      // if (Object.keys(validationErrors).length === 0) {
      // Отправка данных на сервер
      sendDataToServer(data)
      // Сброс формы после отправки
      reset()
    } else {
      setTempErrors(validationErrors)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const creditCardData = {
    cardNumber: "1234567890123456",
    cardHolderName: "John Doe",
    expiryDate: "12/23",
    cvv: "123",
    zipCode: "12345",
    address: "123 Main St",
    phoneNumber: "+1-123-456-7890",
    email: "john.doe@example.com",
  }

  useEffect(() => {
    setValue("name", creditCardData.cardHolderName)
    setValue("cardNumber", creditCardData.cardNumber)
    setValue("expiryDate", creditCardData.expiryDate)
    setValue("cvv", creditCardData.cvv)
  }, [setValue])

  return (
    <Box sx={{ backgroundColor: "grey" }}>
      <h1>Оплата картой</h1>
      {/* {tempErrors && <p>{tempErrors}</p>} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { required: "Имя обязательно" })}
          label="Имя"
          error={!!tempErrors.name}
          helperText={tempErrors.name?.message}
        />
        <TextField
          {...register("cardNumber", { required: "Номер карты обязателен" })}
          label="Номер карты"
          error={!!tempErrors.cardNumber}
          helperText={tempErrors.cardNumber?.message}
        />
        <TextField
          {...register("expiryDate", { required: "Срок действия обязателен" })}
          label="Срок действия"
          error={!!tempErrors.expiryDate}
          helperText={tempErrors.expiryDate?.message}
        />
        <TextField
          {...register("cvv", { required: "CVV-код обязателен" })}
          label="CVV-код"
          error={!!tempErrors.cvv}
          helperText={tempErrors.cvv?.message}
        />
        <Button type="submit">Отправить</Button>
      </form>

      {/* {errors.name && <p>{errors.name}</p>}
      {errors.cardNumber && <p>{errors.cardNumber}</p>}
      {errors.expiryDate && <p>{errors.expiryDate}</p>}
      {errors.cvv && <p>{errors.cvv}</p>} */}
    </Box>
  )
}
