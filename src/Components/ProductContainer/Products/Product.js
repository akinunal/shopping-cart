import React from 'react'
import './Product.css'
import Button from '../../Button/Button'

const products = props => {
    let width, imgStyle, divSize, fullScreen

    if (props.size) {
        width = { width: '45%' };
        imgStyle = {
            width: '450px',
            height: '250px'
        };
        divSize = { height: '150%' }
    } else {
        width = { width: '20%' };
        imgStyle = {
            width: '200px',
            height: '150px'
        }
    }

    if (props.fullScreen) {
        fullScreen = {
            position: 'absolute',
            width: '100%',
            height: '100vh',
            top: '0%',
            left: '0%'
        }
    }

    return (
        <div style={width} className='products'>
            <div className='imageBox' style={divSize}>
                <img src={props.img} alt='imagePhoto' style={{ ...imgStyle, ...fullScreen }} className='image' onClick={props.clickFullScreen} />
            </div>
            <h2 className='productName'>{props.name}</h2>
            <p className='productPrice'>{'$' + props.price}</p>
            <Button click={props.click} />
        </div>
    )
}

export default products