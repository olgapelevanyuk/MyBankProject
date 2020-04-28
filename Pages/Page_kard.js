import React from "react";
import "./Page_Depos.css";
import Product from "../components/Product";

import "./Page_Depos.css";
import { connect } from "react-redux";

import {
  USERS_LOADING,
  USERS_LOADED,
  acAddApplication,
} from "../constants/actionTypes";
import { getData, postData } from "../utils/utils";
import { withRouter } from "react-router-dom";
class Page_kard extends React.PureComponent {
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
        title: "Mastercard Standard PayPass Детская карта",
        descr:
          "Карта для энергичных молодых людей, оформляется держателям в возрасте от 6 до 17 лет включительно",
        image: "../images/card1.png",
        term: "10 BYN",
        rate: "Мобильный банк",
        min: "Карточка оформляется детям до 18 лет",
        fullInfo: [
          "Карточка оформляется детям до 18 лет",
          "Система обеспечения безопасности оплаты товаров и услуг в сети Интернет",
          "Получайтe на свой мобильный телефон SMS с информацией о каждой операции",
          "Цифровой кошелек, позволяющий совершать покупки при помощи телефона",
          'Бесплатное пополнение карты Банка в BYN через АИС "Расчет"',
          "Совершение платежей с помощью Вашего компьютера",
        ],
      },
      {
        title: "Mastercard World ComPass Premium в белорусских рублях",
        descr: "Лучшая карта для путешествий",
        image: "../images/card2.png",
        term: "от 150 BYN",
        rate: "Мильная программа 1 EUR = 1 миля",
        min: "money-back 0.9%",
        fullInfo: [
          "Цифровой кошелек, позволяющий совершать покупки при помощи телефона",
          'Бесплатное пополнение карты Банка в BYN через АИС "Расчет"',
          "За каждый потраченный 1 EUR вы получаете 1 бонусную милю в кабинет Skyclub",
          "Услуга технической помощи на дороге на всей территории Республики Беларусь",
          "Консьерж-Сервис – это личный ассистент, который всегда готов выполнить поручения Клиента в любое время суток",
        ],
      },
      {
        title: "Visa Platinum PayWave",
        descr:
          "Карта, которая предоставляет доступ держателю в Мир привилегий ",
        image: "../images/card3.png",
        term: "от 100 BYN",
        rate: "Консьерж-сервис",
        min: "Lounge Key",
        fullInfo: [
          "Lounge Key – международная программа, обеспечивающая Вам легкий и быстрый доступ более чем в 1000 lounge-залов ожидания аэропортов по всему миру",
          "Консьерж-Сервис – это личный ассистент, который всегда готов выполнить поручения Клиента в любое время суток",
          "Воспользуйтесь специальными предложениями от платежной системы Visa",
          "Страхование выезжающих за рубеж - 1 год, 20 дней пребывания, 30 000 €",
        ],
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

  state = {
    workMode: 1, // 1 - все продукты, 2 - подробное описание выбранного продукта
    chosenProd: {},
  };

  showProduct = (prod) => {
    this.setState({
      workMode: 2,
      chosenProd: prod,
    });
  };

  closeProduct = () => {
    this.setState({
      workMode: 1,
      chosenProd: {},
    });
  };

  render() {
    let {
      props: { depos, users },
      state: { workMode, chosenProd },
      showProduct,
    } = this;

    let deposits = depos.map((item, idx) => {
      return (
        <div className="depos-Wrap deposit-card" key={idx}>
          <div className="depos-image">
            <img src={item.image} />
          </div>
          <div className="depos-info">
            <h2 className="depos-title">{item.title}</h2>
            <p className="depos-descr">{item.descr}</p>
            <div className="depos-adv">
              <div>
                <div className="depos-adv-about">ОБСЛУЖИВАНИЕ</div>
                <div className="depos-adv-text">{item.term}</div>
              </div>
              <div>
                <div className="depos-adv-about">СЕРВИСЫ</div>
                <div className="depos-adv-text">{item.rate}</div>
              </div>
              <div>
                <div className="depos-adv-about">ОСОБЕННОСТИ</div>
                <div className="depos-adv-text">{item.min}</div>
              </div>
            </div>
            <div className="prod-buttons">
              <div className="fullInfo" onClick={() => showProduct(item)}>
                Подробнее
              </div>
            </div>
            {users.currentUser.userProfile ? (
              <div onClick={this.orderDepos} className="order-deposit o-button">
                Заказать
              </div>
            ) : null}
          </div>
        </div>
      );
    });
    return (
      <div className="Page_Depos">
        <div
          className="banner"
          style={{ backgroundImage: 'url("../images/depos.jpg")' }}
        ></div>

        {workMode === 1 && <div>{deposits}</div>}

        {workMode === 2 && (
          <Product closeProduct={this.closeProduct} data={chosenProd} />
        )}
      </div>
    );
  }
}

export default withRouter(
  connect((state) => ({
    users: state.users,
  }))(Page_kard)
);
