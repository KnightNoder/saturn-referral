import React, { Component } from "react";
import constants from '../lib/constants';
import { BottomSheet } from "react-spring-bottom-sheet";
import { Modal } from "react-responsive-modal";
import { useEffect, useState } from "react";
import sharePic from '../images/share.png'
import copyPic from '../images/copy-dark.png';
import Login from "./LoginPopup";
import "../css/referAFriend.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";

export default function ReferAFriend({ customer_id,inHistory,cashName,referral_code}) {
  const [clicked, Set_clicked] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const openDesktopModal = () => {
    setIsOpen(true);
  };

  const closeDesktopModal = () => {
    setIsOpen(false);
  };

  const openMobileModal = () => {
    setOpen(true);
  };

  const closeMobileModal = () => {
    setOpen(false);
  };

  const share = async () => {
    if(customer_id){
    if (navigator.share) {
      let image='';
      let link = ''
      if(process.env.REACT_APP_BRAND == 'Saturn') {
        image = await fetch("https://cdn.shopify.com/s/files/1/0607/6029/3588/files/Referral_message.png?v=1664823151");
      } else {
        image = await fetch("https://cdn.shopify.com/s/files/1/0607/6029/3588/files/Referral_message-1.png?v=1665489842");
      }

      if(process.env.REACT_APP_BRAND == 'Saturn') {
        link = `https://www.saturn.health/pages/referral`
      } else {
        link = `https://www.ghc.health/pages/referral`
      }
      const image_blob = await image.blob();
      const file = new File([image_blob],'Whatsapp_referral_image.jpg',{type:"image/jpeg"})
      navigator
      .share({
        files:[file],
        title: "Referral",
        text: `Hey,buddy!\nHere is my ${process.env.REACT_APP_BRAND} by ghc referral code - ${referral_code.toUpperCase()}.\nYou get 20% off and free delivery on your next order.\nLet's celebrate Good health and Wellness
        \n${link} `
      })
      .then(() => {
        console.log("Successfully shared");
      })
      .catch((error) => {
        console.error("Something went wrong", error);
      });
    }
    } else {
        openDesktopModal();
    }
}

  const copyToClipBoard = (obj) => {
    obj.target.innerHTML = "Copied";
    Set_clicked(true);
    navigator.clipboard.writeText(referral_code);
  };

  return (
    <>
      <div className={ `${inHistory? "referAFriendContainer-inHistory": "referAFriendContainer"} ${process.env.REACT_APP_BRAND == 'Saturn' ? "saturn-gradient":"mars-gradient"}`} id="referFriend">
        {(customer_id && !inHistory) ? (
          <div className="refer-code-header">{constants.BANNER_REFERRAL_CODE_INPUT_LABEL}</div>
        ) : null}
        <div className={`${inHistory ? "referral-code-in-history": "referral-code"}`}>
          { customer_id ? <div className={`coupon ${inHistory ? "dotted-box": ""}`}>
            <div className="couponText">
             { referral_code ? referral_code.toUpperCase() :
             <Backdrop
             sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
             open
           >
             <CircularProgress color="inherit" />
             </Backdrop>
              }
            </div>
            <div className="copyCouponDiv">
                <button
                  onClick={(e) => copyToClipBoard(e)}
                  className={`copyCoupon ${clicked ? "copy-green" : ""}`}
                  type="button"
                  >
                  <img src={copyPic} className="copy-pic-referral" alt="" srcset="" />
                  {constants.BANNER_COPY_CODE_TEXT}
                </button>
            </div>
          </div> : null }
          <div className="refer-friend-container">
          { (!customer_id || (window.innerWidth < 600) ) && 
            <div className={`referFriend ${customer_id ? "refer-friend-width-with-customer-id" : 
          "refer-friend-width-no-customer-id"}`} onClick={() => share()}> 
              <div className="referText">
                <img src={sharePic} alt="" className='sharePic'  />
                {constants.BANNER_REFER_A_FRIEND_TEXT}
                </div>
            </div>
          }
          </div>
        </div>
      </div>
      <BottomSheet open={open} onDismiss={closeMobileModal}>
        <Login cashName={cashName}/>
      </BottomSheet>
      <Modal
        center
        open={modalIsOpen}
        onClose={closeDesktopModal}
        showCloseIcon={false}
        classNames={{
          modal:'custom-modal'
        }}
      >
        <Login cashName={cashName}/>
      </Modal>
    </>
  );
}
