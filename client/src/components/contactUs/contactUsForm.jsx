import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {apiConnector} from "../../services/apiconnector"
import { contactusEndpoint } from '../../services/apis';
import toast from 'react-hot-toast';

const ContactUsForm = () => {
    const [loading, setloading] = useState(false);
    const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful}} = useForm();
    
    useEffect(() => {
        if(isSubmitSuccessful) {
            reset({
                firstName: "",
                lastName: "",
                email: "",
                message: "",
            })
        }
    }, [reset, isSubmitSuccessful]) 

    const onSubmit = async(data) => {
        console.log(data);
        try {
            setloading(true);
            const {firstName, lastName, email, message} = data;

            const res = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, {firstName, lastName, email, message});
            if(res.data.success === true) {
                toast.success("Message sent successfully");
            } else {
                toast.error("Something went wrong");
            }
            console.log("contact response ", res);
            setloading(false);
        } catch(error) {
            console.log(error);
            setloading(false);
            toast.error("Failed to send message");
        }
    }

    return (
        loading ? (
            <div className="flex items-center justify-center min-h-[400px] ">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-50"></div>
            </div>
        ) : (
            <div className='max-w-3xl mx-auto p-8 bg-richblack-800 rounded-xl shadow-lg border border-richblack-600 mt-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-3xl font-bold text-center text-yellow-50 mb-2'>
                            New Idea? Let's Collab
                        </h2>
                        
                        <div className='grid md:grid-cols-2 gap-6'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor='firstname' className='text-richblack-5 text-sm font-medium'>
                                    First Name <span className='text-pink-200'>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id='firstname' 
                                    placeholder='Enter your first name' 
                                    className='rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50'
                                    {...register("firstName", {required: true})}
                                />
                                {errors.firstName && (
                                    <span className='text-yellow-200 text-xs mt-1'>First name is required</span>
                                )}
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor='lastname' className='text-richblack-5 text-sm font-medium'>
                                    Last Name <span className='text-pink-200'>*</span>
                                </label>
                                <input 
                                    type="text" 
                                    id='lastname' 
                                    placeholder='Enter your last name' 
                                    className='rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50'
                                    {...register("lastName", {required: true})}
                                />
                                {errors.lastName && (
                                    <span className='text-yellow-200 text-xs mt-1'>Last name is required</span>
                                )}
                            </div>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-richblack-5 text-sm font-medium'>
                                Email Address <span className='text-pink-200'>*</span>
                            </label>
                            <input 
                                type="email" 
                                placeholder='Enter your email address' 
                                className='rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50'
                                {...register("email", {required: true})}
                            />
                            {errors.email && (
                                <span className='text-yellow-200 text-xs mt-1'>Email is required</span>
                            )}
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label className='text-richblack-5 text-sm font-medium'>
                                Message <span className='text-pink-200'>*</span>
                            </label>
                            <textarea 
                                placeholder="Enter your message here" 
                                rows="5"
                                className='rounded-lg bg-richblack-700 p-3 text-richblack-5 border border-richblack-600 focus:outline-none focus:ring-1 focus:ring-yellow-50'
                                {...register('message', { required: true })}
                            />
                            {errors.message && (
                                <span className='text-yellow-200 text-xs mt-1'>Message is required</span>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            className="mt-4 rounded-lg bg-yellow-50 px-6 py-3 text-center font-bold text-richblack-900 transition-all duration-200 hover:bg-yellow-200 hover:scale-[1.01] focus:outline-none focus:ring-2 focus:ring-yellow-50 focus:ring-offset-2 focus:ring-offset-richblack-800"
                        >
                            Send Message
                        </button>
                    </div>    
                </form>
            </div>
        )
    )
}

export default ContactUsForm
