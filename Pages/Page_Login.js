import React from 'react';
import {connect} from 'react-redux';
import {deleteData, postData, patchData, getData} from '../utils/utils';
import { USERS_LOADING, USERS_LOADED, acSetCurrentUser } from '../constants/actionTypes';

import { NavLink } from 'react-router-dom';
class Page_Login extends React.PureComponent {

    async componentDidMount(){
        console.log(USERS_LOADING);
        this.props.dispatch({
            type: USERS_LOADING,
        });
            let usersList = await getData('users');
        this.props.dispatch({
            type: USERS_LOADED,
            data: usersList,
        });           
    }        


  state = {
      login : {value: '', errorMessage: ''},
      password : {value: '', errorMessage: ''},
  }

  
validateLogin = (e, withValidate = false) => {
    const value = e.target.value.trim();
    const newState = {value: value};
    if(withValidate && value && !this.props.users.list.some(user => value === user.login)) {
    
      newState.errorMessage = "Пользователь с таким логином не найден";
    }
    else {
      newState.errorMessage = '';
    }
    
    this.setState({...this.state,
      login: newState,
      password: {value: '', errorMessage: ''},
    });
}

validatePassword = (e, withValidate = false) => {
    const value = e.target.value.trim();
    const {users} = this.props;
    const newState = {value: value};
    if(value && withValidate && !users.list.some(user => (this.state.login.value === user.login && 
        value === user.password))) {
        newState.errorMessage = 'Введен неверный пароль';
    }
    else {
        newState.errorMessage = '';
    }
    
    this.setState({...this.state,
        password: newState,
        
      });
}

login =  () => {
    this.props.users.list.forEach(user => {
        if(this.state.login.value === user.login){
            this.props.dispatch(acSetCurrentUser(user));
            alert('Вы вошли');
        }
    })
    
}

  render() {

    const stateKeys = Object.keys(this.state);
    const formValid = stateKeys.every(key => (this.state[key].value.length && 
        !this.state[key].errorMessage.length)) && 
        this.props.users.list.some(user => user.login === this.state.login.value && 
            user.password === this.state.password.value);


    return (
    this.props.users.loading && 
            (<div>Идет загрузка</div>) || 
            (
        <div>
            <div>
                <label>Логин</label>
                <input type="text" onChange={this.validateLogin} value={this.state.login.value}
                onBlur={(e) => this.validateLogin(e, true)}
                />
    <span>{this.state.login.errorMessage}</span>
            </div>
            <div>
            <label>Пароль</label>
            <input type="password" onChange={this.validatePassword} value={this.state.password.value}/>
            <span>{this.state.password.errorMessage}</span>
            </div>    
                      <div>
            {formValid &&  
                <button onClick={formValid ? this.login: null} className={formValid ? 'active': 'disabled'}>
                Войти
                </button>
  }
                <NavLink to='/registration' >
                    Зарегистрироваться
                </NavLink>
            </div>
        </div>
            )
    );
    
  }

}
    
export default connect(
    state => ({
        users: state.users,
    })
)(Page_Login);