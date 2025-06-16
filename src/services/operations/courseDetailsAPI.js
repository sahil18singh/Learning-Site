import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import {toast} from "react-hot-toast"
import { setProgress } from "../../slices/loadingBarSlice";


const {
    COURSE_DETAILS_API,
    COURSE_CATEGORIES_API,
    CREATE_CATEGORY_API,
    GET_ALL_COURSE_API,
    CREATE_COURSE_API,
    EDIT_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    CREATE_RATING_API,
    LECTURE_COMPLETION_API,
    ADD_COURSE_TO_CATEGORY_API,
    SEARCH_COURSES_API,
  } = courseEndpoints;


export const getAllCourses = async () =>{
    const toastId = toast.loading("Loading...");
    let result = [];
    try{
        const response = await apiConnector("GET",GET_ALL_COURSE_API);
        if(!response?.data?.success){
            throw new Error("COuld not fetch course Categories");
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("GET ALL COURSE API ERROR......",error);
        toast.error(error.mesasage);
    }
    toast.dismiss(toastId);
    return result;
}

export const fetchCourseDetails = async (courseId,dispatch)=>{
    dispatch(setProgress(50));
    let result = null;
    console.log("CourseId,  ",courseId);
    try{
        const response = await apiConnector("POST",COURSE_DETAILS_API,{
            courseId
        });
        console.log("COURSE_DETAILS_API API RESPONSE............", response.data);
        if (!response.data.success) {
            throw new Error(response.data.message);
          }
          result = response.data.data;
    }
    catch(error){
        console.log("COURSE_DETAILS_API API ERROR............", error);
        result = error.response.data;
    }
    dispatch(setProgress(100));
    return result;
}


export const fetchCourseCategories = async ()=>{
    let result = [];
    try{
        const response = await apiConnector("GET",COURSE_CATEGORIES_API);
        console.log("COURSE_CATEGORIES_API API RESPONSE............", response);
        if (!response?.data?.success) {
             throw new Error("Could Not Fetch Course Categories");
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("COURSE_CATEGORY_API API ERROR............", error);
        toast.error(error?.response?.data?.message);
    }
    return result;
}


export const addCourseDetails = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",CREATE_COURSE_API,data,{
            "Content-Type" : "multipart/form-data",
            Authorisation : `Bearer ${token}`,
        });
        console.log("CREATE COURSE API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Add Course Details");
        }
        toast.success("Course Details Added Successfully");
         result = response?.data?.data;
    }
    catch(error){
        console.log("CREATE COURSE API ERROR............", error);
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
    return result;
}


export const editCourseDetails = async (data,token)=>{
    let result = null;
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("POST", EDIT_COURSE_API, data, {
      "Content-Type": "multipart/form-data",
      Authorisation: `Bearer ${token}`,
    });
    console.log("EDIT COURSE API RESPONSE............", response);
    if (!response?.data?.success) {
      throw new Error("Could Not Update Course Details");
    }
    toast.success("Course Details Updated Successfully");
    result = response?.data?.data;
  } catch (error) {
    console.log("EDIT COURSE API ERROR............", error);
    toast.error(error.response.data.message);
  }
  toast.dismiss(toastId);
  return result;
}


export const createSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",CREATE_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE SECTION API RESPONSE.....",response);
        if(!response?.data?.success){
            throw new Error("Could not create Section");
        }
        toast.success("Course Section Created");
        result = response?.data?.updatedCourse;
        console.log("Create Api result.....",result);
    }
    catch(error){
        console.log("CREATE SECTION API ERROR......",error);
        toast.error(error.mesasage);
    }
    toast.dismiss(toastId);
    return result;
}


export const createSubSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Uploading...");
    try {
        const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
          Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
          throw new Error("Could Not Add Lecture");
        }
        toast.success("Lecture Added");
        result = response?.data?.data;
    } 
    catch (error) {
        console.log("CREATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
      toast.dismiss(toastId);
      return result;
}


export const updateSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",UPDATE_SECTION_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE SECTION API RESPONSE.....",response);
        if(!response?.data?.success){
            throw new Error("Could not update Section");
        }
        toast.success("Course Section Updated");
        result = response?.data?.updatedCourse;
        console.log("Update API RESULT............", result);
    }
    catch(error){
        console.log("UPDATE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const updateSubSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`,
          });
          console.log("UPDATE SUB-SECTION API RESPONSE............", response);
          if (!response?.data?.success) {
            throw new Error("Could Not Update Lecture");
          }
          toast.success("Lecture Updated");
          result = response?.data?.data;
    }
    catch(error){
        console.log("UPDATE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Lodaing...");
    try{
        const response = await apiConnector("DELETE",DELETE_SECTION_API,data,{
            Authorisation: `Bearer${token}`,
        });
        console.log("DELETE SECTION API RESPONSE............", response);
        if(!response?.data?.success){
            throw new Error("Could not Delete Section");
        }
        toast.success("Course Section Deleted");
        result = response?.data?.updatedCourse;
        console.log("Delete API RESULT............", result);
    }
    catch(error){
        console.log("DELETE SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


export const deleteSubSection = async (data,token)=>{
    let result = null;
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE", DELETE_SUBSECTION_API, data, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE SUB-SECTION API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Lecture");
        }
        toast.success("Lecture Deleted");
        result = response?.data?.data;
        console.log("Delete subsection API RESULT............", result);
    }
    catch(error){
        console.log("DELETE SUB-SECTION API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return result;
}


//fetch all course under specific instructor
export const fetchInstructorCourses = async (token) => {
    let result = [];
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("GET", GET_ALL_INSTRUCTOR_COURSES_API, null, {
            Authorisation: `Bearer ${token}`,
        });

        console.log("INSTRUCTOR COURSES API RESPONSE:", response);

        if (!response?.data?.success) {
            throw new Error("Could not fetch Instructor Courses");
        }

        result = response?.data?.data;
    } catch (error) {
        console.error("INSTRUCTOR COURSES API ERROR:", error);
        toast.error(error.message || "Failed to fetch courses");
    } finally {
        toast.dismiss(toastId); // Ensures toast is dismissed no matter what
    }

    return result;
};


//delete a course
export const deleteCourse = async(data,token)=>{
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("DELETE",DELETE_COURSE_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE COURSE API RESPONSE............", response);
        if(!response?.data?.success){
            throw new Error("Could not delete course");
        }
        toast.success("Course Deleted");
    }
    catch(error){
        console.log("DELETE COURSE API ERROR.......",error);
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
};

//get full details of a course
export const getFullDetailsOfCourse = async(courseId,token)=>{
    const toastId = toast.loading("Loading...");
    let result = null;
    try{
        const response = await apiConnector("POST",GET_FULL_COURSE_DETAILS_AUTHENTICATED,{courseId},{
            Authorisation: `Bearer ${token}`
        });
        console.log("COURSE_FULL_DETAILS_API API RESPONSE............", response);

        if (!response.data.success) {
        throw new Error(response.data.message);
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("COURSE_FULL_DETAILS_API API ERROR............", error);
        result = error.response.data;
    }
    toast.dismiss(toastId);
    return result;
} 

//mark a lecture complete
export const markLectureAsComplete = async(data,token)=>{
    let result = null;
    console.log("mark complete data", data);
    const toastId = toast.loading("Loading...");
    try{
        const response = await apiConnector("POST",LECTURE_COMPLETION_API,data,{
            Authorisation: `Bearer ${token}`
        });
        console.log(
            "MARK_LECTURE_AS_COMPLETE_API API RESPONSE............",
            response
          );
      
          if (!response.data.message) {
            throw new Error(response.data.error);
          }
          toast.success("Lecture Completed");
          result = true;
    }
    catch(error){
        console.log("MARK_LECTURE_AS_COMPLETE_API API ERROR............", error);
        toast.error(error.message);
        result = false;
    }
    toast.dismiss(toastId);
    return result;
}

//add course to Category
export const addCourseToCategory = async (data,token)=>{
    const toastId = toast.loading("Loading...");
    let success = false;
    try{
        const response = await apiConnector("POST",ADD_COURSE_TO_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("ADD COURSE TO CATEGORY API RESPONSE............", response);
        if (!response?.data?.success) {
        throw new Error("Could Not Add Course To Category");
        }
        toast.success("Course Added To Category");
        success = true;
    }
    catch(error){
        success = false;
        console.log("ADD COURSE TO CATEGORY API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
}


//create category
export const createCategory = async (token,data)=>{
    const toastId = toast.loading("Loading...");
    let success = false;
    try{
        const response = await apiConnector("POST",CREATE_CATEGORY_API,data,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("CREATE CATEGORY API RESPONSE............", response);
        if (!response?.data?.success) {
            throw new Error("Could Not Create Category");
        }
        toast.success("Category Created");
        success = true;
    }
    catch(error){
        success = false;
        console.log("CREATE CATEGORY API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    return success;
}


//search course
export const searchCourse = async (searchQuery,dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setProgress(50));
    let result = null;
    try{
        const response = await apiConnector("POST",SEARCH_COURSES_API,{
            searchQuery:searchQuery,
        });
        console.log("SEARCH COURSE API RESPONSE............",response);
        if(!response?.data?.success){
            throw new Error("Could not Search Course");
        }
        result = response?.data?.data;
    }
    catch(error){
        console.log("SEARCH COURSES API ERROR............", error);
        toast.error(error.message);
    }
    toast.dismiss(toastId);
    dispatch(setProgress(100));
    return result;
}



// create a rating for course
export const createRating = async (data, token) => {
    const toastId = toast.loading("Loading...");
    let success = false;
    try {
      const response = await apiConnector("POST", CREATE_RATING_API, data, {
        Authorisation: `Bearer ${token}`,
      });
      console.log("CREATE RATING API RESPONSE............", response);
      if (!response?.data?.success) {
        throw new Error("Could Not Create Rating");
      }
      toast.success("Rating Posted");
      success = true;
    } catch (error) {
      success = false;
      console.log("CREATE RATING API ERROR............", error);
      toast.error(error.response.data.message);
    }
    toast.dismiss(toastId);
    return success;
};