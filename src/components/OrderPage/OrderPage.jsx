import React, { useState, useCallback, useEffect } from 'react'
import './OrderPage.scss'


import CardOrder from '../CardOrder/CardOrder'
import { useTelegram } from '../../hooks/useTelegram'
import { serverIP, port } from '../../constants/api.js'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'

// import Cart from '../Cart/Cart'

const OrderPage = () => {
    const tele = window.Telegram.WebApp
    const { tg, queryId } = useTelegram()
    const navigate = useNavigate()

    tele.MainButton.text = 'VIEW ORDER'
    const location = useLocation()
    const cartItems = location.state.cartItems

    console.log('cartItems :>> ', cartItems)
    // const { cartItems, totalPrice, queryId } = data

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return (acc += item.price)
        }, 0)
    }

    // const totalPrice = getTotalPrice(cartItems)

    useEffect(() => {
        tele.ready()
    })

    const onCheckout = useCallback(() => {
        console.log('onCheckout = useCallback :>> ')
        // const onSendData = useCallback(() => {
        const data = {
            products: cartItems,
            totalPrice: getTotalPrice(cartItems),
            queryId,
        }
        console.log('data :>> ', data)
        // fetch('http://85.119.146.179:8000/web-data', {

        let shopDataRoute = `${serverIP}:${port}/web-data`
        console.log('shopDataRoute :>> ', shopDataRoute)

        fetch(shopDataRoute, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        navigate('/form', { state: data })
    }, [cartItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onCheckout)
        return () => {
            tg.offEvent('mainButtonClicked', onCheckout)
        }
    }, [onCheckout])
    return (
        <>
            <h1 className='heading'>Your Order </h1>

            <div className='cardsOrder__container'>
                {cartItems.map((food) => {
                    return <CardOrder food={food} key={food.id} />
                })}
            </div>

            {/* <Cart cartItems={cartItems} onCheckout={onCheckout} /> */}

            <Link to='/form' state={{ cartItems }} className='nav-link'>
                <Button
                    title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onCheckout}
                />
            </Link>
        </>
    )
}

export default OrderPage
