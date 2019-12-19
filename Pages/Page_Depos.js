import React from "react"

import "./Page_Depos.css"

export default class Page_Depos extends React.PureComponent {
  static defaultProps = {
    depos: [
      {
        title: 'Отзывный депозит "Приумножай"',
        descr: "Депозит для получения дохода в кратчайшие сроки",
        image: "../images/depos1.png",
        term: "35 дней",
        rate: "5.8% годовых",
        min: "от 50 BYN"
      },
      {
        title: 'Отзывный депозит "Сохраняй"',
        descr:
          "Депозит с возможностью выбора любого срока хранения от 90 до 1000 дней",
        image: "../images/depos2.png",
        term: "90-1000 дней",
        rate: "6% годовых",
        min: "от 50 BYN"
      },
      {
        title: 'Отзывный депозит "Управляй Онлайн"',
        descr:
          "Возможность многократного частичного снятия средств до суммы неснижаемого остатка",
        image: "../images/depos3.png",
        term: "175 дней",
        rate: "5.9% годовых",
        min: "от 100 BYN"
      }
    ]
  }

  render() {
    let {
      props: { depos }
    } = this

    let deposits = depos.map((item, idx) => {
      return (
        <div className="depos-Wrap" key={idx}>
          <div className="depos-image">
            <img src={item.image} />
          </div>
          <div className="depos-info">
            <h2 className="depos-title">{item.title}</h2>
            <p className="depos-descr">{item.descr}</p>
            <div className="depos-adv">
              <div>
                <div className="depos-adv-about">СРОК ВКЛАДА</div>
                <div className="depos-adv-text">{item.term}</div>
              </div>
              <div>
                <div className="depos-adv-about">ПРОЦЕНТНАЯ СТАВКА</div>
                <div className="depos-adv-text">{item.rate}</div>
              </div>
              <div>
                <div className="depos-adv-about">МИНИМАЛЬНЫЙ ВЗНОС</div>
                <div className="depos-adv-text">{item.min}</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="Page_Depos">
        <div
          className="banner"
          style={{ backgroundImage: 'url("../images/depos.jpg")' }}
        ></div>

        <div>{deposits}</div>
      </div>
    )
  }
}
