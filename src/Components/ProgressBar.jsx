import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const ProgressBarComp = ({
  progress_step,
  img_1,
  img_2,
  img_3,
  img_4,
  text,
}) => {
  return (
    <>
      <div className="progress-container">
        <div className="progress-bar-container">
          <ProgressBar percent={progress_step} filledBackground="var(--color-dark)">
            <Step transition="scale">
              {({ accomplished, index }) => (
                // <img
                // className='progress-bar-image'
                // // src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-1.png?v=1655109040"
                // src={img_1}
                // />
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished, index }) => (
                // <img
                // className='progress-bar-image'
                // // src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-2.png?v=1655109040"
                // src={img_2}
                // />
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished, index }) => (
                // <img
                // className='progress-bar-image'
                // // src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-3.png?v=1655109040"
                // src={img_3}
                // />
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
            <Step transition="scale">
              {({ accomplished, index }) => (
                // <img
                //   className='progress-bar-image'
                //   // src="https://cdn.shopify.com/s/files/1/0607/6029/3588/files/skin-4.png?v=1655109040"
                //   src={img_4}
                //   />
                <div
                  className={`indexedStep ${
                    accomplished ? "accomplished" : null
                  }`}
                >
                  {index + 1}
                </div>
              )}
            </Step>
          </ProgressBar>
        </div>
        {/* <div
          className="progress-bar-text"
        >
          <div className="progress-bar-div-text left">{text}</div>
          <div className="progress-bar-div-text center-left">Basic Details</div>
          <div className="progress-bar-div-text center-right">Life Style</div>
          <div className="progress-bar-div-text right">Health</div>
        </div> */}
      </div>
    </>
  );
};

export default ProgressBarComp;
