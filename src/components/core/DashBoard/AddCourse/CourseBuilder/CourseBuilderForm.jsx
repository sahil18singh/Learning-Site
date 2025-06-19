import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setStep, setEditCourse } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
    const { token } = useSelector((state) => state.auth);
    const [editSectionName, setEditSectionName] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { course } = useSelector((state) => state.course);

    const gonext = () => {
        if (course.courseContent.length > 0) {
            if (course.courseContent.some((section) => section.subSection.length > 0)) {
                dispatch(setStep(3));
            } else {
                toast.error('Please add at least one lesson to each section');
            }
        } else {
            toast.error('Please add at least one section to continue');
        }
    };

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        let result = null;
        setLoading(true);
        try {
            if (editSectionName) {
                result = await updateSection(
                    { sectionName: data.sectionName, courseId: course._id, sectionId: editSectionName },
                    token
                );
            } else {
                //console.log("hi.....");
                result = await createSection(
                    { sectionName: data.sectionName, courseId: course._id },
                    token
                );
            }
            if (result) {
                dispatch(setCourse(result)); // Update the course state
                setValue('sectionName', '');
                setEditSectionName(false);
            }
        } catch (error) {
            toast.error('Failed to update section. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handelChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            setEditSectionName(false);
            setValue('sectionName', '');
            return;
        }
        setEditSectionName(sectionId);
        setValue('sectionName', sectionName);
    };

    return (
        <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className='text-2xl font-semibold text-richblack-5'>Course Builder</p>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <label htmlFor='sectionName' className='text-sm text-richblack-5'>
                    Section Name<sup className='text-pink-200'>*</sup>
                </label>
                <input
                    type='text'
                    id='sectionName'
                    placeholder='Add a section to build your course'
                    name='sectionName'
                    className='w-full'
                    {...register('sectionName', { required: true })}
                />
                {errors.sectionName && (
                    <p className='ml-2 text-xs tracking-wide text-pink-200'>This field is required</p>
                )}
                <div className='flex items-end gap-x-4'>
                    <button
                        type='submit'
                        className='flex items-center border border-yellow-50 bg-transparent cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 undefined'
                    >
                        <span className='text-yellow-50'>
                            {editSectionName ? 'Edit Section Name' : 'Create Section'}
                        </span>
                        <AiOutlinePlusCircle size={20} className='text-yellow-50' />
                    </button>

                    {editSectionName && (
                        <button
                            onClick={() => {
                                setEditSectionName(false);
                                setValue('sectionName', '');
                            }}
                            type='button'
                            className='text-sm text-richblack-300 underline'
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>
            </form>
                    {console.log("section.....",course.courseContent.length)}
            {course.courseContent.length > 0 && (
                <NestedView
                    handelChangeEditSectionName={handelChangeEditSectionName}
                    courseContent={course.courseContent}
                />
            )}

            <div className='flex justify-end gap-x-3'>
                <button
                    onClick={() => {
                        dispatch(setEditCourse(true));
                        dispatch(setStep(1));
                    }}
                    className='flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900'
                >
                    Back
                </button>
                <button
                    onClick={gonext}
                    className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-richblack-900 bg-no-repeat bg-right pr-10 bg-contain'
                >
                    <span>Next</span>
                </button>
            </div>
        </div>
    );
};

export default CourseBuilderForm;
