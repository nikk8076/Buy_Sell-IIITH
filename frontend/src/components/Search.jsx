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
    <div className='mx-2 flex flex-col'>
      <div className="flex justify-center items-center gap-4 mt-16">
        <input 
          type="text" 
          placeholder='Search' 
          className='w-[300px] px-2 text-[15px] py-2 border border-black'
          value={query}
          onChange={handleSearch}
        />
        <div className="relative">
          <button 
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            className="bg-Blue py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white"
          >
            Filter {selectedCategories.length > 0 && `(${selectedCategories.length})`}
          </button>
          
          {showFilterDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-Gray rounded-lg shadow-lg p-4 w-[250px] z-10">
              <h3 className="text-[16px] font-semibold mb-3 text-Blue">Filter by Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="w-4 h-4 text-Blue border-Gray rounded focus:ring-Blue"
                    />
                    <span className="text-[14px]">{category}</span>
                  </label>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={applyFilter}
                  className="bg-Blue py-2 px-3 text-[14px] rounded-lg text-Gray hover:text-white flex-1"
                >
                  Apply Filter
                </button>
                <button
                  onClick={clearFilters}
                  className="bg-Red py-2 px-3 text-[14px] rounded-lg text-Gray hover:text-white flex-1"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="items flex flex-row gap-10 flex-wrap my-5">
        {filteredItems.map((item) => (
          <div key={item._id} className='ml-3 flex flex-col shadow-md w-[400px] border border-Gray p-3 rounded-lg gap-5'>
            <div className='flex flex-col gap-2 self-center text-[15px] p-2'>
              <img src="" alt="image" className='mb-10 self-center' />
              <p><strong>Name: </strong>{item.name}</p>
              <p><strong>Price: </strong>$ {item.price}</p>
              <p><strong>Category: </strong>{item.category}</p>
            </div>
            <Link 
              className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white mb-5'
              state={{
                name: item.name,
                price: item.price,
                description: item.description,
                category: item.category,
                seller_id: item.seller_id,
              }} 
              to={`/items/${item._id}`}
            >
              View Item
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;