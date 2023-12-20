import React, { useState,useEffect } from "react";
import "./Login.css";
import logo from "../logo/logo_new.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import MyGoogleLogin from "./MyGoogleLogin";
import MyFacebookLogin from "./MyFacebookLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [facebook_id, setFacebookId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [google_name, setGoogle_name] = useState(null);
  const [google_email, setGoogle_email] = useState(null);
  const [google_sub, setGoogle_sub] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    handleSocial();
  }, [google_name, google_email, google_sub, facebook_id,name,email]);
  


  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = await dispatch(signInUser({ username, password }));
    if (loginData.payload && loginData.payload.user) {
      setUsername("");
      setPassword("");
      if (loginData.payload.user.is_seller) {
        navigation("/dashboard");
        console.log("seller");
      } else {
        navigation("/");
        console.log("regular user");
      }
    } else {
      toast.error(`Invalid username or password`, {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    }
  };

  const handleUserNAme = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleFacebookLogin = (data) => {
    console.log("Handling Facebook login data in parent:", data);
    setFacebookId(data.facebook_id);
    setName(data.name);
    setEmail(data.email);
    
  };
  const handleGoogleLogin = (data) => {
    // Process or update state with the Google login data
    console.log("Handling Google login data in parent:", data);
    setGoogle_name(data.name);
    setGoogle_email(data.email);
    setGoogle_sub(data.sub);
  };
  const handleSocial = () => {
    const payload = {
      facebook_id: facebook_id,
      google_id: google_sub,
      email: email || google_email,
      name: name || google_name,
    };
    console.log('login-socail',payload);
  };

  return (
    <div>
      <Header />
      <div className="container">
        <section className=" login">
          <ToastContainer />
          <div className="container py-2">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong shadow"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <form onSubmit={handleLogin} autoComplete="on">
                      <div className="mb-5 mt-2">
                        {user.user?.is_seller == true
                          ? "seller"
                          : user.user?.is_seller == false
                          ? "user"
                          : ""}
                        {/* <img className="mb-1" src={logo} alt='' width={110} /> */}
                        <h4 className="mb-1" style={{ color: "#374151" }}>
                          DjangoPets
                        </h4>
                        <h3>Welcome to DjangoPets! Please login.</h3>
                      </div>
                      <div className="form-floating mb-3">
                        <input
                          type="username"
                          className="form-control"
                          id="floatingInput"
                          placeholder="username"
                          name="username"
                          value={username}
                          onChange={handleUserNAme}
                          required
                        />
                        <label htmlFor="floatingInput">User Name</label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          className="form-control"
                          id="floatingPassword"
                          placeholder="Password"
                          name="password"
                          value={password}
                          onChange={handlePassword}
                          required
                        />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <button className="btn btn-secondary w-50" type="submit">
                        Login
                      </button>
                      <hr className="my-3" />
                      <Link to="/register" className="btn btn-secondary w-100">
                        Register Now
                      </Link>
                      <div className="d-flex justify-content-between align-items-center mt-1">
                        <div className="me-1">
                          <MyFacebookLogin
                            onFacebookLogin={handleFacebookLogin}
                          />
                        </div>
                        <div>
                          <MyGoogleLogin onGoogleLogin={handleGoogleLogin} />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
