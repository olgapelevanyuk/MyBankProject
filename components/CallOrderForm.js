import React from "react";
import { connect } from "react-redux";
import { postData } from "../utils/utils";
import { acAddApplication } from "../constants/actionTypes";
import "../components/CallOrderForm.css";

class CallOrderForm extends React.PureComponent {
  initialState = {
    opened: false,

    surname: { value: "", errorMessage: "" },
    firstName: { value: "", errorMessage: "" },
    patronymic: { value: "", errorMessage: "" },
    eMail: { value: "", errorMessage: "" },
    phone: { value: "", errorMessage: "" },
    errorType: { value: "", errorMessage: "" },
    comment: { value: "", errorMessage: "" },
  };

  state = { ...this.initialState };

  openForm = () => {
    this.setState({
      opened: true,
    });
  };

  closeForm = () => {
    this.setState({
      ...this.initialState,
    });
  };

  validateSurname = (e) => {
    const value = e.target.value.trim();
    const newState = { value: value };
    if (!value.length) {
      newState.errorMessage = "Поле не может быть пустым";
    } else {
      newState.errorMessage = "";
    }
    this.setState({ ...this.state, surname: newState });
  };

  validateFirstName = (e) => {
    const value = e.target.value.trim();
    const newState = { value: value };
    if (!value.length) {
      newState.errorMessage = "Поле не может быть пустым";
    } else {
      newState.errorMessage = "";
    }
    this.setState({ ...this.state, firstName: newState });
  };

  validatePatronymic = (e) => {
    const value = e.target.value.trim();
    const newState = { value: value };
    if (!value.length) {
      newState.errorMessage = "Поле не может быть пустым";
    } else {
      newState.errorMessage = "";
    }
    this.setState({ ...this.state, patronymic: newState });
  };

  validateComment = (e) => {
    const value = e.target.value;
    const newState = { value: value };
    this.setState({ ...this.state, comment: newState });
  };

  validateErrorType = (e) => {
    const value = e.target.value.trim();
    const newState = { value: value };
    this.setState({ ...this.state, errorType: newState });
  };

  validateEMail = (e) => {
    const value = e.target.value.trim();
    let regExp = /^\S+?@[A-Za-z]+?\.[A-Za-z]+?$/;

    const newState = { value: value };
    if (!value.match(regExp)) {
      newState.errorMessage = "Введите e-mail в формате myemail@mail.com";
    } else {
      newState.errorMessage = "";
    }
    this.setState({ ...this.state, eMail: newState });
  };

  validatePhone = (e) => {
    const value = e.target.value.trim();
    let regExp = /^\+375(29|44|33|25)\d\d\d\d\d\d\d$/;

    const newState = { value: value };
    if (!value.match(regExp)) {
      newState.errorMessage = "Введите номер телефона в формате +375ххххххххх";
    } else {
      newState.errorMessage = "";
    }
    this.setState({ ...this.state, phone: newState });
  };

  orderCall = async () => {
    const newAppl = {
      clientSurname: this.state.surname.value,
      clientFirstName: this.state.firstName.value,
      clientPatronymic: this.state.patronymic.value,
      clientEMail: this.state.eMail.value,
      clientPhone: this.state.phone.value,
      clientComment: this.state.comment.value,
      errorType: this.state.errorType.value,
      type: this.state.errorType.value,
      status: 1, // 1- принята банком,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    let application = await postData("applications", newAppl);
    this.props.dispatch(acAddApplication(application));
    alert("Звонок заказан");
    this.closeForm();
  };

  render() {
    const stateKeys = ["surname", "firstName", "eMail", "phone"];
    const formValid = stateKeys.every((key) => {
      return (
        this.state[key].value.length && !this.state[key].errorMessage.length
      );
    });

    return (
      <div>
        {(!this.state.opened && (
          <div onClick={this.openForm} className="container order-call">
            Заказать Звонок
          </div>
        )) || (
          <div className="callFormWrapper-container">
            <div className="callFormWrapper">
              <div className="closeFormButton" onClick={this.closeForm}>
                ×
              </div>

              <div>
                <label>Фамилия</label>
                <input
                  type="text"
                  onChange={this.validateSurname}
                  value={this.state.surname.value}
                />
                <span>{this.state.surname.errorMessage}</span>
              </div>
              <div>
                <label>Имя</label>
                <input
                  type="text"
                  onChange={this.validateFirstName}
                  value={this.state.firstName.value}
                />
                <span>{this.state.firstName.errorMessage}</span>
              </div>
              <div>
                <label>Отчество</label>
                <input
                  type="text"
                  onChange={this.validatePatronymic}
                  value={this.state.patronymic.value}
                />
                <span>{this.state.patronymic.errorMessage}</span>
              </div>
              <div>
                <label>Номер телефона</label>
                <input
                  type="text"
                  onChange={this.validatePhone}
                  value={this.state.phone.value}
                />
                <span>{this.state.phone.errorMessage}</span>
              </div>
              <div>
                <label>E-mail</label>
                <input
                  type="text"
                  onChange={this.validateEMail}
                  value={this.state.eMail.value}
                />
                <span>{this.state.eMail.errorMessage}</span>
              </div>
              <div className="d-flex" onChange={this.validateErrorType}>
                <label>Тип ошибки</label>
                <div className="err-type-options">
                  <div>
                    <input
                      type="radio"
                      name="errorType"
                      value="information"
                      id="informationErr"
                      className="err-type-radio"
                    />
                    <label for="informationErr" className="err-label">
                      Информационная
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="errorType"
                      value="functional"
                      id="functionalErr"
                      className="err-type-radio"
                    />
                    <label for="functionalErr" className="err-label">
                      Функиональная
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="errorType"
                      value="technical"
                      id="technicalErr"
                      className="err-type-radio"
                    />
                    <label for="technicalErr" className="err-label">
                      Техническая
                    </label>
                  </div>
                </div>
                <span>{this.state.errorType.errorMessage}</span>
              </div>
              <div>
                <label>Комментарий</label>
                <textarea
                  onChange={this.validateComment}
                  value={this.state.comment.value}
                ></textarea>
                <span>{this.state.comment.errorMessage}</span>
              </div>
              <button
                onClick={formValid ? this.orderCall : null}
                className={formValid ? "active" : "disabled"}
              >
                Отправить
              </button>
              <button className="cancel-btn" onClick={this.closeForm}>
                Отмена
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect()(CallOrderForm);
