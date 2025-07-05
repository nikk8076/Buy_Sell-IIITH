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
    <div className='mt-20 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold text-center'>Pending Orders</h1>
      <div className='orders flex flex-row gap-10 flex-wrap px-4 py-2'>
        {orders.map((order, index) => (
          <div key={index} className='shadow-lg text-[15px] gap-3 px-4 py-3 border-[1px] border-Gray rounded-lg flex flex-col'>
            <h2 className='text-xl font-semibold'>Buyer: {order.buyerDetails.firstName} {order.buyerDetails.lastName}</h2>
            <p className='text-gray-600'>Email: {order.buyerDetails.email}</p>
            {order.items.map((item, idx) => (
              <div key={idx}>
                <p className='text-gray-600'>Item: {item.name}</p>
                <p className='text-gray-600'>Price: $ {item.price}</p>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  className='mt-2 w-full px-2 text-[15px] py-2 border border-black'
                  value={otp}
                  onChange={(e) => handleOtpChange(e.target.value)}
                />
                <button
                  onClick={() => checkOTP(order.buyerDetails.id, item.id)}
                  className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-2'
                >
                  Submit OTP
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;