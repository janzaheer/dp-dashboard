import React from 'react';
import { jwtDecode } from "jwt-decode";
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from "react-redux";
import { SocialsignInUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const MyGoogleLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const onSuccess = async (credentialResponse) => {
    try {
      const decodedData = jwtDecode(credentialResponse.credential);
      console.log('Decoded Data:', decodedData);

  
      const { sub, name, email } = decodedData;
      if (!sub || !name || !email) {
        console.error('Missing required fields in decoded data');
        return;
      }
      const payload = {
        google_id: sub,
        name: name,
        email: email
      };
  
      // console.log('Google Payload:', payload);
  
      const Data = await dispatch(SocialsignInUser(payload));
      console.log('login-social', Data);
  
       navigation("/");
  
    } catch (error) {
      console.log('Error decoding token:', error);
    }
  
  }

  const onError = () => {
    console.log('Login Failed');
  };


  return (<GoogleLogin onSuccess={onSuccess} onError={onError} />);
}

export default MyGoogleLogin;