import React from 'react'
import './ProductContainer.css'
import Product from '../Products/Product'
import ShoppingCart from '../ShoppingCart/ShoppingCart'
import Invoice from '../Invoice/Invoice'
import ModalImage from "react-modal-image";

class ProductContainer extends React.Component {
    state = {
        products: [],
        selectedItems: [],
        totalPrice: 0,
        isPrinted: false,
        isFiltered: false,
        isLoading: true,
        originalSort: [],
        biggerProducts: false
    }

    componentDidMount() {
        this.fetchUsers();
    }

    componentDidUpdate() {
        console.log(this.state.products)
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
        }, 2000);
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

    selectProduct = (event) => {
        console.log(event.target.src)
        return (
            <ModalImage
                small={event.target.src}
                alt="Hello World!"
            />
        )
    }

    render() {
        let styleButtons = {
            padding: '10px 20px',
            backgroundColor: 'white',
            border: '2px solid white',
            fontSize: '120%'
        }

        return (

            <div className='fullContainer'>
                <div className='productContainer'>
                    <div className='buttonContainer'>
                        <button style={styleButtons}
                            onClick={this.showTwoItems}>Show 2 items</button>|
                        <button style={styleButtons}
                            onClick={this.showFourItems}>Show 4 items</button>|
                        <button style={styleButtons} onClick={this.sortPriceHandler}>Sort by price</button>|
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
                                    onClick={(event) => this.selectProduct(event)} />
                            )
                        })) : <h1 style={{ fontSize: '300%', marginTop: '100px' }}>LOADING PRODUCTS...</h1>
                        }
                    </div>
                </div>
                <div className='rightContainer'>
                    <ShoppingCart
                        items={this.state.selectedItems}
                        totalAmount={this.state.totalPrice}
                        click={this.printInvoiceHandler}
                        deleteItem={(i) => this.deleteFromShoppingCard(i)}
                    />
                    <Invoice print={this.state.isPrinted} price={this.state.totalPrice} />
                </div>
            </div>
        )
    }
}

export default ProductContainer