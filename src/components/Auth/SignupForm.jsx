import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ACCOUNT_TYPE } from '../../utils/constant'
import { toast } from 'react-hot-toast'
import { setSignupData } from '../../slices/authSlice'
import Tab from "../../common/Tab"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { sendOtp } from '../../services/operations/authAPI'
import { setProgress } from '../../slices/loadingBarSlice'

const SignupForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    const signupData = {
      ...formData, accountType,
    }

    dispatch(setSignupData(signupData))
    dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    { id: 1, tabName: "Student", type: ACCOUNT_TYPE.STUDENT },
    { id: 2, tabName: "Instructor", type: ACCOUNT_TYPE.INSTRUCTOR },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-richblack-900 via-richblack-800 to-richblack-900 px-4 py-10 text-richblack-5">
      <div className="w-full max-w-xl rounded-2xl border border-richblack-700 bg-white/5 backdrop-blur-md p-8 shadow-2xl">
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />
        
        <form onSubmit={handleOnSubmit} className="mt-6 flex flex-col gap-y-6">
          <div className="flex flex-col md:flex-row gap-5">
            <label className="w-full">
              <p className="mb-2 text-sm font-semibold">First Name <sup className="text-pink-200">*</sup></p>
              <input
                type="text"
                required
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter your first name"
                className="w-full rounded-md bg-richblack-800 px-3 py-2 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              />
            </label>
            <label className="w-full">
              <p className="mb-2 text-sm font-semibold">Last Name <sup className="text-pink-200">*</sup></p>
              <input
                type="text"
                required
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter your last name"
                className="w-full rounded-md bg-richblack-800 px-3 py-2 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              />
            </label>
          </div>

          <label>
            <p className="mb-2 text-sm font-semibold">Email Address <sup className="text-pink-200">*</sup></p>
            <input
              type="email"
              required
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter your email address"
              className="w-full rounded-md bg-richblack-800 px-3 py-2 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
            />
          </label>

          <div className="flex flex-col md:flex-row gap-5">
            <label className="relative w-full">
              <p className="mb-2 text-sm font-semibold">Create Password <sup className="text-pink-200">*</sup></p>
              <input
                type={showPassword ? "text" : "password"}
                required
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Create a password"
                className="w-full rounded-md bg-richblack-800 px-3 py-2 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-10 cursor-pointer"
              >
                {showPassword ? (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>

            <label className="relative w-full">
              <p className="mb-2 text-sm font-semibold">Confirm Password <sup className="text-pink-200">*</sup></p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                required
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm your password"
                className="w-full rounded-md bg-richblack-800 px-3 py-2 text-white placeholder:text-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-50"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[42px] z-10 cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye fontSize={22} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEyeInvisible fontSize={22} fill="#AFB2BF" />
                )}
              </span>
            </label>
          </div>

          <button
            type="submit"
            onClick={() => dispatch(setProgress(60))}
            className="mt-4 rounded-md bg-yellow-50 py-2 font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignupForm
