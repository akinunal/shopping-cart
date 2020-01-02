import React from 'react';
import { Link } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = (props) => {
    return (
        <div className='detailContainer'>
            <div className='imgBox'>
                <img src={props.product.imgUrl} alt='Product-picture' />
            </div>
            <div className='descriptionContainer'>
                <div className='descriptionBox'>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed pharetra hendrerit faucibus. Praesent id laoreet est. 
                    Aliquam ac dignissim neque. Pellentesque habitant morbi 
                    tristique senectus et netus et malesuada fames ac turpis egestas. 
                    Praesent in vulputate lacus. Mauris porttitor quam nec condimentum porta. 
                    Donec a neque ut metus dictum efficitur. Vivamus nisl enim, rhoncus at bibendum sed, 
                    placerat ut ante. Vivamus suscipit augue ante, sed ornare turpis vestibulum id. 
                    Sed vitae sagittis nulla, non viverra erat. Vestibulum ante ipsum primis 
                    in faucibus orci luctus et ultrices posuere cubilia Curae; 
                    Suspendisse eget auctor lorem, non sagittis leo.</p>
                </div>
                <div className='optionBox'>
                    <div className='colorBox'>
                        <p className='colorText'>Please select a color</p>
                        <Link to={`/product/${props.product.name}/red`} className='colorButton red'/>
                        <Link to={`/product/${props.product.name}/blue`} className='colorButton blue'/>
                        <Link to={`/product/${props.product.name}/black`} className='colorButton black'/>
                    </div>
                    <div className='numberBox'>
                    <p className='numberText'>Please select a number</p>
                        <select name="numbers">
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='closeButton'><Link to='/' onClick={props.close} style={{textDecoration: 'none', color: 'white'}}>X</Link></div>
        </div>
    )
}

export default ProductDetails