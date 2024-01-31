import React from "react";
import FacebookLogin from "react-facebook-login";
import { SocialsignInUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MyFacebookLogin = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  
    const responseFacebook = async (response) => {
      const payload = {
        facebook_id : response.id,
        name: response.name,
        email: response.email
      }
        try {
          const Data = await dispatch(SocialsignInUser(payload));
          console.log('login-socail',Data);   
           navigation("/");
        } catch (error) {
          console.log(error)
        }
      };
      const componentClicked = (data) => {
        console.warn(data);
      };
  return (
    <FacebookLogin
      appId="352570930761579"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      onClick={componentClicked}
      cssClass="my-facebook-button-class"
    />
  );
};

export default MyFacebookLogin;
