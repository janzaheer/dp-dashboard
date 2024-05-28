
import React from 'react';
import { Link } from 'react-router-dom';
import { BsEmojiSmile, BsBox } from 'react-icons/bs';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { SlLogout } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';

const Head = () => {
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                  <button className="btn dropdown-toggle text-white" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome {user?.username}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-light" aria-labelledby="dropdownMenuButton">
                    <li>
                      <Link to="/manageProfile" className="dropdown-item">
                        <BsEmojiSmile /> Manage My Account
                      </Link>
                    </li>
                    {user?.is_seller && (
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
                      <button className="dropdown-item" onClick={handleLogout}>
                        <SlLogout /> Logout
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
  );
};

export default Head;
