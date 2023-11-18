import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";
import Star from './Star';

const ProductRating = ({avg_rating}) => {
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
              <span className='text-secondary'>634 Ratings</span>
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