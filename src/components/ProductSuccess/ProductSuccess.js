import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsEnvelopeFill } from "react-icons/bs";
import "./ProductSuccess.css";
import logo from '../../logo/Django_Pets.png';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Barcode from "react-barcode";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
import moment from "moment";
import AddReview from "../../components/Review/AddReview";
import { OrderDetail, OrderCancel } from "../../utlis/services/order_services";

const ProductSuccess = () => {
  const user = useSelector((state) => state.user);
  const userToken = useSelector((state) => state.user.token);
  const [orderDataList, setOrderDataList] = useState({});
  const [ordernumber, setOrdernumber] = useState();

  let { id } = useParams();

  useEffect(() => {
    orderListData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const orderListData = async () => {
    window.scrollTo(0, 0);
    try {
      let response = await OrderDetail(id, headers);
      setOrderDataList(response);
      console.log(`order-list`,response)
      setOrdernumber(response.order_number || "");
    } catch (error) {
      console.log(error);
    }
  };

  const cancelOrder = async (id) => {
    try {
      let res = await OrderCancel(id, headers);
      setOrderDataList(res);
      toast.error("Order Canceled Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const orderStatusHeadings = (status) => {
    if (status == "canceled") {
      /* eslint eqeqeq: 0 */
      return "canceled";
    } else if (status == "completed") {
      return "completed";
    } else if (status == "placed") {
      return "confirmed";
    } else if (status == "received") {
      return "received";
    } else if (status == "processed") {
      return "processed";
    }
    return "";
  };

  const orderCancelButton = (status, id) => {
    if (status == "canceled") {
      return "";
    }
    return (
      <Link
        to="#"
        onClick={() => cancelOrder(id)}
        className="btn btn-outline-danger my-1 ms-3"
      >
        cancel order
      </Link>
    );
  };

  const price = (p) => {
    if (p == 0) {
      return `-`;
    } else {
      return `Rs ${parseFloat(p).toFixed(0)}`;
    }
  };

  const subTotal = (p) => {
    if (p == 0) {
      return `-`;
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  };

  const ShippingPrice = (p) => {
    if (p == 0) {
      return `-`;
    } else {
      return `${parseFloat(p).toFixed(0)}`;
    }
  };
  const discountPrice = (d) => {
    if (d == 0) {
      return "";
    } else {
      return `Rs ${parseFloat(d).toFixed(0)}`;
    }
  };

  return (
    <div>
      <Header />
      <div className="container product-success mt-5">
        <ToastContainer />
        <div className="container my-5">
          <div className="d-flex justify-content-center row">
            <div className="col-md-10">
              <div className="receipt bg-white p-3 rounded shadow">
                <img src={logo} alt='logo' width={110} />
                <h4 className="mt-2 mb-3">
                  Your order is {orderStatusHeadings(orderDataList?.status)}
                </h4>
                <h6 className="name">Hello {user.user.username},</h6>
                <span className="fs-12 text-black-50">
                  your order has been{" "}
                  {orderStatusHeadings(orderDataList.status)} and our support
                  team will contact you shortly. Thank You!
                </span>
                <hr />
                <div className="row">
                  <div className="col-6 col-md-3">
                    <div>
                      <span className="d-block fs-12">Order date</span>
                      <span className="font-weight-bold">
                        {moment(orderDataList?.created_at).format("MM-DD-YYYY")}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div>
                      <span className="d-block fs-12">Order number</span>
                      <span className="font-weight-bold">
                        {orderDataList?.order_number}
                      </span>
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div>
                      <span className="d-block fs-12">Email Address</span>
                      <span className="font-weight-bold">
                        {orderDataList?.address?.email_address}{" "}
                      </span>{" "}
                    </div>
                  </div>
                  <div className="col-6 col-md-3">
                    <div>
                      <span className="d-block fs-12">Shipping Address</span>
                      <button
                        type="button"
                        className="text-secondary"
                        data-bs-toggle="popover"
                        title={orderDataList?.address?.address}
                        data-bs-content=""
                      >
                        <span className="font-weight-bold text-danger">
                          {orderDataList?.address?.address.substring(0, 17)}
                        </span>{" "}
                        ...
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                {orderDataList &&
                  orderDataList.order_items?.map((ite) => {
                    return (
                      <div
                        key={ite?.item.id}
                        className="d-flex justify-content-between align-items-center product-details"
                      >
                        <div className="d-flex flex-row product-name-image">
                          <img
                            className="rounded shadow me-3"
                            src={ite?.item.images[0]?.image_url}
                            width={60}
                            alt={ite?.item.title}
                          />
                          <div className="d-flex flex-column justify-content-evenly ml-2">
                            <div>
                              <span className="d-block font-weight-bold p-name">
                                {ite?.item.title}
                              </span>
                            </div>
                            <div>
                              <span className="fs-12 text-danger">
                                Qty: {ite?.quantity} pcs
                              </span>
                              <div>
                                {orderDataList?.status == "completed" &&  ite.has_comment == false ? (
                                  <AddReview id={ite?.id} itemId={ite?.item?.id} orderListData={orderListData}/>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="product-price">
                          <div className="d-flex justify-content-start align-items-center">
                          {ite?.item?.stock.length === 0 ? (
                            <h6 className="price-text"> {price(ite?.item.price)}</h6>
                          ) : (
                            <div>
                              {ite?.item?.stock[0]?.discount_price > 0 ? (
                                <>
                                  <h5 className="price-text"> {discountPrice(ite?.item.stock[0]?.discount_price)}</h5>
                                  {" "}
                                  <h6 className="text-decoration-line-through text-muted"> {price(ite?.item.price)}</h6>
                                </>
                              ) : (
                                <h6 className="price-text"> {price(ite?.item.price)}</h6>
                              )}
                            </div>
                          )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                <div className="mt-5 amount row">
                  <div className="d-flex justify-content-center col-md-6">
                    {ordernumber && <Barcode value={ordernumber} />}
                  </div>
                  <div className="col-md-6">
                    <div className="billing">
                      <div className="d-flex justify-content-between">
                        <span>Subtotal</span>
                        <span className="font-weight-bold">
                          {subTotal(orderDataList?.total_amount)}
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mt-2">
                        <span>Shipping fee</span>
                        <span className="font-weight-bold">
                          Rs {ShippingPrice(orderDataList?.shipping_amount)}
                        </span>
                      </div>
                      {/* <div className="d-flex justify-content-between mt-2">
                        <span className="text-secondary">Discount</span>
                        <span className="font-weight-bold text-secondary">
                          Rs -
                        </span>
                      </div> */}
                      <hr />
                      <div className="d-flex justify-content-between mt-1">
                        <span className="font-weight-bold">Total</span>
                        <span className="font-weight-bold price-text">
                          Rs {subTotal(orderDataList?.total_amount)
                            // ShippingPrice(orderDataList?.shipping_amount)
                            }
                        </span>
                      </div>
                      <div className="d-flex justify-content-between mt-1">
                        <span className="font-weight-bold">Cash on Delivery</span>
                      </div>
                    </div>
                  </div>
                </div>
                {orderDataList?.status == "completed" ? (
                  ''
                ) : (
                  orderCancelButton(orderDataList.status, orderDataList?.id)
                )}
                <span className="d-block mt-3 text-black-50 fs-15">
                  <BsEnvelopeFill /> We will be sending a shipping confirmation
                  email when the item is shipped!
                </span>
                <hr />
                <div className="my-3">
                  <Link to="/" className="shopping-btn w-100">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop smooth />
    </div>
  );
};
export default ProductSuccess;
