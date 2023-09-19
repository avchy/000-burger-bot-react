import "../../App.scss"

import { useTranslation } from "react-i18next"

import { Box } from "@mui/material"

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
              <img src={image} alt={title} />
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
                      <img src={topping.image} alt={topping.title} />
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
