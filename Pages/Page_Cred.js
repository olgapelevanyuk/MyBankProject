import React from "react";

import './Page_Cred.css';

export default class Page_Cred extends React.PureComponent {


    static defaultProps = {
        depos: [
            {
                title: 'Финансирование недвижимости «Новоселье со Сбербанком»',
                image: '../images/depos1.png',
                term: 'до 240 мес.',
                rate: '13.18% годовых',
                min: '5 000 BYN',
            },
            {
                title: 'Финансирование недвижимости «Новоселье со Сбербанком» и «А-100 Девелопмент»',
                image: '../images/depos2.png',
                term: 'до 240 мес.',
                rate: '12.68% годовых',
                min: '5 000 BYN',
            },
            {
                title: 'Новоселье со Сбербанком с ДАНА ХОЛДИНГС',
                image: '../images/depos3.png',
                term: 'до 240 мес.',
                rate: '6.99% годовых',
                min: '5 000 BYN',
            },
        ]
    }
    render(){
        let {props: {depos}} = this;

        let deposits = depos.map((item,idx) => {
            return (<div className='depos-Wrap' key={idx}>
                <div className='depos-image'>
                    <img src={item.image} />
                </div>
                <div  className='depos-info'>
                    <h2 className='depos-title'>{item.title}</h2> 
                    <div className='depos-adv'>
                        <div>
                            <div className='depos-adv-about'>СРОК КРЕДИТА</div>
                            <div className='depos-adv-text'>{item.term}</div>
                        </div>
                        <div>
                            <div className='depos-adv-about'>ПРОЦЕНТНАЯ СТАВКА</div>
                            <div className='depos-adv-text'>{item.rate}</div>
                        </div>
                        <div>
                            <div className='depos-adv-about'>МИНИМАЛЬНЫЙ РАЗМЕР КРЕДИТА</div>
                            <div className='depos-adv-text'>{item.min}</div>
                        </div>
                    </div>
                </div>
            </div>)
        })
        return(
            <div className='Page_Depos'>
                <div className='banner' style={{backgroundImage: 'url("../images/cred.jpg")'}}></div>

                <div>
                    {deposits}
                </div>



            </div>
        )
    }
}
