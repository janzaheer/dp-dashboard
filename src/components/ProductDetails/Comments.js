import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom"

const Comments = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Questions About This Product (29)
                </div>
                <div className="card-body">
                    {
                        isAuthenticated ? <div>
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    <button type="submit" className="btn btn-primary mt-1 btn-sm">Ask Questions</button>
                                </div>
                            </form>
                        </div> :
                            <div className='text-secondary'><Link to='/login'>Login</Link>  or <Link to='/register'>Register</Link> to ask questions to seller</div>
                    }
                    <div>Other questions answered by SellerShop Name (29)</div>
                    <div className='commentsHeight'>
                        <Scrollbars>
                            <hr />
                            <div>
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                    <img src="https://github.com/twbs.png" alt="twbs" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="">
                                        <h6 className="mb-0">ay batao ay product kaisa hai is me kohi side effects hai?</h6>
                                        <p className="mb-0 opacity-75">Customer - 10 Jun 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                    <img src="https://github.com/twbs.png" alt="twbs" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="">
                                        <h6 className="mb-0">Nai ay bath he acha hai and Reviews dek ly ap</h6>
                                        <p className="mb-0 opacity-75">Seller Name - answered within 1 month</p>
                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div>
                                <div href="#" className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                    <img src="https://github.com/twbs.png" alt="twbs" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="">
                                        <h6 className="mb-0">me ne order Kara hai plz same yeh hi Product hona chahiye !!?</h6>
                                        <p className="mb-0 opacity-75">Customer - 16 Jun 2024</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="list-group-item list-group-item-action d-flex gap-3 py-3">
                                    <img src="https://github.com/twbs.png" alt="twbs" width={32} height={32} className="rounded-circle flex-shrink-0" />
                                    <div className="">
                                        <h6 className="mb-0">ap ko same as shown milly ga</h6>
                                        <p className="mb-0 opacity-75">Seller Name - answered within 4 weeks</p>
                                    </div>
                                </div>
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Comments