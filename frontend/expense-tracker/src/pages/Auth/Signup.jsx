import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import {useNavigate} from "react-router-dom";
import { useState } from 'react';
import Input from '../../components/Inputs/Input';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper.js';
import ProfilePhototSelector from '../../components/Inputs/ProfilePhototSelector.jsx';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_paths } from '../../utils/apiPaths.js';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext.jsx';
import uploadImage from '../../utils/uploadImage.js';

const Signup = () => {
  const [profilePic,serProfilePic]=useState(null)
  const [fullName, setFullName]=useState("");
  const [email,setEmail]=useState("")
  const [password, setPassword]=useState("");
  const [error,setError]=useState("")
const {updateUser}=useContext(UserContext);
 const navigate=useNavigate();

 const handleSignUp=async (e)=>{
  e.preventDefault();
  let profileImageUrl ="";

  if(!fullName){
    setError("please enter a full name")
    return
  }
  if(!password){
    setError("please enter the password")
    return
  }
  if(!validateEmail(email)){
    setError("please enter a valid email address")
    return
  }
  setError("")

  //signUP API call
  try {
    //upload image if present
    if(profilePic){
      const imgUploadRes=await uploadImage(profilePic);
      profileImageUrl=imgUploadRes.imageUrl || "";
    }
    const response=await axiosInstance.post(API_paths.AUTH.REGISTER,{
      fullName,
      email,
      password,
      profileImageUrl
    })
    const {token,user}=response.data
    if(token){
      localStorage.setItem("token",token);
      updateUser(user)
      navigate("/dashboard")
    }
  } catch (error) {
    if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong . Please try again")
      }
    
  }

 }

  return (
   <AuthLayout>
    <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>
        Create an Account
      </h3>
      <p className='text-x5 text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleSignUp}>

        <ProfilePhototSelector image={profilePic} setImage={serProfilePic}/>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
          value={fullName}
          onChange={({target})=> setFullName(target.value)}
          label="Full Name"
          placeholder="John"
          type="text"
          />

          <Input
           value={email}
           onChange={({target}) =>setEmail(target.value)}
           label="Email Address"
           placeholder="john@gmail.com"
           type="email"
           />
           <div className='col-span-2'>
            <Input
           value={password}
           onChange={({target}) =>setPassword(target.value)}
           label="Password"
           placeholder="password"
           type="password"
           />
           </div>

        </div>

         {error && <p className='text-red-500 text-x5 pb-2.5'>{error}</p>}
                   <button type="submit" className='btn-primary'>SIGN UP</button>
                   
                   <p className=' font-bold text-[13px] text-slate-800 mt-3'>
                    Already have an account ?{" "}
                    <Link className="font-medium text-primary underline"  to="/login">
                    LOGIN
                    </Link>
           </p>
      </form>
    </div>
   </AuthLayout>
  )
}

export default Signup;
