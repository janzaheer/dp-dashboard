import React, { useState } from 'react'
import './Register.css'
import './Login.css'
import { useDispatch } from 'react-redux';
import { signUpUser } from '../store/authSlice';
import logo from "../logo/Django_Pets.png";
import { useNavigate,Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import MyGoogleLogin from './MyGoogleLogin';
import MyFacebookLogin from './MyFacebookLogin';

const Register = () => {
    const [first_name, setFirst_Name] = useState('')
    const [last_name, setLast_Name] = useState('')
    const [phone_number, setPhone_Number] = useState('')
    const [confirm_password, setConfirm_Password] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigation = useNavigate()
    const dispatch = useDispatch();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        const registerResp = await dispatch(signUpUser({ first_name, last_name, phone_number, username, email, password, confirm_password }))
        setLoading(false);
        if (registerResp.payload && registerResp.payload.user) {
            setFirst_Name('')
            setLast_Name('')
            setUserName('')
            setPhone_Number('')
            setEmail('')
            setPassword('')
            setConfirm_Password('')
            toast.success(`SignUp Successfully`, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
             navigation('/login')
        } else {
            let error_message = '';
            if (registerResp.payload.username) {
                error_message = registerResp.payload.username[0]
            }
            if (registerResp.payload.password) {
                error_message = registerResp.payload.password[0]
            }
            if (registerResp.payload.non_field_errors) {
                error_message = registerResp.payload.non_field_errors[0]
            }
            toast.error(error_message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        }
    }

    return (
        <div>
            <Header />
            <div className='container mt-5'>
                <section className=" login"  >
                    <ToastContainer />
                    <div className="card shadow-2-strong shadow" style={{ borderRadius: '1rem' }}>
                        <div className="card-body p-5 text-center" >
                            <div className="mb-5">
                                <img className="mb-1" src={logo} alt='' width={110} />
                                <h3 style={{ fontSize: "1rem" }}>Welcome to DjangoPets Please Register Now.</h3>
                            </div>
                            <form className="row g-3 " onSubmit={handleRegister}>
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control" id="floatingInputFirstName validationServer01" name='first_name'
                                        placeholder='Enter FirstName' value={first_name} onChange={(e) => setFirst_Name(e.target.value)} required />
                                    <label htmlFor="floatingInputFirstName" className='ms-3'>FirstName</label>
                                </div>
                                <div className="col-md-6 form-floating">
                                    <input type="text" className="form-control" id="floatingInputLastName validationServer02" name='last_name'
                                        placeholder='Enter LastName' value={last_name} onChange={(e) => setLast_Name(e.target.value)} required />
                                    <label htmlFor="floatingInputLastName" className='ms-3'>Last Name</label>
                                </div>
                                <div className="col-md-4 form-floating">
                                    <input type="text" className="form-control" id="floatingInputUserName validationServer03"
                                        placeholder='Enter UserName' value={username} onChange={(e) => setUserName(e.target.value)} required />
                                    <label htmlFor="floatingInputUserName" className='ms-3'>User Name</label>
                                </div>
                                <div className="col-md-4 form-floating">
                                    <input type="email" className="form-control" id="floatingInputUserEmail validationServer07"
                                        placeholder='Enter email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    <label htmlFor="floatingInputUserEmail" className='ms-3'>User Email</label>
                                </div>
                                <div className="col-md-4 form-floating">
                                    <input type="number" className="form-control" id="floatingInputPhoneNumber validationServer04"
                                        placeholder='PhoneNumber' value={phone_number} onChange={(e) => setPhone_Number(e.target.value)} name='phone_number' required />
                                    <label htmlFor="floatingInputPhoneNumber" className='ms-3'>Phone Number</label>
                                </div>
                                <div className="col-md-6 form-floating">
                                    <input type="password" className="form-control" id="floatingInputPassword validationServer05"
                                        placeholder='Enter Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <label htmlFor="floatingInputPassword" className='ms-3'>Password</label>
                                </div>
                                <div className="col-md-6 form-floating">
                                    <input type="password" className="form-control" id="floatingInputConfirmPassword validationServer06"
                                        placeholder='Enter ConfirmPassword' name='confirm_password' value={confirm_password} onChange={(e) => setConfirm_Password(e.target.value)} required />
                                    <label htmlFor="floatingInputConfirmPassword" className='ms-3'>Confirm Password</label>
                                </div>
                                <div className="col-12">
                                    <button className="register-btn-color mt-2" type="submit" disabled={loading}>
                                        {loading ? 'Registering...' : 'Register Now'}
                                    </button>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <span>Already have an account?</span>
                                    <Link to="/login" className="text-success ms-1">
                                        Login
                                    </Link>
                                </div>
                                    <div className="row g-1 mt-2 d-flex justify-content-center">
                                        <div className="col-12 col-lg-3">
                                            <div>
                                                <MyFacebookLogin />
                                            </div>
                                        </div>
                                        <div className="col-12 col-lg-3">
                                            <div>
                                                <MyGoogleLogin />
                                            </div>
                                        </div>
                                    </div>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
            <Footer/>
        </div>
    )
}

export default Register