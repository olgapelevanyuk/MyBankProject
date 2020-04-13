import React from "react";
import { NavLink } from "react-router-dom";
import "./Product.css";

export default class Product extends React.PureComponent {
  /*{
        title: 'Visa Platinum PayWave',
        descr: 'Карта, которая предоставляет доступ держателю в Мир привилегий ',
        image: '../images/card3.png',
        term: 'от 100 BYN',
        rate: 'Консьерж-сервис',
        min: 'Lounge Key',
        fullInfo: [
            'Lounge Key – международная программа, обеспечивающая Вам легкий и быстрый доступ более чем в 1000 lounge-залов ожидания аэропортов по всему миру',
            'Консьерж-Сервис – это личный ассистент, который всегда готов выполнить поручения Клиента в любое время суток',
            'Воспользуйтесь специальными предложениями от платежной системы Visa',
            'Страхование выезжающих за рубеж - 1 год, 20 дней пребывания, 30 000 €',
        ]
    }*/

  render() {
    let {
      props: { data, closeProduct },
    } = this;

    console.log(this.props);

    let oppotunities = data.fullInfo.map((item, idx) => {
      return <li key={idx}>{item}</li>;
    });

    return (
      <div className="ProductWrap">
        <div className="Product">
          <div className="Product-image">
            <img src={data.image} />
          </div>
          <div className="Product-descr">
            <h2>{data.title}</h2>
            <div className="descr">{data.descr}</div>
            <div>
              <span className="Product-span">Обслуживание: </span>
              {data.term}
            </div>
            <div>
              <span className="Product-span">Сервис: </span>
              {data.rate}, {data.min}
            </div>

            <div>
              <span className="Product-span">Основные возможности: </span>{" "}
              <br />
              <ul>{oppotunities}</ul>
            </div>
          </div>
        </div>
        <NavLink to="/kard">
          <div onClick={closeProduct} className="backButton">
            Вернуться к списку карт
          </div>
        </NavLink>
      </div>
    );
  }
}
