import React, { useEffect, useState } from 'react'
import './Checkout.css'
import { Link, useNavigate } from "react-router-dom";
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useDispatch, useSelector } from 'react-redux';
import { getCartTotal, clearCart } from '../../store/cartSlice';
import { MdAddCall, MdMarkEmailUnread, MdAddLocationAlt } from 'react-icons/md';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FaAddressCard, FaUserCircle } from 'react-icons/fa'
import { ImLocation2 } from 'react-icons/im';
import Header from '../../common/header/Header';
import Footer from '../../common/footer/Footer';
import { Button, Modal } from 'react-bootstrap';
import ScrollToTop from 'react-scroll-to-top';
import AddressAdd from '../../Profile/AddressAdd';
import { OrderAdd } from '../../utlis/services/order_services';
import { GetUserData } from '../../utlis/services/user_services';

const Checkout = () => {

    const dispatch = useDispatch();
    const { data: products, totalItems, totalAmount, deliveryCharge, totalAmountItems } = useSelector(state => state.cart);
    const user = useSelector((state) => state.user)
    const userToken = useSelector(state => state.user.token);
    const [userData, setUserData] = useState({})
    const [selectedAddressPhone, setSelectedAddressPhone] = useState('')
    const [selectedAddressEmail, setSelectedAddressEmail] = useState('')
    const [selectedAddress, setSelectedAddress] = useState('')
    const [selectedAddressId, setSelectedAddressId] = useState('')
    const [selectedProvinces, setSelectedProvinces] = useState('')
    const [showAddressListModel, setShowAddressListModel] = useState(false);

    const handleCloseShowAddressListModel = () => setShowAddressListModel(false);
    const handleShowShowAddressListModel = () => setShowAddressListModel(true);
    const navigate = useNavigate();
    const id = user.user.id

    useEffect(() => {
        userList()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    let headers = {}
    if (userToken) {
        headers = {
            Accept: "application/json",
            'Content-Type': "application/json",
            Authorization: `Token ${userToken}`
        }
    }
    // console.log('delivery',deliveryCharge)
    // Creating a JS object to add array into
    // Array to be inserted
    var placeOrder = { total_amount: totalAmount, total_quantity: totalItems, address_id: selectedAddressId,shipping_amount:deliveryCharge,  items: [] };
    let my_total_quantity = 0;
    products.forEach(element => {
        let data = {
            'item_id': element.id,
            'quantity': element.quantity,
            'amount': element.price
        }
        my_total_quantity += element.quantity;
        placeOrder['items'].push(data)
    });
    placeOrder['total_quantity'] = my_total_quantity

    const handlePlaceOrder = async () => {
            try {
                let res = await OrderAdd(placeOrder,headers)
                // console.log('order-data', res);
                navigate(`/productSuccess/${res.id}`)
                dispatch(clearCart());
            } catch (error) {
                console.log("Error-", error)
            }
        }

    const userList = async () => {
        try {
            let res = await GetUserData(id, headers)
            setUserData(res)
            const defaultAddress = res.addresses && res.addresses[0];
            if (defaultAddress) {
                setSelectedAddressPhone(defaultAddress.phone_number);
                setSelectedAddressEmail(defaultAddress.email_address);
                setSelectedAddress(defaultAddress.address);
                setSelectedProvinces(defaultAddress.province); // Set default province
                setSelectedAddressId(defaultAddress.id);
                dispatch(getCartTotal({ province: defaultAddress.province })); // Calculate total with default province
                
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSelectNewAddress = async (id, phone_number, email_address, address, province) => {
        try {
            setSelectedAddressPhone(phone_number)
            setSelectedAddressEmail(email_address)
            setSelectedAddress(address)
            setSelectedAddressId(id)
            setSelectedProvinces(province);
            dispatch(getCartTotal({ province }));
            toast.success('Selected New Address Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            setShowAddressListModel(false)
        } catch (error) {
            console.log(error)
        }
    }

    const price = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `${parseFloat(p).toFixed(0)}`
        }
    }
    const total = (p) => {
        if (p == 0) {
            return `-`
        } else {
            return `${parseFloat(p).toFixed(0)}`
        }
    }
    const discountPrice = (d) => {
        if (d == 0) {
          return "";
        } else {
          return `Rs ${parseFloat(d).toFixed(0)}`;
        }
    };
    const deliveryPrice = (p) => {
        /* eslint eqeqeq: 0 */
        if (p === 0 || p === undefined) {
          return "-";
        } else {
          return `${parseFloat(p).toFixed(0)}`;
        }
    }

    const totalAmountItemsFunc = (p) => {
        /* eslint eqeqeq: 0 */
        if (p === 0 || p === undefined) {
          return "-";
        } else {
          return `${parseFloat(p).toFixed(0)}`;
        }
      }

    return (
        <div>
            <Header />
            <ToastContainer />
            {/* Address List Model start */}
            <Modal
                size="lg"
                show={showAddressListModel}
                onHide={handleCloseShowAddressListModel}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title className='price-text' >Select New Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='row'>
                        {userData?.addresses?.length === 0 ? 'Please Add Your Address before place order' : '' }
                        {userData.addresses?.map((item, index) => {
                            return (
                                <div className='col-6' key={item.id}>
                                    <div className='card shadow-sm my-2'  >
                                        <div className="card-body product" onClick={() => handleSelectNewAddress(item.id, item?.phone_number, item?.email_address, item?.address, item?.province)}>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <p className='text-muted'><ImLocation2 /> Address # {index + 1}</p>
                                                </div>
                                                <div>
                                                </div>
                                            </div>
                                            <hr className='mb-3 mt-0' />
                                            <h6 className="card-subtitle mb-2 text-muted"><FaUserCircle /> Name: {userData.first_name} {userData.last_name}</h6>
                                            <p className='card-subtitle mb-1'><MdAddCall /> Phone: {item?.phone_number}</p>
                                            <p className='card-subtitle mb-0'><MdMarkEmailUnread /> Email: {item?.email_address}</p>
                                            <p className="card-text mb-0"><ImLocation2 /> Province: {item?.province}</p>
                                            <p className="card-text mb-0"><FaAddressCard /> Address: {item?.address}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <AddressAdd  userList={userList} />
                </Modal.Footer>
            </Modal>
            {/* Address List Model End */}
            <div className="container checkout-container mt-5">
                <main>
                    <div className='row g-1'>
                        <div className='col-12 bg-white rounded p-5 mb-3 shadow'>
                            <div className='card shadow'>
                                <div className="card-body mb-5">
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div>
                                            <h5 className="card-title price-text"><ImLocation2 /> Address</h5>
                                        </div>
                                        <div className='mb-2'>
                                            <Button className='address-btn' onClick={handleShowShowAddressListModel}>
                                                <MdAddLocationAlt /> Changes Address
                                            </Button>
                                        </div>
                                    </div>
                                    <hr className='mt-0' />
                                    <h6 className="card-subtitle mb-2 text-muted" >Name: {user.user.username}</h6>
                                    <h6 className="card-subtitle mb-2 text-muted"> FullName: {userData?.first_name} {userData?.last_name}</h6>
                                    <p className='card-subtitle mb-1'> Phone: {selectedAddressPhone}</p>
                                    <p className='card-subtitle mb-0'> Email: {selectedAddressEmail}</p>
                                    <p className="card-text mb-0">Province: {selectedProvinces}</p>
                                    <p className="card-text">Address: {selectedAddress}</p>
                                    {userData?.addresses?.length === 0 ? 'Please Add Your Address before place order' : '' }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <div className='row justify-content-center'>
                    <div className='col-12 sol-sm-12 col-md-7 bg-white rounded shadow me-3 mb-2'>
                        <div className='checkout-product'>
                            <div className="table-responsive mt-2">
                                <Scrollbars>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="p-2 px-3 text-uppercase">Product</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Price</div>
                                                </th>
                                                <th scope="col" className="border-0 bg-light">
                                                    <div className="py-2 text-uppercase">Quantity</div>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => {
                                                return (
                                                    <tr key={item.id}>
                                                        <th scope="row" className="border-0">
                                                            <div className="p-2">
                                                                <img src={item.images[0].image_url} alt='' width={60} className="img-fluid rounded shadow" />
                                                                <div className="ms-3 ml-3 d-inline-block align-middle">
                                                                    <h5 className=""> <Link to="#" className="text-dark d-inline-block align-middle"></Link></h5><span className="text-muted font-weight-normal font-italic d-block">{item.title.substring(0, 15)}</span>
                                                                </div>
                                                            </div>
                                                        </th>
                                                        <td className="border-0 align-middle">  
                                                           {
                                                            item?.stock.length > 0? (<>
                                                            <strong className='price-text d-block'>{discountPrice(item?.stock[0]?.discount_price)}</strong>
                                                            <strong className="text-decoration-line-through text-muted">Rs {price(item?.price)}</strong>
                                                            </>) : (<>
                                                                <strong className='price-text'>Rs {price(item?.price)}</strong>
                                                            </>)
                                                           }
                                                        </td>
                                                        <td className="border-0 align-middle"><strong>{item?.quantity}</strong></td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </Scrollbars>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 sol-sm-12 col-md-4 bg-white rounded shadow'>
                        <div className='box-payment'>
                            <h4 className='mt-3'>Discount and Payment</h4>
                            <hr />
                            <div className='payment-order'>
                                <div className='payment-order-head'>
                                    <h3>Order Summery</h3>
                                </div>
                                <div className='d-flex align-items-center justify-content-between'>
                                    <div>
                                        <p>Quantity</p>
                                        <p>Delivery</p>
                                        <p>Amount</p>
                                        <p className='text-secondary fw-bolder'>Total:</p>
                                    </div>
                                    <div className='mt-1 ms-1'>
                                        <p> {totalItems}</p>
                                        <p className='text-muted text-wrap'>
                                        Rs {deliveryPrice(deliveryCharge)}
                                            {/* Calculate by support after placing order  */}
                                            </p>
                                        <p>Rs {totalAmountItemsFunc(totalAmountItems)}</p>
                                        <p className='price-text fw-bolder'>Rs {total(totalAmount)}</p>
                                    </div>
                                </div>
                                <div> 
                                    {userData?.addresses?.length === 0 ? <button className='btn btn-danger w-100 my-3'>address missing</button>
                                     : <button onClick={() => handlePlaceOrder()} className='btn place-btn-color w-100 my-3'>Place Order</button> }
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

export default Checkout