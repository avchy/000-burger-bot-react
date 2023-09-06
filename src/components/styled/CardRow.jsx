import "../../App.scss"

import { useTranslation } from "react-i18next"
import {
  FlexColumnContainer,
  FlexRowContainer,
} from "components/styled/AllHelpComponents"
import { Box } from "@mui/system"

export function CardRow({ food }) {
  const { title, image, price, id, quantity, toppings } = food
  const priceAllItems = (price * (quantity || 1)).toFixed(2)
  const { t, i18n } = useTranslation()

  return (
    <>
      <div className="CardRow">
        <div className="image_container">
          <img src={image} alt={title} />
        </div>
        <span className="card_row_text">{t(title)}</span>
        <span className="card_row_text">
          {quantity !== 1 ? `x ${quantity} = ` : ""}
          {priceAllItems} ₪
        </span>
      </div>

      {toppings?.length > 0 &&
        toppings.map((topping, index) => {
          return (
            <>
              {topping.count > 0 && (
                <div className="CardRowSmall">
                  <div className="image_container">
                    <img src={topping.image} alt={topping.title} />
                  </div>
                  <span className="card_row_text">{t(topping.title)}</span>
                  <span className="card_row_text">{topping.price} ₪</span>
                </div>
              )}
            </>
          )
        })}

      <Box sx={{ width: "100%", height: "1px", backgroundColor: "grey" }}></Box>
    </>
  )
}
