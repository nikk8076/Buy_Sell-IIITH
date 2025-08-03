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
  const [showPassword, setShowPassword] = React.useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex justify-center items-center p-2 sm:p-4">
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-card border border-neutral-200 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-neutral-600">Sign in to your account to continue</p>
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
            <div className="relative">
              <input 
                value={loginDetails.password} 
                onChange={(e) => {setLoginDetails({...loginDetails,password: e.target.value})}} 
                className="signup-input-wide pr-12" 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password" 
                placeholder="Enter your password"
                required 
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2 flex items-center justify-center w-6 h-6 text-neutral-500 hover:text-neutral-700 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* reCAPTCHA */}
          <div className="flex justify-center">
            <div className="transform scale-90 sm:scale-100">
              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
                onChange={onRecaptchaChange}
                theme="light"
              />
            </div>
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
            <p className="text-sm sm:text-base text-neutral-600">
              Don't have an account?{' '}
              <Link to='/signup' className='text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 block sm:inline mt-1 sm:mt-0'>
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