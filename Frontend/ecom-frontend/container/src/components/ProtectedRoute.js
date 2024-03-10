import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = ({ children , isAdmin}) => {
  const token = localStorage.getItem('TOKEN');

  if (!token) {
    toast.error('Please Login!')
    return <Navigate to="/" replace />; 
  }
  if(isAdmin === true)
  {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (!decodedToken || decodedToken.role !== 'admin') {
      {
        toast.error('User Is Not Authorised For This Activity')
        return <Navigate to="/" replace />; 
      }
    }
  }
  return <Outlet />; 
};

export default ProtectedRoute;