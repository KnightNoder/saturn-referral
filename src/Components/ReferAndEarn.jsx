import "../css/referAndEarn.css";
import constants from '../lib/constants';
import ReferAFriend from "./ReferAFriend.jsx";

export default function ReferAndEarn({customer_id,cashName,referral_code}) {
  return (
    <div className={`referContainer ${process.env.REACT_APP_BRAND == 'Saturn' ? "saturn-gradient":"mars-gradient"} `}>
      <div className="content">
        <div className="top-div-heading">{constants.BANNER_HEADER}</div>
        <div className="top-heading">{constants.BANNER_SUB_HEADING}</div>
        <div className="bottom-div-heading ">
          <div className="bottom-div-content" id="top">
            For every friend you refer,you get 100 {cashName} credits for their future purchases.
          </div>
          <div className="bottom-div-content" id="bottom">
            {constants.BANNER_BOTTOM_CONTENT}
          </div>
        </div>
        <div className="coupon-image-div">
          <img
            className="coupon-image"
            src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/gift-coupon.png?v=1653388246"
          />
        </div>
      </div>
      <ReferAFriend customer_id={customer_id} cashName={cashName} referral_code={referral_code} />
    </div>
  );
}
