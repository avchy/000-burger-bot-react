import "App.scss";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg";
import toppings_icon from "images/toppings_icon.png";
import isPhotoUrl from "helpers/isPhotoUrl";

export function CardRowSmall({ food }) {
	console.log("food222", food);
	const { title, image, price, quantity, textColor, toppings, selectedToppings } = food;
	const priceAllItems = (price * (quantity || 1)).toFixed(2);
	const { t, i18n } = useTranslation();

	const calculateTotalPrice = () => {
		let totalPrice = parseFloat(priceAllItems); // Инициализируем сумму исходной ценой товара

		// Добавляем стоимость выбранных топпингов, если они есть
		if (selectedToppings && selectedToppings.length > 0) {
			selectedToppings.forEach((selectedTopping) => {
				const topping = toppings.find((t) => t.title.trim() === selectedTopping.trim());
				if (topping) {
					totalPrice += topping.price * (quantity || 1);
				}
			});
		}

		return totalPrice.toFixed(2); // Возвращаем общую цену с округлением до двух знаков после запятой
	};

	return (
		<>
			<div className="CardRowSmall">
				<div className="CardRowSmall">
					{image && (
						<div className="image_container" style={{ width: "100px" }}>
							<img src={isPhotoUrl(image) ? image : default_dish_img} alt={title} />
						</div>
					)}
					<span className="cart_text_center">{t(title)}</span>
				</div>
				{
					<span className="cart_text_center" style={{ color: textColor }}>
						{quantity && quantity !== 1 ? `${price} x ${quantity} = ` : ""}
						{price ? priceAllItems : "0.00"} ₪
					</span>
				}
			</div>
			{console.log("selectedToppings", selectedToppings)}
			{console.log("selectedToppings?.length", selectedToppings?.length)}{" "}
			{selectedToppings?.length > 0 &&
				selectedToppings.map((selectedTopping, index) => {
					const topping = toppings.find((t) => t.title.trim() === selectedTopping.trim());

					console.log("selectedTopping555", selectedTopping);
					console.log("topping555", topping);

					if (!topping) return null;

					return (
						<div
							className="CardRowSmall"
							style={{ margin: "0 10px" }}
							key={topping.title + index}
						>
							<div className="CardRowSmall">
								<div className="image_container">
									<img
										src={isPhotoUrl(topping.image) ? topping.image : toppings_icon}
										alt={topping.title}
									/>
								</div>
								<span className="card_row_text">{t(topping.title)}</span>
							</div>

							<span className="card_row_text">
								{quantity !== 1 ? `${topping.price} x ${quantity} = ` : ""}
								{(topping.price * (quantity || 1)).toFixed(2)} ₪
							</span>
						</div>
					);
				})}
			{title != "Total Price:" && (
				<div className="CardRowSmall">
					<span className="cart_text_center">{t("Dish Price:")}</span>
					<span className="cart_text_center" style={{ color: textColor }}>
						{calculateTotalPrice()} ₪
					</span>
				</div>
			)}
			{title != "Total Price:" && (
				<Box sx={{ width: "100%", height: "1px", backgroundColor: "grey" }}></Box>
			)}
		</>
	);
}
