import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/user.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from './ErrorComponent';

const User = () => {
  const [singleUser, setSingleUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
  });
  const [error, setError] = useState(null);
  const [triggerFetch, setTriggerFetch] = useState(0);

  const fetchSingleUser = async () => {
    try {
      const id = localStorage.getItem('ID');
      const response = await axios.get(`http://localhost:8080/user/${id}`);
      setSingleUser(response.data);
      setFormData({ ...response.data });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
      if (!error.response) { 
        setError("maintenance"); 
      } else if (error.response.status !== 500) { 
        setError(error.response.status); 
      } else {
        setError(true); 
      }
    }
  };

  const updateUser = async () => {
    try {
      const id = localStorage.getItem('ID');
      const { name, email, mobileNumber } = formData;

      const response = await axios.put(`http://localhost:8080/user/${id}`, {
        name,
        email,
        mobileNumber,
      });

      setSingleUser(response.data);
      setFormData({ ...response.data }); 
      setEditMode(false);
      toast.success('Profile Updated Successfullt');
      setTriggerFetch((current) => !current);
    }
    catch (error) {
      console.error('Error updating user:', error);
      if (error.response && error.response.status === 500) {
        toast.error('Email already exists. Please choose a different email.');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    fetchSingleUser();
  }, [triggerFetch]);

  const navigate = useNavigate();

    const goToDashboard = () => {
        navigate(`/dashboard`);
      };

    
  return (error ? (
    <ErrorComponent message={ 
      error === "maintenance" ? "Site Under Maintenance" : 
        error === true ? "Internal Server Error" : 
          `Error: ${error}` 
    } />
  ) :
    <>
    <div className="my-3 mt-5" style={{ borderRadius: '.5rem' , height:"100vh" , display:"flex" , justifyContent:"center"}}>
            <div className="row g-0" style={{width:"1000px" , display:"flex"}}>
              <div
                className="col-md-4 gradient-custom text-center text-black"
                style={{ borderRadius: '.5rem'  , height:"300px"}}
              >
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxEQEBATEBAQEhISFhUWEBERDw8QEBUSFRIWFxURFRMYHishGholJxUTITEoJikrLi8uGB8zRDMuNygwLi0BCgoKDg0OGxAQGy0lHSYtLS0tLy0tLS0tLS0tLy0tLS0tLS0uLSstLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAcAAEAAwADAQEAAAAAAAAAAAAABAUGAQIDBwj/xABGEAACAQMBBAYGBgYHCQAAAAAAAQIDBBEhBRIxQQYiUWFxgQcTkaGx0RQyQlKSwSMkYoKy4TNTVHKiw/AVFhdDY3ODk8L/xAAaAQEAAwEBAQAAAAAAAAAAAAAAAgMEAQUG/8QAMhEBAAIBBAADBgQGAwEAAAAAAAECAwQRITESQVEFExQiMmFxgZGhQlKx0eHwIzPBFf/aAAwDAQACEQMRAD8A+4gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMgeUriK5+zUj4oSisy8nerkn7kc8aXu5dfpv7Pv8A5HPG77s+m/s+8eM927K9XNP3M743Pdy9I3MXzx46HYtCM0l6p5JIuQAAAAAAAAAAAAAAAAAAAAAOJSS1bwJIjdEq3n3V5v5Fc39FkY/VGnUb4tshM7rIiIdQkAAAAABzGTXBtCJ2cmIlJpXj+0s964k4v6q5x+iXCopcHknE7q5iYdjrgAAAAAAAAAAAAAAAAAeNe4Ue99nzIzbZKtd0CpUcnqyuZ3XRER06nEgAAAAAAAAAA5hJp5TwN9nJjdOt7lS0ej9zLK23U2pskE0AAAAAAAAAAAAAAACNc3G7ouPwIWtsnSm/MoLZWuA6AAAAAAAAAAAAAAmWtzyl5P8AIsrbylTennCWTVgAAAAAAAAAAAAeNzW3VpxfD5kbTslWu6ubKl4HQAAAqNp9I7e3bjKTnNcYU0pNPsb4L25M+TVY8fE9tmDQZs0bxG0esqWt05+5b6dsquH7FH8zNOv9Kt9fY0/xX/Z5f78T/s8P/ZL5Efj7fy/v/hP/AONX+ef0/wApdt03pv8ApKM4d8JRqL34LK6+v8UKcnse8fRaJ/Zf7P2pRuF+iqRk+ceE14xepqx5qZPpl5ubTZcP112/omFqkAAAAACdaV86PiuHeiytt+FF67cpJNAAAAAAAAAAAOJywm3yG5EbqupNybbKJndpiNo2dQ6AAAFP0qvpULaUoPEpNQjJcVvZy134TM2qyTTHMx22ez8NcueIt12+anivqwOgADmEmmmm01qmm00+1NcDsTtzDkxExtLYdHOlTbjSuXx0hV4a8lP5+3tPR0+r3+W/6vD1vsyIib4vzj+zYnovEAAAABzGWHlcg5MbrOlU3kn/AKyXRO7PMbS7nXAAAAAAAAABDvqnCPm/yK7z5LcceaIQWgAAAAwvSzpBGsnRpJSgmt6o+cov7Hd38/eeXqtTF/kr16voPZ2htjmMt559P7sukYXrhwMh0AAAPofQ3aTrUN2bzOk1Ft8XBrqN+xryPY0eXx02nuHzHtPTxiy+KvU8/wB1+a3nAAAAAkWVTDxyfxJUlXkjjdPLVIAAAAAAAAYFVUnlt9pTM7y0xG0Opx0AAAM/002g6VvuxeJVXu5XFQSzP8l+8ZNZkmlNo83o+zMEZM289Rz+fk+enjvp2q2Rs5UopyX6R8X2fso2Y6eGPu8zPlm88dLAsUOsqcXxin4pM5s7vLwqbPoy40oeUUn7iM0rPklGW8dShXGwab+o5QfjvR9+vvIThjyXV1V475UN3aypS3ZrXk1wa7UZ7Vms7S3Y8kXjeGh6AVMXFSPKVPPnGccfxM2aGfnmPs8v2xXfFWfu3Z6r54AAAABPAcWsJZSfaXQzTGzsdAAAAAAAHldSxB+z2kbdJVjeVaVNAAAAAMV6Qn17fs3anxj/ACPM1/dfze77G+m/5KHYdvv1o54R6z8uHva9hkxV3s9PUX8NPxaw1vNAAAABU9I6OaSlzg17Ho18PYU5o+Xdp0ttr7erjoFH9Zm+ylL+OBPQ/wDZP4K/a8/8Mfj/AOS3x6z5wAAAAACfZSzHHYy2k8KLxykEkAAAAAAAEW/eiXeQv0sx9oRWuAAAABk/SBbt06NRL6spRf76TX8PvMGvr8sWex7Hvte1PWP6MrsvbNrauo7ivTpNqO6pS6zWXlqK1fIzabFa28xDdr8+Om0WlbQ6TW0tY/SWnwasL5xfemqZq9zb/Zh5/wATj+/6S9/9vWqxvV4U86JVt6g2+xKokR91f0S9/j9f14WFOSksxaafBppr2ohMbLYmJ6RbzatvRaVWtShJ/VjKcVN+EeL8kSilp6hC2Wle5RZdIrdf2h98bG9nH2qngl7m3+zCHxNPv+koG1Ok9lKnOnKuqc2sqFaFW3lo8rSpFdhG+C81naE8OrxRkjedvx4Wno9jmrWkuChFZ/vSz/8AJHQR81lnti3yU29W4PTeCAAAAABKsHrJE6KsiaWKgAAAAAAEPaH2fP8AIrutxohBaAAAACFtiMJUZxqR3oy0xw15PPdjPkVZtvBMS0aXxe9iaztMPmW1OilCN7YXGs2qu5UU8OLXqqkqcsY4qUV7TPgtNMdqR+Lbq6xkzVyTH2bMpaXStTjOLjOKlFrEoySlFrsafERMx05NYmNpfK/+Hk69a8la3Ct6CqzjRh15KTjpNaPSKlvR5vqvz3/ERWI8UcvJjRze1ppO0btZ6OdjQtrRNwSuHOrG5m9Z78Kso7u993RY5POeZn1F5m32a9HirWm+3Pm1ZQ2M3012RSvFZ0qq+tcRSa0luqlVnOKfJNQ+HYX4bzXeY9GTVY638MT6tD0atYWbcYawnux14xjHKis88ZK8E+C0/dbq6+9pG3Hhjhqj0HjgAAAAASLF9by/NEqdq8nSeWqQAAAAAAEPaH2fP8iu63GiEFoAAAAIe1aeabx9lp+XB/EpzRvVo0tvDkZba9rKrSxTaVSEoVKTk8R9ZTkpKMn914cX3SZlx2iJ56ejlpNq8d9o0OkVul+nl9Fn9qnc4pYfZGb6s13xbR2cVvLlGNRT+Lifu4r7aVSO7ZONepLSM49e3p/9SpUXVwuO6nvPhji12Me3N+Ictm8UbY+Z/ZO2ZZRoUoUottQWsnjelJtuc5d8m5Sfe2QvbxTutx0ilYqr62/a16lRQnO3r4lV9XGU50qyio+s3I6uElGGcJtOOcYbanG167ecKZ3x3m23yz+0pC29aN4VzRcvuKpF1PwLre457q/on7/H6uKDdxVhUdOUKVLLo+si4VJ1JR3XU3HrCKi5RWcN770SSbT8sbecuV3vaLbcR0t7WnvTil26+C4kaRvaITy28NJloz0XigAAAAASLH63k/iiVO1eTpPLVIAAAAAACLfrRPv/ANfAhdZj7QitcAAAADho4KbaFl6vrRfVbxjmv5GPLi8PMdPT0+o958s9oRS1gAAAyBzTg5NJcW0l5nYjedkbWisbyvLKzVNdsnxf5I248UU/F5WbPOSfslFqgAAAAACVYLVvuJ0VZE0sVAAAAAAAPG7jmD7tSNukqTtKuKmgAAAAADxu6O/CUefLxXAhevirssw38F4szzWOPmee9mJ35gDoAAATtk0Mz3uUfiX4Kbzux6vJtXw+crk2PNAAAAAAATrGPVb7WWU6UZJ5SSaAAAAAAADhrIFVOOG12FE8NMTvDgOgAAAAAQ72wU9VpL3PxKcmGLcx204dTOPielRXoSg8SWOzsfgzJak17ejTLW8fLLzIrHAE+12bKWs+quz7T+RfTBM9seXV1rxXmVvTgopJLCXI1xERG0POtabTvLsdcAAAAAABxa0o4SXYXRGzPM7y7HXAAAAAAAACFfU9VLt4+JXePNbjnyRSC0AAAAAABn+k1FV6dF06kcZlKMovei9EsqSZRmtts26HuZUKtbpaKqn4yz8UZ96PRc09nVpTi6lVaNPGZS4Ps0R2LxE8I2+mW79ZHecd6O8km45W8k+Da440ZueE7B0AAAAAAB72dPMs8l8eRKkcq7ztCwLVIAAAAAAAAA61IbyafM5MbuxOyrnFptPkUzGzRE7uA6AAAACv2vte3tov19enTyniMpLfenKHF+SLKYr3+mDaZ6flvYPSa7sn+r1ZKOculLrUpduYPTPesPvF8dbxtKnFmvjnesvpmw/SnbVIP6VCVGolnMIyq054+7jWL7np3mO+ktv8r08XtCsx88bSz3SP0o16uYWcfUQ/rJYlXfhyh5ZfeW49LWvNuWfNrr24rxH7rb0EbRTvL2VesvWVKcetVq9ect/XWTzJmi1ZmOIZMfb7mVLgAAAAACQcWdCnuxxz5+JdEbM9p3l6HXAAAAAAAAAAAj3dHeWVxXvRC1d06W2QCteAeVzcQpwlOpKMIRWZTk1GKXa2ztazadoGF2t6TqUG42tGVXH/ADKj9VT8VH6zXjum/HoJnm87LIx+rH7U6a39xlOu6UX9igvVL8S63vNlNLip5fqsikQz0tct6t8W9W32tl89bOz0zlnsGctaj3F2LDl8kedj0lp5twyU08z3wvLa0hTWIRS7Xxb8WbqYqUjiGmtK16Q73Y1OprHqS7l1fOPyKcmlrbmOJV3wVnrh5bG2fOlOpvpYaSTTynqR0+K2O07uYcdqWndpdn7XubfHqLitTS4RjUlufg+q/YabY6W+qF8xE9tLs70k3lPCqxpV488x9VUf70NP8Jlvocc9cITjhvujXS+2vurBunWxl0amN5pcXBrSS9/cjBm018XPcK7UmGgM6IAAmWdH7T8vmWVjzU3t5JZNWAAAAAAAAAAAABEurfnHzX5kLV84WUv5Shla18c9IXSSV1XlRpy/V6MmklwnUjpKo+1LVL28z2dJgjHXxT3LRSu0bska0wAAAAAAAAB2pVZQlGUJOMotOMovEk1wafacmImNpH3DoXt76daxnLCqwe5WSWFvpJ7yXZJNP2rkeJqcPur7R15M967SvjOgk2tvnV8OS7Sda+au9/KE4sVAAAAAAAAAAAAAAAFbtq1qSo1vo+PXOE/VZe7H1m693L5a4OVrXxRMrKX2nnp+cLyyqW83SrU5U6kOMJrEl2PvWnFaM92LRaN4b4mJ5h4nXQAAAAAAAAAA23olvHG8qUuVak3j9unJOOnhKoYtdTfHE+kq8vW77Nb2vOXs+Z5da+rHa/ollisAAAAAAAAAAAAAAAAAKvb3R+2voblzSU8fUmurUg+2M1qvgydMlqTvWUq3mvT5V0i9Ft1RzK0krmn9x7sK6Xh9WfljwN+PV1ni3DXTUVnvhhbmhOnNwqQnTmuMJxlCa8YvU1RMTG8L4nfmHmdAAAAAAOYQcmoxTlKWkYxTlJvsSWrYG06PejS9ucSrJWtLtqLNZrupLhz+s14MzZNVSvEcypvnrHXL6r0a6J2uz4/oKeajWJ1p4lVl+9yXcsIwZM1snbJfJa/a9KkAAAAAAAAAAAAAAAAAAAAAETaOzKFzHdr0aVWPJVIRnjvWeD8CVbTXmJdi0x0yO0vRZYVMuk61Bv8Aq6m/H8NRPTwaNFdXkjvldGotHbPXXogqJv1V5CS5KpRlF/iUn8C2NbHnCyNTHnCtqeifaCelSza/71ZP2erLI1mP7pfEU+7iHoo2i+M7Nf8AmrP/ACh8Zj+/+/mfEU+6wtvRBXf9LeUo9u5SnU97cSE62PKEZ1MeUL/Z/oosoa1qleu+xzVKHsglL/EVW1l564QnUWnprtlbEtrVYt6FKlni4QSk/wC9Li/Nma17W+qVNrTbuVgRRAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf//Z"
                  alt="Avatar"
                  className="img-fluid my-5"
                  style={{ width: '80px' }}
                />
                <h5 style={{color:"white"}}>{singleUser.name}</h5>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={toggleEditMode}
                  style={{margin:"8px" , backgroundColor:"black"}}
                >
                  {editMode ? 'Close Form' : 'Edit Profile'}
                </button>
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  {/* User information displayed in both edit and read-only modes */}
                  <h3>Information</h3>
                  <hr className="mt-0 mb-4" />
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{singleUser.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Phone</h6>
                      <p className="text-muted">{singleUser.mobileNumber}</p>
                    </div>
                    <div className="col-6 mb-3">
                      {localStorage.getItem('ROLE') === 'admin'?
                      <button type="button" class="btn btn-primary"
                      style={{backgroundColor:"black"}}
                      onClick={goToDashboard}
                      >Dashboard</button>:<></>}
                    </div>
                  </div>
                  {editMode && (
                     <div>
                     <h6 >Edit Details</h6>
                    
                      <label style={{height:"20px"}}>
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          style={{height:"30px" , width:"300px"}}
                        />
                      <label htmlFor="email" className="form-label" style={{marginTop:"4px"}}>
                          Email
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          style={{height:"30px" ,  width:"300px",marginBottom:"10px"}}
                        />
                       <label htmlFor="mobileNumber" className="form-label">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="mobileNumber"
                          name="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleChange}
                          style={{height:"30px" ,  width:"300px"}}
                        />
                    <button
                        className="btn btn-primary btn-sm button"
                        onClick={updateUser}
                        disabled={loading}
                        style={{backgroundColor:"black" , margin:"5px 0 0 0"}}
                      >
                        {loading ? 'Updating...' : 'Save'}
                      </button>
                      <div className='pseduo'></div>
                     </div>
                  )}
                </div>
              </div>
            </div>
          </div>
    <ToastContainer/>
  </>
  )
}

export default User