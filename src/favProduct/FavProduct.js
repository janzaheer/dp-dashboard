import React, { useEffect, useState } from 'react'
import './fav.css';
import { useSelector } from 'react-redux';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import ScrollToTop from 'react-scroll-to-top';
import CardData from '../components/card/CardData';
import { ProductsFav } from '../utlis/services/product_category_services';
const FavProduct = () => {
    const userToken = useSelector(state => state.user.token);
    const [products, setProducts] = useState([])

    useEffect(() => {
        handleFavList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

    const handleFavList = async () => {
        try {
            let res = await ProductsFav(headers)
            setProducts(res)
        } catch (error) {
            console.log('error while loading favorite', error)
        }
    }

    return (
        <div>
            <Header />
            <div className='container fav'>
                <div className=''>
                    <h1 className='text-center text-danger'>Favorite list</h1>
                    <div>
                        <CardData products={products} handleFavList={handleFavList} />
                    </div>
                </div>
            </div>
            <Footer />
            <ScrollToTop smooth />
        </div>
    )
}

export default FavProduct