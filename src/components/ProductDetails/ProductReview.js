import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import moment from 'moment';
import Star from './Star';
import ProductRating from './ProductRating';

const ProductReview = ({ comments, avg_rating }) => {
    return (
        <>
            <ProductRating avg_rating={avg_rating} />
            <div className='ReviewHeight'>
                <Scrollbars>
                    <hr />
                    {comments && comments.length > 0 && comments.map((comment) => {
                        return (
                            <div key={comment?.id}>
                                <div className='d-flex justify-content-between mt-2'>
                                    <span><Star stars={comment.rating} /></span>
                                    <span>{moment(comment?.created_at).startOf('minutes').fromNow()}</span>
                                </div>
                                <div>
                                    <h6 className='text-secondary'> by {comment?.user?.username}</h6>
                                    <div>{comment.text}.</div>
                                </div>
                                <hr />
                            </div>
                        )
                    })
                    }
                </Scrollbars>
            </div>
        </>

    )
}

export default ProductReview