import React, { useState } from 'react'
import { NavLink,useNavigate } from "react-router-dom";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import { useSelector } from 'react-redux';
import axios from "axios";
import Heart from "react-heart";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify'
import { BASE_URL, FAV_ENDPOINT, API_VERSION } from '../../utlis/apiUrls';
import { ProductsCategoryList } from '../../utlis/services/product_category_services';

const CardData = ({ products }) => {
  const [itemFavourite, setItemFavourite] = useState({})
  const [addFav, setAddFav] = useState('')
  const userToken = useSelector(state => state.user.token);
const isAuthenticated = useSelector(state => state.user.isAuthenticated)
const navigate = useNavigate();


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
        ProductsCategoryList()
    }).catch(error => {
        console.log(error)
    })
    if (isAuthenticated == false) {
        navigate("/login")
    }
}

  const price = (p) => {
    if (p == 0) {
      return ''
    } else {
      return `Rs ${p}`
    }
  }
  const handleBadge = (seller) => {
    if (seller == null) {
      return <span className="badge text-bg-success notify-badge">DjangoPets mall</span>
    } else {
      return ''
    }
  }


  return (
    <div>
       <ToastContainer />
      <div className="row g-2 mx-md-5">
        {products && products.length > 0 && products.map((product) => {
          return (
            <div key={product?.id} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <div className='bg-white border rounded productShadow' >
                <div className="">
                  <div className="text-center mb-1 itemImage">
                    <NavLink to={`/productDetails/${product?.id}`} className="" >
                      {handleBadge(product.seller)}
                      <img src={product?.images[0]?.image_url} alt='' className="images-class w-100" width={180} height={180} />
                    </NavLink>
                  </div>
                  <div className="p-1">
                    <div className="about">
                      <h6 className="text-muted text-wrap">{product?.title.substring(0, 11)}</h6>

                      <div className="px-2 d-flex justify-content-between align-items-center">
                        <span className=""> {price(product?.price)}</span>
                        <div style={{ width: "20px" }}>
                        <Heart isActive={itemFavourite && product.id in itemFavourite ? itemFavourite[product.id] : product.is_favourite} onClick={() => handleFav(product.id)} />
                      </div>
                      </div>
                      <div> <span className="text-decoration-line-through text-muted">Rs 200</span> </div>
                      <div> <p><FaStar className="icon" /><FaStar className="icon" /><FaStar className="icon" /><FaStarHalfAlt className="icon" /><AiOutlineStar className="icon" /> (101)</p> </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }
        
      </div>

    </div>
  )
}

export default CardData