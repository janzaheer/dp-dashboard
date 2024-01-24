import React, { useState, useEffect } from 'react'
import './ManageProfile.css'
import { GiCrossMark } from 'react-icons/gi';
import { GrFacebookOption, GrInstagram, GrYoutube } from 'react-icons/gr'
import { MdAddCall, MdMarkEmailUnread } from 'react-icons/md';
import { BsEyeFill } from 'react-icons/bs'
import { FaAddressCard, FaUserCircle, FaAddressBook } from 'react-icons/fa'
import { ImUser, ImLocation2 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars-2';
import moment from 'moment';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { Button, Badge } from 'react-bootstrap';
import ScrollToTop from "react-scroll-to-top";
import { SellerOrderList } from '../utlis/services/order_services';
import { GetUserData } from '../utlis/services/user_services';
import AddressAdd from './AddressAdd';
import { DeleteAddress } from '../utlis/services/address_services';

const ManageProfile = () => {
    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [orderDataList, setOrderDataList] = useState([])

    const id = user.user.id
   
    useEffect(() => {
        userList()
        myOrderList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {};
    if (userToken) {
      headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      };
    }

    const userList = async () => {
        try {
            let response = await GetUserData(id, headers)
            setUserData(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (AddressId) => {
        const payload = {
            address_id: AddressId,
        }
        try {
            let res = await DeleteAddress(payload,headers)
            console.log(res)
            userList()
            toast.error(res.message, {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
        } catch (error) {
            console.log('delete error', error)
        }
    }

    const myOrderList = async () => {
        try {
            let resp = await SellerOrderList(headers)
            setOrderDataList(resp.results)
        } catch (error) {
            console.log('orderList',error)
        }
    }

    const handleBadge = (state) => {
        if (state == 'completed') {
            /* eslint eqeqeq: 0 */
            return <Badge bg="success">
                completed
            </Badge>
        } else if (state == 'placed') {
            return <Badge bg="primary">
                placed
            </Badge>
        } else if (state == 'processed') {
            return <Badge bg="warning">
                processed
            </Badge>
        } else if (state == 'received') {
            return <Badge bg="info">
                received
            </Badge>
        } else if (state == 'canceled') {
            return <Badge bg="danger">
                canceled
            </Badge>
        }
        return ':'
    }

    return (
        <div>
            <Header />
            <div className="container-fluid manage">
                <ToastContainer />
                <div className='container'>
                    <h3 className='text-center mb-3'>Hello, {user.user.username}</h3>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card shadow'>
                                <div className="card-body mb-5">
                                    <h5 className="card-title"><CgProfile /> Personal Profile | <Link to='#' className='text-secondary' >Edit</Link> </h5>
                                    <hr className='mt-0' />
                                    <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {user.user.username}</h6>
                                    <p className="card-subtitle mb-2"><MdMarkEmailUnread /> Email: {userData?.email}</p>
                                    <p className="card-subtitle"><ImUser /> FullName: {userData?.first_name} {userData?.last_name}</p>
                                </div>
                                <div className='d-flex justify-content-center mb-5'>
                                    <Button variant="outline-primary" className='me-1' size="sm">
                                        <GrFacebookOption />
                                    </Button>
                                    <Button variant="outline-warning" className='mx-1' size="sm">
                                        <GrInstagram />
                                    </Button>
                                    <Button variant="outline-danger" className='ms-1' size="sm">
                                        <GrYoutube />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className=' col-md-8'>
                            <div className="card controlCard shadow">
                                <div className='d-flex justify-content-between mx-3 my-2'>
                                    <h5 className='card-title mt-2'><FaAddressBook /> Address Book</h5>
                                    <AddressAdd userList={userList} />
                                </div>
                                <Scrollbars thumbMinSize={30} >
                                    {userData.addresses?.map((item, index) => {
                                        return (
                                            <div className='card mb-1 mx-1 shadow-sm' key={item.id} >
                                                <div className="card-body">
                                                    <div className='d-flex justify-content-between'>
                                                        <div>
                                                            <p className='text-muted'><ImLocation2 /> Address # {index + 1}</p>
                                                        </div>
                                                        <div>
                                                            <Link to='#' className='text-danger' onClick={() => handleDelete(item.id)} ><GiCrossMark /></Link>
                                                        </div>
                                                    </div>
                                                    <hr className='mb-3 mt-0' />
                                                    <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {userData.first_name} {userData.last_name}</h6>
                                                    <p className='card-subtitle mb-1'><MdAddCall /> Phone: {item?.phone_number}</p>
                                                    <p className='card-subtitle mb-1'><MdMarkEmailUnread /> Email: {item?.email_address}</p>
                                                    <p className="card-text"><FaAddressCard /> Address: {item?.address}</p>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12'>
                            <div className='rounded bg-white shadow my-3'>
                                <div className='d-flex align-items-center justify-content-start mx-3'>
                                    <h5 className='text-danger mt-4'>My Orders <RiShoppingBag3Fill /></h5>
                                </div>
                                <hr />
                                {/* Shopping cart table */}
                                <div className="table-responsive">
                                    <Scrollbars>
                                        <table className="table table-bordered table-hover mt-1 text-center">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Order #</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="p-2 px-3 text-uppercase">Placed On</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Quantity</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Status</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Price</div>
                                                    </th>
                                                    <th scope="col" className="border-0 bg-light">
                                                        <div className="py-2 text-uppercase">Action</div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orderDataList && orderDataList?.map((ite) => {
                                                    return (
                                                        <tr key={ite?.id}>
                                                            <td className="border-0 text-muted align-middle">{ite?.order_number}</td>
                                                            <td className="border-0 text-muted align-middle">{moment(ite?.created_at).format("MM-DD-YYYY")}</td>
                                                            <td className="border-0 text-muted align-middle">{ite?.total_quantity}</td>
                                                            <td className="border-0 text-muted align-middle">{handleBadge(ite?.status)}</td>
                                                            <td className="border-0 text-muted align-middle">Rs {parseFloat(ite?.total_amount).toFixed(0)}</td>
                                                            <td className="border-0 align-middle"><NavLink to={`/productSuccess/${ite.id}`} className='text-success'><BsEyeFill /></NavLink> </td>
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
            <Footer />
            <ScrollToTop smooth />
        </div>
    )
}
export default ManageProfile
