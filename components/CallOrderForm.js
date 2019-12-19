import React from 'react';
import { connect } from 'react-redux';
import { postData } from '../utils/utils';
import { acAddApplication } from '../constants/actionTypes';
import '../components/CallOrderForm.css';

class CallOrderForm extends React.PureComponent {

    initialState = {
        opened: false,

        surname : {value: '', errorMessage: ''},
        firstName: {value: '', errorMessage: ''},
      eMail : {value: '', errorMessage: ''},
      phone : {value: '', errorMessage: ''},
      comment: {value: '', errorMessage: ''},
    }

    state = {...this.initialState}

openForm = () =>{
    this.setState({
        opened: true,
    })
}

closeForm = () => {
    this.setState({
        ...this.initialState,
    })
}

    validateSurname = e => {
        const value = e.target.value.trim();
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

    validateFirstName = e => {
      const value = e.target.value.trim();
      const newState = {value: value};
      if(!value.length) {
        newState.errorMessage = 'Поле не может быть пустым';
      }
      else {
        newState.errorMessage = '';
      }
      this.setState({...this.state,
        firstName: newState});
  }

  validateComment = e => {
    const value = e.target.value.trim();
    const newState = {value: value};
    this.setState({...this.state,
      comment: newState});
}


  validateEMail = e => {
    const value = e.target.value.trim();
    let regExp = /^\S+?@[A-Za-z]+?\.[A-Za-z]+?$/;

    const newState = {value: value};
    if(!value.match(regExp)) {
      newState.errorMessage = 'Введите e-mail в формате myemail@mail.com';
    }
    else {
      newState.errorMessage = '';
    }
    this.setState({...this.state,
      eMail: newState});
}

validatePhone = e => {
    const value = e.target.value.trim();
    let regExp = /^\+375(29|44|33|25)\d\d\d\d\d\d\d$/;

    const newState = {value: value};
    if(!value.match(regExp)) {
      newState.errorMessage = 'Введите номер телефона в формате +375ххххххххх';
    }
    else {
      newState.errorMessage = '';
    }
    this.setState({...this.state,
      phone: newState});
}

orderCall = async () => {

    const newAppl = {
        clientSurname: this.state.surname.value,
        clientFirstName : this.state.firstName.value,
        clientLastName : '',
        clientEMail : this.state.eMail.value,
        clientPhone : this.state.phone.value,
        clientComment: this.state.comment.value,
        topic: '',
        type: 'callOrder',
        operator: null,
        status: 1, // 1- принята банком,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
    };
    let application = await postData('applications', newAppl);
    this.props.dispatch(acAddApplication(application));
    alert('Звонок заказан');
    this.closeForm();
}

    render () {
        const stateKeys = ['surname', 'firstName', 'eMail', 'phone'];
    const formValid = stateKeys.every(key => {
        return this.state[key].value.length &&
        !this.state[key].errorMessage.length
    });

    return(
        <div>
        {(!this.state.opened &&
        <div onClick={this.openForm}  className="container">
            Заказать Звонок
        </div>) ||
        (<div className='callFormWrapper-container'>
          <div className='callFormWrapper'>

            <div className='closeFormButton' onClick={this.closeForm}>X</div>

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
                  <label>Интересующая тема</label>
                  <textarea onChange={this.validateComment} value={this.state.comment.value}>
                      </textarea>
                      <span>{this.state.comment.errorMessage}</span>
                  </div>
                  <button onClick={formValid ? this.orderCall: null}
                      className={formValid ? 'active': 'disabled'}>
                    Заказать звонок
                </button>


          </div>

        </div>)}
        </div>
)
    }
}

export default connect()(CallOrderForm);
