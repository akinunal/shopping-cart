import React from 'react'
import './ShoppingCart.css'
import List from './ShoppingCartList'

const ShoppingCart = props => {
    return (
        <div className='shoppingCart'>
            <div className='wrapper'>
                <h3>YOUR CART</h3></div>
            <List items={props.items} deleteItem={props.deleteItem} />
            <p className='price'>$ {props.totalAmount}</p>
            <button
                onClick={props.click}
                className='checkoutButton'>Checkout</button>
        </div>
    )
}

export default ShoppingCart