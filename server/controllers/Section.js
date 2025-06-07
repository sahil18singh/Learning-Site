const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection = async (req,res)=>{
    try {
		// Extract the required properties from the request body
		const { sectionName, courseId } = req.body;

		// Validate the input
		if (!sectionName || !courseId) {
			return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}
		
		const ifcourse= await Course.findById(courseId);
		if (!ifcourse) {
			return res.status(404).json({
                success: false,
                message: "Course not found",
            });
        }

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the course's content array
		const updatedCourse = await Course.findByIdAndUpdate(
			courseId,
			{
				$push: {
					courseContent: newSection._id,
				},
			},
			{ new: true }
		)
			.populate({
				path: "courseContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedCourse,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
} 


exports.updateSection = async (req,res)=>{
    try{
        //data input
        const {sectionName,sectionId,courseId} = req.body;

        //data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Missing Properties',
            });
        }

        //update data
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});

        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            }
        })
        .exec()

        //return response
        return res.status(200).json({
            success:true,
            messgae:'Success updated Successfully',
            data:course,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update Section, please try again',
            error:error.message,
        });
    }
}

exports.deleteSection = async (req,res)=>{
    try{
        //get ID - assuming that we are sending ID in params
        const {sectionId,courseId} = req.body;
        await Course.findByIdAndUpdate(courseId,{
            $pull:{
                courseContent:sectionId,
            }
        })

        const section = await Section.findById(sectionId)
        if(!section){
            return res.status(404).json({
                success:false,
                message:"Section not found",
            })
        }

        await SubSection.deleteMany({_id:{$in:section.subSection}});

        await Section.findByIdAndDelete(sectionId)

        const course = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        .exec()

        return res.status(200).json({
            succss:true,
            message:"Section deleted",
            data:"Course",
        })

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete Section, please try again',
            error:error.message,
        });
    }
}