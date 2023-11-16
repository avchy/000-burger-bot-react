import "App.scss"
import { useTranslation } from "react-i18next"
import { Box } from "@mui/material"

import default_dish_img from "images/svg_dishes/pot-dinner-svgrepo-com.svg"
import isPhotoUrl from "helpers/isPhotoUrl"

export function CardRowSmall({ food }) {
  const { title, image, price, quantity, textColor, toppings } = food
  const priceAllItems = (price * (quantity || 1)).toFixed(2)
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className="CardRowSmall">
        <div className="CardRowSmall">
          {image && (
            <div className="image_container">
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

      {toppings?.length > 0 &&
        toppings.map((topping, index) => {
          return (
            <>
              {topping.count > 0 && (
                <div className="CardRowSmall" key={topping.title + index}>
                  <div className="CardRowSmall">
                    <div className="image_container">
                    <img src={isPhotoUrl(topping.image) ? topping.image : default_dish_img} alt={topping.title} />
                    </div>
                    <span className="card_row_text">{t(topping.title)}</span>
                  </div>

                  <span className="card_row_text">
                    {quantity !== 1 ? `${topping.price} x ${quantity} = ` : ""}
                    {(topping.price * (quantity || 1)).toFixed(2)} ₪
                  </span>
                </div>
              )}
            </>
          )
        })}

      <Box sx={{ width: "100%", height: "1px", backgroundColor: "grey" }}></Box>
    </>
  )
}
