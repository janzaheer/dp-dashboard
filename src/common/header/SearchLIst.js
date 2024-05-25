import React, { useEffect, useState } from "react";
import "./SearchList.css";
import { useSelector } from "react-redux";
import "../../components/ShopList/style.css";
import Header from "./Header";
import Footer from "../footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "react-scroll-to-top";
import CardData from "../../components/card/CardData";
import { ProductsSearch } from "../../utlis/services/product_category_services";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const SearchLIst = () => {
  const queryParams = new URLSearchParams(window.location.search);
  let search_name = queryParams.get("search");

  const userToken = useSelector((state) => state.user.token);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  useEffect(() => {
    if (search_name) {
      searchFunction();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  let headers = {};
  if (userToken) {
    headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${userToken}`,
    };
  }

  const searchFunction = async () => {
    window.scrollTo(0, 0);
    setLoading(true);
    try {
      let res = await ProductsSearch(search_name, headers);
      setProducts(res.results);
      console.log("search", res.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container searchClass">
        <div className="search-content bg-whitesmoke">
          <div className="py-5">
            <div className="title-md text-center my-4">
              <h3 className="price-text">Search results</h3>
            </div>
            <div>
              {loading ? (
                <div className="text-center m-5">
                  <Spinner animation="border" size="lg" variant="success" />
                </div>
              ) : products.length === 0 ? (
                <h3 className="text-center m-5 text-just">
                  No product Found. Please try again with a different search
                  query.
                </h3>
              ) : (
                <div>
                  <CardData products={products} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ScrollToTop smooth />
    </>
  );
};
export default SearchLIst;
