import React from 'react'
import './ShoppingCartList.css'

const shoppingCart = props => {
    return (
        <div className='shoppingCartList'>
            <ul>
                {props.items.map(el => <li className='list' onClick={props.deleteItem}>{el.name}</li>)}
            </ul>
        </div>
    )
}

export default shoppingCart