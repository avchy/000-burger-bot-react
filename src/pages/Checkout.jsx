import React, { useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
import { serverIP, port } from '../constants/api.js'
import { Button } from '../components/Button'
import { CardRow } from '../components/CardRow'
import { getTotalPrice } from '../utils/utils'
import { useTelegram } from '../hooks/useTelegram'

export function Checkout() {
    // const navigate = useNavigate()
    const { tg, queryId } = useTelegram()

    const location = useLocation()
    const cartItems = location.state.cartItems
    console.log('cartItems333 :>> ', cartItems)

    const onSubmit = useCallback(() => {
        console.log('onSubmit = useCallback :>> ')
        // const onSendData = useCallback(() => {

        // fetch('http://85.119.146.179:8000/web-data', {

        const shopDataRoute = `${serverIP}:${port}/web-data`
        console.log('shopDataRoute :>> ', shopDataRoute)

        const data = {
            products: cartItems,
            totalPrice: getTotalPrice(cartItems),
            queryId,
        }

        fetch(shopDataRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        // navigate('/form', { state: data })
    }, [cartItems])

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <>
            <>
                <h1 className='heading'>Your Order </h1>

                <div className='cardsOrder__container'>
                    {cartItems.map((food) => {
                        return <CardRow food={food} key={food.id} />
                    })}
                    <br /> <span className=''>Total Price: ${totalPrice.toFixed(2)}</span>
                </div>

                {/* <Link to='/form' state={{ cartItems }} className='nav-link'> */}
                <Button
                    title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
                {/* </Link> */}
            </>
        </>
    )
}
