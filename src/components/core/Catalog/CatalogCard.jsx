import React from 'react'
import { Link } from 'react-router-dom'

const CatalogCard = ({course,Height}) => {
  return (
    <div className='mb-4 hover:scale-[1.03] transition-all duration-200 z-100'>
        <Link to={`/courses/${course._id}`}>
            <div>
                <img src={course?.thumbnail} alt="course thumbnail" className={`${Height} rounded-xl object-cover`} />
                <div className='flex flex-col gap-2 px-1 py-3'>
                    <p className='text-sm md:text-xl text-richblack-5'>{course?.courseName}</p>
                    <p className='text-[12px] md:text-xl text-richblack-5'>By <span className='text-yellow-50'>{course?.instructor?.firstName} {course?.instructor?.lastName}</span></p>
                    <p className='text-sm md:text-xl text-richblack-5'>Rs. {course?.price}</p>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CatalogCard
