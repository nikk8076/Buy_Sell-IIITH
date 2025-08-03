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
    <div className='content-wrapper'>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Pending Orders</h1>
          <p className="text-neutral-600">Orders waiting for your confirmation</p>
        </div>

        {orders.length === 0 ? (
          <div className="card text-center py-16">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">No pending orders</h2>
            <p className="text-neutral-600">Orders will appear here when buyers place them</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
            {orders.map((order, index) => (
              <div key={index} className='card hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary-500'>
                <div className="flex items-center justify-between mb-4">
                  <h2 className='text-lg font-semibold text-neutral-800'>
                    Order #{index + 1}
                  </h2>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Pending
                  </span>
                </div>

                <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                  <h3 className="font-medium text-neutral-800 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Buyer Information
                  </h3>
                  <p className='text-sm text-neutral-700 mb-1'>
                    <span className="font-medium">Name:</span> {order.buyerDetails.firstName} {order.buyerDetails.lastName}
                  </p>
                  <p className='text-sm text-neutral-700'>
                    <span className="font-medium">Email:</span> {order.buyerDetails.email}
                  </p>
                </div>

                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="border border-neutral-200 rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-neutral-800">{item.name}</h4>
                        <span className="text-lg font-bold text-primary-600">${item.price}</span>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Enter OTP to confirm sale
                          </label>
                          <input
                            type="text"
                            placeholder="6-digit OTP code"
                            className='w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none transition-all duration-200'
                            value={otp}
                            onChange={(e) => handleOtpChange(e.target.value)}
                            maxLength="6"
                          />
                        </div>
                        
                        <button
                          onClick={() => checkOTP(order.buyerDetails.id, item.id)}
                          disabled={!otp || otp.length < 6}
                          className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                            otp && otp.length >= 6
                              ? 'bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md'
                              : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                          }`}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Confirm Sale
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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