import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { myContext } from '../../context/myContext';
import { useContext } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const NavBar = () => {
  const { user, setUser, loading, setLoading } = useContext(myContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = async () => {
    const response = await axios.get('/logout');
    if (response.data === 'success') {
      setUser(null);
      toast.success('Logout successful');
      navigate('/');
    } else {
      toast.error('Logout failed');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav className='w-full fixed top-0 left-0 bg-white border-b border-neutral-200 text-neutral-700 z-50 backdrop-blur-sm'>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <NavLink to='/dashboard' className="text-xl font-bold text-primary-600 hover:text-primary-700 transition-colors">
              BuySelliITH
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className='flex space-x-4 xl:space-x-8'>
              <NavLink to='/dashboard' className='nav-link group'>
                <svg className="w-4 h-4 inline mr-1 xl:mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="hidden xl:inline">Home</span>
                <span className="xl:hidden">Home</span>
              </NavLink>
              <NavLink to='/search' className='nav-link group'>
                <svg className="w-4 h-4 inline mr-1 xl:mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </NavLink>
              <NavLink to='/orders' className='nav-link group'>
                <svg className="w-4 h-4 inline mr-1 xl:mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Orders
              </NavLink>
              <NavLink to='/cart' className='nav-link group'>
                <svg className="w-4 h-4 inline mr-1 xl:mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Cart
              </NavLink>
              <NavLink to='/history' className='nav-link group'>
                <svg className="w-4 h-4 inline mr-1 xl:mr-2 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </NavLink>
            </div>
          </div>

          {/* Desktop Logout Button */}
          <div className="hidden lg:block">
            <button className='logout-button' onClick={handleLogout}>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-neutral-600 hover:text-primary-600 p-2 rounded-md hover:bg-neutral-100 transition-colors"
              aria-label="Open menu"
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-neutral-200">
              <NavLink 
                to='/dashboard' 
                className='block px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors'
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </NavLink>
              <NavLink 
                to='/search' 
                className='block px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors'
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </NavLink>
              <NavLink 
                to='/orders' 
                className='block px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors'
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Orders
              </NavLink>
              <NavLink 
                to='/cart' 
                className='block px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors'
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </svg>
                Cart
              </NavLink>
              <NavLink 
                to='/history' 
                className='block px-3 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors'
                onClick={closeMobileMenu}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                History
              </NavLink>
              <button 
                className='w-full text-left px-3 py-2 text-accent-600 hover:text-accent-700 hover:bg-accent-50 rounded-md transition-colors flex items-center'
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
              >
                <svg className="w-4 h-4 inline mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;