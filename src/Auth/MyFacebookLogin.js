import React,{useState} from "react";
import FacebookLogin from "react-facebook-login";

const MyFacebookLogin = ({onFacebookLogin}) => {
   

    const responseFacebook = (response) => {
        onFacebookLogin({
            facebook_id: response.id,
            name: response.name,
            email: response.email,
        })
      };
      const componentClicked = (data) => {
        console.warn(data);
      };
  return (
    <FacebookLogin
      appId="352570930761579"
      autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      onClick={componentClicked}
       cssClass="my-facebook-button-class"
      icon="fa-facebook"
    />
  );
};

export default MyFacebookLogin;
