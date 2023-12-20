import React from 'react';
import { jwtDecode } from "jwt-decode";


import { GoogleLogin } from '@react-oauth/google';
const MyGoogleLogin = ({onGoogleLogin}) => {
  return (<GoogleLogin
    onSuccess={(credentialResponse) => {
      const { sub, name, email } = jwtDecode(credentialResponse.credential);
      onGoogleLogin({ sub, name, email }); // Pass the data to the parent component
    }}
    onError={() => {
      console.log('Login Failed');
    }}
  />);
}

export default MyGoogleLogin;