import React, { useContext, useEffect, useRef } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { myContext } from '../../context/myContext'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'
const SignUp = () => {
  const [signupDetails, setSignupDetails] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    contactNumber: '',
  });
  const [recaptchaValue, setRecaptchaValue] = React.useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const { user, loading } = useContext(myContext);
  const navigate = useNavigate();
  const recaptchaRef = useRef(null);
  useEffect(() => {
      if (!loading && user) {
          navigate('/dashboard');
      }
  }, [user, loading, navigate]);
  const handleSignUp = async (e) => {
    e.preventDefault();
    
    if (!recaptchaValue) {
      toast.error('Please complete the reCAPTCHA verification');
      return;
    }
    
    const {firstName, lastName, email, password, age, contactNumber} = signupDetails; 
    try {
      const response = await axios.post('/signup',{
        firstName, lastName, email, password, age, contactNumber, recaptchaToken: recaptchaValue
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
        toast.success('User registered successfully');
        setSignupDetails({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          age: '',
          contactNumber: '',
        });
        navigate('/login');
      }
    } catch (error) {
      toast.error('Registration failed. Please try again.');
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
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">Create Account</h1>
          <p className="text-neutral-600">Join the IIITH Buy-Sell community</p>
        </div>
        
        <form onSubmit={handleSignUp} className="space-y-6">
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
              placeholder="Enter your email address"
              required 
            />
          </div>
          
          <div>
            <label className='form-label' htmlFor="password">Password</label>
            <div className="relative">
              <input 
                value={signupDetails.password} 
                onChange={(e) => {setSignupDetails({...signupDetails,password: e.target.value})}} 
                className="signup-input-wide pr-12" 
                type={showPassword ? "text" : "password"} 
                name="password" 
                id="password" 
                placeholder="Create a strong password"
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className='form-label' htmlFor="age">Age</label>
              <input 
                value={signupDetails.age} 
                onChange={(e) => {setSignupDetails({...signupDetails,age: e.target.value})}} 
                className="signup-input" 
                type="number" 
                name="age" 
                id="age" 
                placeholder="Enter age"
                required 
              />
            </div>
            <div>
              <label className='form-label' htmlFor="contactNumber">Phone Number</label>
              <input 
                value={signupDetails.contactNumber} 
                onChange={(e) => {setSignupDetails({...signupDetails,contactNumber: e.target.value})}} 
                className="signup-input" 
                type="tel" 
                name="contactNumber" 
                id="contactNumber" 
                placeholder="Enter phone number"
                required 
              />
            </div>
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
            Create Account
          </button>
          
          <div className="text-center pt-4 border-t border-neutral-200">
            <p className="text-neutral-600">
              Already have an account?{' '}
              <Link to='/login' className='text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200'>
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp