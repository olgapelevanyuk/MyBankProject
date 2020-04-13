import React from 'react';
import "./Page_Start.css";

class Page_Start extends React.PureComponent {


    render () {
        return (
            <div className='Page_start'>
                <div className='banner' style={{backgroundImage: 'url("../images/mainBanner.png")'}}></div>
                <div>
                    <div className='tableDescr'>Курсы валют:</div>
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
                            <td className={'td'}>Покупка</td>
                            <td>2,0900</td>
                            <td>2,3000</td>
                            <td>3,2300</td>
                        </tr>
                        <tr>
                            <td className={'td'}>Продажа</td>
                            <td>2,1300</td>
                            <td>2,3400</td>
                            <td>3,3300</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='tableFooter'>По состоянию на 11:00 12.12.2019 г.</div>
                </div>
            </div>
        )
    }
}

export default Page_Start;
