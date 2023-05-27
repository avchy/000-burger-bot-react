import React from 'react'
import './Cart.scss'


import Button from '../Button/Button'
import { Link } from 'react-router-dom'

function Cart({ cartItems, onCheckout }) {
    const totalPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0)

    return (
        <div className='cart__container'>
            {cartItems.length === 0 ? 'No items in cart' : ''}
            <br /> <span className=''>Total Price: ${totalPrice.toFixed(2)}</span>
            
            <Link to='/order' state={{cartItems}} className='nav-link'>
            {/* <Link to={"/edit/" + props.word._id}>edit</Link>   */}

                <Button
                    title={`${cartItems.length === 0 ? 'Order !' : 'Checkout'} `}
                    type={'checkout'}
                    disable={cartItems.length === 0 ? true : false}
                    onClick={onCheckout}
                />
            </Link>
        </div>
    )
}

export default Cart
