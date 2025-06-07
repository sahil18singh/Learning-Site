const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")

exports.updateCourseProgress = async (req,res)=>{
    const {courseId,subsectonId} = req.body
    const userId = req.user.id

    try{
        const subsection = await SubSection.findById(subsectonId)
        if(!subsection){
            return res.status(404).json({
                error:"Invalid Subsection"
            })
        } 

        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userID: userId,
        })
        
        if(!courseProgress){
            return res.status(404).json({
                success:false,
                message: "Course process does not exist",
            })
        }
        else{
            if(courseProgress.completedVideos.includes(subsectonId)){
                return res.ststus(400).json({
                    error:"SubSection already completed"
                })
            }

            courseProgress.completedVideos.push(subsectonId)
        }

        await courseProgress.save()

        return res.status(200).json({
            message:"Course process updated"
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            error:"Internal Server error"
        })
    }
}