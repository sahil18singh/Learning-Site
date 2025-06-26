const express = require("express")
const router = express.Router()

// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
    searchCourse
} = require("../controllers/Course")

// Categories Controllers Import
const{
    showAllCategories,
    createCategory,
    categoryPageDetails,
    addCourseToCategory,
} = require("../controllers/Category")

//Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")

//Sub-Section Controllers Import
const{
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection")

//Rating Controllers Import
const{
    createRating,
    getAverageRating,
    getAllRating
} = require("../controllers/RatingAndReview")

const {
    updateCourseProgress
} = require("../controllers/courseProgress")

//Importing Middleware
const {auth,isInstructor,isStudent,isAdmin} = require("../middlewares/auth")

//Course can only be created by instructor
router.post("/createCourse",auth,isInstructor,createCourse)

//Add section to a course
router.post("/addSection",auth,isInstructor,createSection)

//update a section
router.put("/updateSection",auth,isInstructor,updateSection)

//Delete a section
router.delete("/deleteSection",auth,isInstructor,deleteSection)

//Edit Sub Section
router.put("/updateSubSection",auth,isInstructor,updateSubSection)

//Delete Sub Section
router.delete("/deleteSubSection",auth,isInstructor,deleteSubSection)

//Add a subSection to a section
router.post("/addSubSection",auth,isInstructor,createSubSection)

//Get all registered course
router.get("/getAllCourses",getAllCourses)

//get details for a specific course
router.post("/getCourseDetails",getCourseDetails)

//get full course details
router.post("/getFullCourseDetails",auth,getFullCourseDetails)

//Edit course routes
router.post("/editCourse",auth,editCourse)
router.post("/addCourseToCategory", auth, isInstructor, addCourseToCategory);
//Get all course under specific instructor
router.get("/getInstructorCourses",auth,isInstructor,getInstructorCourses)

//Delete a course
router.delete("/deleteCourse",deleteCourse)

router.put("/updateCourseProgress",auth,isStudent,updateCourseProgress)


//CATEGORY ROUTE(Only by Admin)

router.post("/createCategory",auth,isAdmin,createCategory)

router.get("/showAllCategories",showAllCategories)

router.post("/getCategoryPageDetails",categoryPageDetails)


//Rating and review

router.post("/createRating",auth,isStudent,createRating)
router.get("/getAverageRating",getAverageRating)
router.get("/getReviews",getAllRating)


router.post("/searchCourse",searchCourse)

module.exports = router
