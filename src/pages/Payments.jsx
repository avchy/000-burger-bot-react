import React, { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { FlexColumnContainer, StyledTextField } from "components/AllHelpComponents";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { serverIP } from "constants/api";
import { Box } from "@mui/system";
import { StyledButton } from "components/StyledButton";
import { useNavigator } from "hooks/useNavigator";
import DialogComponent from "components/DialogComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { CartContext } from "App";
import appleSVG from "images/svg_icons/icons8-apple-logo.svg";
import googleSVG from "images/svg_icons/icons8-google.svg";
import { useTranslation } from "react-i18next";
import { creditCardInitialData } from "constants/constants";

export const Payments = () => {
	const { t, i18n } = useTranslation();
	const tele = window.Telegram.WebApp;

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formOpenCreditCard, setFormOpenCreditCard] = useState(false);
	// const [dialogOpen, setDialogOpen] = useState(false)
	// const [tempErrors, setTempErrors] = useState({})
	// const [dialogText, setDialogText] = useState("")

	const { env } = useNavigator();
	const navigate = useNavigate();

	const {
		queryId,
		cartItems,
		comment,
		totalPrice,
		address,
		telephone,
		optionDelivery,
		user,
		settings,
	} = useContext(CartContext);

	const state = {
		queryId,
		cartItems,
		comment,
		totalPrice,
		address,
		telephone,
		optionDelivery,

		user_id: user?.id || 0,
		user_name: user?.username || "",
		// order_date: new Date(),
	};

	console.log("state_CreditCard", state);

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
	} = useForm();

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
			const response = await axios.post(serverIP + "/pay_credit_card", dataPay);
			// Обработка успешного ответа
			console.log('Запрос "pay_credit_card" успешно выполнен');
			// Дополнительный код для обработки ответа
		} catch (error) {
			// Обработка ошибки
			console.error('Ошибка при выполнении запроса "pay_credit_card":', error);
			// Не выполняем следующие запросы из-за ошибки
			return;
		}
	}

	//========================================

	async function createOrderDB(dataPay) {
		try {
			const response = await axios.post(serverIP + "/create_order_db", dataPay);
			// Обработка успешного ответа
			console.log('Запрос "create_order_db" успешно выполнен');
			// Дополнительный код для обработки ответа
		} catch (error) {
			// Обработка ошибки
			console.error('Ошибка при выполнении запроса "create_order_db":', error);
			// Не выполняем следующие запросы из-за ошибки
			return;
		}
	}

	async function sendSMSTele(dataPay) {
		try {
			const response = await axios.post(serverIP + "/send_sms_tele", dataPay);
			// Обработка успешного ответа
			console.log('Запрос "send_sms_tele" успешно выполнен');
			// Дополнительный код для обработки ответа
		} catch (error) {
			// Обработка ошибки
			console.error('Ошибка при выполнении запроса "send_sms_tele":', error);
			// Не выполняем следующие запросы из-за ошибки
			return;
		}
	}

	//======================================================================
	const handlePayment = async (paymentMethod) => {
		setIsSubmitting(true);

		try {
			const cartItemsWithoutImage = cartItems.map((item) => {
				const { image, ...rest } = item;
				return rest;
			});

			const dataPay = {
				...state,
				paymentMethod,
				cartItems: cartItemsWithoutImage,
			};

			await createOrderDB(dataPay);
			await sendSMSTele(dataPay);

			if (paymentMethod === "card") {
				await payCreditCard(dataPay);
			}
		} catch (error) {
			console.error("Error:", error);
		} finally {
			setIsSubmitting(false);
		}
	};

	// Использование функции handlePayment для всех типов оплаты

	const onCreditCard = () => {
		handlePayment("card");
	};

	const onApplePay = () => {
		handlePayment("onApplePay");
	};

	const onGooglePay = () => {
		handlePayment("onGooglePay");
	};

	const onOrderToWaiter = () => {
		handlePayment("onOrderToWaiter");
	};

	useEffect(() => {
		setValue("cardNumber", creditCardInitialData.cardNumber);
		setValue("expiryDate", creditCardInitialData.expiryDate);
		setValue("cvv", creditCardInitialData.cvv);
		setValue("email", creditCardInitialData.email);
	}, [setValue]);

	useEffect(() => {
		console.log("errors444", errors);
	}, [errors]);

	useEffect(() => {
		tele.MainButton.hide();
	}, []);

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

	const onShowCreditCard = () => {
		setFormOpenCreditCard(formOpenCreditCard ? false : true);
	};

	return (
		<>
			{console.log("isSubmitting", isSubmitting)}
			{isSubmitting ? (
				<Box id="fullscreen-overlay">
					<FlexColumnContainer>
						<Typography
							sx={{
								padding: "4px 8px ",
								width: "40px",
								height: "40px",
							}}
							variant="h3"
						>
							Sending...
						</Typography>
						<CircularProgress
							size={64}
							color="primary"
							sx={{ marginLeft: "5rem", marginTop: "5rem" }}
						/>
					</FlexColumnContainer>
				</Box>
			) : null}

			{settings.showCreditCardButton && (
				<StyledButton onClick={onShowCreditCard} variant="contained">
					{t("Credit Card")}
				</StyledButton>
			)}

			{formOpenCreditCard && (
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

					<Box component="form" onSubmit={handleSubmit(onCreditCard)}>
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

						<StyledButton type="submit" variant="contained">
							{t("submitButton")}{" "}
						</StyledButton>

						{/* {env === "browser" && (
              <StyledButton type="submit" variant="contained">
                {t("submitButton")}{" "}
              </StyledButton>
            )} */}
					</Box>

					{/* <DialogComponent
          text={dialogText}
          buttonRight={t("ok")}
          open={dialogOpen}
          onClose={handleCloseDialog}
        /> */}
				</FlexColumnContainer>
			)}

			{settings.showApplePayButton && (
				<StyledButton onClick={onApplePay} variant="contained">
					{t("Buy with")}
					<img src={appleSVG} alt="applePay" /> Pay
				</StyledButton>
			)}

			{settings.showGooglePayButton && (
				<StyledButton onClick={onGooglePay} variant="contained">
					{t("Buy with")} <img src={googleSVG} alt="googlePay" /> Pay
				</StyledButton>
			)}

			{settings.showOrderButton && (
				<StyledButton onClick={onOrderToWaiter} variant="contained">
					{t("Order to Waiter")}
				</StyledButton>
			)}
		</>
	);
};
