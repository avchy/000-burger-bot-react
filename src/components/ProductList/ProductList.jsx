import React, { useState, useCallback, useEffect } from 'react'
import './ProductList.scss'


import Card from '../Card/Card'
import Button from '../Button/Button'
import { useTelegram } from '../../hooks/useTelegram'
import { useNavigate } from 'react-router-dom'
import { serverIP, port } from '../../constants/api.js'
import { Link } from 'react-router-dom'
// import Cart from '../Cart/Cart'

const { getData } = require('../../db/db')
const foods = getData()
const tele = window.Telegram.WebApp

tele.MainButton.text = 'VIEW ORDER'

const ProductList = () => {
    const { tg, queryId } = useTelegram()

    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        tele.ready()
    })

    const getTotalPrice = (items = []) => {
        return items.reduce((acc, item) => {
            return (acc += item.price)
        }, 0)
    }

    const onAdd = (food) => {
        if (food.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }

        const exist = cartItems.find((x) => x.id === food.id)
        if (exist) {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity + 1 } : x,
                ),
            )
        } else {
            setCartItems([...cartItems, { ...food, quantity: 1 }])
        }
        // console.log('cartItems :>> ', cartItems)
    }

    const onRemove = (food) => {
        if (food.length === 0) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }

        const exist = cartItems.find((x) => x.id === food.id)
        if (exist.quantity === 1) {
            setCartItems(cartItems.filter((x) => x.id !== food.id))
        } else {
            setCartItems(
                cartItems.map((x) =>
                    x.id === food.id ? { ...exist, quantity: exist.quantity - 1 } : x,
                ),
            )
        }
    }

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
        // navigate('/order', { state: data })
        navigate('/order', { state: cartItems })
    }, [cartItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onCheckout)
        return () => {
            tg.offEvent('mainButtonClicked', onCheckout)
        }
    }, [onCheckout])
    return (
        <>
            <h1 className='heading'>Burger Shop !!!</h1>

            <div className='cards__container'>
                {foods.map((food) => {
                    return <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
                })}
            </div>

            {/* <Cart cartItems={cartItems} onCheckout={onCheckout} /> */}

            {cartItems.length !== 0 && (
                <Link to='/order' state={{ cartItems }} className='nav-link'>
                    <Button
                        title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                        type={'checkout'}
                        disable={cartItems.length === 0 ? true : false}
                        onClick={onCheckout}
                    />
                </Link>
            )}

            {/* navigate('/order', { state: cartItems }) */}
        </>
    )
}

export default ProductList
