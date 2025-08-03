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
    <div className="content-wrapper">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Add New Item</h1>
          <p className="text-neutral-600">List your item for sale on the marketplace</p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Item Name */}
            <div>
              <label className="form-label" htmlFor="name">
                Item Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={itemDetails.name}
                onChange={handleInputChange}
                className="signup-input-wide"
                placeholder="Enter item name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label className="form-label" htmlFor="price">
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={itemDetails.price}
                onChange={handleInputChange}
                className="signup-input-wide"
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="form-label" htmlFor="category">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={itemDetails.category}
                onChange={handleInputChange}
                className="signup-input-wide"
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
              <label className="form-label" htmlFor="description">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={itemDetails.description}
                onChange={handleInputChange}
                className="signup-input-wide resize-none"
                placeholder="Describe your item..."
                rows="4"
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary flex-1"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex-1"
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
        <div className="mt-8 p-6 bg-neutral-50 rounded-lg">
          <h3 className="font-semibold text-neutral-800 mb-3">Tips for a great listing:</h3>
          <ul className="space-y-2 text-sm text-neutral-600">
            <li className="flex items-start">
              <svg className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Use a clear and descriptive title
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Set a competitive and fair price
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Write a detailed description including condition
            </li>
            <li className="flex items-start">
              <svg className="w-4 h-4 text-primary-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
