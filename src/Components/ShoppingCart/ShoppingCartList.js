import React from 'react'
import './ShoppingCartList.css'

const ShoppingCartList = props => {
    return (
        <div className='shoppingCartList'>
            <ul>
                {props.items.map((el, i) => <li className='list' onClick={props.deleteItem.bind(this, i)}>{el.name}</li>)}
            </ul>
        </div>
    )
}

export default ShoppingCartList