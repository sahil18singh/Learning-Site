import React, { useState } from 'react'
import { updateAdditionalDetails,updatePassword,updatePfp,deleteAccount } from '../../../services/operations/profileAPi'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { MdDelete } from "react-icons/md";
import {AiOutlineEyeInvisible} from 'react-icons/ai'
import {AiOutlineEye} from 'react-icons/ai'


const Setting = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state=>state.profile.user);

    //update profile picture
    const pfp = useSelector(state=>state.profile.user.image);
    const [profilePicture,setprofilePicture] = useState(pfp)
    const token = useSelector(state=>state.auth.token);

    const handleUpload = (e)=>{
        e.preventDefault();
        const file = e.target[0].files[0];
        
        updatePfp(token,file);
    }

    const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setprofilePicture(URL.createObjectURL(file));
    }

    //update additional info
    const [formData,setFormData] = useState({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        gender: "",
        contactNumber: "",
        about: "",
    })

    const handleOnChange = (e)=>{
        setFormData((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))
    }

    const handelAdditionalDetails = (e)=>{
        e.preventDefault()
        updateAdditionalDetails(token,formData);
    }

    //update password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword,setShowConfirmPassword] = useState(false);
    const [password,setPassword] = useState({oldPassword:"",newPassword:"",confirmPassword:"",})

    const handleOnChangePassword = (e)=>{
        setPassword((prevData)=>({
            ...prevData,
            [e.target.name]:e.target.value,
        }))

    }


    const handlePassword = (e)=>{
        e.preventDefault()
        const {newPassword,confirmPassword} = password
        if(newPassword===confirmPassword){
            updatePassword(token,password);
        }else{
            alert("Password does not match")
        }
        
    }


    //delete account
    const onDeleteAccount = () =>{
     //   console.log("hiii");
        if(window.confirm("Are you sure you want to delete your account?")){
            deleteAccount(token,dispatch,navigate)
        }
    }


  return (
    // Main Div
    <div className='flex flex-col text-richblack-5 ml-4 mt-4 gap-7'>
        {/* Edit Profile */}
      <div className='w-9/12 h-[80px] border-2 border-richblack-5 flex items-center '>
        <p className='text-3xl  font-semibold'>Edit Profile</p>
      </div>
      
      
      {/* Change profile picture */}
      <div className='flex flex-row gap-10 w-9/12 h-[150px] border-2 border-richblack-5 flex items-center bg-richblack-800 rounded-md'>
        <img src={profilePicture} alt="image" className='rounded-full aspect-square w-[80px]'/>
        <div>
            <p className='mb-3'>Change Profile Picture</p>
            <form onSubmit={handleUpload}>
            <div className='flex gap-8 '>
                <label className="cursor-pointer rounded-md bg-richblack-700 py-3 px-5 font-semibold text-richblack-50'" htmlFor="upload">Select
                <input id='upload' type="file" onChange={handleFileChange} className="hidden" accept="image/png, image/gif, image/jpeg"/></label>
                <button type="submit" className='bg-yellow-400 p-3 rounded-md'>Upload</button>
            </div>
            </form>
        </div>
      </div>
      
      
      
      {/* Profile Information */}
      <form onSubmit={handelAdditionalDetails}>
      <div className=' w-9/12 h-[370px] border-2 border-richblack-5   bg-richblack-800 rounded-md'>
        <p className='text-2xl mb-8 '>Personal Information</p>
        <div className='flex flex-col'>

            <div className='flex flex-row gap-20 mb-10'>
                <div className='flex flex-col'>
                    <p className='text-1xl mb-1'>First Name</p>
                    <label htmlFor="firstName"></label>
                    <input 
                        type="text" 
                        id="firstName"
                        name="firstName"
                        className="bg-richblack-700 border border-1 rounded-md w-[300px] h-[40px]" 
                        placeholder="Enter First Name"  defaultValue={user.firstName || null} onChange={handleOnChange}
                        />
                </div>
                <div className='flex flex-col'>
                    <p className='text-1xl mb-1'>Last Name</p>
                    <label htmlFor="lastName"></label>
                    <input type="text" 
                            id= "lastName"
                            name="lastName"
                        className="bg-richblack-700 border border-1 rounded-md w-[300px] h-[40px]" 
                        placeholder="Enter Last Name" defaultValue={user.lastName || null} onChange={handleOnChange}/>
                </div>
            </div>


            <div className='flex flex-row gap-20 mb-10'>
                <div className='flex flex-col'>
                    <p className='text-1xl mb-1'>Date of Birth</p>
                    <label htmlFor="dateOdBirth"></label>
                    <input id="dateOfBirth" type="date" name="dateOfBirth" className="bg-richblack-700 border border-1 rounded-md w-[300px] h-[40px]" defaultValue={user?.additionalDetails.dateOfBirth || null} onChange={handleOnChange}
                    />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor="gender"  className='text-1xl mb-1'>Gender</label>
                      <select  defaultValue={user?.additionalDetails.gender || null} type="text" name="gender" id="gender" className="form-style text-richblack-5 border border-1 rounded-md w-[300px] h-[40px] bg-richblack-700" onChange={handleOnChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select>
                </div>
            </div>
            
            
            <div className='flex flex-row gap-20 mb-10'>
                <div className='flex flex-col'>
                    <p className='text-1xl mb-1'> Contact Number</p>
                    <label htmlFor="contactNumber"></label>
                    <input type="number" name="contactNumber" className="bg-richblack-700 border border-1 rounded-md w-[300px] h-[40px]" id="contactNumber"
                        placeholder="Enter Number" defaultValue={user?.additionalDetails.contactNumber || null} onChange={handleOnChange}/>
                </div>
                <div className='flex flex-col'>
                    <p className='text-1xl mb-1'>About</p>
                    <label htmlFor="about"></label>
                    <input type="text" name="about" className="bg-richblack-700 border border-1 rounded-md w-[300px] h-[40px]" id="about"    
                        placeholder="About yourself" defaultValue={user?.additionalDetails.about || null} onChange={handleOnChange}/>
                </div>
            </div>
        </div>
        <div className="flex justify-end gap-2"><button className="flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined" type="submit">Save</button></div>
      </div>
      
      </form>
      
      {/* Password Change */}
      
      <div className="flex flex-col items-center mt-10 p-6 bg-richblack-800 rounded-lg shadow-lg w-[400px] mx-auto">
      <form onSubmit={handlePassword}>
      <h2 className="text-xl font-semibold text-white mb-4">Change Password</h2>

      {/* Old Password */}
      <div className="flex flex-col w-full gap-1">
        <label className="text-white text-sm">
          Old Password <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            className="bg-richblack-700 border border-gray-600 rounded-md w-full h-[40px] px-3 pr-10 text-white"
            required
            name="oldPassword"
            value={password.oldPassword}
            onChange={handleOnChangePassword}
            placeholder="Enter Old Password"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
        </div>
      </div>

      {/* New Password */}
      <div className="flex flex-col w-full gap-1 mt-4">
        <label className="text-white text-sm">
          New Password <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="bg-richblack-700 border border-gray-600 rounded-md w-full h-[40px] px-3 pr-10 text-white"
            required
            name="newPassword"
            value={password.newPassword}
            onChange={handleOnChangePassword}
            placeholder="Enter New Password"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
        </div>
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col w-full gap-1 mt-4">
        <label className="text-white text-sm">
          Confirm New Password <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative w-full">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="bg-richblack-700 border border-gray-600 rounded-md w-full h-[40px] px-3 pr-10 text-white"
            required
            name="confirmPassword"
            value={password.confirmPassword}
            onChange={handleOnChangePassword}
            placeholder="Confirm New Password"
          />
          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button className="bg-pink-500 text-white py-2 px-4 rounded-md mt-6 hover:bg-pink-600 transition duration-200 w-full">
        Save Changes
      </button>
      </form>
    </div>
      
      
      {/* Delete Account */}
      <div className="flex justify-center mt-8">
    <button
        type="button"
        onClick={onDeleteAccount}
        className="flex items-center gap-x-2 bg-red-600 text-white font-semibold py-3 px-6 rounded-md 
                border-2 border-red-700 shadow-md hover:bg-red-700 hover:border-red-800
                transition duration-200 hover:scale-105"
    >
    <MdDelete size={20} /> Delete Account
  </button>
</div>

    </div>
  )
}

export default Setting
