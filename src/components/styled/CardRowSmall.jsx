import '../../App.scss'

export function CardRowSmall({ food }) {
    const { title, Image, price, quantity } = food

    const priceAllItems = (price * (quantity || 1)).toFixed(2)
    
    return (
        <div className='CardRowSmall'>
            {Image && (
                <div className='image_container'>
                    <img src={Image} alt={title} />
                </div>
            )}

            <span>{title}</span>
         
          {   <span className='card_price'> {price ? priceAllItems: "0.00"} $</span> } 
        </div>
    )
}
