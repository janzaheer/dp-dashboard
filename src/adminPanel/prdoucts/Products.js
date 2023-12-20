import React, { useState, useEffect } from "react";
import Head from "../head/Head";
import {
  SellerProductsList,
  DeleteSellerProducts,
} from "../../utlis/services/product_category_services";
import { useSelector } from "react-redux";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye, FaTrash } from "react-icons/fa";
import moment from "moment";
import { Scrollbars } from "react-custom-scrollbars-2";
import "./product.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import AddProduct from "./AddProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    productList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const productList = async () => {
    try {
      setLoading(true);
      let resp = await SellerProductsList(headers);
      setProducts(resp);
    } catch (error) {
      console.log("admin-product", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await DeleteSellerProducts(id, headers);
      productList();
      toast.error("Product Delete Successfully", {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (error) {
      console.log("delete error", error);
    }
  };

  return (
    <div>
      <Head />
      <div className="container-fluid">
        <ToastContainer />
        <div className="row mt-5">
          <div className="col-12">
            <div className="rounded bg-white shadow my-3 mx-5">
              <div className="d-flex align-items-center justify-content-between mx-3">
                <div>
                  <h5 className="text-success mt-4">
                    Products List <RiShoppingBag3Fill />
                  </h5>
                </div>
                <div className="mt-3">
                  <AddProduct productList={productList} />
                </div>
              </div>
              <hr />
              {/* product table */}
              {loading ? (
                <div className="text-center m-5">
                  <div className="spinner-border text-success"
                    style={{ width: "4rem", height: "4rem" }} role="status">
                    <span className="visually-hidden">Loading....</span>
                  </div>
                </div>
              ) : (
                <div className="table-responsive order-t">
                  <Scrollbars>
                    <table className="table table-bordered table-hover mt-1 text-center">
                      <thead>
                        <tr>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Image</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">Name</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              Stock Qty
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="p-2 px-3 text-uppercase">
                              Placed On
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">
                              Categories
                            </div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Price</div>
                          </th>
                          <th scope="col" className="border-0 bg-light">
                            <div className="py-2 text-uppercase">Action</div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="mt-3">
                        {products &&
                          products?.map((ite) => {
                            return (
                              <tr key={ite?.id}>
                                <th scope="row" className="border-0">
                                  <div className="p-2">
                                    <img
                                      src={ite.images[0].image_url}
                                      alt=""
                                      width={30}
                                      className="img-fluid rounded shadow-sm"
                                    />
                                  </div>
                                </th>
                                <td className="border-0 text-muted align-middle">
                                  {ite?.title.substring(0, 20)}
                                </td>
                                <td className="border-0 text-muted align-middle">
                                  {ite?.available_quantity}
                                </td>
                                <td className="border-0 text-muted align-middle">
                                  {moment(ite?.created_at).format("MM-DD-YYYY")}
                                </td>
                                <td className="border-0 text-success align-middle">
                                  {ite?.category}
                                </td>
                                <td className="border-0 text-muted align-middle">
                                  Rs {ite?.price}
                                </td>
                                <td className="border-0 align-middle">
                                  <div className="dropdown">
                                    <a
                                      className="btn dropdown-toggle"
                                      id="dropdownMenuButton1"
                                      data-bs-toggle="dropdown"
                                      aria-expanded="false"
                                    >
                                      <BsThreeDotsVertical />
                                    </a>
                                    <ul
                                      className="dropdown-menu"
                                      aria-labelledby="dropdownMenuButton1"
                                    >
                                      <li>
                                        <a
                                          className="dropdown-item text-danger"
                                          onClick={() => deleteProduct(ite?.id)}
                                          href="#"
                                        >
                                          Delete <FaTrash />
                                        </a>
                                      </li>
                                      <li>
                                        <Link
                                          className="dropdown-item text-success"
                                          to={`/dashboard/productDetail/${ite.id}`}
                                        >
                                          View <FaEye />
                                        </Link>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </Scrollbars>
                </div>
              )}
              {/* End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
