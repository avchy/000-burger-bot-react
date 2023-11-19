import "App.scss";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";

import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg";
import toppings_icon from "images/toppings_icon.png";
import isPhotoUrl from "helpers/isPhotoUrl";

export function CardRowSmall({ food }) {
	console.log("food222", food);
	const {
		title,
		image,
		price,
		quantity,
		textColor,
		toppings,
		selectedToppings,
		selectedExtrasNames,
	} = food;
	const priceAllItems = (price * (quantity || 1)).toFixed(2);
	const { t, i18n } = useTranslation();

	const calculateTotalPrice = () => {
		let totalPrice = parseFloat(priceAllItems); // Инициализируем сумму исходной ценой товара

		// Добавляем стоимость выбранных топпингов, если они есть
		if (selectedToppings && selectedToppings.length > 0) {
			selectedToppings.forEach((selectedTopping) => {
				const topping = toppings.find(
					(t) => t.title.trim() === selectedTopping.trim()
				);
				if (topping) {
					totalPrice += topping.price * (quantity || 1);
				}
			});
		}

		return totalPrice.toFixed(2); // Возвращаем общую цену с округлением до двух знаков после запятой
	};

	return (
		<>
			<Box className="CardRowSmall">
				<Box className="CardRowSmall">
					<Box className="image_container">
						<img
							src={isPhotoUrl(image) ? image : default_dish_img}
							alt={title}
						/>
					</Box>
					<Typography sx={{ lineHeight: 1 }} className="card_row_text">
						{t(title)}
						{selectedExtrasNames &&
							Object.keys(selectedExtrasNames).map((key) => (
								<Box key={key}>
									<br />
									{"("} <span> {key} :</span>
									<span> {selectedExtrasNames[key]}</span> {")"}
								</Box>
							))}
					</Typography>
				</Box>

				<Typography className="cart_text_center" sx={{ color: textColor }}>
					{quantity && quantity !== 1 ? `${price} x ${quantity} = ` : ""}
					{price ? priceAllItems : "0.00"} ₪
				</Typography>
			</Box>

			{/* selectedToppings================================================ */}

			{selectedToppings?.length > 0 &&
				selectedToppings.map((selectedTopping, index) => {
					const topping = toppings.find(
						(t) => t.title.trim() === selectedTopping.trim()
					);

					if (!topping) return null;

					return (
						<Box
							className="CardRowSmall"
							style={{ margin: "0 10px" }}
							key={topping.title + index}
						>
							<Box className="CardRowSmall">
								<Box className="image_container">
									<img
										src={
											isPhotoUrl(topping.image) ? topping.image : toppings_icon
										}
										alt={topping.title}
									/>
								</Box>
								<Typography className="card_row_text">
									{t(topping.title)}
								</Typography>
							</Box>
							<Typography className="card_row_text">
								{quantity !== 1 ? `${topping.price} x ${quantity} = ` : ""}
								{(topping.price * (quantity || 1)).toFixed(2)} ₪
							</Typography>
						</Box>
					);
				})}

			{title !== "Total Price:" && (
				<Box className="CardRowSmall">
					<Typography className="cart_text_center">
						{t("Total Dish Price:")}
					</Typography>
					<Typography className="cart_text_center" sx={{ color: textColor }}>
						{calculateTotalPrice()} ₪
					</Typography>
				</Box>
			)}
			{title !== "Total Price:" && (
				<Box
					sx={{ width: "100%", height: "1px", backgroundColor: "grey" }}
				></Box>
			)}
		</>
	);
}
