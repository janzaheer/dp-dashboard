import React, { useEffect, useState } from "react";
import "./product.css";
import { SingleProductDetail } from "../../utlis/services/product_category_services";
import { useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add } from "../../store/cartSlice";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import ReviewTemplate from "./ReviewTemplate";
// import Comments from './Comments';
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import ScrollToTop from "react-scroll-to-top";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [comments, setComments] = useState([]);
  const [mainImage, setMainImage] = useState(
    product?.images && product?.images[0].image_url
  );
  const [qty, setQty] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProduct = async () => {
    // eslint-disable-next-line
    try {
      let res = await SingleProductDetail(id);
      console.log("detail", res);
      setProduct(res.item);
      setComments(res.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCartHandler = (product) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Check if the product has a discount
    const discountedPrice = product.stock[0]?.discount_price;

    // Calculate the total price based on the discount status
    let totalPrice =
      qty *
      (discountedPrice !== undefined && discountedPrice > 0
        ? discountedPrice
        : product.price);
    // let totalPrice = qty * product.price;
    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };
    dispatch(add(tempProduct));
    toast.info("Product add TO Cart successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
    navigate(`/cart`);
    console.log("tem", tempProduct);
  };

  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    });
    toast.success("Qty increase +1 successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if (newQty < 1) {
        newQty = 1;
      }
      return newQty;
    });
    toast.warning("Qty decrease -1 successfully", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "colored",
    });
  };

  const { images } = product;

  const price = (p) => {
    /* eslint eqeqeq: 0 */
    if (p == 0) {
      return (
        <h6 className="text-danger">
          {" "}
          Please place a order for quotation, Once order is placed our support
          team will call you{" "}
        </h6>
      );
    } else {
      return <h6 className="text-success">Rs {p}</h6>;
    }
  };

  const handleCompany = (seller) => {
    if (seller == null) {
      return (
        <span>
          {" "}
          djangopets
          <img
            src="https://img.alicdn.com/imgextra/i1/O1CN01cLS4Rj1vgZ8xaij1e_!!6000000006202-2-tps-64-32.png"
            alt=""
            height={25}
          />
        </span>
      );
    } else {
      return `${seller?.company}`;
    }
  };

  const stockHandle = (available_quantity) => {
    if (available_quantity == 0) {
      return "Out Of Stock";
    } else {
      return `Stock ${available_quantity}`;
    }
  };

  const discountPrice = (d) => {
    if (d == 0) {
      return "";
    } else {
      return `Rs ${parseFloat(d).toFixed(0)}`;
    }
  };
  const prices = (p) => {
    if (p == 0) {
      return "";
    } else {
      return `Rs ${parseFloat(p).toFixed(0)}`;
    }
  };

  return (
    <div>
      <Header />
      <div className="container my-5 detailPageHeight">
        <div className="single_product bg-white border rounded shadow-sm">
          <ToastContainer />
          <div className="row detail-height">
            <div className="col-md-12 col-lg-5">
              <div className="d-flex justify-content-evenly">
                <div className="img">
                  <Zoom>
                    <img
                      alt="img"
                      src={
                        mainImage
                          ? mainImage.image_url
                          : product.images && product?.images[0]?.image_url
                      }
                      width="300"
                      height={300}
                    />
                  </Zoom>
                  <div className="d-flex justify-content-center mt-3 imageHover">
                    {product?.images &&
                      images.map((im, index) => {
                        return (
                          <div key={index} className="thumbnail text-center">
                            <img
                              src={im.image_url}
                              alt=""
                              className="img-thumbnail"
                              style={{ height: "50px" }}
                              onClick={() => setMainImage(im)}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-7">
              <div className="desc">
                <h3>
                  {product.seller == null ? (
                    <img
                      src="https://img.alicdn.com/imgextra/i1/O1CN01cLS4Rj1vgZ8xaij1e_!!6000000006202-2-tps-64-32.png"
                      alt=""
                      height={25}
                    />
                  ) : (
                    ""
                  )}{" "}
                  {product?.title}
                </h3>
                <h6 className="text-just">Category {product?.category}</h6>
                <div>
                  {product?.stock?.length === 0 ? (
                    <span className="price-text" style={{ fontSize: "19px" }}>
                      {price(product?.price)}
                    </span>
                  ) : (
                    <div>
                      {product?.stock &&
                      product?.stock.length > 0 &&
                      product?.stock[0]?.discount_price !== undefined &&
                      product?.stock[0]?.discount_price > 0 ? (
                        <>
                          <span className="price-text" style={{ fontSize: "19px" }}>
                            {discountPrice(product?.stock[0]?.discount_price)}
                          </span>{" "}
                          <span
                            className="text-decoration-line-through text-muted"
                            style={{ fontSize: "14px" }}
                          >
                            {prices(product?.price)}
                          </span>
                        </>
                      ) : (
                        <span className="price-text" style={{ fontSize: "19px" }}>
                          {prices(product?.price)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  {product && product?.stock && product?.stock.length > 0 ? (
                    <span style={{ fontSize: "14px" }}>
                      {parseFloat(
                        product?.stock[0]?.discount_percentage
                      ).toFixed(0)}
                      % OFF
                    </span>
                  ) : (
                    " "
                  )}
                </div>
                <div>{stockHandle(product?.available_quantity)}</div>
                <div className="p-1 my-2 table-responsivedesTag">
                  <Scrollbars>
                    <p> {product?.description}</p>
                  </Scrollbars>
                </div>
                <div className="row">
                  <div className="col-md-4">
                    <div className="mt-1">
                      <div className="">
                        <button
                          type="button"
                          className="inc-dec-btn fs-14"
                          onClick={() => decreaseQty()}
                        >
                          -
                        </button>
                        <span className="qty-value flex flex-center mx-3">
                          {qty}
                        </span>
                        <button
                          type="button"
                          className="inc-dec-btn fs-14"
                          onClick={() => increaseQty()}
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-5">
                        <button
                          type="button"
                          className="main-btn-color me-1"
                          onClick={() => addToCartHandler(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="me-5">
                      <div className="card">
                        <p className="card-header">Sold By</p>
                        <span className="text-secondary text-center my-1">
                          {handleCompany(product.seller)}.
                        </span>
                        <div className="d-flex justify-content-between text-center">
                          <div className="border w-100">
                            <span className="fs-6 text-muted fontWeight">
                              Positive Seller Ratings
                            </span>
                            <h5>91%</h5>
                          </div>
                          <div className="border w-100">
                            <span className="fs-6 mx-1 text-muted fontWeight">
                              Ship on Time
                            </span>
                            <h5>90%</h5>
                          </div>
                          <div className="border w-100">
                            <span className="fs-6 text-muted fontWeight">
                              Chat Response Rate
                            </span>
                            <h5>80%</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row row-underline">
            <div className="col-md-6">
              {" "}
              <span className=" deal-text" style={{ color: "#374151" }}>
                Specifications
              </span>{" "}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <table className="col-md-12">
                <tbody>
                  <tr className="row mt-10">
                    <td className="col-md-3">
                      <span className="p_specification">Product Title :</span>{" "}
                    </td>
                    <td className="col-md-9">
                      <ul>
                        <li>{product.title}</li>
                      </ul>
                    </td>
                  </tr>
                  {product?.brand ? (
                    <tr className="row mt-10">
                      <td className="col-md-3">
                        <span className="p_specification">Company Brand :</span>{" "}
                      </td>
                      <td className="col-md-9">
                        <ul>
                          <li>{product?.brand}</li>
                        </ul>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="my-3">
          {comments.length === 0 ? (
            <div className="card me-4">
              <div className="card-header">Ratings & Reviews of Product</div>
              <div className="card-body">
                <p className="card-text text-center">
                  This product has no reviews.
                </p>
              </div>
            </div>
          ) : (
            <ReviewTemplate
              comments={comments}
              id={product.id}
              avg_rating={product.average_rating}
              total_ratings={product?.total_ratings}
            />
          )}
        </div>
        <ScrollToTop smooth />
      </div>
      <Footer />
    </div>
  );
};
export default ProductDetail;
