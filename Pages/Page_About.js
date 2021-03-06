import React from 'react';
import './Page_About.css';

export default class Page_About extends React.PureComponent {

    render() {
        return(
            <div className='Page_About-Wrap'>
                <div className='about-banner' style={{backgroundImage: "url('../images/bankAbout.jpg')"}}>
                    <h2>Банк сегодня</h2>
                    <div className='banner-descr'>Мы даем людям уверенность и надежность, мы делаем их жизнь лучше,
                        помогая реализовывать устремления и мечты</div>
                </div>
                <div className='about-text'>
                    <h3>Миссия</h3>
                    Мы даем людям уверенность и надежность, мы делаем их жизнь лучше, помогая реализовывать устремления и мечты.<br/>
                    Наша миссия определяет смысл и содержание деятельности банка. Наши клиенты, их потребности, мечты и цели есть основа всей деятельности банка как организации. Миссия банка также устанавливает амбициозную цель наших устремлений — В СОСТАВЕ ГРУППЫ СБЕРБАНКА стать одной из лучших финансовых компаний мира — и подчеркивает, насколько важны для ГРУППЫ Сбербанка его сотрудники, и насколько реализация его целей невозможна без реализации их личных и профессиональных целей. Высокие цели достигаются командой единомышленников, которых объединяет общая система ценностей.<br/>
                    <h3>Наши ценности:</h3>
                    Наши ценности — основа отношения к жизни и работе, внутренний компас, помогающий принимать решения в сложных ситуациях, принципы, верность которым мы храним всегда и везде.<br/>
                    Ориентиры, которые помогают нам принимать верные решения в любых ситуациях:<br/>
                    <h3>Я — лидер</h3>
                    Мы принимаем ответственность за себя и за то, что происходит вокруг нас.<br/>
                    Мы делаем лучшее, на что мы способны.<br/>
                    Мы постоянно развиваемся и совершенствуем себя, банк и наше окружение.<br/>
                    Мы честны друг с другом и с нашими клиентами.<br/>
                    <h3>Мы — команда</h3>
                    Мы с готовностью помогаем друг другу, работая на общий результат.<br/>
                    Мы открыты и доверяем своим коллегам.<br/>
                    Мы относимcя друг к другу с уважением.<br/>
                    Мы помогаем расти и развиваться нашим коллегам.<br/>
                    <h3>Все — для клиента</h3>
                    Вся наша деятельность построена вокруг и ради интересов клиентов.<br/>
                    Мы хотим удивлять и радовать клиентов качеством своих услуг и нашим отношением.<br/>
                    Мы превосходим ожидания наших клиентов.<br/>
                    <h3>Правила банка:</h3>
                    Быть больше, чем просто банк.<br/>
                    Проявлять внимание к каждому клиенту, приоритет его потребностей.<br/>
                    Строить отношения, а не продавать продукт.<br/>
                    Ежедневно улучшать себя и свое окружение.<br/>
                    Не использовать слабости наших клиентов.<br/>
                    Соблюдать не только букву, но и дух требований закона.<br/>
                    Каждый сотрудник — лицо Сбербанка.<br/>
                    Преданность банку, работа в команде, общий успех — успех каждого.<br/>
                </div>
            </div>
        )
    }
}