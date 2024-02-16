import React, { useState, useEffect } from 'react'
import './ManageProfile.css'
import { GiCrossMark } from 'react-icons/gi';
import { GrFacebookOption, GrInstagram, GrYoutube } from 'react-icons/gr'
import { MdAddCall, MdMarkEmailUnread } from 'react-icons/md';
import { FaAddressCard, FaUserCircle, FaAddressBook } from 'react-icons/fa'
import { ImUser, ImLocation2 } from 'react-icons/im';
import { CgProfile } from 'react-icons/cg';
import { RiQuestionnaireLine } from 'react-icons/ri'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Scrollbars } from 'react-custom-scrollbars-2';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import { Button } from 'react-bootstrap';
import ScrollToTop from "react-scroll-to-top";
import { GetUserData } from '../utlis/services/user_services';
import AddressAdd from './AddressAdd';
import { DeleteAddress } from '../utlis/services/address_services';
import ChatsCardDtata from '../components/Chat/ChatsCardData';
import OrderCard from '../components/OrdersCard/OrderCard';
import { GetPersonalQuestionListings } from '../utlis/services/ques-ans-services';
import ProfileEdit from './ProfileEdit';

const ManageProfile = () => {
    const user = useSelector(state => state.user);
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const[data, setData]= useState([])
    const [loading, setLoading] = useState(true);

    console.log('User',userToken)
    const id = user.user.id
   
    useEffect(() => {
        userList()
        personalQuestionListData()
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
            console.log('userList', response)
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

    const personalQuestionListData = async () => {
        try {
            let ListData = await GetPersonalQuestionListings(headers)
            setData(ListData)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <Header />
            <div className="container-fluid manage">
                <ToastContainer />
                <div className='container'>
                    <h3 className='text-center mb-3'>Hello, {user?.user?.username}</h3>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='card shadow'>
                                <div className="card-body mb-5">
                                    <h5 className="card-title d-flex "><CgProfile /> Personal Profile | <ProfileEdit userName={userData?.username}
                                    first_name={userData?.first_name} last_name={userData?.last_name} phoneNumber={userData?.phone_number}
                                    Email={userData?.email} DOB={userData?.dob} City={userData?.city} country={userData?.country} userList={userList}  /> </h5>
                                    <hr className='mt-0' />
                                    <h6 className="card-subtitle text-muted"><FaUserCircle /> Name: {user?.user?.username}</h6>
                                    <p className="card-subtitle my-1"><MdMarkEmailUnread /> Email: {userData?.email}</p>
                                    <p className="card-subtitle"><ImUser /> FullName: {userData?.first_name} {userData?.last_name}</p>
                                    <p className="card-subtitle"><ImUser /> Phone: {userData?.phone_number}</p>
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
                        <div className='col-md-8 my-1'>
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
                    <div>
                        <OrderCard />
                    </div>
                    <div>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='rounded bg-white shadow my-3'>
                                    <div className='d-flex align-items-center justify-content-start mx-3'>
                                        <h5 className='text-danger mt-4'>My Questions <RiQuestionnaireLine /></h5>
                                    </div>
                                    <hr />
                                    {/* Questions listing */}
                                    <div className="container">
                                        <ChatsCardDtata data={data} loading={loading} />
                                    </div>
                                    {/* End */}
                                </div>
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
