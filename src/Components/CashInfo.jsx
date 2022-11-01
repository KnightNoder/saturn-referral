import React from 'react';
import "../css/howItWorksCards.css";
import cashPic from '../images/mcash.png';

const CashInfo = ({cashName}) => {
  return (
    <div className='mcash-balance-nil-mobile'>
        <div className="mcash-balance-nil">
            <div className="mcash-header"> <span className="mcash-pic"> <img src={cashPic} alt=""
            className="reward-img" srcset="" /> </span> {cashName} Balance</div>
            <div className="mcash-content">
            You will be able to see your {cashName} balance when your referrals place
            an order using your code. Come back later to check.{" "}
            </div> 
        </div>
    </div>
  )
}

export default CashInfo