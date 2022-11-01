import React from 'react'
import '../css/PhoneNumberPopup.css'
const PhoneNumberPopup = ({phoneNumber,SetPhoneNumberTemp,isValidInput,changePhoneNumber}) => {
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
  return (
    <>
      <div className="phone-number-popup-div">
        <div className='phone-number-popup-heading'>
          Change phone number
        </div>
        <div className='input-phone-popup'>
          <input type="text" className='input-phone-text' value={phoneNumber}
            onChange={SetPhoneNumberTemp} 
            placeholder="Enter your phone number" inputMode="numeric"
            pattern="[1-9]{1}[0-9]{5}"
            minLength="10"
            maxLength="10" onKeyDown={isValidInput}
            autoComplete='off'/>
        </div>
        <div className='phone-number-submit-div'>
          <button onClick={(event) => changePhoneNumber(event,true)} disabled={!phone_number_check()}
          className={ ` phone-number-popup ${(phone_number_check())? 'phone-number-submit-correct': 'phone-number-submit' }`}>
            Submit
          </button>
        </div>
      </div>
    </>
  )
}

export default PhoneNumberPopup