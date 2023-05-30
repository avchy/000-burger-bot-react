import '../App.scss'

export function CardRowSmall({ food }) {
    const { title, Image, price, id, quantity } = food

    return (
        <div className='CardRowSmall'>
            <div className='image_container'>
                <img src={Image} alt={title} />
            </div>

            <span>
                {title} {quantity !== 1 ? quantity + 'x' : ''}
            </span>

            <span className='card_price'>$ {price * quantity}</span>
        </div>
    )
}
