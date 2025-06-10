const express = require("express")
const router = express.Router()

const {auth,isInstructor,isAdmin} = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard
} = require("../controllers/Profile")

//delete account
router.delete("/deleteProfile",auth,deleteAccount)

//update profile
router.put("/updateProfile",auth,updateProfile)

//get all details about user
router.get("/getUserDetails",auth,getAllUserDetails)

//get enrolled courses
router.get("/getEnrolledCourses",auth,getEnrolledCourses)

//update display picture
router.put("/updateDisplayPicture",auth,updateDisplayPicture)

//get instructor dashboard
 router.get("/instructorDashboard",auth,isInstructor,instructorDashboard)
// router.get("/instructorDashboard",instructorDashboard)
module.exports = router
