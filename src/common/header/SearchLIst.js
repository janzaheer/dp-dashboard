import React, { useEffect, useState } from 'react'
import './SearchList.css'
import { useSelector } from 'react-redux';
import '../../components/ShopList/style.css'
import Header from './Header';
import Footer from '../footer/Footer';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from 'react-scroll-to-top';
import CardData from '../../components/card/CardData';
import { ProductsSearch } from '../../utlis/services/product_category_services';

const SearchLIst = () => {

  const queryParams = new URLSearchParams(window.location.search)
  let search_name = queryParams.get("search");

  const userToken = useSelector(state => state.user.token);
  const [products, setSearchData] = useState('')

  useEffect(() => {
    searchFunction()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search_name])

  let headers = {}
    if (userToken) {
        headers = {
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }

  const searchFunction = async () => {
    window.scrollTo(0, 0);
      try {
        let res = await ProductsSearch(headers,search_name)
        setSearchData(res.results)
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <>
      <Header />
      <div className='container searchClass'>
          <div className='search-content bg-whitesmoke'>
              <div className='py-5'>
                <div className='title-md text-center mb-3'>
                  <h3 className='text-danger'>Search results</h3>
                </div>
                <div>
                  <CardData products={products} />
                </div>
              </div>
          </div>
      </div>
      <Footer />
      <ScrollToTop smooth />
    </>
  )
}
export default SearchLIst;
