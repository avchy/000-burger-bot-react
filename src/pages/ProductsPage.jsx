import { useState, useCallback, useEffect } from 'react'
import '../App.scss'
import { CardColumn } from '../components/CardColumn'
import { Button } from '../components/Button'
import { useTelegram } from '../hooks/useTelegram'
import { Link, useNavigate } from 'react-router-dom'

const { getData } = require('../db/db')
const foods = getData()
const tele = window.Telegram.WebApp

console.log('window.Telegram :>> ', window.Telegram)
console.log('window.Telegram.WebApp :>> ', window.Telegram.WebApp)
console.log('tele.MainButton :>> ', tele.MainButton)
tele.MainButton.text = 'VIEW ORDER'

export const ProductsPage = () => {
    const [env, setEnv] = useState('init')
    useEffect(() => {
        navigator.sayswho = (function () {
            const ua = navigator.userAgent
            let tem
            let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || []
                return 'IE ' + (tem[1] || '')
            }
            if (M[1] === 'Chrome') {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
                if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera')
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
            if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
            return M.join(' ')
        })()

        console.log('navigator.sayswho', navigator.sayswho)

        setEnv(navigator.sayswho)
    }, [])

    const { tele } = useTelegram()

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
            <h1 className='title'>Burger Shop !!!</h1>
            <h1 className='title'> {env}</h1>

            <div className='cards_container'>
                {foods.map((food) => {
                    return (
                        <CardColumn food={food} key={food.id} onAdd={onAdd} onRemove={onRemove} />
                    )
                })}
            </div>

            {cartItems.length !== 0 && (
                <Button
                    title={`OrderPage ! `}
                    type={'order'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
            )}
        </div>
    )
}
