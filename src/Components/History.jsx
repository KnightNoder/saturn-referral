import {useState,React,useRef} from "react";
import EarningsCard from "./EarningsCard";
import VouchersCard from "./VouchersCard";
import nocoinsPic from '../images/no-coins.png'
import live from '../images/live.png';
import constants from '../lib/constants';
import ReferAFriend from "./ReferAFriend";
import sharePic from '../images/share.png'
import copyPic from '../images/copy-dark.png';
import { BottomSheet } from "react-spring-bottom-sheet";
import { Modal } from "react-responsive-modal";
import "../css/History.css";
import "../css/referAFriend.css";

const History = ({user_data, customer_id,focus_ref,referral_code,cashName}) => {
    const [buttonsState,setButtonState] = useState({
        earningsButtonColor: "white",
        earningsButtonTextColor: process.env.REACT_APP_COLOR_DARK,
        earnings: true,
        spendsButtonColor:"#ebebeb",
        spendsButtonTextColor:"black",
        spends: false,
        vouchersButtonColor: "#ebebeb",
        vouchersButtonTextColor:"black",
        vouchers: false

    })

    const showEarnings = () =>{
        setButtonState({
            earningsButtonColor: "white",
            earningsButtonTextColor:process.env.REACT_APP_COLOR_DARK,
            earnings: true,
            spendsButtonColor:"#ebebeb",
            spendsButtonTextColor:"black",
            spends: false,
            vouchersButtonColor: "#ebebeb",
            vouchersButtonTextColor:"black",
            vouchers: false
        })
    }

    const showVouchers = () => {
      setButtonState({
          earningsButtonColor: "#ebebeb",
          earningsButtonTextColor:"black",
          earnings: false,
          spendsButtonColor:"#ebebeb",
          spendsButtonTextColor:"black",
          spends: false,
          vouchersButtonColor: "white",
          vouchersButtonTextColor:process.env.REACT_APP_COLOR_DARK,
          vouchers: true
      })
  }
  const redirectToShopifyHome = () => {
    window.location.href = process.env.REACT_APP_LOGIN_REDIRECT_URL;
  }
  return (
    <>
     { customer_id && (user_data.number_of_pending_referrals || user_data.lifetime)?  <div className="history-container">
      <div className="how-heading" ref={focus_ref} >{constants.HISTORY_SECTION_HEADER_TEXT}</div>
      { (user_data.coins_on_way ) ?  <div className="history-referral" >
        <div className="history-referral-header">
           <div className="live-div">
                <img src={live} className='live-img' alt="" srcset="" />
           </div>
           <div className="live-div-content">
               <span className="green-text"> {user_data.coins_on_way} {cashName} Credits</span> are on your way!
           </div>
        </div>
        <div className="history-referral-content">
            <div style={{flex:1, visibility:"visible"}}>
            </div>
            <div style={{flex:10}}>
            {user_data.coins_on_way} {cashName} Credits will be added once your referral receives their order
            </div>
        </div>
      </div> : null }
      <div className="mobile-history-header">
        {constants.HISTORY_SECTION_HEADER_TEXT}
      </div>
      <div className='rewardsAndBurnsContainer' >
            <div className='toggleButtons'>
                <button className='rewards' style={{backgroundColor: buttonsState.earningsButtonColor, color: buttonsState.earningsButtonTextColor }} onClick={showEarnings}> 
                    {constants.HISTORY_EARNINGS_BUTTON_TEXT}
                </button>
                <button className='rewards' id="vouchers" style={{backgroundColor: buttonsState.vouchersButtonColor, color: buttonsState.vouchersButtonTextColor}} onClick={showVouchers}>
                    {constants.HISTORY_VOUCHERS_BUTTON_TEXT}
                </button>
            </div>
            { (user_data?.rewards_list?.length && buttonsState.earnings )  ? 
            <div className="history-earnings-div">
            {buttonsState.earnings && user_data.rewards_list.map((item,key)=> (
                <EarningsCard key={key} item={item} cashName={cashName} />
                ))} 
            </div> : 
            buttonsState.earnings && 
            <div>
                <div className="no-coins-pic"> 
                <img src={nocoinsPic} alt="" srcset="" />
                <div className="no-earnings">
                    {constants.HISTORY_NO_EARNINGS_TEXT}
                </div>
                </div>  
                <div className="no-earnings-header">
                    To earn more {cashName}, refer your friends by sharing your code
                </div>
                <ReferAFriend customer_id={customer_id} inHistory={true} referral_code={referral_code}/>
            </div>
            }
            { ((user_data?.pending_amazon_vouchers?.length || user_data?.vouchers_array?.length) && buttonsState.vouchers)? 
            <div className="history-earnings-div">
                {buttonsState.vouchers && user_data.pending_amazon_vouchers.map((item,key)=> (
                    <VouchersCard key={key} item={item} pending="true"/>  
                ))}
                {buttonsState.vouchers && user_data.vouchers_array.map((item,key)=> (
                    <VouchersCard key={key} item={item} />  
                ))}
            </div> : 
             buttonsState.vouchers && 
              <div>
                <div className="no-coins-pic"> 
                <img src={nocoinsPic} alt="" srcset="" />
                <div className="no-earnings">
                  {constants.HISTORY_NO_VOUCHERS_TEXT}
                </div>
                </div>  
                <div className="no-earnings-header">
                    To earn more {cashName}, refer your friends by sharing your code
                </div>
                <ReferAFriend customer_id={customer_id} inHistory={true} referral_code={referral_code}/>
              </div>
              }
      </div>
    </div> : null }
    </>
  );
};

export default History;
