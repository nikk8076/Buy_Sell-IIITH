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
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleLogin} className="flex flex-col gap-5 p-8 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-[35px] text-Blue">Login Here</h1>
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex flex-col">
            <label className='self-start mb-1' htmlFor="email">Enter email</label>
            <input value={loginDetails.email} onChange={(e) => {setLoginDetails({...loginDetails,email: e.target.value})}} className="signup-input-wide" type="email" name="email" id="email" placeholder="Enter email" />
          </div>
          <div className="flex flex-col">
            <label className='self-start mb-1' htmlFor="password">Enter password</label>
            <input value={loginDetails.password} onChange={(e) => {setLoginDetails({...loginDetails,password: e.target.value})}} className="signup-input-wide" type="password" name="password" id="password" placeholder="Enter password" />
          </div>
          
          {/* reCAPTCHA */}
          <div className="flex flex-col items-center">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"}
              onChange={onRecaptchaChange}
              theme="light"
            />
          </div>
          
          <button type='submit' disabled={!recaptchaValue} className={`self-center py-2 px-4 text-[15px] rounded-lg w-[100px] mt-4 ${
            !recaptchaValue 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-Blue hover:text-white text-Gray'
          }`}>Log In</button>
          <Link to='/signup' className='self-center hover:underline'>Register Here</Link>
        </div>
      </form>
    </div>
  )
}

export default Login