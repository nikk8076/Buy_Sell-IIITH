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
        <div className="page-container flex justify-center items-center">
            <div className="form-container">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-neutral-800 mb-2">Edit Profile</h1>
                    <p className="text-neutral-600">Update your account information</p>
                </div>
                
                <form onSubmit={handleEdit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className='form-label' htmlFor="firstName">First Name</label>
                            <input 
                                value={signupDetails.firstName} 
                                onChange={(e) => {setSignupDetails({...signupDetails,firstName: e.target.value})}} 
                                className="signup-input" 
                                type="text" 
                                name="firstName" 
                                id="firstName" 
                                placeholder="Enter first name"
                                required 
                            />
                        </div>
                        <div>
                            <label className='form-label' htmlFor="lastName">Last Name</label>
                            <input 
                                value={signupDetails.lastName} 
                                onChange={(e) => {setSignupDetails({...signupDetails,lastName: e.target.value})}} 
                                className="signup-input" 
                                type="text" 
                                name="lastName" 
                                id="lastName" 
                                placeholder="Enter last name"
                                required 
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className='form-label' htmlFor="email">Email Address</label>
                        <input 
                            value={signupDetails.email} 
                            onChange={(e) => {setSignupDetails({...signupDetails,email: e.target.value})}} 
                            className="signup-input-wide" 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter email address"
                            required 
                        />
                    </div>
                    
                    <div>
                        <label className='form-label' htmlFor="contactNumber">Phone Number</label>
                        <input 
                            value={signupDetails.contactNumber} 
                            onChange={(e) => {setSignupDetails({...signupDetails,contactNumber: e.target.value})}} 
                            className="signup-input-wide" 
                            type="tel" 
                            name="contactNumber" 
                            id="contactNumber" 
                            placeholder="Enter phone number"
                            required 
                        />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button type='submit' className="btn-primary">
                            <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            Save Changes
                        </button>
                        <button 
                            type='button' 
                            onClick={() => navigate('/dashboard')}
                            className="btn-secondary"
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