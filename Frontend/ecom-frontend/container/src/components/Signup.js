import React from 'react'
import { useRef, useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [email , setEmail] = useState('');
    const [name , setName] = useState('');
    const [password , setPassword] = useState('');
    const [phone , setPhone] = useState('');
    const [success, setSuccess] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [errMsg1, setErrMsg1] = useState('');
    const [errMsg2, setErrMsg2] = useState('');
    const [errMsg3, setErrMsg3] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        check(e);

        if (!email || !name || !password || !phone) {
          return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/register",
                ({name:name ,mobileNumber:phone, email:email, password:password })
            );
            localStorage.setItem("TOKEN",response.data[0])
            localStorage.setItem("ID",response.data[1])
            localStorage.setItem("ROLE",response.data[2])
            toast.success("Sign Up Successful")
            goToHome();
            setEmail('');
            setName('');
            setPassword('');
            setPhone('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
              console.log('i am in');
                console.log(err.response.status);
                toast.error("No Server Response")
            } else if (err.response?.status === 400) {
              console.log(err.response.data);
                toast.error("Invalid Input");
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error('SignUp Failed');
            }
        }
    }
    const navigate = useNavigate();

      const goToHome = () => {
        navigate(`/`);
      };
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      const check = (e) => {
        checkemail(e);
        checkname(e);
        checkphone(e);
        Checkpassword(e);
      }
      const checkemail = (e) => {
        setEmail(e.target.value);
        if(!email)
        setErrMsg("Email Is Required");
        else if(regex.test(email) === false)
        setErrMsg("Please Enter A Valid Email");
       else
       {
           setErrMsg("");
           return true;
       }
   } 
   const checkname = (e) => {
    setName(e.target.value);
    if(!name)
    setErrMsg1("Name Is Required");
    else if(name.length<3)
    setErrMsg1("Name has to be atleast of 3 character");
   else
   {
       setErrMsg1("");
       return true;
   }
} 
const checkphone = (e) => {
  setPhone(e.target.value);
  if(!phone)
  setErrMsg2("Phone Is Required");
  else if(phone.length<10)
  setErrMsg2("Phone has to be atleast of 10 character");
 else
 {
     setErrMsg2("");
     return true;
 }
} 
const Checkpassword = (e) => {
  setPassword(e.target.value);
  if(!password)
  setErrMsg3("Password Is Required");
  else if(password.length<8)
  setErrMsg3("Password has to be atlest of 8 character");
 else
 {
     setErrMsg3("");
     return true;
 }
} 
  return (
    <>
    <section>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div >
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                <form class="mx-1 mx-md-4">

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example1c">Your Name</label>
                      <span className='text-danger'>*</span>
                      <input type="text" id="form3Example1c" class="form-control" 
                       onChange={checkname}
                       value={name}
                       required
                       noValidate 

                      />
                      <p className='text-danger' 
                     style={{fontSize:"12px", height:"20px" , marginTop:"0.25rem"}}>{errMsg1}</p>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example3c">Your Email</label>
                      <span className='text-danger'>*</span>
                      <input type="email" id="form3Example3c" class="form-control" 
                       onChange={checkemail}
                       value={email}
                       required
                      />
                          <p className='text-danger' 
              style={{fontSize:"12px", height:"20px" , marginTop:"0.25rem"}}>{errMsg}</p>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4c">Password</label>
                      <span className='text-danger'>*</span>
                      <input type="password" id="form3Example4c" class="form-control" 
                       onChange={Checkpassword}
                       value={password}
                       required
                      />
                             <p className='text-danger' 
              style={{fontSize:"12px", height:"20px" , marginTop:"0.25rem"}}>{errMsg3}</p>
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                      <label class="form-label" for="form3Example4cd">Phone Number</label>
                      <span className='text-danger'>*</span>
                      <input type="phoneNumber" id="form3Example4cd" class="form-control" 
                       onChange={checkphone}
                       value={phone}
                       required
                      />
                      <p className='text-danger' 
              style={{fontSize:"12px", height:"20px" , marginTop:"0.25rem"}}>{errMsg2}</p>
                    </div>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="button" class="btn btn-primary btn-lg" onClick={handleSubmit}
                    style={{backgroundColor:"black"}}
                    >Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://img.freepik.com/free-photo/arrangement-black-friday-shopping-carts-with-copy-space_23-2148667047.jpg?w=1060&t=st=1709625141~exp=1709625741~hmac=f55ba4a4d341de7d938d50782c31d96c23b7ae43abcfd170f9fa8b785a1736a4"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<ToastContainer />
    </>
  )
}

export default Signup