import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../../features/auth/authSlice';
import { SignInForm } from '../ui/reusableComponents';

const SignIn = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    } else {
      setLoading(false); // Only show the sign-in form if not authenticated
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <div className='w-full h-full flex items-center justify-center gap-10'>
        <div className='flex flex-col items-start w-[32rem] gap-3'>
            <h1 className='text-one-dose text-5xl font-bold'>The Rick and Morty</h1>
            <p className='text-2xl font-semibold text-white'> The Rick and Morty is a platform where you can add your favorite characters and episodes.</p>
        </div>
        <SignInForm />
    </div>
  );
};

export default SignIn;
