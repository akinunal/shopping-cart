import React from 'react'
import './Invoice.css'

const invoice = props => {

    return (
        props.print ? <div className='invoice'>
            <h3>YOUR INVOICE</h3>
            <div>
                <p>Hello, Customer</p>
                <p>Your order will cost <span>${props.price}</span></p>
            </div>
        </div > : null
    )
}

export default invoice