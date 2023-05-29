import { useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
import { Button } from '../components/Button'
import { CardRow } from '../components/CardRow'
import { useTelegram } from '../hooks/useTelegram'

export const Order = () => {
    const { tele } = useTelegram()
    const navigate = useNavigate()

    // tele.MainButton.text = 'VIEW ORDER'
    const location = useLocation()
    console.log('location!!!!!! :>> ', location)
    const cartItems = location.state.cartItems

    console.log('cartItems_Order :>> ', cartItems)

    useEffect(() => {
        tele.ready()
    })

    const onSubmit = useCallback(() => {
        console.log('onSubmit = useCallback :>> ')
        console.log('cartItems222 :>> ', cartItems)

        navigate('/checkout', { state: { cartItems } })
    }, [cartItems])

    const onBack = useCallback(() => {
        // navigate(-1)
        navigate('/')
    }, [cartItems])

    useEffect(() => {
        tele.onEvent('mainButtonClicked', onSubmit)
        return () => {
            tele.offEvent('mainButtonClicked', onSubmit)
        }
    }, [onSubmit])

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <>
            <Link to='/' title='Edit' className='nav-link'>
                Edit
            </Link>

            {/* <Button title={`edit`} type={'back'} onClick={onBack} /> */}

            <h1 className='heading'>Your Order </h1>
            <div className='cardsOrder__container'>
                {cartItems.map((food) => {
                    return <CardRow food={food} key={food.id} />
                })}
            </div>
            {/* <Cart cartItems={cartItems} onSubmit={onSubmit} /> */}
            {/* <br /> <span className=''>Total Price: ${totalPrice.toFixed(2)}</span> */}
            <Button
                title={`${cartItems.length !== 0 ? `Buy ${totalPrice.toFixed(2)} $` : ''} `}
                type={'checkout'}
                disable={cartItems.length === 0 ? true : false}
                onClick={onSubmit}
            />
        </>
    )
}
