import React, { useState } from 'react'
import './Login.css'
import logo from '../logo/logo.png'
// import axios from 'axios'
// import { BASE_URL,LOGIN_ENDPOINT } from '../utlis/apiUrls'
import { Link } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { signInUser } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';

// setUserSession(result.data.token, result.data.username, result.data.id, result.data.secret_identity_id)

const Login = () => {
   const {isAuthenticated } = useSelector ((state)=> state.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigation = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        await dispatch(signInUser({ username, password }))
        console.log(isAuthenticated)
        console.log('------------------11----------------')
        if (isAuthenticated) {
            setUsername('')
            setPassword('')
            navigation('/')
        } else {
            toast.error(`Invalid username or password`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            // For Register
            // Something is wrong, please try again!
        }
    }

    const handleUserNAme = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
   

    return (
        <div>
            <Header/>
            <div className='container'>

                <section className=" login"  >
                    <ToastContainer />
                    <div className="container py-2">
                        <div className="row d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong shadow" style={{ borderRadius: '1rem' }}>
                                    <div className="card-body p-5 text-center" >
                                        <form onSubmit={handleLogin} >
                                        <div className="mb-5">
                                            <img className="mb-1" src={logo} alt='' width={110} />
                                            <h3>Welcome to MediTech! Please login.</h3>
                                            {/* {isLoggedIn? <p>{output.username}</p>: <p>not login</p>} */}
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="username" className="form-control" id="floatingInput" placeholder="username"
                                                name='username' value={username} onChange={handleUserNAme} required />
                                            <label htmlFor="floatingInput">User Name</label>
                                        </div>
                                        <div className="form-floating mb-4">
                                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password"
                                                name='password' value={password} onChange={handlePassword} required
                                            />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        {/* <button className="btn btn-success w-50" onClick={handleLogin} type="button">Login</button> */}
                                        <button className="btn btn-success w-50" type="submit">Login</button>
                                        {/* <button className="btn btn-success w-50" onClick={handleLogout} type="button">Logout</button> */}
                                        <hr className="my-3" />
                                        <Link to='/register' className='btn btn-success w-100 mb-2'>Register Now</Link>
                                        <button className='btn btn-danger w-100'><i className="fab fa-google me-2" /> Sign in with google</button>
                                        <button className='btn btn-primary w-100 mt-2'><i className="fab fa-facebook-f me-2" />Sign in with facebook</button>
                                        </form>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



            </div>

            <Footer/>
        </div>
    )
}

export default Login