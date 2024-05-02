import React, { useEffect, useState } from "react";
import './style.css';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { BASE_URL, END_POINT, SORT_ENDPOINT, CATEGORY_ITEMS_LIST_ENDPOINT, changeUrl, API_VERSION } from '../../utlis/apiUrls';
import { useSelector } from 'react-redux';
import axios from "axios";
// import InfiniteScroll from 'react-infinite-scroll-component';
import Form from 'react-bootstrap/Form';
import ScrollToTop from "react-scroll-to-top";
import { ProductCategory, ProductsCategoryList } from "../../utlis/services/product_category_services";
import CardData from "../card/CardData";

const ItemPage = () => {

    const [sortTerm, setSortTerm] = useState('')
    // const [addFav, setAddFav] = useState('')
    const [products, setProducts] = useState([], []);
    const [nextUrlPage, setNextUrlPage] = useState(null);
    const [prevUrlPage, setPrevUrlPage] = useState(null);
    const [cat, setCat] = useState('');
    const [categoriesData, setCategoriesData] = useState('')

    const userToken = useSelector(state => state.user.token);

    const queryParams = new URLSearchParams(window.location.search)
    let category_name = queryParams.get("category_name");
    if (!category_name) {
        category_name = ''
    }

    useEffect(() => {
        productList();
        categoryData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

    const productList = async () => {
        let final = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + category_name
        window.scrollTo(0, 0);
        category_name = ''
        return await axios.get(final, { headers: headers })
            .then((res) => {
                // const apiRes = [...products, ...res?.data?.results]
                // console.log('---------------', res?.data?.results)
                setProducts(res?.data?.results)
                setNextUrlPage(res?.data?.next)
                setPrevUrlPage(res?.data?.previous)
            })
            .catch((err) => console.log(err))
    }

    const categoryList = async (e) => {
        let val = e.target.value;
        setCat(val)
        if (val == 'all-categories') {
            val = ''
        }
        console.log('---------------', val)
        let finalURL = BASE_URL + API_VERSION() + END_POINT() + CATEGORY_ITEMS_LIST_ENDPOINT() + val

        axios.get(finalURL, {
            headers: headers
        }).then((res) => {
            console.log('cateeee', res.data)
            setProducts(res.data.results)
            setNextUrlPage(res?.data?.next)
            setPrevUrlPage(res?.data?.previous)
        }).catch(error => {
            console.log(error)
        })
        
    }

    const categoryData = async () => {
        try {
            let res = await ProductCategory()
            console.log('cat', res.results)
            setCategoriesData(res.results)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSort = async (e) => {
        let val = e.target.value;
        setSortTerm(val)
        console.log('click-e', val)
        const response = await fetch(`${BASE_URL}${API_VERSION()}${END_POINT()}${SORT_ENDPOINT()}${val}`);
        const data = await response.json();
        setProducts(data.results)
        return data.results;
    }

    const handleNextPage = async (url) => {
        url = url.replace(changeUrl(), BASE_URL);
        window.scrollTo(0, 0);
        return await axios.get(url, { headers: headers })
            .then((res) => {
                setProducts(res.data?.results)
                setNextUrlPage(res?.data?.next)
                setPrevUrlPage(res?.data?.previous)
            })

            .catch((err) => console.log(err))
    }

    return (
        <>
            <Header />
            <div className='container-fluid mt-5 mb-5 newCLass'>
                <div className="row itemPage">
                    <div className="col-md-12 col-lg-12 colside">
                        <div className='container'>
                            <div className="d-flex justify-content-between">
                                <div className="">
                                    <h2 className="text-just">Just For You</h2>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mt-1 me-2">
                                        <Form.Select aria-label="Default select example" onChange={categoryList} value={cat ? cat : category_name} >
                                            <option value="all-categories" > All Category </option>
                                            {categoriesData && categoriesData.map((cate) => {
                                                return (
                                                    <option key={cate.id} value={cate.name}>{cate.name}</option>
                                                )
                                            })}
                                        </Form.Select>
                                    </div>
                                    <div className="mt-1">
                                        <Form.Select aria-label="Default select example" onChange={handleSort} value={sortTerm} >
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
                                <CardData products={products} />
                            </div>
                            <div className="row g-2 mx-md-5 mt-2">
                                <div className="d-flex justify-content-center">
                                    <button className='main-btn-color bt-sm me-2' disabled={prevUrlPage === null} onClick={() => handleNextPage(prevUrlPage)} > &larr; Previous</button>
                                    <button className='main-btn-color bt-sm' disabled={nextUrlPage === null} onClick={() => handleNextPage(nextUrlPage)}>Next &rarr; </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ScrollToTop smooth />
            </div>
            <Footer />
        </>
    )
}

export default ItemPage
