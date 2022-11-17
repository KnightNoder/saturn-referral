import axios from 'axios';
import React,{useState} from 'react';
import { useEffect } from 'react';
import { Modal } from "react-responsive-modal";
import PhoneNumberPopup from './PhoneNumberPopup';
import SuccessModal from './SuccessModal';
import { BottomSheet } from "react-spring-bottom-sheet";
import whatsappPic from '../images/whatsapp-icon.png'
import "react-spring-bottom-sheet/dist/style.css";
import Loader from "./Loader";
import "react-responsive-modal/styles.css";
import '../css/PhoneNumberSection.css';

const PhoneNumberSection = ({customer_id,customerPhoneNumber,SetPhoneNumber}) => {
  const [phoneNumber,Set_phoneNumber] = useState('');
  const [modalOpen,Set_modalOpen] = useState(false);
  const [loading,Set_loading] = useState(true);
  const [successModal,Set_successModal] = useState(false);
  const [mobileModal,Set_mobileModal] = useState(false);
 
  const getPhoneNumber = async () => {
    try {
      if(document.getElementById('shopify-customer').value){
        SetPhoneNumber(document.getElementById('shopify-customer').value);
      } else {
        const required_phone_number = document.getElementById('shopify-customer-phone')?.value?.slice(3);
        SetPhoneNumber(required_phone_number)
      }
      Set_loading(false);
    } catch(error) {
      console.log(error);
      Set_loading(false);
      return null;
    }
  }

  const closePopup = () => {
    Set_modalOpen(false);
  }

  const closeSuccessModal = () => {
    Set_successModal(false);
  }

  const closeMobileModal = () => {
    Set_mobileModal(false);
  }

  const changePhoneNumber = async (event,from_popup) => {
    Set_mobileModal(false);
    Set_modalOpen(false);
    Set_loading(true);
    let data = JSON.stringify({
        "customer": customer_id,
        "phoneNumber": phoneNumber
    });

    let config = {
      method: 'post',
      url: `${process.env.REACT_APP_SHOPIFY_DATA_URL}/shopify-user/updateData`,
      headers: { 
        'Content-Type': 'application/json', 
      },
      data : data
    };

    try {
      const response = await axios(config);
      SetPhoneNumber(response.data);
      Set_loading(false);
      if(!from_popup){
        Set_successModal(true);
        setTimeout(() => {
          Set_successModal(false);
        }, 1000);
      }
    } catch(error) {
      Set_loading(false);
      console.log(error);
    }
  }
  
  const SetPhoneNumberTemp = (e) =>{
    Set_phoneNumber(e.target.value)
  }
  
  const changeNumber = () => {
    window.innerWidth > 600 ? Set_modalOpen(true) : Set_mobileModal(true);
  }
  
  const phone_number_check = () => {
    if (phoneNumber) {
      if (
        phoneNumber.length == 10 &&
        (phoneNumber.startsWith("6") ||
          phoneNumber.startsWith("7") ||
          phoneNumber.startsWith("8") ||
          phoneNumber.startsWith("9"))
      )
        return true;
        else {
          return false;
        }
    }
  };

  const isValidInput = (e) => {
    if (e.keyCode === 13) {
      document.getElementById("phone-number-submit").click();
    }
    
    let x = e.which || e.keyCode;
    return (x >= 48 && x <= 57) ||
    x === 8 ||
    (x >= 35 && x <= 40) ||
    x === 46 ||
    (x >= 96 && x <= 105) ||
    x === 9
    ? null
    : e.preventDefault();
  }
  
  useEffect(()=>{
    getPhoneNumber();
  },[]);

  return (
    <>
    { customer_id &&
    <div>
    { !loading ? 
    <div>
     { !customerPhoneNumber ?  
    <div className='phone-number-section'>
      <div className='section-header'>
          Almost there!
      </div>
      <div className='sub-heading'>
        To continue using your account and for all future updates, please link your phone number. All notifications will be sent via
        <span className='whatsapp-image-span'> <img src={whatsappPic} className="whatsapp-img" alt="" srcset="" /></span> Whatsapp/SMS.
      </div>
      <div className='input-section'>
        <div className='input-phone-number'>
          <input type="text" className='input-phone-text' value={phoneNumber}
           onChange={(e)=>Set_phoneNumber(e.target.value)} 
           placeholder="Enter your phone number" inputMode="numeric"
           pattern="[1-9]{1}[0-9]{5}"
           minLength="10"
           maxLength="10" onKeyDown={isValidInput}
           autoComplete='off'/>
        </div>
          <button id="phone-number-submit" onClick={changePhoneNumber} disabled={phoneNumber?.length != 10} className={`${(phone_number_check())? 'phone-number-submit-correct': 'phone-number-submit' }`}>
            Submit
          </button>
      </div>
    </div> : 
    <div className='phone-number-section'>
      <div className='sub-heading'>
        All the updates will be sent on your registered phone number via 
        <span className='whatsapp-image-span'> <img src={whatsappPic} className="whatsapp-img" alt="" srcset="" /></span> Whatsapp/SMS.
      </div>
      <div className='phone-number-details-div'>
        <span className='phone-number-text'>Phone Number:</span><span className='phone-number' >{customerPhoneNumber}</span><a className='change-phone-link' onClick={changeNumber} >Change</a>
      </div>
    </div> }
    </div> 
    : <Loader/> 
      }
      </div> }
    <Modal
          center
          open={modalOpen}
          onClose={closePopup}
          showCloseIcon={false}
          classNames={{
            modal: 'custom-modal-phone-number',
          }}
        >
        <PhoneNumberPopup 
        phoneNumber={phoneNumber} SetPhoneNumberTemp={SetPhoneNumberTemp} isValidInput={isValidInput} changePhoneNumber={changePhoneNumber}
        phone_number_check={phone_number_check}
        // closeDesktopModal={closeDesktopModal} close_SuccessPopup={close_SuccessPopup} 
        />
      </Modal>
      <Modal
          center
          open={successModal}
          onClose={closeSuccessModal}
          showCloseIcon={false}
          classNames={{
            modal: 'custom-modal-success-phone-number',
          }}
        >
        <SuccessModal/>
      </Modal>
      <BottomSheet open={mobileModal} onDismiss={closeMobileModal}>
        <PhoneNumberPopup 
          phoneNumber={phoneNumber} SetPhoneNumberTemp={SetPhoneNumberTemp} isValidInput={isValidInput} changePhoneNumber={changePhoneNumber}
          // closeDesktopModal={closeDesktopModal} close_SuccessPopup={close_SuccessPopup} 
          />
      </BottomSheet>
  </>
  )
}

export default PhoneNumberSection