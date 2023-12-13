import React, { useState, useEffect } from 'react'
import Head from '../head/Head'
import { BASE_URL, END_POINT, API_VERSION, SELLER_ITEMS_ENDPOINT } from '../../utlis/apiUrls';
import { useSelector } from 'react-redux';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaEye, FaTrash } from 'react-icons/fa';
import moment from 'moment';
import axios from "axios";
import { Scrollbars } from 'react-custom-scrollbars-2';
import './product.css'
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AddProduct from './AddProduct';


const Products = () => {

  const [products, setProducts] = useState([])
  const userToken = useSelector(state => state.user.token);

  useEffect(() => {
    productList()
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
    // let final = `http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/api/v1/items/seller_items/`
    let final = BASE_URL + API_VERSION() + END_POINT() + SELLER_ITEMS_ENDPOINT()
    return await axios.get(final, { headers: headers })
      .then((res) => {
        console.log('admin-product',res.data)
        setProducts(res.data)
      })
      .catch((err) => console.log(err))
  }

  const deleteProduct = async (id) => {
    console.log('delete-id', id)
    let end = `${API_VERSION()}${END_POINT}${id}/`
    let final = BASE_URL + end
    try {
      let res = await axios.delete(final, {
        headers: {
          'Content-Type': "application/json",
          Authorization: `Token ${userToken}`
        }
      })
      console.log(res)
      productList()
      toast.error('Product Delete Successfully', {
        position: toast.POSITION.TOP_RIGHT,
        theme: "colored",
      });
    } catch (error) {
      console.log('delete error', error)
    }
  }

  return (
    <div>
      <Head />
      <div className='container-fluid'>
        <ToastContainer />
        <div className='row mt-5'>
          <div className='col-12'>
            <div className='rounded bg-white shadow my-3 mx-5'>
              <div className='d-flex align-items-center justify-content-between mx-3'>
                <div>
                  <h5 className='text-success mt-4'>Products List <RiShoppingBag3Fill /></h5>
                </div>
                <div className='mt-3'>
                  <AddProduct productList={productList} />
                </div>
              </div>
              <hr />
              {/* product table */}
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
                          <div className="p-2 px-3 text-uppercase">Stock Qty</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Placed On</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Categories</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Action</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody className='mt-3'>
                      {products && products?.map((ite) => {
                        return (
                          <tr key={ite?.id}>
                            <th scope="row" className="border-0">
                              <div className="p-2">
                                <img src={ite.images[0].image_url} alt='' width={30} className="img-fluid rounded shadow-sm" />
                              </div>
                            </th>
                            <td className="border-0 text-muted align-middle">{ite?.title.substring(0, 20)}</td>
                            <td className="border-0 text-muted align-middle">{ite?.available_quantity}</td>
                            <td className="border-0 text-muted align-middle">{moment(ite?.created_at).format("MM-DD-YYYY")}</td>
                            <td className="border-0 text-success align-middle">{ite?.category}</td>
                            <td className="border-0 text-muted align-middle">Rs {ite?.price}</td>
                            <td className="border-0 align-middle"><div className="dropdown">
                              <a className="btn dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                <BsThreeDotsVertical /></a>
                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item text-danger" onClick={() => deleteProduct(ite?.id)} href="#">Delete <FaTrash /></a></li>
                                <li><Link className="dropdown-item text-success" to={`/dashboard/productDetail/${ite.id}`}>View <FaEye /></Link></li>
                              </ul>
                            </div></td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </Scrollbars>
              </div>
              {/* End */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Products
