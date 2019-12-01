import React from 'react';
import { connect } from 'react-redux';
import { deleteData, postData, patchData, getData } from '../utils/utils';
import { USERS_LOADING, USERS_LOADED, acAddUser, acSetCurrentUser } from '../constants/actionTypes';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class NewOperatorRegistration extends React.PureComponent {

    async componentDidMount() {
    }


    state = {
        surname: { value: '', errorMessage: '' },
        firstName: { value: '', errorMessage: '' },
        lastName: { value: '', errorMessage: '' },
        login: { value: '', errorMessage: '' },
        password: { value: '', errorMessage: '' },
        passwordConfirm: { value: '', errorMessage: '' },
    }

    validateSurname = e => {
        const value = e.target.value.trim();
        const newState = { value: value };
        if (!value.length) {
            newState.errorMessage = 'Поле не может быть пустым';
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            surname: newState
        });
    }

    validateFirstName = e => {
        const value = e.target.value.trim();
        const newState = { value: value };
        if (!value.length) {
            newState.errorMessage = 'Поле не может быть пустым';
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            firstName: newState
        });
    }

    validateLastName = e => {
        const value = e.target.value.trim();
        const newState = { value: value };
        if (!value.length) {
            newState.errorMessage = 'Поле не может быть пустым';
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            lastName: newState
        });
    }

    validatePassword = e => {
        const value = e.target.value.trim();
        const newState = { value: value };
        if (value.length < 5) {
            newState.errorMessage = 'Пароль слишком короткий (минимум 5 символов)';
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            password: newState,
            passwordConfirm: { value: '', errorMessage: '' }
        });
    }

    validatePasswordConfirm = (e, withValidate = false) => {
        const value = e.target.value.trim();
        const newState = { value: value };
        if (withValidate && value !== this.state.password.value) {
            newState.errorMessage = "Введенные пароли не совпадают";
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            passwordConfirm: newState,

        });
    }

    validateLogin = e => {
        const value = e.target.value.trim();
        const { users } = this.props;
        const newState = { value: value };
        const loginIsValid = users.list.every(user => value !== user.login);
        if (!loginIsValid) {
            newState.errorMessage = 'Логин занят другим пользователем';
        }
        else if (!value.length) {
            newState.errorMessage = 'Поле не может быть пустым';
        }
        else {
            newState.errorMessage = '';
        }
        this.setState({
            ...this.state,
            login: newState,

        });
    }

    registrate = async () => {
        const state = this.state;
        const newUser = {
            surname: state.surname.value,
            firstName: state.firstName.value,
            lastName: state.lastName.value,
            eMail: '',
            phone: '',
            password: state.password.value,
            login: state.login.value,
            type: 'operator',
        };
        let user = await postData('users', newUser);
        this.props.dispatch(acAddUser(user));
        alert('Оператор зарегистрирован');
        this.props.close();
    }

    render() {
        const stateKeys = Object.keys(this.state);
        const formValid = stateKeys.every(key => (this.state[key].value.length &&
            !this.state[key].errorMessage.length)) && this.state.password.value === this.state.passwordConfirm.value;

        return (
            this.props.users.loading &&
            (<div>Идет загрузка</div>) ||
            (
                <div>
                    <div>
                        <label>Фамилия</label>
                        <input type="text" onChange={this.validateSurname} value={this.state.surname.value} />
                        <span>{this.state.surname.errorMessage}</span>
                    </div>
                    <div>
                        <label>Имя</label>
                        <input type="text" onChange={this.validateFirstName} value={this.state.firstName.value} />
                        <span>{this.state.firstName.errorMessage}</span>
                    </div>
                    <div>
                        <label>Отчество</label>
                        <input type="text" onChange={this.validateLastName} value={this.state.lastName.value} />
                        <span>{this.state.lastName.errorMessage}</span>
                    </div>
                    <div>
                        <label>Логин</label>
                        <input type="text" onChange={this.validateLogin} value={this.state.login.value} />
                        <span>{this.state.login.errorMessage}</span>
                    </div>
                    <div>
                        <label>Пароль</label>
                        <input type="password" onChange={this.validatePassword} value={this.state.password.value} />
                        <span>{this.state.password.errorMessage}</span>
                    </div>
                    <div>
                        <label>Подтверждение пароля</label>
                        <input type="password" onChange={this.validatePasswordConfirm}
                            value={this.state.passwordConfirm.value}
                            onBlur={(e) => this.validatePasswordConfirm(e, true)}
                        />
                        <span>{this.state.passwordConfirm.errorMessage}</span>
                    </div>
                    <div>
                        {(formValid && <button onClick={formValid ? this.registrate : null}
                            className={formValid ? 'active' : 'disabled'}>
                            Зарегистрировать
                </button>)}
                    </div>
                </div>
            )
        );

    }

}

export default withRouter(connect(
    state => ({
        users: state.users,
    })
)(NewOperatorRegistration));