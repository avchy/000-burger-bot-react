import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
// import { serverIP, port } from '../constants/api.js'
import { BigButton } from '../components/BigButton'
import { CardRowSmall } from '../components/CardRowSmall'
import { Form } from '../components/Form'
// import { getTotalPrice } from '../utils/utils'
import { useTelegram } from '../hooks/useTelegram'
import orderImg from '../images/orderImg.png'
import { useNavigator } from '../hooks/useNavigator'

export function CheckoutPage() {
    // const navigate = useNavigate()
    const { tele, queryId } = useTelegram()
    const { env } = useNavigator()
    tele.BackButton.show()

    tele.expand() //расширяем на все окно
    // tele.MainButton.text = "Changed Text"; //изменяем текст кнопки
    tele.MainButton.text = 'PAY1'

    tele.MainButton.setParams({ color: '#143F6B', text: 'PAY' }) //так изменяются все параметры

    const location = useLocation()
     const cartItems = location.state.cartItems
    console.log('cartItems333 :>> ', cartItems)

    const onSendData = useCallback(() => {
        tele.sendData('some string that we need to send')

        // const shopDataRoute = `${serverIP}:${port}/web-data`
        // console.log('shopDataRoute :>> ', shopDataRoute)

        // const data = {
        //     products: cartItems,
        //     totalPrice: getTotalPrice(cartItems),
        //     queryId,
        // }

        // fetch(shopDataRoute, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
    }, [cartItems])

    useEffect(() => {
        tele.onEvent('mainButtonClicked', onSendData)
        return () => {
            tele.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    const openForm = () => {}

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <>
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

                <CardRowSmall food={{ id: 9999, title: 'Free delivery' }} key={9999} />
                {/* <CardRowSmall food={{ id: 9998, title: 'comment:', comment   }} key={9998} /> */}
                <CardRowSmall
                    food={{ id: 1, title: 'Total Price:', price: totalPrice.toFixed(2) }}
                    key={0}
                />
            </div>

            {/* isSentToAdress  */}

            <Form />

            {env == 'brow' && (
                <BigButton
                    title={`${'Checkout'} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSendData}
                />
            )}
        </>
    )
}
