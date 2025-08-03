import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Search = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  // console.log(query,"here0");
  const getItems = async () => {
    try {
      const response = await axios.get('/search');
      setItems(response.data);
      setFilteredItems(response.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map(item => item.category))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase().trim();
    setQuery(searchQuery);
    
    const filtered = items.filter(item => {
      const matchesSearch = item.name && item.name.toLowerCase().includes(searchQuery);
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      return matchesSearch && matchesCategory;
    });
    
    setFilteredItems(filtered);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilter = () => {
    const filtered = items.filter(item => {
      const matchesSearch = !query || (item.name && item.name.toLowerCase().includes(query));
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(item.category);
      return matchesSearch && matchesCategory;
    });
    
    setFilteredItems(filtered);
    setShowFilterDropdown(false);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    const filtered = items.filter(item => 
      !query || (item.name && item.name.toLowerCase().includes(query))
    );
    setFilteredItems(filtered);
    setShowFilterDropdown(false);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8'>
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing Items
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Find the perfect items from your IIIT Hyderabad community
          </p>
          
          {/* Enhanced Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input 
                type="text" 
                placeholder='Search for items...' 
                className='w-full pl-10 pr-4 py-4 border-2 border-transparent bg-white rounded-xl shadow-lg text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200'
                value={query}
                onChange={handleSearch}
              />
            </div>
            
            {/* Filter Button */}
            <div className="mt-4 flex justify-center">
              <div className="relative">
                <button 
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 transform hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                  </svg>
                  Filter Categories
                  {selectedCategories.length > 0 && (
                    <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                      {selectedCategories.length}
                    </span>
                  )}
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-6 w-80 z-20">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      Filter by Category
                    </h3>
                    <div className="space-y-3">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-700 font-medium">{category}</span>
                        </label>
                      ))}
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={applyFilter}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                      >
                        Apply Filter
                      </button>
                      <button
                        onClick={clearFilters}
                        className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              {filteredItems.length === 0 ? 'No items found' : 
               filteredItems.length === 1 ? '1 Item Found' : 
               `${filteredItems.length} Items Found`}
            </h2>
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedCategories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {category}
                    <button
                      onClick={() => handleCategoryToggle(category)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <svg className="mx-auto h-24 w-24 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredItems.map((item) => (
              <div key={item._id} className='group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100'>
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {item.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className='p-6'>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-2xl font-bold text-green-600">
                      <span className="text-lg text-gray-500 mr-1">₹</span>
                      {item.price}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                    {item.description || "No description available"}
                  </p>
                  
                  <Link 
                    className='w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg'
                    state={{
                      name: item.name,
                      price: item.price,
                      description: item.description,
                      category: item.category,
                      seller_id: item.seller_id,
                    }} 
                    to={`/items/${item._id}`}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;