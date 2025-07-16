import React, { useEffect, useState } from 'react'
import { useDispatch,useSelector  } from 'react-redux'
import { useNavigate} from 'react-router-dom';
import {signUp} from '../services/operations/authAPI'
import OTPInput from 'react-otp-input' 

const VerifyOtp = () => {
    const [otp,setOtp] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading,signupData} = useSelector((state)=>state.auth)

    useEffect(()=>{
        if(!signupData){
            navigate('/signup');
        }
    },[])

    const handleOnSubmit = (e)=>{
        e.preventDefault();
        const {email,accountType,confirmPassword,password,lastName,firstName} = signupData;

        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate
        ));
    }

  return (
    // loading?(<div className='h-[100vh] flex justify-center items-center'><div class='custom-loader'></div></div>):(
        <div className='flex  justify-center items-center  h-screen'>
            
            <div className='flex flex-col gap-6 w-[33%] h-[50%] border-2 border-richblack-600 p-4'>
                <h1 className='font-bold text-4xl text-richblack-5'>Verify Email</h1>
                <p className='text-richblack-5'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handleOnSubmit}>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    inputStyle="w-[20px] rounded-[8px] border-[1px] border-richblack-500 text-[3rem] text-center"
                    focusStyle="border-[5px] border-red-500"
                    isInputNum={true}
                    shouldAutoFocus={true}
                    containerStyle="flex justify-between gap-4"
                    renderInput={(props) => <input {...props} />}

                    />
                    <button type='submit' className='w-full bg-yellow-50 px-[12px] py-[12px] rounded-[8px] font-medium text-richblack-900 mt-10'>Verify Email</button>
                </form>
            </div>

        </div>
   //)
  
    );
  
};

export default VerifyOtp
