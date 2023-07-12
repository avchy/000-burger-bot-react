import React,{useState} from "react"
import { useForm } from "react-hook-form"
import { TextField, Button } from "@mui/material"
import { serverIP } from "constants/api"
import axios from "axios";
import {Box} from "@mui/system";


export const PaymentCreditCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [cardData, setCardData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [tempErrors, setTempErrors] = useState({})

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
  const sendDataToServer =async (cardData) => {
   
  // try {
  //   const response = await axios.post(serverIP + '/api/v1/auth/', cardData)
 
  // } catch (error) {
  //   console.log('error', error)
  // }
    
  console.log('success')

      
  }
  
  const onSubmit = (data) => {
    
     const validationErrors = validateFields(cardData)
    if (Object.keys(validationErrors).length === 0) {
      // Отправка данных на сервер
      sendDataToServer(cardData)
    } else {
      setTempErrors(validationErrors)
      // console.log('first', first)
    }

    // Сброс формы после отправки
    reset()
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }



  return (
    <Box sx={{backgroundColor: "grey"}}>
    <h1>Оплата картой</h1>
    {/* {tempErrors && <p>{tempErrors}</p>} */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("name", { required: "Имя обязательно" })}
          label="Имя"
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          {...register("cardNumber", { required: "Номер карты обязателен" })}
          label="Номер карты"
          error={!!errors.cardNumber}
          helperText={errors.cardNumber?.message}
        />
        <TextField
          {...register("expiryDate", { required: "Срок действия обязателен" })}
          label="Срок действия"
          error={!!errors.expiryDate}
          helperText={errors.expiryDate?.message}
        />
        <TextField
          {...register("cvv", { required: "CVV-код обязателен" })}
          label="CVV-код"
          error={!!errors.cvv}
          helperText={errors.cvv?.message}
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

 