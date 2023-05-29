import '../App.scss'

export function CardRow({ food }) {
    const { title, Image, price, id, quantity } = food

    return (
        <div className='CardRow'>
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
