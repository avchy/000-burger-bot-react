import { useCallback, useEffect } from 'react'
import './Order.scss'
import Button from '../../components/Button/Button'
import { ProductItemRow } from '../../components/ProductItemRow/ProductItemRow'
import { useTelegram } from '../../hooks/useTelegram'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export const Order = () => {
    const tele = window.Telegram.WebApp
    const { tg } = useTelegram()
    // const { tg, queryId } = useTelegram()
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
    return (
        <>
            <h1 className='heading'>Your Order </h1>

            <div className='cardsOrder__container'>
                {cartItems.map((food) => {
                    return <ProductItemRow food={food} key={food.id} />
                })}
            </div>

            {/* <Cart cartItems={cartItems} onSubmit={onSubmit} /> */}

            {/* <Link to='/form' state={{ cartItems }} className='nav-link'> */}
            <Button
                title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                type={'checkout'}
                disable={cartItems.length === 0 ? true : false}
                onClick={onSubmit}
            />

            <Button title={`edit`} type={'back'} onClick={onBack} />

            {/* </Link> */}
        </>
    )
}
