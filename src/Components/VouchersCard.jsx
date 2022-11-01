import React, {Component} from 'react'
import '../css/coinHistoryOrderCard.css'
import pic from '../images/voucher.png';
import copyPic from '../images/copy-light.png'
import coupinPic from '../images/coupon-new.png';
import amazon from '../images/amazon.png'
import calenderPic from '../images/calender.png';
import { useState } from 'react';

export default function VouchersCard({item,code,pending}) {
    const date = new Date(item.createdAt);
    const [clicked,Set_clicked] = useState(false);
    const required_date = `${date.getDate()} ${date.toLocaleString('en-US', {month: 'short'})} ${date.getFullYear()} `
    const copyToClipBoard = (e,code) => {
        e.target.innerHTML = "Copied";
        Set_clicked(true);
        navigator.clipboard.writeText(code)
    }
    return (
        <>
            <div className='orderCardContainer'>
                <img className='fire' src={pic} alt="" />
                <div className='historyContentCard'>
                    <div className='historyContent2'>
                    { !pending ? <div className='left-section'>
                        <div className='amazon-coupon'>
                        <div className='copy-coupon-image'>
                            <img className='copy-border' src={coupinPic} alt="Hello" />
                            <div className='copy-coupon-code'>
                                {item.voucher_code}
                            </div>
                        </div>
                        </div>
                        </div> :
                        <div className='amazon-coupon-on-way'>
                            Amazon voucher coming your way
                        </div>
                    }

                        <div className='right-section'>
                        { !pending && <div className='copy-coupon'>
                                <button id={`${item.id}`} className={`copy-coupon-button ${clicked? "copy-green" : ""}`} onClick={(e) => copyToClipBoard(e,item.voucher_code)}>
                                    <img className='coupon-pic' src={copyPic} alt="" />
                                    { window.innerWidth > 600 ? "Copy code" : "Copy"}
                                </button>
                            </div> }
                        </div>
                    </div>
                    { !pending ? <div className='coupon-description'>
                        Amazon voucher worth {item.voucher_value}
                    </div> : 
                    <div className='coupon-description'>
                        Voucher code will be sent to your registered account within 24 hrs
                    </div>
                    }
                    <div className='historyInfo'>
                        <img src={calenderPic} className='calender' alt="" />
                        <span className='historyDate'> Redeemed {item.value} coins on {required_date}</span>
                    </div>
                </div>
            </div>
        </>
    )
}