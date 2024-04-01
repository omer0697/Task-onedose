// src/routes/ProtectedRoute.js

import React, {useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated, checkAuthentication } from '../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import Navbar from '../components/ui/Navbar/Navbar';

const ProtectedRoute = ({ component: Component }) => {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        dispatch(checkAuthentication());
    }
    , [dispatch]);

    console.log(isAuthenticated);
    
  if (isAuthenticated) {
    return (
        <>
            <Navbar >
              <Component />
            </Navbar>
        </>
    );
  } else {
    return <Navigate to="/login" />;
  }
}

export default ProtectedRoute;