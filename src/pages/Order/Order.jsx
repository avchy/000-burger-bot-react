import { useCallback, useEffect } from 'react'
import './Order.scss'
import Button from '../../components/Button/Button'
import { CardRow } from '../../components/CardRow/CardRow'
import { useTelegram } from '../../hooks/useTelegram'
import { useLocation, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export const Order = () => {
    const tele = window.Telegram.WebApp
    const { tg } = useTelegram()
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
        tg.onEvent('mainButtonClicked', onSubmit)
        return () => {
            tg.offEvent('mainButtonClicked', onSubmit)
        }
    }, [onSubmit])

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <>
<Link to="/" title="Edit" className="nav-link">Edit</Link>

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
