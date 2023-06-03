import { useState, useCallback, useEffect } from 'react'
import '../App.scss'
import { CardColumn } from '../components/CardColumn'
import { BigButton } from '../components/BigButton'
import { useTelegram } from '../hooks/useTelegram'
import { useNavigator } from '../hooks/useNavigator'
import { Link, useNavigate } from 'react-router-dom'

const { getData } = require('../db/db')
const foods = getData()
const tele = window.Telegram.WebApp

console.log('window.Telegram :>> ', window.Telegram)
console.log('window.Telegram.WebApp :>> ', window.Telegram.WebApp)
console.log('tele.MainButton :>> ', tele.MainButton)
tele.MainButton.text = 'VIEW ORDER'
tele.enableClosingConfirmation() 

export const ProductsPage = () => {
    const { tele } = useTelegram()
    const { env } = useNavigator()

    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        tele.ready()
    })

    const onAdd = (food) => {
        if (food.length === 0) {
            tele.MainButton.hide()
        } else {
            tele.MainButton.show()
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
            tele.MainButton.hide()
        } else {
            tele.MainButton.show()
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
        tele.onEvent('mainButtonClicked', onSubmit)
        return () => {
            tele.offEvent('mainButtonClicked', onSubmit)
        }
    }, [onSubmit])
    return (
        <div className='productsPage'>
            <h1 className='title'>Burger Shop</h1>
             {/* <h1 className='title'>env222 = {env}</h1> */}

            <div className='cards_container'>
                {foods.map((food) => {
                    return (
                        <CardColumn food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
                    )
                })}
            </div>


 
            {cartItems.length !== 0 && env == "brow" && (
                <BigButton
                    title={`Order`}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
            )}
        </div>
    )
}
