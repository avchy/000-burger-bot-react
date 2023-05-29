import React, { useState } from 'react'
import '../App.scss'
import { Button } from './Button'

export function CardColumn({ food, onAdd, onRemove }) {
    const [count, setCount] = useState(0)
    const { title, Image, price, id } = food

    const handleIncrement = () => {
        setCount(count + 1)
        onAdd(food)
    }
    const handleDecrement = () => {
        setCount(count - 1)
        onRemove(food)
    }

    return (
        <div className='CardColumn'>
            <span className={`${count !== 0 ? 'card__badge' : 'card__badge--hidden'}`}>
                {count}
            </span>
            <div className='image__container'>
                <img src={Image} alt={title} />
            </div>
            <h4 className='card__title'>{title}</h4>
            <p className='card__price'>$ {price}</p>

            <div className='btn-container'>
                <Button title={'+'} type={'add'} onClick={handleIncrement} />
                {count !== 0 ? (
                    <Button title={'-'} type={'remove'} onClick={handleDecrement} />
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
