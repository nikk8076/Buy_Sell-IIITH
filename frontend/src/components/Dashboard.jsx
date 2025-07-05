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
        <>
            <div className='flex flex-col'>
                <div className="details flex flex-col mb-3">
                    <div className="image py-3 flex justify-center">
                        <img src={profile} alt="image" className='w-[300px] rounded-[50%] bg-auto' />
                    </div>
                    <div className="first-name">
                        <p className='text-[17px]'><span className='text-Blue font-semibold'>First Name</span>: {user ? user.firstName : 'Loading...'}</p>
                    </div>
                    <div className="last-name">
                        <p className='text-[17px]'><span className='text-Blue font-semibold'>Last Name</span>: {user ? user.lastName : 'Loading...'}</p>
                    </div>
                    <div className="email">
                        <p className='text-[17px]'><span className='text-Blue font-semibold'>Email</span>: {user ? user.email : 'Loading...'}</p>
                    </div>
                    <div className="contact-number">
                        <p className='text-[17px]'><span className='text-Blue font-semibold'>Contact</span>: {user ? user.contactNumber : 'Loading...'}</p>
                    </div>
                </div>
                <Link to='/edit' className='bg-Blue self-center py-2 px-4 text-[15px] rounded-lg text-Gray hover:text-white'>Edit</Link>
            </div>
        </>
    )
}

export default Dashboard