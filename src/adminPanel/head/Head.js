import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import logo from '../../logo/logo_new.png';
import { SlLogout } from 'react-icons/sl';
import { AiOutlineHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FaUserTie } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/authSlice';
import axios from 'axios';
import moment from 'moment';


const Head = () => {
  const user = useSelector(state => state.user)
  const userToken = useSelector(state => state.user.token);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [notification, setNotification] = useState('')

  useEffect(() => {
    functionNotification()
  }, [])

  const functionNotification = async () => {
    // let BASE_URL = `http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/`
    //  let Api = `api/v1/notification/`
    let finalURL = `http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/` + `api/v1/notification/`
    await axios.get(finalURL, {
      headers: {
        'Content-Type': "application/json",
        Authorization: `Token ${userToken}`
      }
    }).then((res) => {
      console.log('notification', res)
    }).catch(error => {
      console.log(error)
    })
  }

  const handleLogout = () => {
    console.log('click')
    dispatch(logout())
    navigation('/')
  }

  return (
    <div>
      {/* // {moment(orderDataList?.created_at).format("MM-DD-YYYY")} */}
      <nav className="navbar sticky-top navbar-expand-lg bg-light shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to='/dashboard'> <div className='text-white'>DjangoPets</div></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to='/dashboard' className="nav-link">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to='/dashboard/products' className="nav-link">Products</Link>
              </li>
              <li className="nav-item">
                <Link to='/dashboard/orders' className="nav-link">Orders</Link>
              </li>
            </ul>
            <div className="dropdown me-5">
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                DjangoPets {user?.user?.username}
              </button>
              <ul className="dropdown-menu text-small shadow me-5">
                <li><a className="dropdown-item" href="#"><FaUserTie /> {user?.user?.first_name} {user?.user?.last_name}</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to='#'><AiOutlineHome /> Home</Link></li>
                <li><Link className="dropdown-item" to='#'><CgProfile /> Profile</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={handleLogout}><SlLogout /> Sign Out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Head
