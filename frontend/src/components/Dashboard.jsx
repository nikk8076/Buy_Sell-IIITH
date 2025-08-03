import React from 'react'
import { useContext } from 'react'
import { myContext } from '../../context/myContext'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 pt-20 pb-4 px-4 sm:px-6 lg:px-8">
            {/* Welcome Section */}
            <div className="mb-4 sm:mb-6">
                <div className="text-center">
                    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-800 mb-2">
                        Welcome to BuySelliITH
                    </h1>
                    <p className="text-sm sm:text-base text-neutral-600">Your marketplace for IIIT Hyderabad community</p>
                </div>
                
                {/* Quick Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mt-4 sm:mt-6">
                    <Link 
                        to='/add-item' 
                        className='btn-primary flex items-center justify-center text-sm px-4 py-2'
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Item
                    </Link>
                    
                    <Link 
                        to='/edit' 
                        className='btn-primary flex items-center justify-center text-sm px-4 py-2'
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Profile
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Dashboard