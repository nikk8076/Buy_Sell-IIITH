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
    <div>
        <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg shadow-lg">
            <h1 className="text-[30px] text-Blue">Edit Details</h1>
            <form onSubmit={handleEdit} className="mt-2 flex flex-col gap-2">
            <div className="flex gap-2">
                <div className="flex flex-col">
                <label className='self-start mb-1' htmlFor="firstName">Enter firstname</label>
                <input value={signupDetails.firstName} onChange={(e) => {setSignupDetails({...signupDetails,firstName: e.target.value})}} className="signup-input" type="text" name="firstName" id="firstName" placeholder="Firstname" />
                </div>
                <div className="flex flex-col">
                <label className='self-start mb-1' htmlFor="lastName">Enter lastname</label>
                <input value={signupDetails.lastName} onChange={(e) => {setSignupDetails({...signupDetails,lastName: e.target.value})}} className="signup-input" type="text" name="lastName" id="lastName" placeholder="Lastname" />
                </div>
            </div>
            <div className="flex flex-col">
                <label className='self-start mb-1' htmlFor="email">Enter email</label>
                <input value={signupDetails.email} onChange={(e) => {setSignupDetails({...signupDetails,email: e.target.value})}} className="signup-input-wide" type="email" name="email" id="email" placeholder="Email" />
            </div>
            <div className="flex flex-col">
                <label className='self-start mb-1' htmlFor="contactNumber">Enter phone</label>
                <input value={signupDetails.contactNumber} onChange={(e) => {setSignupDetails({...signupDetails,contactNumber: e.target.value})}} className="signup-input-wide" type="text" name="contactNumber" id="contactNumber" placeholder="Phone number" />
            </div>
            <button type='submit' className="bg-Blue self-center py-2 px-4 text-[15px] rounded-lg w-[100px] text-Gray hover:text-white mt-1">Save</button>
            </form>
        </div>
        </div>
    </div>
  )
}

export default EditDetails