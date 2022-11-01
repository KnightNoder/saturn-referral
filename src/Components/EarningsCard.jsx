import React, {Component} from 'react'
import '../css/coinHistoryOrderCard.css'
import pic from '../images/credits.png';
import moneyPic from '../images/coin-money.png';
import calenderPic from '../images/calender.png';
import coinPic from '../images/500coin.jpg';
import { useEffect } from 'react';

export default function EarningsCard({item,cashName}) {
    const date = new Date(item.createdAt);
    const required_date = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})} ${date.getFullYear()} `
   
    return (
        <>
            <div className='orderCardContainer'>
                <img className='fire' src={pic} alt="" />
                <div className='historyContentCard'>
                    <div className='historyContent'>
                        <div className='earn-record'>
                            Earned <span className='coins'>{item.value} {cashName} credits</span>  on referral order
                        </div>
                        <div className='earn-image'>
                            {/* <img src={coinPic} className='coin-pic' alt="" /> */}
                            <div className='coin-pic'>
                                <div>
                                    <img src={moneyPic} alt="" />
                                </div>
                                <div style={{color:"#726868"}}>
                                    {item.value}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='historyInfo'>
                        <img src={calenderPic} className='calender' alt="" />
                        <span className='historyDate'> {required_date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}