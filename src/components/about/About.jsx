import React from 'react'
import HighlightText from '../core/HomePage/HighlightText'
import a from '../../assets/a.jpg'
import b from '../../assets/b.jpg'
import c from '../../assets/c.jpg'

const About = () => {
  return (

    <div className='flex flex-col items-center '>
    
      <div className='flex flex-col  text-4xl mt-4 z-[10]'>
        <p className=' text-richblack-5 font-bold'>Driving Innovation in Online Education for a</p>
        <HighlightText text={"Bright Future"}/>
      </div>

      <div className='text-richblack-400 w-7/12 mt-7 flex justify-center items-end text-center mx-auto text-lg'>
      Unlock your potential with expert-led courses designed to help you master new skills and achieve your goals.Learn anytime, anywhere with engaging, interactive lessons tailored for all levels.
      </div>

      <div className='flex flex-row gap-10 justify-evenly space mt-10'>
        <img src={a} alt="a" className='h-[250px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] rounded-lg'/>
        <img src={b} alt="b" className='h-[250px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] rounded-lg'/>
        <img src={c} alt="c" className='h-[250px] drop-shadow-[0_4px_10px_rgba(255,255,255,0.7)] rounded-lg'/>
      </div>

      <div className='text-richblack-5 mt-20 w-10/12 flex justify-center items-end text-center mx-auto text-2xl'>
      Our learning website should offer a user-friendly interface that makes navigation seamless, ensuring learners can easily access courses and resources. A responsive design that works well on all devices, including mobile and tablets, enhances accessibility. A well-structured course management system is essential, allowing users to browse courses categorized by skill level, access video lessons, and track their progress efficiently.
      </div>
     
   
      <div className='mt-20 p-3'>
        <h1 className='text-4xl border-b-2 border-white'><HighlightText text={"Our Founding Story"}/></h1>
        <p className='text-richblack-50 text-2xl'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            <p className='text-richblack-50 text-2xl'>
As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
      </div>

      
        <div className='flex flex-row text-richblack-5 mt-20 gap-60'>
            <div className='w-[40%]'>
                <p className='font-black text-3xl self-start text-pink-500 mb-8'>Our vision</p>
                <p className='text-lg text-richblack-400'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
            </div>
            <div className='w-[40%]'>
                <p className='font-black text-3xl self-start text-pink-500 mb-8'>Our Mission</p>
                <p className='text-lg text-richblack-400'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
            </div>
        </div>
      

    </div>
  )
}

export default About
