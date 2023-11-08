import React, { useEffect, useState } from "react"
import "./style.css"
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { BASE_URL, FAV_ENDPOINT, API_VERSION } from "../../utlis/apiUrls";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import Heart from "react-heart";
import ScrollToTop from "react-scroll-to-top";
import { ProductCategory, ProductsCategoryList } from "../../utlis/services/product_category_services";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const ShopListData = () => {

    const [addFav, setAddFav] = useState('')
    const [itemFavourite, setItemFavourite] = useState({})
    const [categoriesData, setCategoriesData] = useState('')
    const [landingData, setLandingData] = useState({})

    const userToken = useSelector(state => state.user.token);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();

    useEffect(() => {
        ProductListingWithCategory()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const ProductListingWithCategory = async () => {
        let res = await ProductCategory()
        let categories = res.results
        setCategoriesData(categories)
        let promises = categories.map(category => {
            let name = category.name
            return ProductsCategoryList(name)
                .then((response) => {
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
            console.log('data',data)
            setLandingData(data)
        })
    }

    const handleFav = async (id) => {
        console.log('addd', addFav)

        let AddFavURL = BASE_URL + API_VERSION() + FAV_ENDPOINT()
        axios.post(AddFavURL, { item_id: id }, {
            headers: {
                'Content-Type': "application/json",
                Authorization: `Token ${userToken}`
            }
        }).then((result) => {
            console.log(result)
            setAddFav(result)
            if (result.data.message.includes('remove')) {
                let idata = itemFavourite
                idata[id] = false
                setItemFavourite(idata)
                toast.error(result.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });
            } else {
                let data = itemFavourite
                data[id] = true
                setItemFavourite(data)
                toast.success(result.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                    theme: "colored",
                });
            }
        }).catch(error => {
            console.log(error)
        })
        if (!isAuthenticated) {
            navigate("/login")
        }
    }

    const handleBadge = (seller) => {
        if (seller == null) {
            return <span className="badge text-bg-danger notify-badge">djangopets mall</span>
        } else {
            return ''
        }
    }

   

    const price = (p) => {
        /* eslint eqeqeq: 0 */
        if (p == 0) {
            return ''
        } else {
            return `Rs ${p}`
        }
    }

    // const getRandomCategoryImage = () => {
    //     const CategoryImagesList = [
    //         "./images/categoryList/1.jpg",
    //         "./images/categoryList/2.jpg",
    //         "./images/categoryList/3.jpg",
    //         "./images/categoryList/4.jpg",
    //         './images/categoryList/5.jpg'
    //     ]
    //     const random = Math.floor(Math.random() * CategoryImagesList.length);
    //     return CategoryImagesList[random]
    // }

    return (
        <div>
            <div className="container-fluid mt-3 mb-5">
                <div className="row">
                    <ToastContainer />
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
                        {landingData && Object.keys(landingData).map((key, index) => {
                            return (
                                <div key={key} className="col-lg-12 mb-2">
                                    <div className="container">
                                        <h2 className="mt-2" style={{ color: '#374151' }}>{key}</h2>
                                        <hr className="border borderColor border-1 opacity-50"></hr>
                                        <div className="row g-2 mx-md-5" >
                                            {landingData[key] && landingData[key].slice(0, 6).map((item) => {
                                                return (
                                                    <div key={item?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
                                                        <div className='bg-white border rounded productShadow' >
                                                            <div className="">
                                                                <div className="text-center mb-1 itemImage">
                                                                    <NavLink to={`/productDetails/${item?.id}`} className="" >
                                                                        {handleBadge(item.seller)}
                                                                        <img src={item?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                                                                    </NavLink>
                                                                </div>
                                                                <div className="p-1">
                                                                    <div className="about">
                                                                        <h6 className="text-muted text-wrap">{item.title.substring(0, 11)}</h6>
                                                                        <div className="d-flex justify-content-between align-items-center px-2">
                                                                            <span className="" style={{ color: '#374151' }}> {price(item?.price)}</span>
                                                                            <div style={{ width: "20px" }}>
                                                                                <Heart isActive={itemFavourite && item.id in itemFavourite ? itemFavourite[item.id] : item.is_favourite} onClick={() => handleFav(item.id)} />
                                                                            </div>
                                                                        </div>
                                                                        <div> <span className="text-decoration-line-through text-muted">Rs 200</span> </div>
                                                                        <div> <p><FaStar className="icon" /><FaStar className="icon" /><FaStar className="icon" /><FaStarHalfAlt className="icon" /><AiOutlineStar className="icon" /> (101)</p> </div>
                                                                    </div>
                                                                    {item?.is_favourite.toString()}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
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
