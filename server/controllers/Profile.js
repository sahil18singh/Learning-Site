const { default: mongoose } = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const {uploadImageToCloudinary} = require("../utils/imageUploder");
const {convertSecondsToDuration} = require("../utils/secToDuration");

exports.updateProfile = async (req,res)=>{
    try {
		const { dateOfBirth, about, contactNumber,firstName,lastName,gender } = req.body;
       // console.log("dob  ",dateOfBirth);
		const id = req.user.id;
            console.log("about  ",about);
		// Find the profile by id
		const userDetails = await User.findById(id);
		const profile = await Profile.findById(userDetails.additionalDetails);

		// Update the profile fields
		userDetails.firstName = firstName || userDetails.firstName;
		userDetails.lastName = lastName || userDetails.lastName;
		profile.dateOfBirth = dateOfBirth || profile.dateOfBirth;
		profile.about = about || profile.about;
		profile.gender=gender || profile.gender;
		profile.contactNumber = contactNumber || profile.contactNumber;

		// Save the updated profile
		await profile.save();
		await userDetails.save();

		return res.json({
			success: true,
			message: "Profile updated successfully",
			profile,
			userDetails
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};


//delete account
//Explore -> how can we schedule this deletion operation
exports.deleteAccount = async (req,res)=>{
    try{
        //get id
        const id = req.user.id
        //validation
        const user= await User.findById(id);
        
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found",
            });
        }
        
        //delete profile
        await Profile.findByIdAndDelete(user.additionalDetails);
      //  console.log("hello  ");
        //TODO: HW uneroll user from all enroll courses
        await User.findByIdAndDelete(id);
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"User cannot be deleted successfully",
        });
    }
};


exports.getAllUserDetails = async (req,res) =>{
    try{
        //get id
        const id=req.user.id;

        //validation and get user details
        const userDetails = await  User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:'User data fetched successfully',
            userDetails,
        });
    }

    catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        })
    }
}

exports.updateDisplayPicture = async (req,res)=>{
    try {

		const id = req.user.id;
	const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}
}


exports.getEnrolledCourses = async (req,res)=>{
    try{
        const userId = req.user.id
        let userDetails = await User.findOne({
            _id:userId,
        })
        .populate({
            path:"courses",
            populate:{ 
                path:"courseContent",
                    populate:{
                        path:"subSection",
                    },
          },
        })
        .exec()

        userDetails = userDetails.toObject()
        var SubsectionLength = 0
        for(var i=0;i<userDetails.courses.length;i++){
            let totalDurationInSeconds = 0
            SubsectionLength = 0

            for(var j=0;j<userDetails.courses[i].courseContent.length;j++){
                totalDurationInSeconds+=userDetails.courses[i].courseContent[j].subSection.reduce((acc,curr)=>acc+parseInt(curr.timeDuration),0)
                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds
                )
                SubsectionLength+=userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
              })
              courseProgressCount = courseProgressCount?.completedVideos.length
              if (SubsectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100
              } else {
                // To make it up to 2 decimal point
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage =
                  Math.round(
                    (courseProgressCount / SubsectionLength) * 100 * multiplier
                  ) / multiplier
              }
            }
        

        if (!userDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find user with id: ${userDetails}`,
            })
          }
          return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })
        }
         catch (error) {
          return res.status(500).json({
            success: false,
            message: error.message,
          })
        }
    }


//instructorDashBoard
exports.instructorDashboard = async (req,res)=>{
    try{
        const courseDetails = await Course.find({instructor:req.user.id})

        const courseData = courseDetails.map((course)=>{
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmountGenerated = totalStudentsEnrolled*course.price

            //create new object with additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenerated,
            }
            return courseDataWithStats
        })

        return res.status(200).json({courses:courseData})
    }
    catch(error){
        console.error(error)
        return res.status(500).json({
            message:"Server error"
        })
    }
}
