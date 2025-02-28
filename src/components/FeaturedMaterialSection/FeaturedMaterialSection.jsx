import React from 'react'
import FeaturedProduct from '../FeaturedProduct/FeaturedProduct'

const FeaturedMaterialSection = ({id}) => {
  return (
    <div className='container text-light' style={{marginTop:'83px'}} id={id}>
        <h2>Featured Materials</h2>
        <div className='d-flex gap-5 flex-wrap mt-5 '>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
                <div>
                <FeaturedProduct/>
                </div>
        </div>

    </div>
  )
}

export default FeaturedMaterialSection