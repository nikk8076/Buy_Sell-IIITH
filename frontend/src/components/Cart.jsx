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
    <div className='content-wrapper'>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Shopping Cart</h1>
          <p className="text-neutral-600">Review your items before checkout</p>
        </div>

        {cart.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">Your cart is empty</h2>
            <p className="text-neutral-600 mb-6">Start shopping to add items to your cart</p>
            <Link to="/search" className="btn-primary inline-block">
              Browse Items
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="card">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-6">Items in Cart ({cart.length})</h2>
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
              <div className="lg:col-span-1">
                <div className="card sticky top-24">
                  <h2 className="text-xl font-semibold text-neutral-800 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-neutral-600">
                      <span>Subtotal ({cart.length} items)</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Processing Fee</span>
                      <span>Free</span>
                    </div>
                    <div className="border-t border-neutral-200 pt-4">
                      <div className="flex justify-between text-lg font-semibold text-neutral-800">
                        <span>Total</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleTransaction} 
                    className='btn-primary w-full mb-4 relative overflow-hidden group'
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      Proceed to Checkout
                    </span>
                  </button>
                  
                  <Link to="/search" className="btn-secondary w-full text-center">
                    Continue Shopping
                  </Link>

                  <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-primary-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-primary-800">Secure Transaction</p>
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