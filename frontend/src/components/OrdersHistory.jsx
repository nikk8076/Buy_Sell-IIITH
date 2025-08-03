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

  return (
    <div className='content-wrapper'>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">Orders History</h1>
          <p className="text-sm text-neutral-600">Track your selling and buying activity</p>
        </div>

        {/* Category Tabs */}
        <div className='flex justify-center mb-4 sm:mb-6'>
          <div className="bg-neutral-100 rounded-lg p-1 flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 w-full sm:w-auto">
            <button
              className={`py-2 px-3 sm:px-6 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                activeCategory === 'soldItems' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
              onClick={() => setActiveCategory('soldItems')}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span className="hidden sm:inline">Items Sold</span>
              <span className="sm:hidden">Sold</span> ({soldItems.length})
            </button>
            <button
              className={`py-2 px-3 sm:px-6 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                activeCategory === 'pendingOrders' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
              onClick={() => setActiveCategory('pendingOrders')}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden sm:inline">Pending Orders</span>
              <span className="sm:hidden">Pending</span> ({pendingOrders.length})
            </button>
            <button
              className={`py-2 px-3 sm:px-6 text-xs sm:text-sm rounded-lg font-medium transition-all duration-200 ${
                activeCategory === 'soldOrders' 
                  ? 'bg-white text-primary-600 shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-800'
              }`}
              onClick={() => setActiveCategory('soldOrders')}
            >
              <svg className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <span className="hidden sm:inline">Sold Orders</span>
              <span className="sm:hidden">Orders</span> ({soldOrders.length})
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="min-h-96">
          {activeCategory === 'soldItems' && (
            <div className='space-y-6'>
              {soldItems.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 mx-auto text-neutral-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-lg font-medium text-neutral-600 mb-2">No items sold yet</h3>
                  <p className="text-neutral-500">Your sold items will appear here</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                  {soldItems.map((item, index) => (
                    <div key={index} className='card hover:shadow-lg transition-all duration-200 border border-neutral-200'>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-neutral-800 mb-1 truncate">{item.name}</h3>
                            <p className="text-xl sm:text-2xl font-bold text-primary-600">${item.price}</p>
                          </div>
                          <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                            Sold
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3 sm:mb-4">
                          <div className="flex items-center text-xs sm:text-sm text-neutral-600">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">Buyer: {item.buyerName}</span>
                          </div>
                        </div>
                        
                        <button
                          className='btn-primary w-full text-xs sm:text-sm py-2'
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
            <div className='space-y-6'>
              {pendingOrders.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 mx-auto text-neutral-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg font-medium text-neutral-600 mb-2">No pending orders</h3>
                  <p className="text-neutral-500">Your pending orders will appear here</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                  {pendingOrders.map((order, index) => (
                    <div key={index} className='card hover:shadow-lg transition-all duration-200 border border-neutral-200'>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-neutral-800 mb-1 truncate">{order.itemName}</h3>
                            <p className="text-xl sm:text-2xl font-bold text-primary-600">${order.price}</p>
                          </div>
                          <div className="px-2 sm:px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                            Pending
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3 sm:mb-4">
                          <div className="flex items-center text-xs sm:text-sm text-neutral-600">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">Seller: {order.sellerName}</span>
                          </div>
                        </div>
                        
                        <button
                          className='btn-primary w-full text-xs sm:text-sm py-2'
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
            <div className='space-y-6'>
              {soldOrders.length === 0 ? (
                <div className="text-center py-16">
                  <svg className="w-16 h-16 mx-auto text-neutral-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <h3 className="text-lg font-medium text-neutral-600 mb-2">No sold orders</h3>
                  <p className="text-neutral-500">Your completed orders will appear here</p>
                </div>
              ) : (
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6'>
                  {soldOrders.map((order, index) => (
                    <div key={index} className='card hover:shadow-lg transition-all duration-200 border border-neutral-200'>
                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between mb-3 sm:mb-4">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg text-neutral-800 mb-1 truncate">{order.itemName}</h3>
                            <p className="text-xl sm:text-2xl font-bold text-primary-600">${order.price}</p>
                          </div>
                          <div className="px-2 sm:px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full whitespace-nowrap ml-2">
                            Completed
                          </div>
                        </div>
                        
                        <div className="space-y-2 mb-3 sm:mb-4">
                          <div className="flex items-center text-xs sm:text-sm text-neutral-600">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="truncate">Seller: {order.sellerName}</span>
                          </div>
                        </div>
                        
                        <button
                          className='btn-primary w-full text-xs sm:text-sm py-2'
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
        </div>

        {/* Review Modal */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Add Review"
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              padding: '0',
              borderRadius: '12px',
              width: '90vw',
              maxWidth: '500px',
              border: 'none',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <h2 className='text-lg sm:text-xl font-semibold text-neutral-800'>Add Review</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-3 sm:mb-4">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Your Review
              </label>
              <textarea
                className='w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors resize-none text-sm sm:text-base'
                rows="4"
                placeholder="Share your experience..."
                value={reviewContent}
                onChange={(e) => setReviewContent(e.target.value)}
              />
            </div>
            
            <div className='flex flex-col sm:flex-row justify-end gap-2 sm:gap-3'>
              <button
                className='btn-secondary text-sm w-full sm:w-auto order-2 sm:order-1'
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className='btn-primary text-sm w-full sm:w-auto order-1 sm:order-2'
                onClick={handleReviewSubmit}
              >
                Submit Review
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OrdersHistory;