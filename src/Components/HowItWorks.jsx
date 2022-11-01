import React from "react";
import Login from "./LoginPopup";
import { Modal } from "react-responsive-modal";
import cashPic from '../images/mcash.png';
import "../css/howItWorksCards.css";
import { BottomSheet } from "react-spring-bottom-sheet";
import ProgressBarComp from "./ProgressBar";
import { useState } from "react";

const HowItWorks = ({customer_id,user_data,cashName}) => {
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

  const redirectToShopifyHome = () => {
    window.location.href = process.env.REACT_APP_LOGIN_REDIRECT_URL;
  }

  return (
    <>
      <div className="how-it-works-container">
        <div className="mobile-how-it-works-header">
          Refer and Earn
        </div>
        <div className="mobile-how-it-works-sub-heading">
          For every Friend you refer, you get 100 {cashName} credits for their future purchases.
          Redeem credits for Amazon gift vouchers.
        </div>
        <div className="how-heading">How it works</div>
        {/* <ProgressBarComp
              progress_step={100}
              img_1="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-1.png?v=1655109040"
              img_2="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-2.png?v=1655109040"
              img_3="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-3.png?v=1655109040"
              img_4="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-4.png?v=1655109040"
              text={'hey'}
        /> */}
        { customer_id  && !user_data.lifetime ? 
        <div className="mcash-balance-desktop">
          <div className="mcash-balance-nil">
            <div className="mcash-header"> <span className="mcash-pic"> <img src={cashPic} alt=""
            className="reward-img-cash" srcset="" /> </span> {cashName} Balance</div>
            <div className="mcash-content">
              You will be able to see your {cashName} balance when your referrals place
              an order using your code. Come back later to check.{" "}
            </div> 
          </div>
        </div> : null}
        <div className="how-content-div">
          <div className="how-content">
            <div className="img-reward">
              <img
                src={` ${process.env.REACT_APP_BRAND == 'Saturn' ?  "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-1.png?v=1660124046" : "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-1-mars.png?v=1666078720"} `}
                alt=""
                className="reward-img"
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Refer a friend</div>
              <div className="img-sub-content">
                Share your code with your friends.
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src={` ${process.env.REACT_APP_BRAND == 'Saturn' ?  "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-2.png?v=1660124046" : "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-2-mars.png?v=1666078733"} `}
                alt=""
                className="reward-img"
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Use code to shop</div>
              <div className="img-sub-content">
                Your friend gets 20% off on his purchase using your code.
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src={` ${process.env.REACT_APP_BRAND == 'Saturn' ?  "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-3.png?v=1660124046" : "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-3-mars.png?v=1666078736"} `}
                
                alt=""
                className="reward-img"
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Earn {cashName}</div>
              <div className="img-sub-content">
                You earn 100 {cashName} credits once the order gets delivered.
              </div>
            </div>
          </div>
          <div className="how-content">
            <div className="img-reward">
              <img
                src={` ${process.env.REACT_APP_BRAND == 'Saturn' ?  "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-4.png?v=1660124046" : "https://cdn.shopify.com/s/files/1/0607/6029/3588/files/image-4-mars.png?v=1666078733"} `}
                alt=""
                className="reward-img"
                srcset=""
              />
            </div>
            <div className="how-sub-div">
              <div className="img-content">Redeem {cashName}</div>
              <div className="img-sub-content">
                Redeem {cashName} for Amazon gift vouchers.{" "}
              </div>
            </div>
          </div>
        </div>
       { !customer_id ? <div className="how-login">
          <div className="how-login-text">
            Log In and unlock these exciting rewards. Let’s go!
          </div>
          <div className="how-login-button-div">
            <button
              className="how-login-button"
              onClick={
                () => redirectToShopifyHome()
              }
            >
              Log In
            </button>
          </div>
        </div> : null}
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
};

export default HowItWorks;
