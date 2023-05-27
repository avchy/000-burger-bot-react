import React, { useState } from 'react'
import './CardOrder.scss'

// import Button from '../Button/Button'

function CardOrder({ food }) {
    const { title, Image, price, id, quantity } = food

    console.log('food :>> ', food)

    return (
        <div className='cardOrder'>
            {/* <div className='card'> */}
            {/* <span className={`${quantity !== 0 ? 'card__badge' : 'card__badge--hidden'}`}>
                {quantity}
            </span> */}

            <div className='image__container_cardOrder'>
                <img src={Image} alt={title} />
            </div>

            <span>
                {title} {quantity !== 1 ? quantity + 'x' : ''}
            </span>

            <span className='card__price_cardOrder'>$ {price * quantity}</span>

            {/* <h4 className='card__title'>
                {title} . <span className='card__price'>$ {price}</span>
            </h4> */}
        </div>
    )
}

export default CardOrder
