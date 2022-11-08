import React, { Component } from "react";
import "../css/walletCards.css";
import "../css/coinBalanceCard.css";
import CoinBalanceCard from "./CoinBalanceCard";
import giftPic from "../images/gift.png";
import discountIcon from "../images/discount.png";
import pic from "../images/WalletCardImage.jpg";
import constants from "../lib/constants";

export default function WalletCards({ showHistory, user_data, customer_id,scrollToVouchers,setData,cashName,customerPhoneNumber,referral_code }) {
  return (
    <>
      { customer_id && (user_data.number_of_pending_referrals || user_data.lifetime) ? <div className="walletCardsContainer">
        <div className="coinBalanceCardContainer">
        { user_data.coins_on_way ? <div className="coinsOnWayFlex">
            <div className="gift-pic-div">
              <img src={giftPic} className="giftPic" alt="" />
            </div>
              <div className="coinsOnWay">
              <span className="onWayCoinsNumber">{user_data.coins_on_way}</span>
              &nbsp;{cashName} credits are on the way
            </div> 
          </div> : null}
          { user_data.amazon_voucher_value ? <div className="coinsOnWayFlex">
            <div className="gift-pic-div">
              <img src={discountIcon} className="giftPic" alt="" />
            </div>
            <div className="coinsOnWay">
              {constants.WALLET_VOUCHERS_ON_WAY_TEXT}&nbsp;
              <span className="onWayCoinsNumber" style={{color:"#1DBA78"}}>{user_data.amazon_voucher_value}</span>
            </div>
          </div> : null}
        </div>
        <div className="coinBalanceCardContainer short-wallet-container container-dash-border">
          <CoinBalanceCard cashName={cashName} setData={setData} scrollToVouchers={scrollToVouchers} user_data={user_data} showHistory={showHistory}
          customer_id={customer_id} customerPhoneNumber={customerPhoneNumber}referral_code={referral_code}/>
        </div>
      </div> : null }
    </>
  );
}
