import React from 'react';
import {connect} from 'react-redux';

class Page_Registration extends React.PureComponent {
  componentDidMount(){
  }        


  state = {
      surname : {value: '', errorMessage: ''},
      firstName : {value: '', errorMessage: ''},
      lastName : {value: '', errorMessage: ''},
      eMail : {value: '', errorMessage: ''},
      phone : {value: '', errorMessage: ''},
      password : {value: '', errorMessage: ''},
      passwordConfirm : {value: '', errorMessage: ''},
  }

  validateSurname = value => {
      const newState = {value: value};
      if(!value.length) {
        newState.errorMessage = 'Поле не может быть пустым';
      }
      else {
        newState.errorMessage = '';
      }
      this.setState({...this.state,
        surname: newState});
  }

  validateFirstName = value => {
    const newState = {value: value};
    if(!value.length) {
      newState.errorMessage = 'Поле не может быть пустым';
    }
    else {
      newState.errorMessage = '';
    }
    this.setState({...this.state,
      surname: newState});
}

validateLastName = value => {
    const newState = {value: value};
    if(!value.length) {
      newState.errorMessage = 'Поле не может быть пустым';
    }
    else {
      newState.errorMessage = '';
    }
    this.setState({...this.state,
      surname: newState});
}
/*
validateSurname = value => {
    const newSurnameState = {value: value};
    if(!value.length) {
      newState.errorMessage = 'Поле не может быть пустым';
    }
    else {
      newState.errorMessage = '';
    }
    this.setState({...this.state,
      surname: newState});
}
  
  */
  render() {
    return (
        <div>
            <div>
                <label>Фамилия</label>
                <input type="text" onChange={this.validateSurname} value={this.state.surname.value}/>
    <span>{this.state.surname.errorMessage}</span>
            </div>
            <div>
            <label>Имя</label>
            <input type="text" onChange={this.validateFirstName} value={this.state.firstName.value}/>
            <span>{this.state.firstName.errorMessage}</span>
            </div>
            <div>
            <label>Отчество</label>
            <input type="text" onChange={this.validateLastName} value={this.state.lastName.value}/ >
            <span>{this.state.lastName.errorMessage}</span>
            </div>
            <div>
            <label>e-mail</label>
            <input type="text" onChange={this.validateEMail} value={this.state.eMail.value}/ >
            <span>{this.state.eMail.errorMessage}</span>
            </div>
            <div>
            <label>Номер телефона</label>
            <input type="text" onChange={this.validatePhone} value={this.state.phone.value}/ >
                <span>{this.state.phone.errorMessage}</span>
            </div>
            <div>
            <label>Пароль</label>
            <input type="password" onChange={this.validatePassword} value={this.state.password.value}/ >
                <span>{this.state.password.errorMessage}</span>
            </div>
            <div>
            <label>Подтверждение пароля</label>
            <input type="text" onChange={this.validatePasswordConfirm} value={this.state.passwordConfirm.value}/ >
                <span>{this.state.passwordConfirm.errorMessage}</span>
            </div>
        </div>
    );
    
  }

}
    
export default Page_Registration;