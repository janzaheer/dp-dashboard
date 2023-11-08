import React from 'react'
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const ProductRating = () => {
  return (
    <div>
      <div className='row'>
        <div className='col-md-6'>
          <div className=''>
            <div>
              <div>
                <span class="score-average">3.5</span><span class="score-max">/5</span>
              </div>
              <h6><FaStar className="icon" /><FaStar className="icon" /><FaStar className="icon" /><FaStarHalfAlt className="icon" /><AiOutlineStar className="icon" /></h6>
              <span className='text-secondary'>634 Ratings</span>
            </div>
            <div className='mt-1'>
              <div className=''>
              

              </div>
            </div>
          </div>
        </div>
        <div className='col-md-6'>
        </div>
      </div>
    </div>
  )
}
export default ProductRating