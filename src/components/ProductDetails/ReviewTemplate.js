import React from 'react'
import ProductRating from './ProductRating';
import ProductReview from './ProductReview';

const ReviewTemplate = () => {
    return (
        <div>
            <div className="card">
                <div className="card-header">
                    Ratings & Reviews of Product
                </div>
                <div className="card-body">
                    <ProductRating />
                    <ProductReview />
                </div>
            </div>
        </div>
    )
}

export default ReviewTemplate