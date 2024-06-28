import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Heart from "react-heart";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { FAV_ENDPOINT, API_VERSION } from "../../utlis/apiUrls";
import Star from "../ProductDetails/Star";
let BASE_URL = process.env.REACT_APP_BASE_URL

const CardData = ({ products, handleFavList }) => {
  const [itemFavourite, setItemFavourite] = useState({});
  const userToken = useSelector((state) => state.user.token);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }
  const handleFav = async (id) => {
    let AddFavURL = BASE_URL + API_VERSION() + FAV_ENDPOINT();
    axios
      .post(
        AddFavURL,
        { item_id: id },
        {
          headers: headers,
        }
      )
      .then((result) => {
        if (result.data.message.includes("remove")) {
          let idata = itemFavourite;
          idata[id] = false;
          setItemFavourite(idata);
          toast.error(result.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        } else {
          let data = itemFavourite;
          data[id] = true;
          setItemFavourite(data);
          toast.success(result.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored",
          });
        }
        handleFavList();
      })
      .catch((error) => {
        console.log(error);
      });
    if (!isAuthenticated) {
      navigate("/login");
    }
  };
  // const handleFav = async (id) => {
  //   const payload = {
  //     item_id: id,
  //   };
  //   try {
  //     let result = await AddProductsFav(payload, headers);
  //     console.log("fav", result);
  //     if (result.data.message.includes("remove")) {
  //       let idata = itemFavourite;
  //       idata[id] = false;
  //       setItemFavourite(idata);
  //       toast.error(result.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //         theme: "colored",
  //       });
  //     } else {
  //       let data = itemFavourite;
  //       data[id] = true;
  //       setItemFavourite(data);
  //       toast.success(result.data.message, {
  //         position: toast.POSITION.TOP_RIGHT,
  //         theme: "colored",
  //       });
  //     }
  //     handleFavList();
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   if (isAuthenticated == false) {
  //     navigate("/login");
  //   }
  // };

  const price = (p) => {
    if (p === 0) {
      return "";
    } else {
      return `Rs ${parseFloat(p).toFixed(0)}`;
    }
  };
  // const handleBadge = (seller) => {
  //   if (seller == null) {
  //     return (
  //       <span className="badge text-bg-success notify-badge">
  //         DjangoPets mall
  //       </span>
  //     );
  //   } else {
  //     return "";
  //   }
  // };
  const discountPrice = (d) => {
    if (d === 0) {
      return "";
    } else {
      return `Rs ${parseFloat(d).toFixed(0)}`;
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="row g-2 mx-md-2">
        {products &&
          products.length > 0 &&
          products.map((product) => {
            return (
              <div
                key={product?.id}
                className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <div className="bg-white border productShadow">
                  <div className="">
                    <div className="text-center mb-1 itemImage">
                      <NavLink
                        to={`/productDetails/${product?.id}`}
                        className=""
                      >
                        {/* {handleBadge(product.seller)} */}
                        { product.stock.length > 0 ? (
                          <span className="badge text-bg-success notify-badge me-1">
                            {parseFloat(product?.stock[0]?.discount_percentage).toFixed(0)}% OFF
                          </span>
                        ) : ' ' }
                        <img
                          src={product?.images[0]?.image_url}
                          alt=""
                          className="images-class w-100"
                          width={180}
                          height={180}
                        />
                      </NavLink>
                    </div>
                    <div className="p-1">
                      <div className="about">
                        <div className="mx-1 d-flex justify-content-between align-items-center">
                          <p className="text-muted mb-0" style={{ fontWeight: 'bold' }}>
                            {product?.title.substring(0, 15)}
                          </p>
                        </div>
                        <div className="px-1 d-flex justify-content-between align-items-center">
                          {product?.stock.length === 0 ? (
                            <span className="price-text" style={{ fontSize: "17px" }}>
                              {price(product?.price)}
                            </span>
                          ) : (
                            <div>
                              {product?.stock[0]?.discount_price > 0 ? (
                                <>
                                  <span
                                    className="price-text"
                                    style={{ fontSize: "17px" }}
                                  >
                                    {discountPrice(
                                      product?.stock[0]?.discount_price
                                    )}
                                  </span>{" "}
                                  <span
                                    className="text-decoration-line-through text-muted"
                                    style={{ fontSize: "14px" }}
                                  >
                                    {price(product?.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="price-text" style={{ fontSize: "17px" }}>
                                  {price(product?.price)}
                                </span>
                              )}
                            </div>
                          )}
                          <div style={{ width: "20px" }}>
                            <Heart
                              isActive={
                                itemFavourite && product.id in itemFavourite
                                  ? itemFavourite[product.id]
                                  : product.is_favourite
                              }
                              onClick={() => handleFav(product.id)}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                          <h6>
                            <Star stars={product?.average_rating} />
                          </h6>{" "}
                          <h6 className="text-muted ms-1" style={{ fontSize : '13px'}}>({product?.total_ratings})</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CardData;
