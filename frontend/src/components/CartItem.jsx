import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const CartItem = (props) => {
  const itemId = props.id;

  const removeFromCart = async () => {
    console.log(itemId);
    const response = await axios.post('/deleteItem', { itemId });
    if (response.data.error) {
      toast.error(response.data.error);
    } else {
      toast.success("Item removed");
      props.onRemove(); // Call the callback function to update the cart state
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-neutral-800 text-lg">{props.name || "Loading..."}</h3>
              <div className="flex items-center mt-2">
                <span className="text-2xl font-bold text-primary-600">${props.price || "0"}</span>
                <span className="text-sm text-neutral-500 ml-2">per item</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-xs text-green-600 font-medium">Available</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <Link 
                to={`/items/${itemId}`} 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Details
              </Link>
            </div>
            
            <button 
              onClick={removeFromCart} 
              className="text-accent-500 hover:text-accent-600 hover:bg-accent-50 p-2 rounded-lg transition-all duration-200 flex items-center"
              title="Remove from cart"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;