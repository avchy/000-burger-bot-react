// import React, { useState, useCallback } from 'react'
import '../App.scss'
// import Button from '../Button'

export function CardRow({ food }) {
    const { title, Image, price, id, quantity } = food

    return (
        <div className='CardRow'>
            {/* <div className='card'> */}
            {/* <span className={`${quantity !== 0 ? 'card__badge' : 'card__badge--hidden'}`}>
                {quantity}
            </span> */}

            <div className='image__container'>
                <img src={Image} alt={title} />
            </div>

            <span>
                {title} {quantity !== 1 ? quantity + 'x' : ''}
            </span>

            <span className='card__price'>$ {price * quantity}</span>

            {/* <h4 className='card__title'>
                {title} . <span className='card__price'>$ {price}</span>
            </h4> */}
        </div>
    )
}
