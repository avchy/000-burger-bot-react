import "../../App.scss"

import { useTranslation } from "react-i18next"
 



export function CardRow({ food }) {
  const { title, image, price, id, quantity } = food
  const priceAllItems = (price * (quantity || 1)).toFixed(2)
  const { t, i18n } = useTranslation()

  
  
  
  
  return (
    <div className="CardRow">
      <div className="image_container">
        <img src={image} alt={title} />
      </div>

      <span className="cart_text_center">
        {/* {title} */}
        
       {t(title)}

        {/* {quantity !== 1 ? quantity + 'x' : ''} */}
        {/* {quantity !== 1 ? ` x ${quantity}` : ''} */}
      </span>

      <span className="cart_text_center">
        {" "}
        {quantity !== 1 ? `x ${quantity} = ` : ""}
        {priceAllItems} ₪
      </span>
    </div>
  )
}
