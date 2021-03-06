import React from 'react';
import './Product.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';

const products = props => {
    let width, imgStyle, divSize;

    if (props.size) {
        width = { width: '45%' };
        imgStyle = {
            width: '100%',
            height: '250px'
        };
        divSize = { height: '150%' }
    } else {
        width = { width: '20%' };
        imgStyle = {
            width: '100%',
            height: '150px'
        }
    }

    return (
        <div style={width} className='products'>
            <div className='imageBox' style={divSize}>
                <img src={props.product.imgUrl} alt='imagePhoto' style={{ ...imgStyle }} className='image' onClick={props.onClick} />
            </div>
            <Link to={`/product/${props.product.name}`} className='productName' onClick={props.clickedProduct}>{props.product.name}</Link>
            <p className='productPrice'>{'$' + props.product.price}</p>
            <Button click={props.click} />
        </div>
    )
}

export default products