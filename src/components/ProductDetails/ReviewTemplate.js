import React from 'react'
import ProductReview from './ProductReview';

const ReviewTemplate = ({ comments, avg_rating }) => {

    return (
            <div className="card">
                <div className="card-header">
                    Ratings & Reviews of Product
                </div>
                <div className="card-body">
                    {
                        comments ?
                            <div>
                                <ProductReview comments={comments} avg_rating={avg_rating} /> </div>
                            : null
                    }
                </div>
            </div>
    )
}

export default ReviewTemplate