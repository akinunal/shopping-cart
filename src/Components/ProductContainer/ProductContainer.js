import React from 'react'
import './ProductContainer.css'
import Product from '../Product/Product'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import Invoice from '../Invoice/Invoice'
import { Lightbox } from "react-modal-image";
import { Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import ProductDetails from '../ProductDetails/ProductDetails';

class ProductContainer extends React.Component {
    state = {
        products: [],
        selectedItems: [],
        totalPrice: 0,
        isPrinted: false,
        isFiltered: false,
        isLoading: true,
        originalSort: [],
        biggerProducts: false,
        open: false,
        activeProduct: {},
        descriptionModal: false
    }

    componentDidMount() {
        this.fetchUsers();
        // const data = localStorage.getItem('data')
        // this.setState({
        //     totalPrice: data
        // })
    }

    fetchUsers() {
        setTimeout(() => {
            fetch(`https://my-json-server.typicode.com/jubs16/Products/Products`)
                .then(response => response.json())
                .then(data => this.setState({
                    products: data,
                    isLoading: false,
                    originalSort: data
                })
                ).catch(error => console.log(error))
        }, 3000);
    }

    selectItemHandler = (num) => {
        let copyPro = this.state.products[num];
        let copySel = this.state.selectedItems;

        this.setState((prevState) => {
            return {
                selectedItems: [...copySel, copyPro],
                totalPrice: prevState.totalPrice + copyPro.price,
                isPrinted: false
            }
        })
    }

    printInvoiceHandler = () => {
        this.setState({
            isPrinted: true
        })
    }

    showTwoItems = () => {
        this.setState({
            biggerProducts: true
        })
    }

    showFourItems = () => {
        this.setState({
            biggerProducts: false
        })
    }

    sortPriceHandler = () => {
        const { products, isFiltered } = this.state
        const copyOfPrices = [...products]
        const secondCopyOfPrices = [...products]
        const copyFiltered = !isFiltered

        this.setState({
            isFiltered: copyFiltered
        })

        if (!isFiltered) {
            this.setState({ products: copyOfPrices.sort((a, b) => a.price > b.price ? 1 : -1) })
        } else {
            this.setState({ products: secondCopyOfPrices.sort((a, b) => a.price > b.price ? -1 : 1) })
        }
    }

    sortByOriginalHandler = () => {
        this.setState({
            products: this.state.originalSort
        })
    }

    deleteFromShoppingCard = (index) => {
        const selectItem = [...this.state.selectedItems];
        const itemPrice = this.state.selectedItems[index].price;
        selectItem.splice(index, 1)
        this.setState((prevState) => {
            return {
                selectedItems: selectItem,
                totalPrice: prevState.totalPrice - itemPrice,
                isPrinted: false
            }
        })
    }

    modalHandler = (product) => {
        this.setState({
            open: true,
            activeProduct: product
        })
    }

    descriptionModalHandler = (product) => {
        this.setState({
            descriptionModal: true,
            activeProduct: product
        })
    }

    // storeDataHandler = () => {
    //     let newData = this.state.selectedItems.map(el => el.price)
    //     localStorage.setItem('data', newData.reduce((a,b) => a + b))
    //     console.log(newData)
    // }

    render() {
        let styleButtons = {
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '2px solid white',
            fontSize: '120%'
        }
        
        return (
            < div className='fullContainer' >
                {this.state.descriptionModal && (
                <ProductDetails 
                    close={() => this.setState({ descriptionModal: false })}
                    product={this.state.activeProduct}
                />
                )}

                {this.state.open && (
                    <Lightbox
                        medium={this.state.activeProduct.imgUrl}
                        large={this.state.activeProduct.imgUrl}
                        alt={this.state.activeProduct.name}
                        onClose={() => this.setState({ open: false })}
                    />
                )}

                <div className='productContainer'>
                    <div className='buttonContainer'>
                        <button style={styleButtons}
                            onClick={this.showTwoItems}>Show 2 items</button>|
                        <button style={styleButtons}
                            onClick={this.showFourItems}>Show 4 items</button>|
                        <button style={styleButtons}
                            onClick={this.sortPriceHandler}>Sort by price</button>|
                        <button style={styleButtons}
                            onClick={this.sortByOriginalHandler}>Sort by original</button>
                    </div>
                    <div className='productsContainer'>
                        {!this.state.isLoading ? (this.state.products.map((el, i) => {
                            return (
                                <Product
                                    product={el}
                                    click={this.selectItemHandler.bind(this, i)}
                                    key={i}
                                    size={this.state.biggerProducts}
                                    selectedIndex={i}
                                    onClick={() => this.modalHandler(el)}
                                    clickedProduct={() => this.descriptionModalHandler(el)} />
                            )
                        })) : <Spinner />
                        }
                    </div>
                </div>
                <div className='rightContainer'>
                    <ShoppingCart
                        items={this.state.selectedItems}
                        totalAmount={this.state.totalPrice}
                        click={this.printInvoiceHandler}
                        storeData={this.storeDataHandler}
                        deleteItem={(i) => this.deleteFromShoppingCard(i)}
                    />
                    <Invoice print={this.state.isPrinted} price={this.state.totalPrice} />
                </div>
            </div >
        )
    }
}

export default ProductContainer