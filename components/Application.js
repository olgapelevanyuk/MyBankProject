import React from "react";
import { connect } from "react-redux";
import {
  acApplicationsLoaded,
  APPLICATIONS_LOADING,
  acSetCurrentApplication,
  acUpdateApplication,
} from "../constants/actionTypes";
import { withRouter } from "react-router-dom";
import { getData, patchData } from "../utils/utils";
import "./Application.css";
import OperatorsList from "./OperatorsList";

class Application extends React.PureComponent {
  async componentDidMount() {
    console.log(this.props, "APPL");
    if (!this.props.applications.currentApplication) {
      const applId = this.props.match.params.id;
      let application = await getData("applications/" + applId);
      this.props.dispatch(acSetCurrentApplication(application));
    }
  }

  initialState = {
    // currentApplication: { id: null },
    operatorsListOpen: false,
  };

  state = { ...this.initialState };

  assignOperator = async (operator) => {
    console.log("applcation");
    const changes = {
      status: 2,
      operator: operator._id,
    };
    console.log(this.props.applications, "CURRENT APP");
    let application = await patchData(
      "applications/" + this.props.applications.currentApplication._id,
      changes
    );
    this.props.dispatch(acUpdateApplication(application));
    this.props.dispatch(acSetCurrentApplication(application));
    this.hideOperatorsList();
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
  changeApplicationStatus = async (appl, status, user) => {
    const changes = {
      status: status,
      operator: user,
    };
    let application = await patchData("applications/" + appl.id, changes);
    this.props.dispatch(acUpdateApplication(application));
    this.props.dispatch(acSetCurrentApplication(application));
  };

  render() {
    const {
      applications: { currentApplication },
      users: {
        currentUser: { userProfile },
      },
    } = this.props;

    return (
      ((!currentApplication || !userProfile) && (
        <div>Идет загрузка...</div>
      )) || (
        <div className="Application">
          <h2>{`Заявка № ${currentApplication.countNum}`}</h2>
          <div>
            <div>
              <div className="title">Дата и время заявки</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.date} ${currentApplication.time}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Фамилия клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientSurname}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Имя клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientFirstName}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Отчество клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientPatronymic}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Телефон клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientPhone}`}
                />
              </div>
            </div>
            <div>
              <div className="title">e-mail клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientEMail}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Комментарий клиента</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.clientComment}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Тип заявки</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.type}`}
                />
              </div>
            </div>
            <div>
              <div className="title">Статус заявки</div>
              <div>
                <input
                  disabled
                  type="text"
                  defaultValue={`${currentApplication.status}`}
                />
              </div>
            </div>
            {currentApplication.operator && (
              <div>
                <div className="title">Оператор</div>
                <div>
                  <input
                    disabled
                    type="text"
                    defaultValue={`${currentApplication.operator.surname} ${currentApplication.operator.firstName} ${currentApplication.operator.lastName}`}
                  />
                </div>
              </div>
            )}
          </div>
          {currentApplication.status === 1 && userProfile.type === "operator" && (
            <div>
              <button
                onClick={this.changeApplicationStatus.bind(
                  this,
                  currentApplication,
                  2,
                  userProfile
                )}
              >
                Взять в работу
              </button>
            </div>
          )}
          {currentApplication.status === 1 && userProfile.type === "admin" && (
            <div>
              <button
                onClick={this.showOperatorsList.bind(
                  this,
                  currentApplication.id
                )}
                className="active"
              >
                Передать в работу
              </button>
            </div>
          )}
          {this.state.operatorsListOpen && (
            <OperatorsList
              close={this.hideOperatorsList}
              chooseOperator={this.assignOperator}
            />
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
  }))(Application)
);
