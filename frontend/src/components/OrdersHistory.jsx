import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import toast from 'react-hot-toast';

const OrdersHistory = () => {
  const [soldItems, setSoldItems] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [soldOrders, setSoldOrders] = useState([]);
  const [activeCategory, setActiveCategory] = useState('soldItems');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewContent, setReviewContent] = useState('');

  const fetchOrdersHistory = async () => {
    try {
      const response = await axios.get('/ordersHistory');
      setSoldItems(response.data.soldItems);
      setPendingOrders(response.data.pendingOrders);
      setSoldOrders(response.data.soldOrders);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrdersHistory();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReviewContent('');
  };

  const handleReviewSubmit = async () => {
    try {
      await axios.post('/addReview', { content: reviewContent });
      toast.success('Review added successfully!');
      closeModal();
    } catch (error) {
      console.error(error);
      toast.error('Failed to add review.');
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '20px',
      borderRadius: '10px',
      width: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div className='mt-20 flex flex-col gap-5'>
      <h1 className='text-2xl font-bold text-center'>Orders History</h1>
      <div className='flex justify-center gap-5'>
        <button
          className={`bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white ${activeCategory === 'soldItems' ? 'bg-Blue-500 text-white' : 'bg-Gray text-gray-700 hover:text-black'}`}
          onClick={() => setActiveCategory('soldItems')}
        >
          Items Sold
        </button>
        <button
          className={`bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white ${activeCategory === 'pendingOrders' ? 'bg-Blue-500 text-white' : 'bg-Gray text-gray-700 hover:text-black'}`}
          onClick={() => setActiveCategory('pendingOrders')}
        >
          Pending Orders
        </button>
        <button
          className={`bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white ${activeCategory === 'soldOrders' ? 'bg-Blue-500 text-white' : 'bg-Gray text-gray-700 hover:text-black'}`}
          onClick={() => setActiveCategory('soldOrders')}
        >
          Sold Orders
        </button>
      </div>

      {activeCategory === 'soldItems' && (
        <div className='section'>
          <h2 className='text-xl font-semibold'>Items Sold</h2>
          {soldItems.length === 0 ? (
            <p className='text-center text-Black text-2xl mt-5'>No items sold.</p>
          ) : (
            <div className='items flex flex-row gap-10 flex-wrap px-4 py-2'>
              {soldItems.map((item, index) => (
                <div key={index} className='ml-3 flex flex-col shadow-md w-[400px] border border-gray-300 p-3 rounded-lg gap-5'>
                  <div className='flex flex-col gap-2 self-center text-[15px] p-2'>
                    <p><strong>Item: </strong>{item.name}</p>
                    <p><strong>Price: </strong>$ {item.price}</p>
                    <p><strong>Buyer: </strong>{item.buyerName}</p>
                    <button
                      className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-2'
                      onClick={openModal}
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeCategory === 'pendingOrders' && (
        <div className='section'>
          <h2 className='text-xl font-semibold'>Pending Orders</h2>
          {pendingOrders.length === 0 ? (
            <p className='text-center text-Black text-2xl mt-5'>No pending orders.</p>
          ) : (
            <div className='items flex flex-row gap-10 flex-wrap px-4 py-2'>
              {pendingOrders.map((order, index) => (
                <div key={index} className='ml-3 flex flex-col shadow-md w-[400px] border border-gray-300 p-3 rounded-lg gap-5'>
                  <div className='flex flex-col gap-2 self-center text-[15px] p-2'>
                    <p><strong>Item: </strong>{order.itemName}</p>
                    <p><strong>Price: </strong>$ {order.price}</p>
                    <p><strong>Seller: </strong>{order.sellerName}</p>
                    <button
                      className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-2'
                      onClick={openModal}
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeCategory === 'soldOrders' && (
        <div className='section'>
          <h2 className='text-xl font-semibold'>Sold Orders</h2>
          {soldOrders.length === 0 ? (
            <p className='text-center text-Black text-2xl mt-5'>No sold orders.</p>
          ) : (
            <div className='items flex flex-row gap-10 flex-wrap px-4 py-2'>
              {soldOrders.map((order, index) => (
                <div key={index} className='ml-3 flex flex-col shadow-md w-[400px] border border-gray-300 p-3 rounded-lg gap-5'>
                  <div className='flex flex-col gap-2 self-center text-[15px] p-2'>
                    <p><strong>Item: </strong>{order.itemName}</p>
                    <p><strong>Price: </strong>$ {order.price}</p>
                    <p><strong>Seller: </strong>{order.sellerName}</p>
                    <button
                      className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mt-2'
                      onClick={openModal}
                    >
                      Add Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Add Review"
        style={customStyles}
      >
        <h2 className='text-xl font-semibold mb-4'>Add Review</h2>
        <textarea
          className='w-full p-2 border border-gray-300 rounded-lg'
          rows="4"
          value={reviewContent}
          onChange={(e) => setReviewContent(e.target.value)}
        />
        <div className='flex justify-end gap-3 mt-4'>
          <button
            className='bg-Blue py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white'
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className='bg-Blue py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white'
            onClick={handleReviewSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersHistory;