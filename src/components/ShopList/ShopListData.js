import React, { useEffect, useState } from "react"
import "./style.css"
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BASE_URL, END_POINT, CATEGORY_ITEMS_LIST_ENDPOINT, API_VERSION } from "../../utlis/apiUrls";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import CardData from "../card/CardData";
import { ProductCategory } from "../../utlis/services/product_category_services";
import { Spinner } from "react-bootstrap";

const ShopListData = () => {
    const [categoriesData, setCategoriesData] = useState('')
    const [products, setLandingData] = useState({});
    const [loading, setLoading] = useState(true);

    const userToken = useSelector(state => state.user.token);

    useEffect(() => {
        ProductListingWithCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }
    const ProductListingWithCategory = async () => {
        setLoading(true);
        try {
            let res = await ProductCategory(headers);
            let categories = res.results;
            setCategoriesData(categories);
            let promises = categories.map(category => {
                let items_endpoint = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + category.name;
                return axios.get(items_endpoint, { headers: headers }).then((response) => {
                    return {
                        name: category.name,
                        items: response.data.results
                    };
                });
            });
            Promise.all(promises).then((results) => {
                let data = {};
                results.forEach(resultA => {
                    data[resultA.name] = resultA.items;
                });
                setLandingData(data);
            });
        } catch (error) {
            console.error("Error fetching categories and products:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
        <div className="container-fluid mt-3 mb-5">
            <div className="row">
                <div className="col-md-12 col-lg-12 mb-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 mb-6">
                                <h3 className="mt-2" style={{ color: '#374151' }}>Featured Categories</h3>
                            </div>
                        </div>
                        <div className="row g-1 d-flex justify-content-center">
                            {loading ? (
                                <div className="text-center m-5">
                                    <Spinner animation="border" size="lg" variant="success" />
                                </div>
                            ) : (
                                categoriesData && categoriesData.slice(0, 12).map((categoryName) => {
                                    return (
                                        <div key={categoryName.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="card card-product productShadow mx-1 mb-lg-4">
                                                <NavLink to={`/item/?category_name=${categoryName.name}`}>
                                                    <div className="card-body text-center py-2">
                                                        <img src={categoryName?.image_url} alt="Grocery Ecommerce Template" className="mb-2" style={{ height:'70px' }} />
                                                        <div className="text-truncate" style={{ color: 'black' }}>{categoryName?.name}</div>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    {products && Object.keys(products).map((key, index) => {
                        return (
                            <div key={key} className="col-lg-12 mb-2">
                                <div className="container">
                                    <h3 className="mt-2" style={{ color: '#374151' }}>{key}</h3>
                                    <div className="" >
                                        {loading ? (
                                            <div className="text-center m-5">
                                                <Spinner animation="border" size="lg" variant="success" />
                                            </div>
                                        ) : (
                                            <CardData products={products[key]} handleFavList={ProductListingWithCategory} />
                                        )}
                                    </div>
                                    <div className="d-flex justify-content-center mt-2">
                                        <NavLink to={`/item/?category_name=${key}`} className="view-more-btn btn-sm" >View More</NavLink>
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
            </div>
            <ScrollToTop smooth />
        </div>
    </div>
    )
}
export default ShopListData
