import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../common/header/Header";
import Footer from "../../common/footer/Footer";
import {
  END_POINT,
  SORT_ENDPOINT,
  CATEGORY_ITEMS_LIST_ENDPOINT,
  changeUrl,
  API_VERSION,
} from "../../utlis/apiUrls";
import { useSelector } from "react-redux";
import axios from "axios";
// import InfiniteScroll from 'react-infinite-scroll-component';
import Form from "react-bootstrap/Form";
import ScrollToTop from "react-scroll-to-top";
import { ProductCategory } from "../../utlis/services/product_category_services";
import CardData from "../card/CardData";
import { Spinner } from "react-bootstrap";
let BASE_URL = process.env.REACT_APP_BASE_URL

const ItemPage = () => {
  const [sortTerm, setSortTerm] = useState("");
  const [products, setProducts] = useState([], []);
  const [nextUrlPage, setNextUrlPage] = useState(null);
  const [prevUrlPage, setPrevUrlPage] = useState(null);
  const [cat, setCat] = useState("");
  const [categoriesData, setCategoriesData] = useState("");
  const [loader, setLoader] = useState(true);
  const [count, setCount] = useState(0)
  const userToken = useSelector((state) => state.user.token);

  const queryParams = new URLSearchParams(window.location.search);
  let category_name = queryParams.get("category_name");
  if (!category_name) {
    category_name = "";
  }

  useEffect(() => {
    productList();
    categoryData();
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
    let final =
      BASE_URL +
      API_VERSION() +
      END_POINT() +
      CATEGORY_ITEMS_LIST_ENDPOINT() +
      category_name;
    window.scrollTo(0, 0);
    category_name = "";
    try {
      setLoader(true);
      let res = await axios.get(final, { headers: headers });
      setProducts(res?.data?.results);
      setCount(res?.data?.count)
      setNextUrlPage(res?.data?.next);
      setPrevUrlPage(res?.data?.previous);
    } catch (error) {
      console.log("error while loading", error);
    } finally {
      setLoader(false);
    }
  };

  const categoryList = async (e) => {
    let val = e.target.value;
    setCat(val);
    setLoader(true);
    setSortTerm('')
    if (val == "all-categories") {
      /* eslint eqeqeq: 0 */
      val = "";
    }
    let finalURL =
      BASE_URL +
      API_VERSION() +
      END_POINT() +
      CATEGORY_ITEMS_LIST_ENDPOINT() +
      val;

      let res = await axios.get(finalURL, { headers: headers });
      try {
        setProducts(res.data.results);
        setNextUrlPage(res?.data?.next);
        setCount(res?.data?.count)
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(false);
      }
  };

  const categoryData = async () => {
    try {
      let res = await ProductCategory();
      setCategoriesData(res.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = async (e) => {
    let val = e.target.value;
    setSortTerm(val);
    console.log(val);
    setLoader(true);
    let final = `${BASE_URL}${API_VERSION()}${END_POINT()}${SORT_ENDPOINT()}${val}&category=${cat}`
    console.log(final)
    try {
      const response = await axios.get(final)
      setProducts(response.data.results);
      console.log('short-data',response.data)
      setCount(response.data.count)
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleNextPage = async (url) => {
    url = url.replace(changeUrl(), BASE_URL);
    window.scrollTo(0, 0);
    try {
      setLoader(true);
      let res = await axios.get(url, { headers: headers });
      setProducts(res.data?.results);
      setNextUrlPage(res?.data?.next);
      setPrevUrlPage(res?.data?.previous);
      setCount(res.data.count)
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 mb-5 newCLass">
        <div className="row itemPage">
          <div className="col-md-12 col-lg-12 colside">
            <div className="container">
              <div>
                <span className="text-success">Showing all {count} results</span>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <h2 className="text-just">Just For You</h2>
                </div>
                <div className="col-md-6 d-flex justify-content-center">
                  <div className="mt-1 me-2">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={categoryList}
                      value={cat ? cat : category_name}
                    >
                      <option value="all-categories"> All Category </option>
                      {categoriesData &&
                        categoriesData.map((cate) => {
                          return (
                            <option key={cate.id} value={cate.name}>
                              {cate.name}
                            </option>
                          );
                        })}
                    </Form.Select>
                  </div>
                  <div className="mt-1">
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleSort}
                      value={sortTerm}
                    >
                      <option> Sort By </option>
                      <option value="price">Price: Low to High</option>
                      <option value="-price">Price: High to Low</option>
                      <option value="title">Alphabets: A-Z</option>
                      <option value="-title">Alphabets: Z-A</option>
                      <option value="created_a">Latest</option>
                      <option value="-created_a">Old</option>
                    </Form.Select>
                  </div>
                </div>
              </div>
              <hr className="border border-hr border-1 opacity-100"></hr>
              <div>
                {loader ? (
                  <div className="text-center m-5">
                    <Spinner animation="border" size="lg" variant="success" />
                  </div>
                ) : products.length === 0 ? (
                  <h3 className="text-center m-5 text-just">
                    No Products Available.
                  </h3>
                ) : (
                  <div>
                    <CardData products={products} handleFavList={productList} />
                  </div>
                )}
              </div>
              <div className="row g-2 mx-md-5 mt-2">
                <div className="d-flex justify-content-center">
                  <button
                    className="main-btn-color bt-sm me-2"
                    disabled={prevUrlPage === null}
                    onClick={() => handleNextPage(prevUrlPage)}
                  >
                    {" "}
                    &larr; Previous
                  </button>
                  <button
                    className="main-btn-color bt-sm"
                    disabled={nextUrlPage === null}
                    onClick={() => handleNextPage(nextUrlPage)}
                  >
                    Next &rarr;{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ScrollToTop smooth />
      </div>
      <Footer />
    </>
  );
};

export default ItemPage;
