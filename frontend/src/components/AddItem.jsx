import React, { useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../context/myContext';

const AddItem = () => {
  const [itemDetails, setItemDetails] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(myContext);
  const navigate = useNavigate();

  const categories = [
    'Electronics',
    'Books',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Music & Movies',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to add items');
      navigate('/login');
      return;
    }

    console.log('User object:', user);
    console.log('Item details:', itemDetails);

    setIsLoading(true);

    try {
      const dataToSend = {
        ...itemDetails
      };
      
      console.log('Data being sent:', dataToSend);

      const response = await axios.post('/addItem', dataToSend);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Item added successfully!');
        setItemDetails({
          name: '',
          price: '',
          description: '',
          category: '',
        });
        // Optionally navigate to search page to see the item
        navigate('/search');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-16 pb-4 px-4 sm:px-6 lg:px-8">
      <div className="w-full">
        <div className="mb-2 sm:mb-4 text-center sm:text-left">
          <h1 className="text-xl sm:text-2xl font-bold text-neutral-800 mb-2">Add New Item</h1>
          <p className="text-sm text-neutral-600">List your item for sale on the marketplace</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-card border border-neutral-200">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="name">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={itemDetails.name}
                onChange={handleInputChange}
                className="w-full text-neutral-800 border border-neutral-300 mb-4 h-11 text-sm py-3 px-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg transition-all duration-200 bg-white shadow-sm hover:border-neutral-400"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="price">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={itemDetails.price}
                onChange={handleInputChange}
                className="w-full text-neutral-800 border border-neutral-300 mb-4 h-11 text-sm py-3 px-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg transition-all duration-200 bg-white shadow-sm hover:border-neutral-400"
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={itemDetails.category}
                onChange={handleInputChange}
                className="w-full text-neutral-800 border border-neutral-300 mb-4 h-11 text-sm py-3 px-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg transition-all duration-200 bg-white shadow-sm hover:border-neutral-400"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={itemDetails.description}
                onChange={handleInputChange}
                className="w-full text-neutral-800 border border-neutral-300 mb-4 text-sm py-3 px-4 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-lg transition-all duration-200 bg-white shadow-sm hover:border-neutral-400 resize-none"
                placeholder="Describe your item..."
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary flex-1 order-2 sm:order-1"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1 order-1 sm:order-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Item...
                  </div>
                ) : (
                  'Add Item'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-white rounded-xl shadow-card border border-neutral-200">
          <h3 className="font-semibold text-neutral-800 mb-3 text-sm sm:text-base">Tips for a great listing:</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-neutral-600">
            <li className="flex items-start">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Use a clear and descriptive title
            </li>
            <li className="flex items-start">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Set a competitive and fair price
            </li>
            <li className="flex items-start">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Write a detailed description including condition
            </li>
            <li className="flex items-start">
              <svg className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Choose the most relevant category
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
