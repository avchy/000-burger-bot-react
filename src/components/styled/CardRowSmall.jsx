import "../../App.scss"

export function CardRowSmall({ food }) {
  const { title, Image, price, quantity } = food

  const priceAllItems = (price * (quantity || 1)).toFixed(2)

  return (
    <div className="CardRowSmall">
        
        
<div className="CardRowSmall">
            
          {Image && (
    <div className="image_container">
      <img src={Image} alt={title} />
    </div>
          )}
    
          <span className="cart_text_center">{title}</span>
          {/* <span className="cart_text_center left">{title}</span> */}
</div>



      {
        <span className="cart_text_center" >
          {quantity && quantity !== 1 ? `x ${quantity} = ` : ""}
          {price ? priceAllItems : "0.00"} ₪
        </span>
      }
    </div>
  )
}
