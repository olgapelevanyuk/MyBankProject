import React from "react";
import { connect } from "react-redux";
import { deleteData, postData, patchData, getData } from "../utils/utils";
import {
  USERS_LOADING,
  USERS_LOADED,
  acAddUser,
  acSetCurrentUser,
  acDeleteUser,
} from "../constants/actionTypes";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./NewOperatorRegistration.css";
import "./OperatorsList.css";
import NewOperatorRegistration from "./NewOperatorRegistration";

class OperatorsList extends React.PureComponent {
  async componentDidMount() {
    if (!this.props.users.list.length) {
      this.props.dispatch({
        type: USERS_LOADING,
      });
      let usersList = await getData("users");
      this.props.dispatch({
        type: USERS_LOADED,
        data: usersList,
      });
    }
  }

  close = () => {
    this.props.close();
  };

  chooseOperator = (operator) => {
    this.props.chooseOperator(operator);
  };

  state = {
    newOperatorRegistrationOpen: false,
    currentOperator: null,
    operatorsListOpen: true,
  };

  deleteOperator = async (operator) => {
    if (confirm("Вы действительно хотите стереть запись?")) {
      let data = await deleteData("users/" + operator.id);
      this.props.dispatch(acDeleteUser(operator.id));
      alert("Оператор удален");
    }
  };

  renderOperatorsList = () => {
    const operatorsList = this.props.users.list.filter(
      (user) => user.type === "operator"
    );
    return operatorsList.map((operator) => (
      <div key={operator.id} className="operator">
        <div>
          {`${operator.surname} ${operator.firstName} ${operator.lastName}`}
        </div>
        <div>
          {this.props.chooseOperator && (
            <button onClick={this.chooseOperator.bind(this, operator)}>
              Назначить
            </button>
          )}
          <button onClick={this.editOperator.bind(this, operator)}>
            Редактировать
          </button>
          <button onClick={this.deleteOperator.bind(this, operator)}>
            Удалить
          </button>
        </div>
      </div>
    ));
  };

  hideOperatorRegistration = () => {
    this.setState({
      newOperatorRegistrationOpen: false,
      currentOperator: null,
      operatorsListOpen: true,
    });
  };

  addNewOperator = () => {
    this.setState({
      newOperatorRegistrationOpen: true,
      currentOperator: null,
      operatorsListOpen: false,
    });
  };

  editOperator = (operator) => {
    this.setState({
      newOperatorRegistrationOpen: true,
      currentOperator: operator,
      operatorsListOpen: false,
    });
  };

  render() {
    return (
      (this.props.users.loading && <div>Идет загрузка</div>) ||
      (this.state.newOperatorRegistrationOpen && (
        <div className={"operatorsListContainer"}>
          <NewOperatorRegistration
            close={this.hideOperatorRegistration}
            operator={this.state.currentOperator}
          />
        </div>
      )) ||
      (this.state.operatorsListOpen && (
        <div>
          <div className="operatorsListContainer">
            <div className="operatorsListContainer-wrap">
              <div>{this.renderOperatorsList()}</div>
              <div>
                <button onClick={this.close} className="active">
                  {(this.props.chooseOperator && "Отменить выбор оператора") ||
                    "Закрыть список"}
                </button>
              </div>
              <div>
                <button onClick={this.addNewOperator} className="active">
                  Добавить нового оператора
                </button>
              </div>
            </div>
          </div>
        </div>
      ))
    );
  }
}

export default withRouter(
  connect((state) => ({
    users: state.users,
  }))(OperatorsList)
);
