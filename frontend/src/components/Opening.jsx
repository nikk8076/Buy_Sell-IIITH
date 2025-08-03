import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { myContext } from '../../context/myContext'
import { useEffect } from 'react'

const Opening = () => {
  const { user, loading } = useContext(myContext);
  const navigate = useNavigate();
  
  useEffect(() => {
      if (!loading) {
          if (user) {
              navigate('/dashboard');
          } else {
              navigate('/login');
          }
      }
  }, [user, loading, navigate]);

  return (
    <div className="page-container flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-neutral-800 mb-4 leading-tight">
            Welcome to 
            <span className="text-primary-600 block mt-2">IIITH Buy-Sell</span>
          </h1>
          <p className="text-lg text-neutral-600 max-w-lg mx-auto">
            A secure and reliable marketplace for the IIITH community to buy and sell items with ease.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            to='/signup' 
            className="btn-primary w-full sm:w-auto min-w-[140px] text-center"
          >
            Get Started
          </Link>
          <Link 
            to='/login' 
            className="btn-secondary w-full sm:w-auto min-w-[140px] text-center"
          >
            Sign In
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-1">Secure</h3>
            <p className="text-sm text-neutral-600">Protected transactions with verified users</p>
          </div>
          
          <div className="p-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-1">Fast</h3>
            <p className="text-sm text-neutral-600">Quick and efficient buying and selling</p>
          </div>
          
          <div className="p-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-neutral-800 mb-1">Community</h3>
            <p className="text-sm text-neutral-600">Exclusively for IIITH students and faculty</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Opening