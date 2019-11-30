import React from 'react';
import './Footer.css';

class Footer extends React.PureComponent{
    render () {
        return (
            <footer className='footer'>
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
                    <span>
                        <img src='../images/phone.png' />
                    </span>
                    <span>
                        <a href="tel:5148148">5-148-148</a>
                    </span>
                    <span>A1 MTC Life:)</span>
                </div>

            </footer>
        )
    }
}

export default Footer;