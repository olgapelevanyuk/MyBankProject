import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter } from 'react-router-dom'

import appReducer from '../redux/appReducer';


let store=createStore(appReducer);

class MainPage extends React.PureComponent {
  componentDidMount(){
    if(!('bikesLocalStorage' in localStorage)){
    localStorage.bikesLocalStorage = JSON.stringify({basket:{}, user:null})
    }
  }        
  render() {
    console.log('MainPage render');
    return (
      <BrowserRouter>  
        <Provider store={store}>
        <div>
          </div>
         </Provider>
      </BrowserRouter>
    );
    
  }

}
    
export default MainPage;