import React from "react"
import { NavLink, Link } from "react-router-dom"
import './new.css'
import { HiOutlineShoppingCart } from "react-icons/hi";
import logo from '../../logo/Django_Pets.png';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { totalItems } = useSelector((state => state.cart));
  const navigate = useNavigate()

  const handleSearchTerm = async (e) => {
    e.preventDefault();
    /* eslint eqeqeq: 0 */
    if (e.key == 'Enter') {
      let value = e.target.value
      navigate(`/search/?search=${value}`)
    }
  }

  return (
    <>
      <header className="section-header sticky-top shadow">
        <section className="header-main border-bottom bg-white">
          <div className="container-fluid">
            <div className="row p-2 p-1 d-flex align-items-center">
              <div className="col-md-2">
                <NavLink to='/' className="text-decoration-none">
                  <img className="d-md-flex mb-1" src={logo} alt='' height={90} />
                </NavLink>
              </div>
              <div className="col-md-8">
                <div className="d-flex form-inputs">
                  {/* <input className="form-control" type="text" placeholder="Search any product..."
                    onKeyUp={(e) => handleSearchTerm(e)} /> */}
                     <input
                    className="form-control"
                    type="text"
                    placeholder="Search any product..."
                    onChange={(e) => handleSearchTerm(e)}
                    onKeyUp={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchTerm(e);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="col-md-2">
                <div className="d-flex d-none d-md-flex flex-row align-items-center">
                  <Link to='/cart'>
                    <span className="shop-bag"><HiOutlineShoppingCart /></span>
                  </Link>
                  <div className="d-flex flex-column ms-2">
                    <span className="qty">{totalItems} Product</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </header>
    </>
  )
}

export default Navbar
