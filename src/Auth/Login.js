import React, { useState } from "react";
import "./Login.css";
import logo from "../logo/Django_Pets.png";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const [loading, setLoading] = useState(false); 

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const loginData = await dispatch(signInUser({ username, password }));
      if (loginData.payload && loginData.payload.user) {
        setUsername("");
        setPassword("");
        if (loginData.payload.user.is_seller) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const errorMessage = loginData.payload?.message || "Invalid username or password";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("An error occurred during login", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div>
    <Header />
    <div className="container">
      <section className="login">
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
                    <div className="mb-4 mt-2">
                      <img className="mb-1" src={logo} alt='' width={110} />
                      <h3 style={{ fontSize: "1rem" }}>Welcome to DjangoPets Please login.</h3>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="username"
                        name="username"
                        value={username}
                        onChange={handleUsername}
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
                    <button
                      className="login-btn-color w-100"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Login"}
                    </button>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-center">
                      <span>Don't have an account?</span>
                      <Link to="/register" className="text-success ms-1">
                        Signup
                      </Link>
                    </div>
                    <div className="row g-1 mt-2">
                      <div className="col-12 col-lg-6">
                        <div>
                          <MyFacebookLogin />
                        </div>
                      </div>
                      <div className="col-12 col-lg-6">
                        <div>
                          <MyGoogleLogin />
                        </div>
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


