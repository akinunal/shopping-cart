import React from 'react';
import './App.css';
import ProductContainer from './Components/ProductContainer/ProductContainer'

class App extends React.Component {


  render() {

    return (
      <div className="App">
        <div className='h1Box'>
          <a className='homepage' href='http://localhost:3000/'><h1>FEATURED PRODUCTS</h1></a>
        </div>
        <ProductContainer />
      </div>
    );
  }
}

export default App;
