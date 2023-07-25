import "../../App.scss"



import { useTranslation } from "react-i18next"





export function CardRowSmall({ food }) {
  const { title, Image, price, quantity, textColor } = food
  console.log("textColor111", textColor)
  const priceAllItems = (price * (quantity || 1)).toFixed(2)
  const { t, i18n } = useTranslation()

  return (
    <div className="CardRowSmall">
      <div className="CardRowSmall">
        {Image && (
          <div className="image_container">
            <img src={Image} alt={title} />
          </div>
        )}

        <span className="cart_text_center">{t(title)}</span>
        {/* <span className="cart_text_center">{title}</span> */}
      

        
        {/* <span className="cart_text_center left">{title}</span> */}
      </div>

      {
        // <span className="cart_text_center" style={`${textColor}`}>
        <span className="cart_text_center" style={{ color: textColor }}>
          {quantity && quantity !== 1 ? `x ${quantity} = ` : ""}
          {price ? priceAllItems : "0.00"} ₪
        </span>
      }
    </div>
  )
}
