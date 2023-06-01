import React, { useState, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
import { serverIP, port } from '../constants/api.js'
import { Button } from '../components/Button'
import { CardRowSmall } from '../components/CardRowSmall'
import { getTotalPrice } from '../utils/utils'
import { useTelegram } from '../hooks/useTelegram'
import orderImg from '../images/orderImg.png'
import { useNavigator } from '../hooks/useNavigator'

export function CheckoutPage() {
    // const navigate = useNavigate()
    const { tele, queryId } = useTelegram()
    const { env } = useNavigator()
    tele.MainButton.text = 'PAY'

    const location = useLocation()
    const cartItems = location.state.cartItems
    console.log('cartItems333 :>> ', cartItems)

    const onSubmit = useCallback(() => {
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
    }, [cartItems])

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <div className='checkoutPage'>
            <h1 className='title'>Checkout</h1>
            <div className='orderContainer'>
                <div className='imageContainer'>
                    <img src={orderImg} alt={'orderImg'} />
                </div>

                <div className='textContainer'>
                    <div className='text1'> Order #462417901</div>
                    <div className='text1'> Perfect lunch from Burger Bot.</div>
                    <div className='text_small'>Burger Bot.</div>
                </div>
            </div>
            <div className='cardsContainer'>
                {cartItems.map((food) => {
                    return <CardRowSmall food={food} key={food.id} />
                })}
            </div>
            <br /> <span className='totalPrice'>Total Price: ${totalPrice.toFixed(2)}</span>
            {env == 'brow' && (
                <Button
                    title={`${'Checkout'} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
            )}
        </div>
    )
}
