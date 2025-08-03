import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [otp, setOtp] = useState('');

  const getPendingOrders = async () => {
    try {
      const response = await axios.get('/pending');
      setOrders(response.data); // Set the state directly with the response data
      console.log(response.data); // Log the response data
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPendingOrders();
  }, []);

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  const checkOTP = async (buyerId, itemId) => {
    try {
      const response = await axios.post('/transaction', { buyerId, itemId, otp });
      if (response.data.success) {
        toast.success('Transaction successful!');
        setOtp(''); // Clear the OTP input
        getPendingOrders(); // Refresh the orders list
      } else {
        toast.error('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-16 pb-4 px-4 sm:px-6 lg:px-8'>
      <div className="w-full">
        <div className="mb-2 sm:mb-4 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">Pending Orders</h1>
          <p className="text-sm text-neutral-600">Orders waiting for your confirmation</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-card border border-neutral-200 p-8 sm:p-16 text-center">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-neutral-800 mb-2">No pending orders</h2>
            <p className="text-sm sm:text-base text-neutral-600">Orders will appear here when buyers place them</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6'>
            {orders.map((order, index) => (
              <div key={index} className='bg-white rounded-xl shadow-card border border-neutral-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary-500'>
                <div className="flex items-center justify-between mb-4">
                  <h2 className='text-base sm:text-lg font-semibold text-neutral-800'>
                    Order #{index + 1}
                  </h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Pending
                  </span>
                </div>

                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-medium text-neutral-800 mb-2 flex items-center text-sm sm:text-base">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Buyer Information
                  </h3>
                  <p className='text-xs sm:text-sm text-neutral-700 mb-1'>
                    <span className="font-medium">Name:</span> {order.buyerDetails.firstName} {order.buyerDetails.lastName}
                  </p>
                  <p className='text-xs sm:text-sm text-neutral-700 break-all'>
                    <span className="font-medium">Email:</span> {order.buyerDetails.email}
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="border border-neutral-200 rounded-lg p-3 sm:p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-neutral-800 text-sm sm:text-base line-clamp-1">{item.name}</h4>
                        <span className="text-base sm:text-lg font-bold text-primary-600 flex-shrink-0">₹{item.price}</span>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <div>
                          <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1 sm:mb-2">
                            Enter OTP to confirm sale
                          </label>
                          <input
                            type="text"
                            placeholder="6-digit OTP code"
                            className='w-full px-3 py-2 text-sm border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all duration-200'
                            value={otp}
                            onChange={(e) => handleOtpChange(e.target.value)}
                            maxLength="6"
                          />
                        </div>
                        
                        <button
                          onClick={() => checkOTP(order.buyerDetails.id, item.id)}
                          disabled={!otp || otp.length < 6}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm sm:text-base ${
                            otp && otp.length >= 6
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                          }`}
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm Sale
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-xs font-medium text-blue-800">OTP Verification</p>
                      <p className="text-xs text-blue-600">The buyer will provide you with the OTP code to complete the transaction.</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;