import React from "react";
import { connect } from "react-redux";
import {
  acApplicationsLoaded,
  APPLICATIONS_LOADING,
  acUpdateApplication,
  acSetCurrentApplication,
  USERS_LOADING,
  USERS_LOADED,
} from "../constants/actionTypes";
import { withRouter } from "react-router-dom";
import { getData, patchData } from "../utils/utils";
import "../components/ApplicationList.css";
import NewOperatorRegistration from "./NewOperatorRegistration";
import OperatorsList from "./OperatorsList";
class ApplicationList extends React.Component {
  async componentDidMount() {
    this.props.dispatch({
      type: USERS_LOADING,
    });
    let usersList = await getData("users");
    this.props.dispatch({
      type: USERS_LOADED,
      data: usersList,
    });
    this.props.dispatch({
      type: APPLICATIONS_LOADING,
    });
    let data = await getData("applications");
    this.props.dispatch(acApplicationsLoaded(data));
  }

  initialState = {
    currentApplication: { id: null },
    operatorsListOpen: false,
  };

  state = { ...this.initialState };

  changeApplStatus = async (appl, status, user) => {
    const changes = {
      status: status,
      operator: user,
    };
    let application = await patchData("applications/" + appl, changes);
    this.props.dispatch(acUpdateApplication(application));
  };

  assignOperator = async (operator) => {
    console.log("application list");
    const changes = {
      status: 2,
      operator: operator._id,
    };
    let application = await patchData(
      "applications/" + this.state.currentApplication.id,
      changes
    );
    this.props.dispatch(acUpdateApplication(application));
    this.hideOperatorsList();
  };

  renderClientApplications = () => {
    const { list } = this.props.applications;
    if (!list.length) {
      return <div>Заявок нет</div>;
    } else {
      return list.map((appl) => (
        <tr
          onDoubleClick={this.showApplicationFullInfo.bind(this, appl._id)}
          key={appl.id}
          className="applListItem"
        >
          <td className={"applId"}>{appl.countNum}</td>
          <td className={"applDate"}>{appl.date}</td>
          <td className={"applTime"}>{appl.time}</td>
          <td>{`${appl.clientSurname} ${appl.clientFirstName} ${appl.clientPatronymic}`}</td>
          <td>
            {appl.type.name === "technical" && "Техническая"}
            {appl.type.name === "functional" && "Функциональная"}
            {appl.type.name === "information" && "Информационная"}
            {appl.type.name === "other" && "Другое"}
          </td>
          <td>
            {appl.operator && appl.operator.surname
              ? `${appl.operator.surname} ${appl.operator.firstName} ${appl.operator.lastName}`
              : "Не назначен"}
          </td>
          <td>
            {appl.status === 1 && "Открыта"}
            {appl.status === 2 && "В работе"}
            {appl.status === 3 && "Исполнена"}
          </td>

          <td>
            <div
              className="o-button application-control-btn"
              onClick={this.showApplicationFullInfo.bind(this, appl._id)}
            >
              Полная информация
            </div>

            {appl.status === 1 &&
              this.props.users.currentUser.userProfile &&
              this.props.users.currentUser.userProfile.type === "operator" && (
                <div
                  className="o-button application-control-btn"
                  onClick={this.changeApplStatus.bind(
                    this,
                    appl._id,
                    2,
                    this.props.users.currentUser.userProfile
                  )}
                >
                  Взять в работу
                </div>
              )}
            {appl.status === 1 &&
              this.props.users.currentUser.userProfile &&
              this.props.users.currentUser.userProfile.type === "admin" && (
                <div
                  className="o-button application-control-btn"
                  onClick={this.showOperatorsList.bind(this, appl._id)}
                >
                  Передать в работу
                </div>
              )}
            {appl.status === 2 &&
              this.props.users.currentUser.userProfile &&
              this.props.users.currentUser.userProfile.type === "operator" && (
                <div
                  className="o-button application-control-btn"
                  onClick={this.changeApplStatus.bind(
                    this,
                    appl._id,
                    3,
                    this.props.users.currentUser.userProfile
                  )}
                >
                  Пометить как исполненную
                </div>
              )}
          </td>
        </tr>
      ));
    }
  };

  showApplicationFullInfo = async (_id) => {
    let application = await getData("applications/" + _id);
    this.props.dispatch(acUpdateApplication(application));
    this.props.dispatch(acSetCurrentApplication(application));
    this.props.history.push(`applications/${_id}`);
  };

  hideOperatorsList = () => {
    this.setState({
      currentApplication: { id: null },
      operatorsListOpen: false,
    });
  };

  showOperatorsList = (applId) => {
    this.setState({
      currentApplication: { id: applId },
      operatorsListOpen: true,
    });
  };

  render() {
    return (
      ((this.props.applications.loading || this.props.users.loading) && (
        <div>Идет загрузка</div>
      )) || (
        <div className={"applListMainContainer"}>
          <div className={"applicationsContainer"}>
            <h2>Заявки клиентов</h2>
            <table className={"applListTable"}>
              <thead>
                <tr>
                  <th className={"applId"}>Номер</th>
                  <th className={"applDate"}>Дата</th>
                  <th className={"applTime"}>Время</th>
                  <th>Заявитель</th>
                  <th>Тип ошибки</th>
                  <th>Исполнитель</th>
                  <th>Статус</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>{this.renderClientApplications()}</tbody>
            </table>
          </div>
          {this.state.operatorsListOpen && (
            <OperatorsList
              chooseOperator={
                this.state.currentApplication.id ? this.assignOperator : null
              }
              close={this.hideOperatorsList}
            />
          )}

          {this.props.users.currentUser.userProfile &&
            this.props.users.currentUser.userProfile.type === "admin" && (
              <div className={"addNewOperButton"}>
                <button onClick={this.showOperatorsList.bind(this, null)}>
                  Список операторов
                </button>
              </div>
            )}
        </div>
      )
    );
  }
}

export default withRouter(
  connect((state) => ({
    users: state.users,
    applications: state.applications,
  }))(ApplicationList)
);
