import React from 'react'
import { useNavigate } from 'react-router-dom';
import  { useState , useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const DropdownUser = ({setProfile}) => {
  const [loggedin , setLoggedin] = useState(false);
 

    const navigate = useNavigate();

    const goToCart = () => {
      setProfile(false);
      navigate(`/cart`);
    };
    const goToHome = () => {
      setProfile(false);
      navigate(`/`);
    };

    const goToLogin = () => {
        setProfile(false);
        navigate(`/login`);
      };
      const goToUserDetail = () => {
        navigate(`/user`);
        setProfile(false);
      };
      const goToLogout = () => {
        localStorage.clear();
        toast.success("Successfully Loged Out")
        goToHome();
        setLoggedin(false);
        setProfile(false);
      }
      const Loggedin = () =>{
        if(!localStorage.getItem("TOKEN"))
        setLoggedin(false);
        else
        setLoggedin(true);
      }
      useEffect(() => {
    
        Loggedin();
      }, [loggedin]);
  return (

    <div className='flex flex-col dropDownProfile'>


    {/* <div className='flex flex-col gap-4' style={{border:"1px solid black"}}> */}
    {loggedin?<div onClick={()=>{goToUserDetail()}} className='toggle'>Account</div>:<div onClick={()=>{goToLogin()}} className='toggle'>Login</div>}
    {loggedin?<div onClick={()=>{goToLogout()}} className='toggle'>Logout</div>:<></>}
    {loggedin?<div onClick={()=>{goToCart()}} className='toggle'>Cart</div>:<></>}
    {/* </div> */}
    <ToastContainer />

    </div>
  )
}

export default DropdownUser