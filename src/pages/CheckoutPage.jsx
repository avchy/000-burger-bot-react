import React, { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import '../App.scss'
 // import { serverIP, port } from '../constants/api.js'
import { BigButton } from '../components/BigButton'
import { CardRowSmall } from '../components/CardRowSmall'
// import { getTotalPrice } from '../utils/utils'
import { useTelegram } from '../hooks/useTelegram'
import orderImg from '../images/orderImg.png'
import { useNavigator } from '../hooks/useNavigator'

export function CheckoutPage() {
    const { tele, queryId } = useTelegram()
    const { env } = useNavigator()
    tele.BackButton.show()
    tele.enableClosingConfirmation() 

    const [address, setAddress] = useState('')
    const [optionDelivery, setOptionDelivery] = useState('on_site')

    tele.expand() //расширяем на все окно
    tele.MainButton.text = 'PAY1'

    tele.MainButton.setParams({ color: '#143F6B', text: 'PAY' }) //так изменяются все параметры

    const location = useLocation()
    const cartItems = location.state.cartItems
    const comment = location.state.value

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

    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    useEffect(() => {
        tele.onEvent('mainButtonClicked', onSendData)
        return () => {
            tele.offEvent('mainButtonClicked', onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tele.MainButton.setParams({
            text: 'Send Data',
        })
    }, [])

    useEffect(() => {
        if (!address) {
            tele.MainButton.hide()
        } else {
            tele.MainButton.show()
        }
    }, [address])

    const onChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const onChangeOption = (e) => {
        setOptionDelivery(e.target.value)
    }

    return (
        <>
            <div className='checkoutPage'>
                <h1 className='title'>Checkout</h1>
                <div className='orderContainer'>
                    <div className='imageContainer'>
                        <img src={orderImg} alt={'orderImg'} />
                    </div>

                    <div className='textContainer'>
                        <div className='text1'> Order № {queryId||123123}</div>
                        {/* <div className='text1'> Order #462417901</div> */}
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
                <CardRowSmall
                    food={{ id: 1, title: 'Total Price:', price: totalPrice.toFixed(2) }}
                    key={0}
                />
            </div>

            {comment && (
                <div className='comment_container'>
                    <div className='title_mini'> Your Comment : </div>
                    <div className='text_small'>{comment}</div>
                </div>
            )}

            <div className={'form'}>
                <div className={'title_mini'}>Choose where you eat</div>

                <select value={optionDelivery} onChange={onChangeOption} className={'select'}>
                    <option className={'selectField'} value={'on_site'}>
                        On Site
                    </option>
                    <option className={'selectField'} value={'take_away'}>
                        Take Away
                    </option>
                </select>

                {optionDelivery == 'take_away' && (
                    <input
                        className={'input'}
                        type='text'
                        placeholder={'Address'}
                        value={address}
                        onChange={onChangeAddress}
                    />
                )}
            </div>

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
