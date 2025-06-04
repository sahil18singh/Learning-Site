import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconBtn from '../../../common/IconBtn'

const MyProfile = () => {
    const {user} = useSelector((state)=>state.profile)
    const navigate = useNavigate();
    
    return (
        <div className='text-richblack-5 bg-richblack-900 min-h-screen pb-10'>
            {/* Header */}
            <div className='bg-richblack-800 py-6 px-4 md:px-12 border-b border-richblack-700'>
                <h1 className='text-3xl font-bold'>My Profile</h1>
            </div>
            
            {/* Main Content */}
            <div className='flex flex-col items-center px-4 md:px-12 mt-8'>
                {/* Profile Card - Medium Width */}
                <div className='h-[150px] w-full max-w-3xl bg-richblack-700 rounded-lg flex items-center px-6 gap-6 shadow-lg'>
                    <img 
                        src={user?.image} 
                        alt={`profile-${user?.firstName}`} 
                        className="h-20 w-20 rounded-full object-cover border-2 border-yellow-50"
                    />

                    <div className='flex flex-col gap-1'>
                        <p className='text-lg font-semibold'>
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className='text-xs md:text-sm text-richblack-300 break-all'>
                            {user?.email}
                        </p>
                    </div>

                    <div className="ml-auto">
                        <button 
                            className="bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 text-richblack-900 px-5 py-2 rounded-md font-semibold flex items-center gap-2 shadow-sm hover:shadow-md"
                            onClick={() => navigate("/dashboard/settings")}
                        >
                            <IconBtn text="Edit" />
                        </button>
                    </div>
                </div>

                {/* About Section - Medium Width */}
                <div className='mt-8 w-full max-w-3xl bg-richblack-800 rounded-lg border border-richblack-700 p-6 shadow-lg'>
                    <div className='flex justify-between items-center mb-4'>
                        <h2 className='text-xl font-semibold'>About</h2>
                        <button 
                            className="bg-yellow-50 hover:bg-yellow-100 transition-all duration-200 text-richblack-900 px-5 py-2 rounded-md font-semibold flex items-center gap-2 shadow-sm hover:shadow-md"
                            onClick={() => navigate("/dashboard/settings")}
                        >
                            <IconBtn text="Edit" />
                        </button>
                    </div>
                    <p className='text-richblack-300 text-sm md:text-base leading-relaxed'>
                        {user?.additionalDetails?.about ?? "Write something about yourself..."}
                    </p>
                </div>

                {/* Personal Details Section - Medium Width */}
                <div className='mt-8 w-full max-w-3xl bg-richblack-800 rounded-lg border border-richblack-700 p-6 shadow-lg'>
                    <h2 className='text-xl font-semibold border-b border-richblack-600 pb-3 mb-6'>
                        Personal Details
                    </h2>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        {[
                            { label: "First Name", value: user?.firstName },
                            { label: "Last Name", value: user?.lastName },
                            { label: "Email", value: user?.email },
                            { label: "Phone Number", value: user?.additionalDetails?.contactNumber ?? "Not specified" },
                            { label: "Gender", value: user?.additionalDetails?.gender ?? "Not specified" },
                            { label: "Date of Birth", value: user?.additionalDetails?.dateOfBirth ?? "Not specified" }
                        ].map((item, index) => (
                            <div key={index} className='bg-richblack-700 p-4 rounded-lg'>
                                <p className='text-sm text-richblack-300 mb-1'>{item.label}</p>
                                <p className='text-base font-medium'>
                                    {item.value}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile