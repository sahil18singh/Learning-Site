import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Docode from '../assets/docode.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import StudentSection from '../components/core/HomePage/StudentSection';



const Home = () => {
  return (
    <div>
      {/* Section 1 */}


        <div className='mx-auto relative flex flex-col w-11/12 items-center text-white justify-between'>
            {/* Make an Instructor Button */}
            <Link 
                to={"/signup"} 
                className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-richblack-5 shadow-[0_0_20px_0_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-95 hover:shadow-none"
              >
                <div className='flex items-center gap-2 rounded-full px-5 py-2 transition-all duration-200 group-hover:bg-richblack-900'>
                  <span>Become an Instructor</span>
                  <FaArrowRight className='text-sm' />
                </div>
              </Link>

            {/* Heading */}
            <div className='text-center text-3xl font-semibold mt-7'>
               Empower Your Future with <HighlightText text={"Coding Skills"}/>
            </div>
            
            {/* Sub-heading */}
            <div className='text-center w-[80%] mt-4 text-richblack-300'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            {/* CTAButton */}
            <div className='flex flex-row mt-7 gap-7'>
              <CTAButton active={true} linkto={'/about'}>
                Learn More
              </CTAButton>
              <CTAButton active={false} linkto={'/contact'}>
               Contact Me
              </CTAButton>
            </div>
            
            {/* Video */}
            <div className='w-[70%] mx-7 my-7 shadow-[10px_5px_50px_-5px] shadow-blue-200 mb-100'>
            <video
              className='w-full h-auto'
              autoPlay
              muted
              loop
              playsInline
            >
                <source src={Docode} type="video/mp4" />
              </video>
            </div>

            {/* Code Section 1 */}
            <div className='mt-16'>
              <CodeBlocks
              position={"lg:flex-row"}
              heading={
                <div className='text-4xl font-semibold'>
                   Unlock your <HighlightText text={"coding potiential"}/> with our online course
                </div>
              }
              subheading={
                "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
              }

              ctabtn1={{
                ttext: "Try it Yourself",
                link: "/signup",
                active: true,
              }}
              ctabtn2={{
                ttext: "Learn More",
                link: "/signup",
                active: false,
              }}


              codeblock={
                `Hi Coder\nKeep coding,\n keep learning,\n and let your creativity\n shape the future!\nBe brave\nBe great`
              }

              />
            </div>

            </div>
            
            
        


      {/* Section 2 */}



      {/* Section 3 */}

              <StudentSection />


      {/* Section 4 */}

      

    </div>
  )
}

export default Home
