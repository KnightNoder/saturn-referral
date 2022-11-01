import { useEffect, useState } from "react";
import constants from "../lib/constants";
import React, { Component } from "react";
import alertImage from '../images/alert.png';
import alertImageMars from '../images/alert_mars.png'
import sharePic from '../images/share.png';
import "../css/NoMcashPopUp.css";
import "../css/referAndEarn.css";

export default function NoMcashPopUp({closeNoMcashPopUp,code,cashName}) {
  const share = async () => {
    if (navigator.share) {
        let image= '';
        if(process.env.REACT_APP_BRAND == 'Saturn'){
          image = await fetch("https://cdn.shopify.com/s/files/1/0607/6029/3588/files/Referral_message.png?v=1664823151");
        } else {
          image = await fetch("https://cdn.shopify.com/s/files/1/0607/6029/3588/files/Referral_message-1.png?v=1665489842");
        }
        const image_blob = await image.blob();
        const file = new File([image_blob],'Whatsapp_referral_image.jpg',{type:"image/jpeg"})
        navigator
        .share({
          files:[file],
          title: "Referral",
          text: `Hey,buddy!\nHere is my ${process.env.REACT_APP_BRAND} by ghc referral code - ${code}.\nYou get 20% off and free delivery on your next order.\nLet's celebrate Good health and Wellness`
        })
        .then(() => {
          console.log("Successfully shared");
        })
        .catch((error) => {
          console.error("Something went wrong", error);
        });
      }
  }
  return (
    <>
        <div className="header-content">
          <div className="alert-image">
            <img className="alert-image-no-mcash" src={process.env.REACT_APP_BRAND == 'Saturn' ?  alertImage : alertImageMars} alt="" srcset="" />
          </div>
          <div className="modal-Header">You don’t have enough {cashName}</div>
          <div className="login-modal-content-mcash">You need atleast 500 {cashName} balance to redeem. Refer more to earn more</div>
          { (window.innerWidth < 600) && <div className={`referFriend-in-nomcash `} href="#referFriend" onClick={() => {share()}}> 
              {/* <div className="share-img-div">
              </div> */}
              <div className="referText">
                <img src={sharePic}  alt="" className='sharePic'  />
                {constants.BANNER_REFER_A_FRIEND_TEXT}
                </div>
            </div> }
        </div>
    </>
  );
}
