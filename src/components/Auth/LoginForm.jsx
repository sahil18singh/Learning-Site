import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { setProgress } from '../../slices/loadingBarSlice';
import { login } from "../../services/operations/authAPI"

const LoginForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    passwoed: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(login(email, password, navigate))
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 text-richblack-5 px-4'>
      <form
        onSubmit={handleOnSubmit}
        className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-xl flex flex-col gap-y-6"
      >
        <label className='w-full'>
          <p className='mb-2 text-sm font-semibold'>
            Email Address <sup className='text-pink-200'>*</sup>
          </p>
          <input
            type="text"
            required
            name='email'
            value={email}
            onChange={handleOnChange}
            placeholder='Enter your email address'
            className='w-full rounded-md bg-richblack-800 py-2 px-3 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50'
          />
        </label>

        <label className='relative w-full'>
          <p className='mb-2 text-sm font-semibold'>
            Password <sup className='text-pink-200'>*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            required
            name='password'
            value={password}
            onChange={handleOnChange}
            placeholder='Enter your password'
            className='w-full rounded-md bg-richblack-800 py-2 px-3 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50'
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-3 top-9 z-10 cursor-pointer'
            >
            {showPassword
                ? <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                : <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />}
            </span>

        </label>

        {/* Moved link here */}
        <div className="flex justify-end">
          <Link to="/forget-password">
            <p className='text-blue-100 text-xs hover:underline transition-all duration-150'>
              Forget Password?
            </p>
          </Link>
        </div>

        <button
          type="submit"
          onClick={() => dispatch(setProgress(100))}
          className='bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 rounded-md text-richblack-900 py-2 font-semibold'
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

export default LoginForm



