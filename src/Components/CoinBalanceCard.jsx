import "../css/coinBalanceCard.css";
// import coinPic from './images/onlycoin.png'
import pic from "../images/mobile-mcash.png";
import historyPic from "../images/history3.png";
import React, { useState, useContext, createContext, useEffect } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import Chip from "@mui/material/Chip";
// import Modal from 'react-modal';
import RedeemPopup from "./RedeemPopup";
import NoMcashPopUp from "./NoMcashPopUp";
import SuccessPopup from '../Components/SuccessPopup';
import axios from "axios";
import constants from "../lib/constants";
import Loader from "./Loader";
const mobileViewContext = createContext();

export default function CoinBalanceCard({ showHistory, user_data, customer_id,scrollToVouchers,setData,cashName,customerPhoneNumber }) {
  const [open, setOpen] = useState(false); 
  const [modalIsOpen, setIsOpen] = useState(false);
  const [successPopup,Set_successPopup] = useState(false);
  const [noCashModalIsOpen,Set_noCashModalIsOpen] = useState(false);
  const [loading,Set_loading] = useState(false);
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

  const openNoMcashPopUp = () => {
    Set_noCashModalIsOpen(true);
  }

  const closeNoMcashPopUp = () => {
    Set_noCashModalIsOpen(false);
  }

  const open_SuccessPopup = () => {
    Set_successPopup(true);
  } 

  const close_SuccessPopup = () => {
    Set_successPopup(false);
  } 

  const setLoadingFalse = () => {
    Set_loading(false);
  }

  const setLoadingTrue = () => {
    Set_loading(true);
  }

  return (
    <>
      { !loading ?  <div>
      <div className="coinBalanceHeading">
        {cashName} Balance:
        <div className="history" id="history" onClick={() => showHistory()}>
          <img
            style={{ marginRight: "5px", height: "10px" }}
            src={historyPic}
            alt=""
          />{" "}
          {constants.WALLET_HISTORY_ICON_TEXT}
        </div>
      </div>
      <div className="coinBalanceCard">
        <img
          src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/new_cash.png?v=1653396179"
          className="coinPic"
          alt=""
        />
        <div className="coinBalanceRightSection">
          <div style={{ flex: 1 }} className="earnings-div">
            <div className="headerCard">{cashName} Balance</div>
            <div className="coinBalanceDiv">
              <div className="coinBalance">{user_data.balance}</div>
            </div>
          </div>
          <div className="earnings-div-mobile">
              <div>
                <img src={pic} className="mobile-mcash" alt="" srcset="" />
              </div>
              <div className="mobile-coinBalance">{user_data.balance}</div>
          </div>
        </div>
      </div>
      <div className="lifetime-earnings">
        <span className="earnings">{constants.WALLET_LIFETIME_EARNINGS_TEXT}</span>
        <span className="amount">{user_data.lifetime}</span>
      </div>
      <div className="button-container">
        <button
          id="redeemBtn"
          onClick={!(user_data.balance < 500 ) ? (window.innerWidth > 900 ? openDesktopModal : openMobileModal ) : openNoMcashPopUp}
          className="redeem"
          type="button"
        >
          {constants.WALLET_REDEEM_NOW_BUTTON_TEXT}
        </button>
        <BottomSheet open={open} onDismiss={closeMobileModal}>
          <RedeemPopup user_data={user_data} customer_id={customer_id} open_SuccessPopup={open_SuccessPopup} closeDesktopModal={closeDesktopModal} 
          closeMobileModal={closeMobileModal} close_SuccessPopup={close_SuccessPopup} setData={setData} cashName={cashName} setLoadingFalse={setLoadingFalse}
          setLoadingTrue={setLoadingTrue} customerPhoneNumber={customerPhoneNumber}/>
        </BottomSheet>
        <Modal
          center
          open={modalIsOpen}
          onClose={closeDesktopModal}
          classNames={{
              modal: 'custom-modal-redeem',
          }}
        >
          <RedeemPopup user_data={user_data} customer_id={customer_id} open_SuccessPopup={open_SuccessPopup} closeDesktopModal={closeDesktopModal}
          closeMobileModal={closeMobileModal} close_SuccessPopup={close_SuccessPopup} setData={setData} cashName={cashName} setLoadingFalse={setLoadingFalse}
          setLoadingTrue={setLoadingTrue} customerPhoneNumber={customerPhoneNumber}/>
        </Modal>
        <Modal
          center
          open={noCashModalIsOpen}
          onClose={closeNoMcashPopUp}
          showCloseIcon={false}
          classNames={{
              modal: 'custom-modal-no-mcash',
          }}
        >
          <NoMcashPopUp closeNoMcashPopUp={closeNoMcashPopUp} code={user_data.referral_code} cashName={cashName}/>
        </Modal>
      </div>
      </div> : <Loader/> }
      <Modal
          center
          open={successPopup}
          onClose={close_SuccessPopup}
          showCloseIcon={false}
          classNames={{
              modal: 'custom-modal-success',
          }}
        >
          <SuccessPopup closeDesktopModal={closeDesktopModal} close_SuccessPopup={close_SuccessPopup} scrollToVouchers={scrollToVouchers}/>
        </Modal>
    </>
  );
}
