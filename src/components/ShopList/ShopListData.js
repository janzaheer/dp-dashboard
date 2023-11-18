import React, { useEffect, useState } from "react"
import "./style.css"
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BASE_URL, END_POINT, CATEGORY_ITEMS_LIST_ENDPOINT, API_VERSION } from "../../utlis/apiUrls";
import axios from "axios";
import ScrollToTop from "react-scroll-to-top";
import CardData from "../card/CardData";
import { ProductCategory } from "../../utlis/services/product_category_services";

const ShopListData = () => {
    const [categoriesData, setCategoriesData] = useState('')
    const [products, setLandingData] = useState({})

    const userToken = useSelector(state => state.user.token);

    useEffect(() => {
        ProductListingWithCategory()
        //  test1()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

    // const test1 = async () =>{
    //     let res = await ProductCategory(headers)
    //     console.log('new-cat',res)
    // }

    const ProductListingWithCategory = async () => {
        let res = await ProductCategory(headers)
        let categories = res.results
        console.log('Category',categories)
        setCategoriesData(categories)
        let promises = categories.map(category => {
            let items_endpoint = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + category.name
            return axios.get(items_endpoint, { headers: headers }).then((response) => {
                return {
                    name: category.name,
                    items: response.data.results
                }
            })
            
        });
        
        Promise.all(promises).then((results) => {
            let data = {}
            results.forEach(resultA => {
                data[resultA.name] = resultA.items
            })
            console.log('product',data)
            setLandingData(data)
        })
    }

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
                            <div className="row g-0 d-flex justify-content-center">
                                {categoriesData && categoriesData.slice(0, 12).map((categoryName) => {
                                    return (
                                        <div key={categoryName.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                            <div className="card card-product productShadow mx-1 mb-lg-4">
                                                <NavLink to={`/item/?category_name=${categoryName.name}`}>
                                                    <div className="card-body text-center py-8">
                                                        <img src="https://freshcart.codescandy.com/assets/images/category/category-instant-food.jpg" alt="Grocery Ecommerce Template" className="mb-3" />
                                                        <div className="text-truncate" style={{ color: 'black' }}>{categoryName?.name}</div>
                                                    </div>
                                                </NavLink>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div>
                        {products && Object.keys(products).map((key, index) => {
                            return (
                                <div key={key} className="col-lg-12 mb-2">
                                    <div className="container">
                                        <h2 className="mt-2" style={{ color: '#374151' }}>{key}</h2>
                                        <hr className="border borderColor border-1 opacity-50"></hr>
                                        <div className="" >
                                            <div>
                                            <CardData products={products[key]} />
                                            </div>
                                            {/* {products[key] && products[key].slice(0, 6).map((products) => {
                                                return (
                                                    <div key={products?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                                        <div className='bg-white border rounded productShadow' >
                                                            <div className="">
                                                                <div className="text-center mb-1 itemImage">
                                                                    <NavLink to={`/productDetails/${products?.id}`} className="" >
                                                                        {handleBadge(products.seller)}
                                                                        <img src={products?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="p-1">
                                                                    <div className="about">
                                                                        <h6 className="text-muted text-wrap">{products.title.substring(0, 11)}</h6>
                                                                        <div className="d-flex justify-content-between align-items-center px-2">
                                                                            <span className="" style={{ color: '#374151' }}> {price(products?.price)}</span>
                                                                            <div style={{ width: "20px" }}>
                                                                                <Heart isActive={itemFavourite && products.id in itemFavourite ? itemFavourite[products.id] : products.is_favourite} onClick={() => handleFav(products.id)} />
                                                                            </div>
                                                                        </div>
                                                                        <div> <span className="text-decoration-line-through text-muted">Rs 200</span> </div>
                                                                        <div> <p><FaStar className="icon" /><FaStar className="icon" /><FaStar className="icon" /><FaStarHalfAlt className="icon" /><AiOutlineStar className="icon" /> (101)</p> </div>
                                                                    </div>
                                                                    {products?.is_favourite.toString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })} */}
                                        </div>
                                        <div className="d-flex justify-content-center mt-2">
                                            <NavLink to={`/item/?category_name=${key}`} className="btn btn-outline-secondary" >View More</NavLink>
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
