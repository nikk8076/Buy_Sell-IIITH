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
  return (
    <div className='navbar'>
      <div className='nav-items'>
        <NavLink to='/dashboard' className='nav-link'>Home</NavLink>
        <NavLink to='/search' className='nav-link'>Search</NavLink>
        <NavLink to='/orders' className='nav-link'>Orders</NavLink>
        <NavLink to='/cart' className='nav-link'>Cart</NavLink>
        <NavLink to='/history' className='nav-link'>History</NavLink>
        <NavLink to='/chatbot' className='nav-link'>ChatBot</NavLink>
      </div>
      <button className='logout-button' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default NavBar;