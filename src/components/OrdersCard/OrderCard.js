import React,{ useState,useEffect } from 'react'
import { RiShoppingBag3Fill } from 'react-icons/ri'
import { BsEyeFill } from 'react-icons/bs'
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SellerOrderList } from '../../utlis/services/order_services';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Badge,Spinner } from 'react-bootstrap';
import moment from 'moment';

const OrderCard = () => {
    const userToken = useSelector(state => state.user.token);
    const [orderDataList, setOrderDataList] = useState([]);
    const [loading, setLoading] = useState(true);


    let headers = {};
    if (userToken) {
      headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${userToken}`,
      };
    }

    useEffect(() => {
        myOrderList()
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const myOrderList = async () => {
        try {
            let resp = await SellerOrderList(headers)
            setOrderDataList(resp.results)
            // console.log('order-list',resp.results)
        } catch (error) {
            console.log('orderList',error)
        } finally {
            setLoading(false);
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
                    <div className='row'>
                        <div className='col-12'>
                            <div className='rounded bg-white shadow my-3'>
                                <div className='d-flex align-items-center justify-content-start mx-3'>
                                    <h5 className='text-danger mt-4'>My Orders <RiShoppingBag3Fill /></h5>
                                </div>
                                <hr />
                                {/* Shopping cart table */}
                                <div className="table-responsive">
                                {loading ? (
                                    <div className="text-center m-5"><Spinner animation="border" size='lg' variant="success" /></div>
                                    ) : orderDataList.length === 0 ? (
                                        <h3  className="text-center m-5 text-danger">No orders available.</h3>
                                    ) : (
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
                                    )} 
                                </div>
                                {/* End */}
                            </div>
                        </div>
                    </div>
                </div>
  )
}

export default OrderCard