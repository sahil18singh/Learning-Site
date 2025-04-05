import React from 'react'
import CTAButton from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({position,heading,subheading,ctabtn1,ctabtn2,codeblock}) => {
  return (
    <div className={`flex ${position} justify-between gap-10 flex-wrap my-[10] `}>
            
        {/* Heading */}
      <div className='flex flex-col lg:w-[50%]'>
                <div>
               
                    {heading}
                </div>

                {/* Sub-Heading */}
                <div className='mt-7'>
                    {subheading}
                </div>

                {/* button */}
                <div className='flex gap-7 mt-7 p-3'>
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
                        <div className='flex flex-row items-center gap-3'>
                        {ctabtn1.ttext}
                        <FaArrowRight></FaArrowRight>
                        </div>
                            
                    </CTAButton>
                    
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
                        {ctabtn2.ttext}
                    </CTAButton>
                </div>

        </div>

        {/* Section-2 */}
        <div className='h-fit flex flex-row  py-3 w-[500px] gap-2 border-2 border-richblack-300 rounded-md px-2'>
            <div className='flex flex-col w-[10%]'>
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p>•</p>
                <p>•</p>
            </div>

            <div className='font-bold'>
                <TypeAnimation
                    sequence={[codeblock,2000,""]}
                    repeat={Infinity}
                    cursor={true}

                    style={{
                        whiteSpace:"pre-line",
                        display:"block",
                        overflowX:"hidden",
                        fontSize:"16px",
                    }}
                    omitDeletionAnimation={true}
                />
            </div>
        </div>

    </div>
  )
}

export default CodeBlocks


