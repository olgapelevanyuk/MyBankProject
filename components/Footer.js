import React from 'react';
import './Footer.css';

class Footer extends React.PureComponent{
    render () {
        return (
            <footer className='footer'>
                <div className='connection'>
                    <div>

                        <div className='phoneBlock'>
                            <span className='phone-image'>
                                <img src='../images/148.png' />
                            </span>
                            <span className='phone-number'>
                                <a href="tel:148">148</a>
                            </span>
                            <span className='phone-type'>Городской и мобильный номер</span>
                        </div>
                        
                        <div className='phoneBlock'>
                            <span className='phone-image'>
                                <img src='../images/phone.png' />
                            </span>
                            <span className='phone-number'>
                                <a href="tel:5148148">5-148-148</a>
                            </span>
                            <span className='phone-type'>A1 MTC Life:)</span>
                        </div>
                    </div>


                    <div>
                        <div className='networks'>
                            <a href='https://vk.com/bps_sberbank'>
                                <img src='../images/vk.png' />
                            </a>
                            <a href='https://ok.ru/group/53654515155076'>
                                <img src='../images/odn.png' />
                            </a>
                            <a href='https://www.facebook.com/sberbank.bps/'>
                                <img src='../images/fb.png' />
                            </a>
                            <a href='https://www.instagram.com/bps_sberbank/?hl=ru'>
                                <img src='../images/inst.png' />
                            </a>
                        </div>
                    </div>
                </div>

                



                <div className='copyright'>
                    <span>© 1993—2019 ОАО «БПС-Сбербанк»</span>
                    <a href='https://www.sberbank.ru'>сайт Сбербанка России</a>
                </div>
            </footer>
        )
    }
}

export default Footer;