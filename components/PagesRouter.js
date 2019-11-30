import React from 'react';
import { Route } from 'react-router-dom';
import '../App.css'
import Page_Start from '../Pages/Page_Start';
/*import Page_Products from './pages/Page_Products';
import Page_Product from './pages/Page_Product';
import Page_Basket from './pages/Page_Basket';*/
import Page_Registration from "../Pages/Page_Registartion";
class PagesRouter extends React.Component {
          
    render() {
      console.log('render PagesRouter');
  
      return (
        <div className='Route'>
          <Route path="/" exact component={Page_Start} />

          {/*<Route path="/depos" component={Page_Products} />

          <Route path="/kred" component={Page_Registration} />
          <Route path="/kard" component={Page_Basket} />
          <Route path="/about" component={Page_Basket} />
          <Route path="/" component={Page_Start} />

      <Route path="/products" component={Page_Products} />*/}

      <Route path="/registration" component={Page_Registration} />

        </div>
      );
      
    }
  
  }
      
  export default PagesRouter;