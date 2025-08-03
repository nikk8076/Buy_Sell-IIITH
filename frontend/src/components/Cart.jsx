import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCart = async () => {
    try {
      const response = await axios.get('/getCart');
      setCart(response.data.cart);
      calculateTotalPrice(response.data.cart);
      console.log(response.data.cart); // Log the response data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const calculateTotalPrice = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + Number(item.price), 0);
    setTotalPrice(total);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleTransaction = async () => {
    try {
      const response = await axios.post('/orders', { cart });
      alert(`The otp for your order is ${response.data.otp}. The seller has to enter it to sell the items.`);
      
      // Clear cart after successful order
      await axios.post('/clearCart');
      setCart([]);
      setTotalPrice(0);
      toast.success('Order placed successfully! Cart cleared.');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-16 pb-4 px-4 sm:px-6 lg:px-8'>
      <div className="w-full">
        <div className="mb-2 sm:mb-4 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">Shopping Cart</h1>
          <p className="text-sm text-neutral-600">Review your items before checkout</p>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-8 sm:p-16 text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-2">Your cart is empty</h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-4 sm:mb-6">Start shopping to add items to your cart</p>
            <Link to="/search" className="btn-primary inline-block">
              Browse Items
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
              {/* Cart Items */}
              <div className="xl:col-span-2">
                <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-4 sm:mb-6">
                    Items in Cart ({cart.length})
                  </h2>
                  <div className='space-y-4'>
                    {cart.map((cartItem, index) => (
                      <div key={index} className="transition-all duration-200 hover:scale-[1.01]">
                        <CartItem 
                          name={cartItem.name} 
                          id={cartItem.id} 
                          price={cartItem.price} 
                          onRemove={() => handleRemoveFromCart(index)} 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="xl:col-span-1">
                <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-4 sm:p-6 sticky top-20">
                  <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-4 sm:mb-6">Order Summary</h2>
                  
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    <div className="flex justify-between text-sm sm:text-base text-neutral-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-neutral-600">
                      <span>Processing Fee</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-3 sm:pt-4">
                      <div className="flex justify-between text-base sm:text-lg font-semibold text-neutral-800">
                        <span>Total</span>
                        <span>₹{totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleTransaction} 
                    className='btn-primary w-full mb-3 sm:mb-4 relative overflow-hidden group text-sm sm:text-base'
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Proceed to Checkout
                    </span>
                  </button>
                  
                  <Link to="/search" className="btn-secondary w-full text-center text-sm sm:text-base">
                    Continue Shopping
                  </Link>

                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-primary-800">Secure Transaction</p>
                        <p className="text-xs text-primary-600">Your payment information is protected and secure.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;