import React from 'react'
import { useContext } from 'react'
import { myContext } from '../../context/myContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../assets/profile.jpg'
const Dashboard = () => {
    const { user, loading } = useContext(myContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!loading) {
            if (!user) {
                console.log("User is null, navigating to login");
                navigate('/login');
            }
        }
    }, [user, loading, navigate]);
    
    return (
        <div className="content-wrapper">
            <div className="max-w-4xl mx-auto">
                <div className="card">
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Profile Image Section */}
                        <div className="flex-shrink-0 text-center">
                            <div className="relative inline-block">
                                <img 
                                    src={profile} 
                                    alt="Profile" 
                                    className='w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-primary-100 shadow-lg' 
                                />
                                <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>
                        </div>
                        
                        {/* User Details Section */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-neutral-800 mb-2">
                                    Welcome back, {user ? user.firstName : 'User'}!
                                </h1>
                                <p className="text-neutral-600">Manage your profile and account settings</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800">
                                            {user ? user.firstName : 'Loading...'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800">
                                            {user ? user.lastName : 'Loading...'}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800">
                                            {user ? user.email : 'Loading...'}
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-neutral-700 mb-1">Contact Number</label>
                                        <div className="bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-800">
                                            {user ? user.contactNumber : 'Loading...'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-3 pt-4">
                                <Link 
                                    to='/edit' 
                                    className='btn-primary flex items-center justify-center'
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </Link>
                                
                                <Link 
                                    to='/add-item' 
                                    className='btn-primary flex items-center justify-center'
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                    Add Item
                                </Link>
                                
                                <Link 
                                    to='/search' 
                                    className='btn-secondary flex items-center justify-center'
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    Browse Items
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Quick Actions Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <Link to="/orders" className="card hover:shadow-lg transition-shadow duration-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-800 mb-2">My Orders</h3>
                            <p className="text-sm text-neutral-600">Track your current orders</p>
                        </div>
                    </Link>
                    
                    <Link to="/cart" className="card hover:shadow-lg transition-shadow duration-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-800 mb-2">Shopping Cart</h3>
                            <p className="text-sm text-neutral-600">View items in your cart</p>
                        </div>
                    </Link>
                    
                    <Link to="/history" className="card hover:shadow-lg transition-shadow duration-200">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-semibold text-neutral-800 mb-2">Order History</h3>
                            <p className="text-sm text-neutral-600">View past transactions</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard