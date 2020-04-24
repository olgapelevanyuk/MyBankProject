import React from "react";
import "./Page_Depos.css";
import { connect } from "react-redux";

import {
  USERS_LOADING,
  USERS_LOADED,
  acAddApplication,
} from "../constants/actionTypes";
import { getData, postData } from "../utils/utils";
import { withRouter } from "react-router-dom";

class Page_Cred extends React.PureComponent {
  async componentDidMount() {
    this.props.dispatch({
      type: USERS_LOADING,
    });
    let usersList = await getData("users");
    this.props.dispatch({
      type: USERS_LOADED,
      data: usersList,
    });
  }
  static defaultProps = {
    depos: [
      {
        title: "Финансирование недвижимости «Новоселье со Сбербанком»",
        image: "../images/depos1.png",
        term: "до 240 мес.",
        rate: "13.18% годовых",
        min: "5 000 BYN",
      },
      {
        title:
          "Финансирование недвижимости «Новоселье со Сбербанком» и «А-100 Девелопмент»",
        image: "../images/depos2.png",
        term: "до 240 мес.",
        rate: "12.68% годовых",
        min: "5 000 BYN",
      },
      {
        title: "Новоселье со Сбербанком с ДАНА ХОЛДИНГС",
        image: "../images/depos3.png",
        term: "до 240 мес.",
        rate: "6.99% годовых",
        min: "5 000 BYN",
      },
    ],
  };

  orderDepos = async () => {
    const newAppl = {
      clientSurname: this.props.users.currentUser.userProfile.surname,
      clientFirstName: this.props.users.currentUser.userProfile.firstName,
      clientPatronymic: this.props.users.currentUser.userProfile.lastName,
      clientEMail: this.props.users.currentUser.userProfile.eMail,
      clientPhone: this.props.users.currentUser.userProfile.phone,
      clientComment: "",
      type: "other",
      status: 1, // 1- принята банком,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    let application = await postData("applications", newAppl);
    this.props.dispatch(acAddApplication(application));
    alert("Заявка поступила к рассмотрению");
  };

  render() {
    let {
      props: { depos, users },
    } = this;

    let deposits = depos.map((item, idx) => {
      return (
        <div className="depos-Wrap deposit-card" key={idx}>
          <div className="depos-image">
            <img src={item.image} />
          </div>
          <div className="depos-info">
            <h2 className="depos-title">{item.title}</h2>
            <div className="depos-adv">
              <div>
                <div className="depos-adv-about">СРОК КРЕДИТА</div>
                <div className="depos-adv-text">{item.term}</div>
              </div>
              <div>
                <div className="depos-adv-about">ПРОЦЕНТНАЯ СТАВКА</div>
                <div className="depos-adv-text">{item.rate}</div>
              </div>
              <div>
                <div className="depos-adv-about">
                  МИНИМАЛЬНЫЙ РАЗМЕР КРЕДИТА
                </div>
                <div className="depos-adv-text">{item.min}</div>
              </div>
            </div>
          </div>
          {users.currentUser.userProfile ? (
            <div onClick={this.orderDepos} className="order-deposit o-button">
              Заказать
            </div>
          ) : null}
        </div>
      );
    });
    return (
      <div className="Page_Depos">
        <div
          className="banner"
          style={{ backgroundImage: 'url("../images/cred.jpg")' }}
        ></div>

        <div>{deposits}</div>
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({
    users: state.users,
  }))(Page_Cred)
);
