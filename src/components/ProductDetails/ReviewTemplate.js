import React from 'react'
import ProductReview from './ProductReview';

const ReviewTemplate = ({ comments, avg_rating, total_ratings }) => {

    return (
            <div className="card">
                <div className="card-header">
                    Ratings & Reviews of Product {total_ratings}
                </div>
                <div className="card-body">
                    {
                        comments ?
                            <div>
                                <ProductReview comments={comments} avg_rating={avg_rating} total_ratings={total_ratings} /> </div>
                            : null
                    }
                </div>
            </div>
    )
}

export default ReviewTemplate