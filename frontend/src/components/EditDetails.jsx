import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { myContext } from '../../context/myContext';
const EditDetails = () => {
    const { user, setUser, loading } = useContext(myContext);
    const [signupDetails, setSignupDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
    });
    const oldEmail = user.email;
    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            setSignupDetails({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                contactNumber: user.contactNumber,
            });
        }
    }, [user]);

    if (loading) {
        return <div>Loading...</div>;
    } 
    const handleEdit = async (e) => {
        e.preventDefault();
        try {
            const {firstName, lastName, email, contactNumber} = signupDetails;
            const response = await axios.post('/edit', {oldEmail, email, firstName, lastName, contactNumber});
            console.log("changed details");
            if(response.data.error)
            {
                toast.error(response.data.error);
                navigate('/login');
            }
            toast.success('Details changed successfully');
            navigate('/dashboard');
        } catch (error) {
            
        }
    };
    return (
        <div className="page-container flex justify-center items-center px-2 sm:px-4 lg:px-6">
            <div className="form-container w-full max-w-sm sm:max-w-lg lg:max-w-xl">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">Edit Profile</h1>
                    <p className="text-sm sm:text-base text-neutral-600">Update your account information</p>
                </div>
                
                <form onSubmit={handleEdit} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div>
                            <label className='form-label text-sm sm:text-base' htmlFor="firstName">First Name</label>
                            <input 
                                value={signupDetails.firstName} 
                                onChange={(e) => {setSignupDetails({...signupDetails,firstName: e.target.value})}} 
                                className="signup-input text-sm sm:text-base" 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                placeholder="Enter first name"
                                required 
                            />
                        </div>
                        <div>
                            <label className='form-label text-sm sm:text-base' htmlFor="lastName">Last Name</label>
                            <input 
                                value={signupDetails.lastName} 
                                onChange={(e) => {setSignupDetails({...signupDetails,lastName: e.target.value})}} 
                                className="signup-input text-sm sm:text-base" 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                placeholder="Enter last name"
                                required 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className='form-label text-sm sm:text-base' htmlFor="email">Email Address</label>
                        <input 
                            value={signupDetails.email} 
                            onChange={(e) => {setSignupDetails({...signupDetails,email: e.target.value})}} 
                            className="signup-input-wide text-sm sm:text-base" 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter email address"
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className='form-label text-sm sm:text-base' htmlFor="contactNumber">Phone Number</label>
                        <input 
                            value={signupDetails.contactNumber} 
                            onChange={(e) => {setSignupDetails({...signupDetails,contactNumber: e.target.value})}} 
                            className="signup-input-wide text-sm sm:text-base" 
                            type="tel" 
                            name="contactNumber" 
                            id="contactNumber" 
                            placeholder="Enter phone number"
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-3 sm:pt-4">
                        <button type='submit' className="btn-primary text-sm sm:text-base w-full sm:w-auto order-1">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                        <button 
                            type='button' 
                            onClick={() => navigate('/dashboard')}
                            className="btn-secondary text-sm sm:text-base w-full sm:w-auto order-2"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDetails