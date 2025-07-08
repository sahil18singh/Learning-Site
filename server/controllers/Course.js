const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary} = require("../utils/imageUploder");
const {convertSecondsToDuration} = require("../utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");


//createCourse  function
exports.createCourse = async (req,res)=>{
    try {

		const userId = req.user.id;

		let {
			courseName,
			courseDescription,
			whatYouWillLearn,
			price,
			tag,
			category,
			status,
			instructions,
		} = req.body;

		const thumbnail = req.files.thumbnailImage;

		if (!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail || !category){
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}

		const instructorDetails = await User.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}

		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);

		const newCourse = await Course.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		await User.findByIdAndUpdate({_id: instructorDetails._id,},{$push: {courses: newCourse._id,},},{ new: true });
		
    // Add the new course to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};



//getAllCourse handler function

exports.getAllCourses = async (req,res)=>{
    try{
        const allCourse = await Course.find({},
            {
                courseName:true,
                price:true,
                thumbnail:true,
                instructor:true,
                ratingAndReviews:true,
                studentsEnrolled:true,
            }
        )
        .populate("instructor").exec();

        return res.status(200).json({
            success:true,
            message:"Data for all courses fetched successfully",
            data:allCourse,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Cannot fetch course data",
            error:error.message,
        })
    }
}

//getCourseDetail

exports.getCourseDetails = async (req,res) =>{
    try {
        const {courseId} = req.body; 

        const courseDetails = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" }
            })
            .populate("category")
            .populate({
                path: "ratingAndReviews",
                populate: { path: "user", select: "firstName lastName accountType image" }
            })
            .populate({
                path: "courseContent",
                populate: { path: "subSection" }
            })
            .exec();
    
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course Not Found"
            });
        }
    
        return res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            data: courseDetails
        });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch course data",
            error: error.message
        });
    }
}

// function to get all courses of a particular instructor
exports.getInstructorCourses = async (req,res)=>{
    try{
        const userId = req.user.id;

        const allCourses = await Course.find({instructor:userId});
        return res.status(200).json({
            success:true,
            data:allCourses,
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Failed to fetch courses",
            error:error.message,
        });
    }
}

//edit course details
exports.editCourse = async(req,res)=>{
    try {
        // console.log("hello.........edit.......");
        const {courseId} = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
        
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // if thumbnail image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnailImage
          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
              course[key] = JSON.parse(updates[key])
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
    
        res.json({
          success: true,
          message: "Course updated successfully",
          data: updatedCourse,
        })
      } catch (error) {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        })
      }
    }


//get full course details
exports.getFullCourseDetails = async (req, res) => {
	try {
	  const { courseId } = req.body
	  const userId = req.user.id
	  const courseDetails = await Course.findOne({
		_id: courseId,
	  })
		.populate({
		  path: "instructor",
		  populate: {
			path: "additionalDetails",
		  },
		})
		.populate("category")
		.populate("ratingAndReviews")
		.populate({
		  path: "courseContent",
		  populate: {
			path: "subSection",
		  },
		})
		.exec()
		
	  let courseProgressCount = await CourseProgress.findOne({
		courseID: courseId,
		userID: userId,
	  })
  
	  console.log("courseProgressCount: ", courseProgressCount)
  
	  if (!courseDetails) {
		return res.status(400).json({
		  success: false,
		  message: `Could not find course with id: ${courseId}`,
		})
	  }
  
  
	  let totalDurationInSeconds = 0
	  courseDetails.courseContent.forEach((content) => {
		content.subSection.forEach((subSection) => {
		  const timeDurationInSeconds = parseInt(subSection.timeDuration)
		  totalDurationInSeconds += timeDurationInSeconds;
		})
	  })
  
	  const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
	  return res.status(200).json({
		success: true,
		data: {
		  courseDetails,
		  totalDuration,
		  completedVideos: courseProgressCount?.completedVideos
			? courseProgressCount?.completedVideos
			: ["none"],
		},
	  })
	} catch (error) {
	  return res.status(500).json({
		success: false,
		message: error.message,
	  })
	}
  }

//delete course
exports.deleteCourse = async (req,res)=>{
    try{
        const {courseId} = req.body
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({
                message:"Course not found"
            })
        }

        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId,{
                $pull:{courses:courseId},
            })
        }

        //delete section and sub-Section
        const courseSections = course.courseContent
        for(const sectionId of courseSections){
            //delete sub-section of section
            const section = await Section.findById(sectionId)
            if(section){
                const subSection = section.subSection
                for(const subSectionId of subSection){
                    await SubSection.findByIdAndDelete(subSectionId);
                }   
            }
            //delete the section
            await Section.findByIdAndDelete(sectionId)
        }

        //delete course id from Category
        await Category.findByIdAndUpdate(course.category._id,{
            $pull:{course: courseId},
        })

        //delete course id from instructor
        await User.findByIdAndUpdate(course.instructor._id,{
            $pull:{course: courseId},
        })

        //delete the course 
        await Course.findByIdAndDelete(courseId);

        return res.status(200).json({
            success:true,
            message:"Course deleted Successfully",
        })
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            success:false,
            message:"Server error",
            error:error.message,
        })
    }
}

//search course by title,description and tags array
exports.searchCourse = async (req,res)=>{
    try{
        const {searchQuery} = req.body

        const courses = await Course.find({
            $or: [
                {courseName: {$regex: searchQuery, $options: "i"}},
                {courseDescription: {$regex: searchQuery, $options:"i"}},
                {tag:{$regex: searchQuery, $options:"i"}},
            ],
        })
        .populate({
            path:"instructor",
        })
        .populate("category")
        .populate("ratingAndReviews")
        .exec();

        return res.status(200).json({
            success:true,
            data:courses,
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//mark lecture as completed
exports.markLectureAsCompleted = async (req,res)=>{
    const {courseId,subSectionId,userId} = req.body;
    if(!courseId || !subSectionId || !userId){
        return res.status(400).json({
            success: false,
            message: "Missing required fields",
          })
    }
    try{
        progressAlreadyExists = await CourseProgress.findOne({
            userId:userId,
            courseId:courseId,
        })
        const completedVideos = progressAlreadyExists.completedVideos
        if(!completedVideos.includes(subSectionId)){
            await CourseProgress.findOneAndUpdate(
                {
                    userId:userId,
                    courseID:courseId,
                },
                {
                    $push: {completedVideos:subSectionId},
                }
            )
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Lecture already marked as complete",
            })
        }

        return res.status(200).json({
            success:true,
            message:"Lecture marked as complete",
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}