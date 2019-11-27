import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom';
import PagesLinks from "../components/PagesLinks";
import PagesRouter from "../components/PagesRouter";

import appReducer from '../redux/appReducer';


let store=createStore(appReducer);

class MainPage extends React.PureComponent {
  componentDidMount(){
  }        
  
  render() {
    return (
      <BrowserRouter>  
        <Provider store={store}>
          <div className='App' >
            <PagesLinks />
            <PagesRouter />
            <Footer />
          </div>
         </Provider>
      </BrowserRouter>
    );
    
  }

}
    
export default MainPage;