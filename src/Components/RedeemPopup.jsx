import "../css/redeemPopup.css";
import Container from "@mui/material/Container";
import pic from "../images/mcash.png";
import constants from "../lib/constants";
import minus from "../images/minus.png";
import plus from "../images/plus.png";
import saturnMinus from "../images/saturn-minus.png";
import saturnPlus from "../images/saturn-plus.png";
import share from "../images/small-share.png";
import share_saturn from '../images/share-saturn.png';
import redeem_saturn from '../images/redeem-saturn.png';
import redeem_mars from '../images/redeem_mars.png';
import { Modal } from "react-responsive-modal";
import next from "../images/next.png";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import React, { Component } from "react";
import axios from "axios";

export default function RedeemPopup({ user_data, customer_id,closeDesktopModal,open_SuccessPopup,
  closeMobileModal,close_SuccessPopup,setData,cashName,setLoadingFalse,setLoadingTrue,customerPhoneNumber }) {
  const [redeemAmount, setRedeemAmount] = useState(500);
  const [progress_amount, Set_progress_amount] = useState(0);
  const [loading_state,Set_loading_state] = useState(false);
  const [friend_to_refer_for_redemption,Set_friend_to_refer_for_redemption] = useState(0);
  const [loading,Set_loading]= useState(false);

  const mcash_for_redeem_pending = (user_data.balance%500);
  const can_redeem = (user_data/500);
  const number_of_more_friends_to_refer = (500-(mcash_for_redeem_pending))/100;
  const next_redemption_amount = user_data.balance+mcash_for_redeem_pending;
  const decrement = () => {
    if (redeemAmount - 500 == 0) {
      document.getElementById("error-text-redeem").style.visibility='visible';
      document.getElementById("error-text-redeem").innerHTML = 'Enter a minimum value of 500';
    } else if ( redeemAmount - 500 > 0) {
     setRedeemAmount(redeemAmount - 500);
     document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible"
    }
  };
  const increment = () => {
    if (redeemAmount + 500 <= user_data.balance) {
      setRedeemAmount(redeemAmount + 500);
      document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible";
      document.getElementById("error-text-redeem").innerHTML = 'Enter a value less than the current balance';
    }
  };

  const setAmount = (amount,id) => {
    if(amount <= user_data.balance) {
    setRedeemAmount(amount);
    document.getElementById("error-text-redeem").style.visibility = "hidden"
    } else {
      document.getElementById("error-text-redeem").style.visibility = "visible"
    }
   }

  const redeemCoins = async () => {
    setLoadingTrue();
    const data = {
      customer_id: customer_id,
      redeem: redeemAmount,
      brand: process.env.REACT_APP_BRAND,
      phone: customerPhoneNumber,
      email: document.getElementById('shopify-customer-email').value
    };
    console.log(data,'red data');
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/redeemMcash`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
    .then((response) => {
        console.log(response.data,'resp data');
        closeDesktopModal();
        closeMobileModal();
        setData(response);
        setLoadingFalse();
        open_SuccessPopup();
    })
    .catch((error) => {
      Set_loading(false);
      console.log(error);
    });

    // setTimeout(()=>{
    //   closeDesktopModal();
    //   closeMobileModal();
    //   open_SuccessPopup();
    //   setLoadingFalse();
    //   // setData();
    // },3000)
  };
  useEffect(() => {
    const progress_value = ((parseInt(user_data.balance % 500) / 500 )*100) || 0
    Set_progress_amount(progress_value);
  }, []);
  return (
    <>
       <Container>
        <div className="modalContainer">
          <div className="headerContent">
            <div className="modalHeader">{constants.REDEEM_POPUP_HEADER_TEXT}</div>
          </div>
          <div className="sub-heading-redeem">
            <div className="redeem-message">
              {constants.REDEEM_POPUP_SUB_HEADING_TEXT} 
            </div>
            <div className="redeemCoinBalance">
              <div className="redeemCoinBalanceText">{constants.REDEEM_POPUP_BALANCE_TEXT}</div>
              <div className="redeemCoinBalanceAmount">{user_data.balance}</div>
            </div>
          </div>
          <div className="addCoins">
            <div className="minus" onClick={() => decrement()}>
              <img src={ process.env.REACT_APP_BRAND == 'Saturn' ? saturnMinus : minus} className="minus-image" alt="" />
            </div>
            <div className="addCoinsText">
              <img src={pic} alt="" className="redeem-cash-pic" /> {redeemAmount}
            </div>
            <div className="plus" onClick={() => increment()}>
              <img src={process.env.REACT_APP_BRAND == 'Saturn' ? saturnPlus : plus} className="plus-image" alt="" />
            </div>
          </div>
          <div id="error-text-redeem">
            {constants.REDEEM_POPUP_ERROR_TEXT}
          </div>
           { user_data.balance > 1000
           ?  
           <div className="coinsList">
           {((user_data.balance - mcash_for_redeem_pending - 1000)) > 0 
            ? 
            <button className="fiveHundred" id="fiveHundred" onClick={() =>{setAmount(user_data.balance - mcash_for_redeem_pending-1000,"fiveHundred");}}>
              {user_data.balance - mcash_for_redeem_pending-1000}
            </button> 
            : 
            null}
            { ((user_data.balance - mcash_for_redeem_pending - 500)) > 0 
            ? 
            <button className="thousand" id="thousand" onClick={(e) =>setAmount(user_data.balance- mcash_for_redeem_pending-500,"thousand")}>
             {user_data.balance - mcash_for_redeem_pending - 500}
            </button> 
            : 
            null}
            { ((user_data.balance - mcash_for_redeem_pending)) > 0 
            ? 
            <button className="fifteenHundred" id="fifteenHundred" onClick={(e) => setAmount(user_data.balance-mcash_for_redeem_pending,"fifteenHundred")}>
            {user_data.balance- mcash_for_redeem_pending}
            </button> 
            : 
            null }
          </div> 
          : 
          null}
          <div className="earnAndSave">
            <div className="saveHeader">Gift More. Save More.</div>
            <div className="saveContent">
              <img src={process.env.REACT_APP_BRAND == 'Saturn' ?  share_saturn : share} alt="" style={{}} />
              <span className="save-content-text">
                100 {cashName} credits for every referral order
              </span> 
            </div>
            <div className="saveContent bottom">
              <img src={process.env.REACT_APP_BRAND == 'Saturn' ? redeem_saturn : redeem_mars} alt="" style={{}} /> 
              <span className="save-content-text">
                Redeem credits for Amazon gift vouchers
              </span>
            </div>
          </div>
          <div >
            <div className="referMore">
              Refer {number_of_more_friends_to_refer} more friend{`${number_of_more_friends_to_refer>1 ? 's':""}`} to reach{"  "}
            <span className="greenText">
              {user_data.balance+number_of_more_friends_to_refer*100} {cashName} credits
            </span>
            </div> 
          </div>
        <div className="progressBar">
          <LinearProgress
            color="success"
            variant="determinate"
            value={progress_amount}
          />
        </div>
        <button
          id="redeemBtn"
          className="redeemButtonPopUp"
          type="button"
          onClick={() => {redeemCoins()}}
        >
          {constants.WALLET_REDEEM_NOW_BUTTON_TEXT}
        </button>
        </div> 
      </Container> 
    </>
  );
}
