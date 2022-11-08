import React from "react";
import { useEffect, useState,useRef } from "react";
import axios from 'axios';
//Components
import ReferAndEarn from "./Components/ReferAndEarn";
import HowItWorks from "./Components/HowItWorks";
import History from "./Components/History";
import WalletCards from "./Components/WalletCards";
import BackNavigator from "./Components/BackNavigator";
import Loader from "./Components/Loader";
import PhoneNumberSection from "./Components/PhoneNumberSection";
import CashInfo from "./Components/CashInfo";
//css
import "./App.css";

const App = () => {
  const [screenSize,setScreenSize] = useState('')
  const [body,Set_body] = useState(null);
  const ref = useRef(null);
  const [showHistory,setShowHistory] = useState(false)
  const [customer_id,Set_customer_id] = useState("");
  const [cashName,Set_cashName]= useState('');
  const [user_data,Set_user_data] = useState({
    "balance":"",
    "lifetime":"",
    "coins_on_way":"",
    "total_earnings":"",
    "rewards_list":[],
});
const [referral_code,Set_referral_code] = useState("");
const [customerPhoneNumber,Set_customerPhoneNumber] = useState('');

const SetPhoneNumber = (phone) => {
  Set_customerPhoneNumber(phone);
}
const scrollToVouchers = () => {
  ref.current?.scrollIntoView({behavior: 'smooth'});
  // ref.current?.scrollIntoView();
};

const getEarningsData = async () => {
  const data = {
    // "customer_id":"6414055473364",
    //  customer_id:"6411445371092",
    // "customer_id":"6461613637844",
    customer_id: document.getElementById("shopify-customer-id")?.value
  }
  const config = {
      method: 'post',
      mode: 'cors',
      url : `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/checkBalance`,
      headers: { 
      'Content-Type': 'application/json'
      },
      data : data
  }
   await axios(config).then((response) =>{
      Set_body(true);
      setData(response);
    }).catch((error)=>{
      Set_body(true);
      console.log(error,'error');
    })
  }

const getReferralCode = async () => {
  const data = {
    customer_id: document.getElementById("shopify-customer-id")?.value,
    // "customer_id":"6461613637844",
    // customer_id:"6411445371092",
  };
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_REFERRAL_BASE_URL}/referral/createReferral`,
    headers: {
      "Content-Type": "application/json",
    },
    data: data
  };
  await axios(config)
    .then((response) => {
      Set_body(true);
      Set_referral_code(response.data.body.referral_code);
    })
    .catch((error) => {
      Set_body(true);
      console.log(error, "error");
    });
}

  const toggleHistoryTrue = () => {
    setShowHistory(true);
  }
  
  const toggleHistoryFalse = () => {
    setShowHistory(false);
  } 
    
  const setData = (response) => {
    let amazon_vouchers_total_sum = 0;
    let pending_rewards_sum = 0;
    const pending_rewards =  response.data.body.ledger.filter((x) => x.status == 'pending' && x.type == "credit")
    const pending_rewards_values = pending_rewards.map((x) => x.value);
    if (pending_rewards_values.length){
      pending_rewards_sum = pending_rewards_values?.reduce((x,y) => x+y);
    };
    const rewards_earned = response.data.body.ledger.filter((x) => x.status == 'rewarded');
    const amazon_vouchers_array=response.data.body.ledger.filter((x) => x.voucher_code != "0");
    amazon_vouchers_array.forEach((x) => amazon_vouchers_total_sum += x.value);
    const pending_amazon_vouchers = response.data.body.ledger.filter((x) => {return (x.type == 'debit' && x.status == "pending")});
    Set_user_data({
          "balance": response.data.body.balance,
          // "balance": 0,
          "lifetime": response.data.body.lifetime,
          // lifetime:0,
          "coins_on_way": pending_rewards_sum,
          "rewards_list": rewards_earned,
          // rewards_list:[],
          "amazon_voucher_value":amazon_vouchers_total_sum,
          "vouchers_array":amazon_vouchers_array,
          // "vouchers_array":[],
          "number_of_pending_referrals":pending_rewards_values.length,
          "pending_amazon_vouchers": pending_amazon_vouchers,
          "referral_code": referral_code,
          // "pending_amazon_vouchers": [] 
      });
  }

  useEffect(()=>{
  
    document.documentElement.style.setProperty(
      "--border",
      process.env.REACT_APP_COLOR_BORDER
    );
    document.documentElement.style.setProperty(
      "--color-hover",
      process.env.REACT_APP_COLOR_HOVER
    );
    document.documentElement.style.setProperty(
      "--color-light",
      process.env.REACT_APP_COLOR_LIGHT
    );
    document.documentElement.style.setProperty(
      "--color-normal",
      process.env.REACT_APP_COLOR_NORMAL
    );
    document.documentElement.style.setProperty(
      "--color-dark",
      process.env.REACT_APP_COLOR_DARK
    );
    document.documentElement.style.setProperty(
      "--color-gradient",
      process.env.REACT_APP_COLOR_GRADIENT
    );
    document.documentElement.style.setProperty(
      "--color-text",
      process.env.REACT_APP_TEXT_COLOR
    );
    document.documentElement.style.setProperty(
      "--coins-color-text",
      process.env.REACT_APP_COINS_TEXT_COLOR
    );
    document.documentElement.style.setProperty(
      "--color-coin",
      process.env.REACT_APP_COLOR_COIN
    );
    document.documentElement.style.setProperty(
      "--color-progress",
      process.env.REACT_APP_PROGRESS_BAR
    );
    const cashNameFromEnv = process.env.REACT_APP_BRAND == 'Saturn' ? 'sCash' : 'mCash';
    Set_cashName(cashNameFromEnv);
    const screenWidth = window.innerWidth;
    setScreenSize(screenWidth);
    // Set_customer_id("6411445371092");
     Set_customer_id(document.getElementById("shopify-customer-id")?.value)
    // Set_customer_id("6457619448020");
    // Set_customer_id("6461613637844");

    Set_body(false);
    getEarningsData();
    getReferralCode();
  },[])

  return (
    <>
    { body ? <div className="main-container">
      {showHistory && <BackNavigator hideHistory={toggleHistoryFalse} />}
      {!showHistory && <ReferAndEarn  customer_id={customer_id} showHistory={showHistory} cashName={cashName} referral_code={referral_code}/>}
      {!showHistory && <WalletCards setData={setData} scrollToVouchers={scrollToVouchers} showHistory={toggleHistoryTrue}  
      customer_id={customer_id} user_data={user_data}cashName={cashName} customerPhoneNumber={customerPhoneNumber} referral_code={referral_code}/>}
      {!showHistory && customer_id && !user_data.lifetime && <CashInfo cashName={cashName}/>}
      {!showHistory && < PhoneNumberSection customer_id={customer_id} customerPhoneNumber={customerPhoneNumber} SetPhoneNumber={SetPhoneNumber}/> }
      {!showHistory && <HowItWorks customer_id={customer_id} user_data={user_data} cashName={cashName}/>}
      { ((showHistory &&  window.innerWidth < 600) || (window.innerWidth > 600) ) && 
      <History user_data={user_data} customer_id={customer_id} focus_ref={ref} 
      referral_code={referral_code} cashName={cashName}/>}
    </div> : 
      <Loader/>
      }
    </>
  );
};

export default App;
