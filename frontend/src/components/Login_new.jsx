import React, { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { myContext } from '../../context/myContext';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const Login = () => {
  const [loginDetails, setLoginDetails] = React.useState({
    email: '',
    password: '',
  })
  const [recaptchaValue, setRecaptchaValue] = React.useState(null);
  const { user, setUser, loading } = useContext(myContext);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  
  useEffect(() => {
      if (!loading && user) {
           navigate('/dashboard');
      }
  }, [user, loading, navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }
    
    try {
      const {email, password} = loginDetails;
      const response = await axios.post('/login',{
        email, password, recaptchaToken: recaptchaValue
      });
      if(response.data.error)
      {
        toast.error(response.data.error);
        // Reset reCAPTCHA on error
        setRecaptchaValue(null);
        if (recaptchaRef.current) {
          recaptchaRef.current.reset(); 
        }
      }
      else
      {
        toast.success('User logged in successfully');
        setLoginDetails({
            email: '',
            password: '',
        });
        setUser(response.data);
        console.log("User logged in:", response.data);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Login failed. Please try again.');
      // Reset reCAPTCHA on error
      setRecaptchaValue(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    }
  };

  const onRecaptchaChange = (value) => {
    setRecaptchaValue(value);
  };
  
  return (
    <div className="page-container flex justify-center items-center">
      <div className="form-container">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Welcome Back</h1>
          <p className="text-neutral-600">Sign in to your account to continue</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="form-label" htmlFor="email">Email Address</label>
            <input 
              value={loginDetails.email} 
              onChange={(e) => {setLoginDetails({...loginDetails,email: e.target.value})}} 
              className="signup-input-wide" 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter your email address"
              required 
            />
          </div>
          
          <div>
            <label className="form-label" htmlFor="password">Password</label>
            <input 
              value={loginDetails.password} 
              onChange={(e) => {setLoginDetails({...loginDetails,password: e.target.value})}} 
              className="signup-input-wide" 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Enter your password"
              required 
            />
          </div>
          
          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={onRecaptchaChange}
              theme="light"
            />
          </div>
          
          <button 
            type='submit' 
            disabled={!recaptchaValue} 
            className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
              !recaptchaValue 
                ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed' 
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-sm hover:shadow-md focus:ring-2 focus:ring-primary-200 focus:outline-none'
            }`}
          >
            Sign In
          </button>
          
          <div className="text-center pt-4 border-t border-neutral-200">
            <p className="text-neutral-600">
              Don't have an account?{' '}
              <Link to='/signup' className='text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200'>
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
