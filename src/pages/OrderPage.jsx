import { useState, useCallback, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
import { Button } from '../components/Button'
import { CardRow } from '../components/CardRow'
import { useTelegram } from '../hooks/useTelegram'
import { useNavigator } from '../hooks/useNavigator'

export const OrderPage = () => {
    const { tele } = useTelegram()
    const navigate = useNavigate()
    const { env } = useNavigator()

    tele.MainButton.text = 'CHECKOUT'
    const location = useLocation()
    const cartItems = location.state.cartItems

    const [value, setValue] = useState('')

    useEffect(() => {
        tele.ready()
    })
    const handleChange = (event) => {
        setValue(event.target.value)
    }

    const onSubmit = useCallback(() => {
        navigate('/checkout', { state: { cartItems } })
    }, [cartItems])

    const onBackButtonClicked = useCallback(() => {
        // navigate(-1)
        navigate('/')
    }, [cartItems])

    useEffect(() => {
        tele.onEvent('mainButtonClicked', onSubmit)
        tele.onEvent('backButtonClicked', onBackButtonClicked)
 
        return () => {
            tele.offEvent('mainButtonClicked', onSubmit)
        }
    }, [onSubmit])

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    const styles = {
        overflow: 'hidden',
        overflowWrap: 'break-word',
        height: '46px',
    }
    
    

    return (
        <div className='orderPage'>
            <div className='orderHeaderEdit'>
                <h1 className='title'>Your Order </h1>
                <Link to='/' title='Edit' className='navLinkEdit'>
                    Edit
                </Link>
            </div>

            <div className='cardsContainer'>
                {cartItems.map((food) => {
                    return <CardRow food={food} key={food.id} />
                })}
            </div>

            <div className='cafe-text-field-wrap'>
                <input
                    className='cafe-text-field js-order-comment-field cafe-block'
                    rows='1'
                    placeholder='Add comment…'
                    style={styles}
                    type='text'
                    value={value}
                    onChange={handleChange}
                />

                <div className='cafe-text-field-hint'>
                    Any special requests, details, final wishes etc.
                </div>
            </div>

            {env == 'brow' && (
                <Button
                    title={`${cartItems.length !== 0 ? `Buy ${totalPrice.toFixed(2)} $` : ''} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onSubmit}
                />
            )}
        </div>
    )
}
