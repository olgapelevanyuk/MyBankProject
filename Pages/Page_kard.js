import React from 'react';
import "./Page_Depos.css";
export default class Page_kard extends React.PureComponent {

    static defaultProps = {
        depos: [
            {
                title: 'Mastercard Standard PayPass Детская карта',
                descr: 'Карта для энергичных молодых людей, оформляется держателям в возрасте от 6 до 17 лет включительно',
                image: '../images/card1.png',
                term: '10 BYN',
                rate: 'Мобильный банк',
                min: 'Карточка оформляется детям до 18 лет',
            },
            {
                title: 'Mastercard World ComPass Premium в белорусских рублях',
                descr: 'Лучшая карта для путешествий',
                image: '../images/card2.png',
                term: 'от 150 BYN',
                rate: 'Мильная программа 1 EUR = 1 миля',
                min: 'money-back 0.9%',
            },
            {
                title: 'Visa Platinum PayWave',
                descr: 'Карта, которая предоставляет доступ держателю в Мир привилегий ',
                image: '../images/card3.png',
                term: 'от 100 BYN',
                rate: 'Консьерж-сервис',
                min: 'Lounge Key',
            },
        ]
    }


    render() {
        let {props: {depos}} = this;

        let deposits = depos.map((item,idx) => {
            return (
            <div className='depos-Wrap' key={idx}>
                <div className='depos-image'>
                    <img src={item.image} />
                </div>
                <div  className='depos-info'>
                    <h2 className='depos-title'>{item.title}</h2>
                    <p className='depos-descr'>{item.descr}</p>    
                    <div className='depos-adv'>
                        <div>
                            <div className='depos-adv-about'>ОБСЛУЖИВАНИЕ</div>
                            <div className='depos-adv-text'>{item.term}</div>
                        </div>
                        <div>
                            <div className='depos-adv-about'>СЕРВИСЫ</div>
                            <div className='depos-adv-text'>{item.rate}</div>
                        </div>
                        <div>
                            <div className='depos-adv-about'>ОСОБЕННОСТИ</div>
                            <div className='depos-adv-text'>{item.min}</div>
                        </div>
                    </div>
                    <div className='prod-buttons'>
                        <div className='fullInfo'>Подробнее</div>
                        <div className='orderCall'>Заказать карту</div>
                    </div>
                </div>
            </div>
            )
        })
        return(
            <div className='Page_Depos'>
                <div className='banner' style={{backgroundImage: 'url("../images/depos.jpg")'}}></div>

                <div>
                    {deposits}
                </div>



            </div>
        )
    }
}