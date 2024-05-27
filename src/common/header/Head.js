import React from "react"
import { Link } from "react-router-dom"
import { BsEmojiSmile, BsBox } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
// import { SlLogout } from 'react-icons/sl'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/authSlice"
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../../store/cartSlice";
// import ProductListingWithCategory from "../../productForlogout/ProductListingWithCategory"


const Head = () => {
  const user = useSelector(state => state.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigation = useNavigate()
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    // ProductListingWithCategory()
    dispatch(logout())
    dispatch(clearCart());
    // window.location.reload();
    navigation("/login")
  }
  return (
    <>
      {/* <nav className="navbar navbar-dark navbar-expand p-0">
        <div className="container-fluid">
          <ul className="navbar-nav d-none d-md-flex mr-auto">
            <li className="nav-item"><Link className="nav-link text-white" to="#" data-abc="true"><i className='fa fa-phone'></i> +92 342 8053 402</Link> </li>
            <li className="nav-item"><Link className="nav-link text-white" to="#" data-abc="true"><i className='fa fa-envelope'></i>  support@djangopets.com</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/chat"><i className='fa fa-envelope'></i>  Questions & Answer</Link></li>
          </ul>

          <ul className="navbar-nav d-flex align-items-center">
            {isAuthenticated ?
              <li className="nav-item me-5">
                <div className="dropdown me-5">
                  <button className="btn dropdown-toggle text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome {user?.user?.username}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-light">
                    <li><Link to='/manageProfile' className="dropdown-item"><BsEmojiSmile /> Manage My Account</Link></li>
                    {user.user?.is_seller == true ? <li><Link className="dropdown-item" to='/dashboard'><BsBox /> Admin</Link></li> : ''}
                    <li><Link to='/favorite' className="dropdown-item"><MdOutlineFavoriteBorder /> My favorites</Link>
                    </li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item" href="#" onClick={handleLogout}><SlLogout /> Logout</a></li>
                  </ul>
                </div>
              </li>
              : <li className="nav-item me-5">
                <div className="me-5">
                  <Link className="text-white"to='/login'>Login Now</Link>
                </div>
              </li>
            }
          </ul>
        </div>
      </nav> */}
       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item d-md-flex">
              <Link className="nav-link" to="#">
                <i className="fa fa-phone"></i> +92 342 8053 402
              </Link>
            </li>
            <li className="nav-item d-md-flex">
              <Link className="nav-link" to="#">
                <i className="fa fa-envelope"></i> support@djangopets.com
              </Link>
            </li>
            <li className="nav-item d-md-flex">
              <Link className="nav-link" to="/chat">
                <i className="fa fa-envelope"></i> Questions & Answer
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <button
                  className="btn dropdown-toggle text-white"
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Welcome {user?.user?.username}
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-light"
                  aria-labelledby="dropdownMenuButton"
                >
                  <li>
                    <Link to="/manageProfile" className="dropdown-item">
                      <BsEmojiSmile /> Manage My Account
                    </Link>
                  </li>
                  {user.user?.is_seller === true && (
                    <li>
                      <Link to="/dashboard" className="dropdown-item">
                        <BsBox /> Admin
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/favorite" className="dropdown-item">
                      <MdOutlineFavoriteBorder /> My favorites
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                    >
                       Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link text-white" to="/login">
                  Login Now
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
    </>
  )
}

export default Head
