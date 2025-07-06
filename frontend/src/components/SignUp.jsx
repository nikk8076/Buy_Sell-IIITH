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
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-3 p-4 border border-gray-300 rounded-lg shadow-lg">
        <h1 className="text-[30px] text-Blue">Register Here</h1>
        <form onSubmit={handleSignUp} className="mt-2 flex flex-col gap-2">
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
            <label className='self-start mb-1' htmlFor="password">Enter password</label>
            <input value={signupDetails.password} onChange={(e) => {setSignupDetails({...signupDetails,password: e.target.value})}} className="signup-input-wide" type="password" name="password" id="password" placeholder="Password" />
          </div>
          <div className="flex flex-col">
            <label className='self-start mb-1' htmlFor="age">Enter age</label>
            <input value={signupDetails.age} onChange={(e) => {setSignupDetails({...signupDetails,age: e.target.value})}} className="signup-input-wide" type="text" name="age" id="age" placeholder="Age" />
          </div>
          <div className="flex flex-col">
            <label className='self-start mb-1' htmlFor="contactNumber">Enter phone</label>
            <input value={signupDetails.contactNumber} onChange={(e) => {setSignupDetails({...signupDetails,contactNumber: e.target.value})}} className="signup-input-wide" type="text" name="contactNumber" id="contactNumber" placeholder="Phone number" />
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
          
          <button type='submit' disabled={!recaptchaValue} className={`self-center py-2 px-4 text-[15px] rounded-lg w-[100px] mt-1 ${
            !recaptchaValue 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-Blue hover:text-white text-Gray'
          }`}>Sign Up</button>
          <Link to='/login' className='self-center hover:underline'>Already have an account?</Link>
        </form>
      </div>
    </div>
  )
}

export default SignUp