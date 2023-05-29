import '../App.scss'

export function CardRowSmall({ food }) {
    const { title, Image, price, id, quantity } = food

    return (
        <div className='CardRowSmall'>
            <div className='image__container'>
                <img src={Image} alt={title} />
            </div>

            <span>
                {title} {quantity !== 1 ? quantity + 'x' : ''}
            </span>

            <span className='card__price'>$ {price * quantity}</span>
        </div>
    )
}
