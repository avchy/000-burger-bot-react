import "../../App.scss"

export function CardRow({ food }) {
    const { title, Image, price, id, quantity } = food
    const priceAllItems = (price * (quantity || 1)).toFixed(2)

    return (
        <div className='CardRow'>
            <div className='image_container'>
                <img src={Image} alt={title} />
            </div>

            <span>
                {title} 
                {/* {quantity !== 1 ? quantity + 'x' : ''} */}
            </span>

             <span className='card_price'> {priceAllItems} $</span>

        </div>
    )
}
