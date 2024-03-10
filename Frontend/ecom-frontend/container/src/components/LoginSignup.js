import '../styles/LoginSignup.css';
import { useRef, useState, useEffect, useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const userRef = useRef();
    const errRef = useRef();

    const [user, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [errMsg1, setErrMsg1] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        check(e);

        if (!pwd || !user) {
          return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user/login",
                ({ email:user, password:pwd })
            );
            console.log(response);
            localStorage.setItem("TOKEN",response.data[0])
            localStorage.setItem("ID",response.data[1])
            localStorage.setItem("ROLE",response.data[2])
            toast.success("Loged In");
            goToHome()
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                // toast.error("No Server Response")
            } else if (err.response?.status === 400) {
                toast.error('Invalid Credentials');
            } else if (err.response?.status === 401) {
                toast.error('Unauthorized');
            } else {
                toast.error('Login Failed');
            }
        }
    }
    
    const navigate = useNavigate();

    const goToRegister = () => {
        navigate(`/signup`);
      };

      const goToHome = () => {
        navigate(`/`);
      };

      const check = (e) => {
        console.log(e);
         checkemail(e);
          Checkpassword(e);
      }

      
      const checkemail = (e) => {
        setEmail(e.target.value);
        if(!user)
        setErrMsg("Email Is Required");
        else if(regex.test(user) === false)
        setErrMsg("Please Enter A Valid Email");
       else
       {
           setErrMsg("");
           return true;
       }
   } 
   const Checkpassword = (e) => {
     setPwd(e.target.value);
     if(!pwd)
     setErrMsg1("Password Is Required");
     else if(pwd.length<8)
     setErrMsg1("Password has to be atleast of 8 character");
    else
    {
        setErrMsg1("");
        return true;
    }
 }   

  return (<>
    {success ? (
        <section>
          {goToHome()}
        </section>
    ) :(
    <section class="vh-100">
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src="https://img.freepik.com/free-photo/shopping-trolley-with-little-snooze_23-2147957113.jpg?size=626&ext=jpg&ga=GA1.1.991121226.1709206100&semt=ais"
          class="img-fluid" alt="Sample image"/>
      </div>
      

      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form>
          <div class="form-outline">
            <label class="form-label" for="form3Example3">Email address</label>
            <span className='text-danger'>*</span>
            <input type="email" id="form3Example3" class="form-control form-control-lg"
              placeholder="Enter a valid email address" 
              ref={userRef}
              onChange={checkemail}
              value={user}
              required
              style={{fontSize:"14px"}}
              />
              <p className='text-danger' 
              style={{fontSize:"12px" , height:"20px" , marginTop:"0.25rem"}}>{errMsg}</p>
          </div>

          
          <div class="form-outline mb-3">
            <label class="form-label" for="form3Example4">Password</label>
            <span className='text-danger'>*</span>
            <input type="password" id="form3Example4" class="form-control form-control-lg"
              placeholder="Enter password" 
              onChange={Checkpassword}
              value={pwd}
              required
              style={{fontSize:"14px"}}
              />
               <p className='text-danger' 
              style={{fontSize:"12px" , height:"20px" , marginTop:"0.25rem"}}>{errMsg1}</p>
          </div>

          <div class="d-flex justify-content-between align-items-center">
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="button" class="btn btn-primary btn-lg"
              style={{paddingLeft: "2.5rem" , paddingRight: "2.5rem" , backgroundColor:"black"}}
              onClick={handleSubmit}
              >Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a
                class="link-danger" onClick={goToRegister}>Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
</section>)}
<ToastContainer />
</>
  );
}

export default LoginSignup