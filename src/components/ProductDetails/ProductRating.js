import React from 'react'
import Star from './Star';

const ProductRating = ({avg_rating, total_ratings}) => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <div className=''>
            <div>
              <div>
                <span className="score-average">{avg_rating?.toFixed(1)}</span><span className="score-max">/5</span>
              </div>
              <h6><Star stars={avg_rating} /></h6>
              <span className='text-secondary'>{total_ratings} Rating</span>
            </div>
            {/* <div className='mt-1'>
              <div className=''>
              

              </div>
            </div> */}
          </div>
        </div>
        <div className='col-md-6'>
        </div>
      </div>
    </div>
  )
}
export default ProductRating