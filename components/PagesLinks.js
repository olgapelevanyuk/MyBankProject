import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';


class PagesLinks extends React.Component {

  state = {
  }

          
  render() {

    return (
      <div className='Links'>
        <NavLink to="/" exact className={"showMenu"} activeClassName="ActivePageLink">
          <img src='../images/logo.png' />
        </NavLink>
        <NavLink to="/depos" className={"showMenu"} activeClassName="ActivePageLink">Депозиты</NavLink>
        <NavLink to="/cred" className={"showMenu"} activeClassName="ActivePageLink">Кредиты</NavLink>
        <NavLink to="/kard" className={"showMenu"} activeClassName="ActivePageLink">Платежные карты</NavLink>
        <NavLink to="/about" className={"showMenu"} activeClassName="ActivePageLink">О банке</NavLink>

        
        <NavLink to="/registration" className={"showMenu"} activeClassName="ActivePageLink">Вход/регистрация</NavLink>
        
        <NavLink to="/registration" className={"showMenu"} activeClassName="ActivePageLink">Заказ звонка</NavLink>

        <NavLink to="/registration" className={"showMenu"} activeClassName="ActivePageLink">{true? "Администратору" :
         Оператору}</NavLink>
        
      </div>
    );
    
  }

}
    

export default PagesLinks;