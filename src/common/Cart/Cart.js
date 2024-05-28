import React, { useEffect } from "react"
import "./style.css"
import { TbShoppingCartOff } from 'react-icons/tb'
import { BsTrash } from "react-icons/bs";
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector, useDispatch } from "react-redux";
import { remove, toggleCartQty, getCartTotal, clearCart } from "../../store/cartSlice";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ScrollToTop from "react-scroll-to-top";

const Cart = () => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalItems, totalAmount, deliveryCharge, totalAmountItems } = useSelector(state => state.cart);
  
  useEffect(() => {
    dispatch(getCartTotal());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, totalItems, cartProducts]);

  const handleRemove = (id) => {
    dispatch(remove(id));
    toast.error("Product Remove successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }

  const increase = (id) => {
    dispatch(toggleCartQty({ id: id, type: "INC" }));
    dispatch(getCartTotal());
    toast.success("Increase +1 Qty successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }
  const decrease = (id) => {
    dispatch(toggleCartQty({ id: id, type: "DEC" }));
    dispatch(getCartTotal());
    toast.warning("Decrease -1 Qty successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  }

  const clear = () => {
    dispatch(clearCart());
    toast.error("Clear Cart successfully", {
      position: toast.POSITION.BOTTOM_RIGHT,
      theme: "colored",
    });

  }

  const price = (p) => {
    /* eslint eqeqeq: 0 */
    if (p === 0 || p === undefined) {
      return "-";
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  }

  const TotalPrice = (p) => {
    /* eslint eqeqeq: 0 */
    if (p === 0 || p === undefined) {
      return "-";
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  }

  const total = (p) => {
    /* eslint eqeqeq: 0 */
    if (p === 0 || p === undefined) {
      return "-";
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  }

  const totalAmountItemsFunc = (p) => {
    /* eslint eqeqeq: 0 */
    if (p === 0 || p === undefined) {
      return "-";
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  }

  const deliveryPrice = (p) => {
    /* eslint eqeqeq: 0 */
    if (p === 0 || p === undefined) {
      return "-";
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  }
  const discountPrice = (d) => {
    if (d === 0 || d === undefined) {
      return "";
    } else {
      return `Rs ${parseFloat(d).toFixed(0)}`;
    }
  };

  return (
    <>
      <Header />
      <div className="px-4 px-lg-0 mt-5">
        <div className="container text-dark py-5 text-center mt-1">
          <h1 className="display-4">Shopping Cart</h1>
          <p className="lead mb-0">Build a fully structred shopping cart page using DjangoPets. </p>
          <p className="lead">Snippet by <Link to="#" className="text-success font-italic">
            <u>DjangoPets</u></Link>
          </p>
        </div>
        {/* End */}
        <div className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow mb-5">
                <ToastContainer />
                <div className="table-responsive">
                  <Scrollbars>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Product</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Sub Total</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Quantity</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Add/Remove Qty</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Remove</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.length === 0 ? <h2 className='m-5 text-danger'>No Items are add in Cart</h2> : ''}
                        {cartProducts.map((cartProduct) => {
                          return (
                            <tr key={cartProduct?.id} >
                              <th scope="row" className="border-0">
                                <div className="p-2">
                                  <img src={cartProduct?.images[0]?.image_url} alt='' width={60} className="img-fluid rounded shadow-sm" />
                                  <div className="ms-3 ml-3 d-inline-block align-middle">
                                    <h6 className="mb-0"> <Link to="#" className="text-dark d-inline-block align-middle">{cartProduct?.title.substring(0, 15)}...</Link>
                                    </h6>
                                    { cartProduct?.stock.length > 0 ? (<>
                                      <span className="price-text d-block">{discountPrice(cartProduct?.stock[0]?.discount_price)}</span>
                                      <span className="text-decoration-line-through text-muted" style={{ fontSize: '12px' }}>Rs {price(cartProduct?.price)}</span>
                                   </>) : (<span className="price-text d-block">Rs {price(cartProduct?.price)}</span>) }
                                  </div>
                                </div>
                              </th>
                              <td className="border-0 align-middle"><strong>{TotalPrice(cartProduct?.totalPrice)}</strong></td>
                              <td className="border-0 align-middle"><strong>{cartProduct?.quantity}</strong></td>
                              <td className="border-0 align-middle"><strong>
                                <div className=''>
                                  <button className='inc-dec-btn me-4' onClick={() => increase(cartProduct.id)}>
                                    <AiOutlinePlus />
                                  </button>
                                  <button className='inc-dec-btn' onClick={() => decrease(cartProduct.id)}>
                                    <AiOutlineMinus />
                                  </button>
                                </div>
                              </strong></td>
                              <td className="border-0 align-middle">
                                <button className='btn btn-outline-danger' onClick={() => handleRemove(cartProduct.id)}>
                                  <BsTrash />
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
                {/* End */}
              </div>
              <button type="button" className='btn btn-danger mb-5 shadow' onClick={() => clear()}> Clear Cart <TbShoppingCartOff /></button>
            </div>
            <div className="row py-5 p-4 bg-white rounded shadow">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Coupon code</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have a coupon code, please enter it in the box below</p>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input type="text" placeholder="Apply coupon" aria-describedby="button-addon3" className="form-control border-0" />
                    <div className="input-group-append border-0">
                      <button type="button" className="btn btn-warning"><i className="fa fa-gift me-2" />Apply coupon</button>
                    </div>
                  </div>
                </div>
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Instructions for seller</div>
                <div className="p-4">
                  <p className="font-italic mb-4">If you have some information for the seller you can leave them in the box below</p>
                  <textarea name='name' cols={30} rows={2} className="form-control" defaultValue={""} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">Order summary </div>
                <div className="p-4">
                  <p className="font-italic mb-4">Shipping and additional costs are calculated based on values you have entered.</p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Selected {totalItems} items(s) Quantity Price</strong><strong>Rs {totalAmountItemsFunc(totalAmountItems)}
                      </strong></li>
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Delivery Cost</strong><strong>Rs {deliveryPrice(deliveryCharge)}</strong></li>
                    {/* <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Discount</strong><strong>Rs -</strong></li> */}
                    <li className="d-flex justify-content-between py-3 border-bottom"><strong className="text-muted">Total</strong>
                      <h5 className="font-weight-bold">Rs {total(totalAmount)} </h5>
                    </li>
                  </ul>
                  { cartProducts.length === 0 ? <button className="btn btn-warning">Proceed to Checkout</button> : 
                  <Link to='/checkout' className="btn prooced-btn">Proceed to Checkout</Link>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop smooth />
    </>
  )
}

export default Cart
