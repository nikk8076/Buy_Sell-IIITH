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
    <>
        <h1 className="text-4xl text-Blue">Welcome to Buy-Sell website of IIITH</h1>
        <div className="mt-10 flex gap-7 items-center justify-center">
        <Link to='/signup' className="bg-Blue py-3 px-3 text-[15px] rounded-lg text-Gray">Sign Up</Link>
        <Link to='/login' className="bg-Blue py-3 px-3 text-[15px] rounded-lg text-Gray">Log In</Link>
        </div>
    </>
  )
}

export default Opening