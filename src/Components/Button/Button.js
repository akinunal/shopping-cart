import React from 'react'
import './Button.css'

const button = props => {
    return (
        <button className='productButton' onClick={props.click}>ADD TO CART</button>
    )
}

export default button