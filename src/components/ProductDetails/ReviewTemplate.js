import React, { useState } from 'react'
import ProductReview from './ProductReview';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ReactStars from "react-rating-stars-component";


const ReviewTemplate = ({ comments, id, avg_rating }) => {
    const navigation = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    let user = useSelector(state => state.user.user.id);
    const userToken = useSelector(state => state.user.token);
    const [feedback, setFeedback] = useState('')
    const [rat, setRat] = useState('')

    const addFeedbackProduct = async (e) => {
        e.preventDefault();
        const payload = {
            user: user,
            item: id,
            text: feedback,
            rating: rat
        }

        try {
            let res = await axios.post(`http://ec2-43-206-254-199.ap-northeast-1.compute.amazonaws.com/api/v1/items/${id}/add_comment_rating/`, payload, {
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Token ${userToken}`
                }
            })
            setFeedback('')
            setRat('')
            toast.success('Product Feedback Add Successfully', {
                position: toast.POSITION.TOP_RIGHT,
                theme: "colored",
            });
            navigation(`/productDetails/${id}`)
            console.log('add-feedback', res)
        } catch (error) {
            console.log(error)
        }
    }


    const ratingChanged = (newRating) => {
        setRat(newRating)
    };

    return (
        <div>
            <ToastContainer />
            <div className="card">
                <div className="card-header">
                    Ratings & Reviews of Product
                </div>
                <div className="card-body">
                    {
                        isAuthenticated ? <div>
                            <form onSubmit={addFeedbackProduct}>
                                <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label mb-0">Click at Star for Rating</label>
                                    <ReactStars count={5} onChange={ratingChanged} size={24} activeColor="#ffd700" />
                                    <div className="mb-3">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Enter about Product Feedback'</label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-1 btn-sm">Submit</button>
                                </div>
                            </form>
                        </div> :
                            <div className='text-secondary'><Link to='/login'>Login</Link>  or <Link to='/register'>Register</Link> to add product feedback</div>
                    }
                    {
                        comments ?
                            <div>
                                <ProductReview comments={comments} avg_rating={avg_rating} /> </div>
                            : null
                    }

                </div>
            </div>
        </div>
    )
}

export default ReviewTemplate