import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import { myContext } from '../../context/myContext';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const Item = () => {
  const { id } = useParams();
  const location = useLocation();
  const { name, price, description, category, seller_id } = location.state || {};
  const [sellerDetails, setSellerDetails] = useState({});
  useEffect(() => {
    axios.post('/name',{ seller_id })
      .then((response) => {
        console.log(response.data, "here");
        setSellerDetails({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          contactNumber: response.data.contactNumber,
          contactEmail: response.data.seller_email,
          buyerEmail: response.data.buyer_email,
        });
      })
      .catch((error) => {
        console.error(error);
      })
  },[]);
  const addToCart = async () => {
    const buyer_email = sellerDetails.buyerEmail;
    const response = await axios.post('/cart', { id ,name, price, seller_id, buyer_email } , { withCredentials: true });
    if(response.data.error)
    {
      toast.error("error adding to cart");
    }
    else
    {
      toast.success("Added to cart");
    }
  };
  return (
    <div className='mt-20 sm:mt-28 mx-2 sm:mx-4 lg:mx-8 w-full'>
      {/* Back Button */}
      <div className='mb-4 sm:mb-6'>
        <Link 
          to='/search'
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200'
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Search
        </Link>
      </div>
      
      <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden'>
        {/* Item Image Section */}
        <div className='aspect-video bg-gray-100 flex items-center justify-center border-b border-gray-200'>
          <img 
            src="" 
            alt="item-image" 
            className='max-w-full max-h-full object-contain p-4' 
          />
          {/* Placeholder when no image */}
          <div className='text-gray-400 text-center p-8'>
            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className='text-sm sm:text-base'>No image available</span>
          </div>
        </div>
        
        {/* Item Details Section */}
        <div className='p-4 sm:p-6 lg:p-8'>
          <div className='space-y-4 sm:space-y-5'>
            <div className='border-b border-gray-100 pb-4'>
              <h1 className='text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2'>
                {name || "Loading..."}
              </h1>
              <p className='text-2xl sm:text-3xl font-bold text-green-600'>
                {"$" + " " + price || "Loading..."}
              </p>
            </div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div className='space-y-3 sm:space-y-4'>
                <div>
                  <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Category</span>
                  <p className='text-base sm:text-lg text-gray-900 mt-1'>{category || "Loading..."}</p>
                </div>
                
                <div>
                  <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Seller</span>
                  <p className='text-base sm:text-lg text-gray-900 mt-1'>{sellerDetails.firstName || "Loading..."}</p>
                </div>
              </div>
              
              <div className='space-y-3 sm:space-y-4'>
                <div>
                  <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Contact</span>
                  <p className='text-base sm:text-lg text-gray-900 mt-1'>{sellerDetails.contactNumber || "Loading..."}</p>
                </div>
                
                <div>
                  <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Email</span>
                  <p className='text-base sm:text-lg text-gray-900 mt-1 break-all'>{sellerDetails.contactEmail || "Loading..."}</p>
                </div>
              </div>
            </div>
            
            <div className='pt-4 border-t border-gray-100'>
              <span className='text-sm font-medium text-gray-500 uppercase tracking-wide'>Description</span>
              <p className='text-base sm:text-lg text-gray-700 mt-2 leading-relaxed'>{description || "Loading..."}</p>
            </div>
          </div>
          
          {/* Add to Cart Button */}
          <div className='mt-6 sm:mt-8'>
            <button 
              onClick={addToCart} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 sm:py-4 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg text-base sm:text-lg"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Item