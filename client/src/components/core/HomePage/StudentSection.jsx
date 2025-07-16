import React from 'react'
import Student from '../../../assets/student.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'

const StudentSection = () => {
  return (
    <div className='flex flex-row mt-11 text-white gap-9'>
      <div className='ml-14 w-[45%] '>
        <img src={Student} alt="student" className="drop-shadow-[5px_5px_10px_rgba(255,255,255,0.8)] bg-gray-900 p-4 rounded-lg"/>
      </div>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col text-5xl ml-20 gap-2'>
            <p>Become a</p>
            <HighlightText text={"Student"} />
        </div>

        <div className='mt-4 ml-20 font-semibold text-lg w-[70%]'>
        You gain the power to create anything digitally, from websites to apps, automating tasks, and solving real-world problems.
        </div>
        
        <div className='ml-20 w-[25%] font-semibold text-1.2xl mt-8'>
            <CTAButton active={true} linkto={"/signup"}>
                Start Learning Today
            </CTAButton>
        </div>

      </div>
    </div>



   

  )
}

export default StudentSection
