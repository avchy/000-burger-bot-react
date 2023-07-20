import "../../App.scss"

export function CardRow({ food }) {
  const { title, Image, price, id, quantity } = food
  const priceAllItems = (price * (quantity || 1)).toFixed(2)

  return (
    <div className="CardRow">
      <div className="image_container">
        <img src={Image} alt={title} />
      </div>

      <span className="cart_text_center">
        {title}
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
