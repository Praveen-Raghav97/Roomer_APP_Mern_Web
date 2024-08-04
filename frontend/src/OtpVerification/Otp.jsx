import React, { useState } from 'react';
import axios from 'axios';
import './Otp.css'
const Otp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSendOtp = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_URL/send-otp', { phoneNumber });
      if (response.data.success) {
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error('Error sending OTP', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post('YOUR_BACKEND_URL/verify-otp', { phoneNumber, otp });
      if (response.data.success) {
        setIsAuthenticated(true);
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };

  return (
    <div className='otp-con'>
       
      {!isAuthenticated ? (
        <div>
          {!isOtpSent ? (
            
            <div className='otp-box'>
                 <h4>We Send You An OTP...</h4>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
              />
              <button className='btn dark-btn' onClick={handleSendOtp}>Send OTP</button>
            </div>
          ) : (
            <div className='otp-box'>
                 <h4>Enter Your OTP...</h4>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
              <button className='btn dark-btn' onClick={handleVerifyOtp}>Verify OTP</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Authenticated Successfully!</h2>
        </div>
      )}
    </div>
  );
};

export default Otp;
