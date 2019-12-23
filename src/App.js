import React from 'react';
import './App.css';
import ProductContainer from './Components/ProductContainer/ProductContainer';
import { BrowserRouter } from 'react-router-dom';

class App extends React.Component {

  render() {

    return (
    <BrowserRouter>
      <div className="App">
        <div className='h1Box'>
          <a className='homepageAnchor' href='http://localhost:3000/'><h1>FEATURED PRODUCTS</h1></a>
        </div>
        <ProductContainer />
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
