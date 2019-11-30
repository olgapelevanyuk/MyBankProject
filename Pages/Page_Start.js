import React from 'react';

import "./Page_Start.css";

class Page_Start extends React.PureComponent {
    render () {
        return (
            <div className='Page_start'>
                <div className='banner' style={{backgroundImage: "../image/mainBanner.png"}}></div>
                <div>
                    Курсы валют:
                    <table>
                        <tbody>
                            
                        <tr>
                            <th></th>
                            <th>
                                <img src='../images/usa.png' />
                                1 USD
                            </th>
                            <th>
                                <img src='../images/eu.png' />
                                1 EUR
                            </th>
                            <th>
                                <img src='../images/rf.png' />
                                100 RUB
                            </th>
                        </tr>
                        <tr>
                            <td>Покупка</td>
                            <td>2,0900</td>
                            <td>2,3000</td>
                            <td>3,2300</td>
                        </tr>
                        <tr>
                            <td>Продажа</td>
                            <td>2,1300</td>
                            <td>2,3400</td>
                            <td>3,3300</td>
                        </tr>
                        </tbody>
                    </table>
                    По состоянию на 11:00 12.12.2019 г.
                </div>
            </div>
        )
    }
}

export default Page_Start;