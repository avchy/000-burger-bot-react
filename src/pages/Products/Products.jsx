import { useState, useCallback, useEffect } from 'react'
import './Products.scss'

import Card from '../../components/Card/Card'
import Button from '../../components/Button/Button'
import { useTelegram } from '../../hooks/useTelegram'
import { Link, useNavigate } from 'react-router-dom'
// import { serverIP, port } from '../../constants/api.js'
// import Cart from '../Cart/Cart'

const { getData } = require('../../db/db')
const foods = getData()
const tele = window.Telegram.WebApp

tele.MainButton.text = 'VIEW ORDER'

export const Products = () => {
    const { tg, queryId } = useTelegram()

    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        tele.ready()
    })

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

    const onSubmit = useCallback(() => {
        console.log('onSubmit = useCallback :>> ')
        console.log('cartItems111111 :>> ', cartItems)
        navigate('/order', { state: { cartItems } })
    }, [cartItems])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSubmit)
        return () => {
            tg.offEvent('mainButtonClicked', onSubmit)
        }
    }, [onSubmit])
    return (
        <>
            <h1 className='heading'>Burger Shop !!!</h1>

            <div className='cards__container'>
                {foods.map((food) => {
                    return <Card food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
                })}
            </div>

            {/* <Cart cartItems={cartItems} onSubmit={onSubmit} /> */}

            {cartItems.length !== 0 && (
                // <Link to='/order' state={{ cartItems }} className='nav-link'>
                <Button
                    // title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                    title={`Order ! `}
                    type={'order'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
                // </Link>
            )}

            {/* navigate('/order', { state: cartItems }) */}
        </>
    )
}
