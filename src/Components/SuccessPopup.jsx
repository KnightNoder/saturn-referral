import { useEffect, useState } from "react";
import React, { Component } from "react";
import successImage from '../images/success.png';
import "../css/Success.css";
import Confetti from 'react-confetti';
import constants from "../lib/constants";

export default function SuccessPopup({close_SuccessPopup,scrollToVouchers}) {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const focusOnVouchers = () => {
    close_SuccessPopup();
    if(window.innerWidth <= 600) {
      document.getElementById("history").click();
    }
    scrollToVouchers();
    document.getElementById("vouchers").click()
  }
  return (
    <>
      <div className="modalContainer">
        <div className="header-content">
          <div className="success-image">
            <img src={successImage} alt="" srcset="" />
          </div>
          <div className="success-modal-Header">{constants.SUCCESS_POPUP_IMAGE_TEXT}</div>
          <div className="success-modal-content top-content">{constants.SUCCESS_POPUP_HEADING_TEXT}</div>
          <div className="success-modal-content success-down-content">{constants.SUCCESS_POPUP_SUB_HEADING_TEXT}</div>
          <div className="how-login-button-div" onClick={() => focusOnVouchers()}>
            <button className="success-button-popup">{constants.SUCCESS_POPUP_VOUCHERS_BUTTON_TEXT}</button>
          </div>
        </div>
        {/* <Confetti
            width={width}
            height={height}
        /> */}
      </div>
    </>
  );
}
