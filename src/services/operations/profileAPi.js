import { setProgress } from "../../slices/loadingBarSlice";
import { apiConnector } from "../apiconnector";
import { profileEndpoints, settingsEndpoints } from "../apis";
import {toast} from "react-hot-toast";
import { logout } from "./authAPI";


//getEnrolledCourses
export async function getUserCourses(token,dispatch){
    dispatch(setProgress(0));
    let result;
    try{
        console.log("BEFORE CALLING BACKEND API FOR ENROLLED COURSES");
        const response = await apiConnector(
            "GET",
            profileEndpoints.GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorisation:`Bearer ${token}`,
            }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

        if(!response.data.success){
            throw new Error(response.data.message)
        }
       // console.log("result  ",response.data.data);
        result = response.data.data
       // console.log("result ",result)
    }
    catch(error){
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could not get Enrolled Couses")
    }
    dispatch(setProgress(100))
    return result
}

//updateProfilePicture
export async function updatePfp(token,pfp){
    const toastId = toast.loading("Uploading...");
    try{
        const formData = new FormData();
        console.log("pfp",pfp)
        formData.append('pfp',pfp);
        const response = await apiConnector("PUT",settingsEndpoints.UPDATE_DISPLAY_PICTURE_API,formData,{
            Authorisation:`Bearer ${token}`,
        });
        console.log("UPDATED_DISPLAY_PICTURE_RESPONSE.........",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Profile Picture Updated Successfully");
        const imageUrl = response.data.data.image;
        localStorage.setItem("user",JSON.stringify({...JSON.parse(localStorage.getItem("user")),image:imageUrl}));
        console.log(JSON.parse(localStorage.getItem("user")).image);
    }
    catch(error){
        console.log("UPDATED_DISPLAY_PICTURE_API_ERROR.....",error)
        toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
}


//updateAdditionalDetails
export async function updateAdditionalDetails(token,additionalDetails){
    console.log("additionalDetails",additionalDetails);
    const {firstName,lastName,dateOfBirth,gender,contactNumber,about} = additionalDetails;
    const toastId = toast.loading("Updating...");
    try{
        //console.log("dob  ",dateofBirth )
        const response = await apiConnector("PUT",settingsEndpoints.UPDATE_PROFILE_API,{firstName,lastName,dateOfBirth,gender,contactNumber,about},{
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_ADDITIONAL_DETAILS_API API RESPONSE............", response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Additional Details Updated Successfully");
        const user = JSON.parse(localStorage.getItem("user"));
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.additionalDetails.dateOfBirth = dateOfBirth || user.additionalDetails.dateOfBirth;
        user.additionalDetails.contactNumber = contactNumber || user.additionalDetails.contactNumber;
        user.additionalDetails.about = about || user.additionalDetails.about;
        user.additionalDetails.gender=gender
        localStorage.setItem("user",JSON.stringify(user));
    }
    catch(error){
        console.log("UPDATE_ADDITIONAL_DETAILS_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}


//updatePassword
export async function updatePassword(token,password){
    const {oldPassword,newPassword,confirmPassword:confirmNewPassword} = password;
    console.log("password ",password);
    const toastId = toast.loading("Updating...");
    try{
        console.log("front   ",confirmNewPassword)
        const response = await apiConnector("POST",settingsEndpoints.CHANGE_PASSWORD_API,{oldPassword,newPassword,confirmNewPassword},{
            Authorisation: `Bearer ${token}`,
        });
        console.log("UPDATE_PASSWORD_API API RESPONSE.......",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Password Updated Successfully");
    }
    catch(error){
        console.log("UPDATE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId);
}

//deleteAccount
export async function deleteAccount(token,dispatch,navigate){
    const toastId = toast.loading("Deleting...");
    try{
      //  console.log("hellooo");
        const response = await apiConnector("DELETE",settingsEndpoints.DELETE_PROFILE_API,null,{
            Authorisation: `Bearer ${token}`,
        });
        console.log("DELETE_ACCOUNT_API_RESPONSE.......",response)
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("Account Deleted Successfully");
        dispatch(logout(navigate))
    }
    catch(error){
        console.log("DELETE_ACCOUNT_API_ERROR ERROR......",error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

//get instructor dashboard
export async function getInstructorDashboard(token,dispatch){
  // const toastId = toast.loading("Loading...");
  dispatch(setProgress(30));
  let result = []
  try {
    console.log("BEFORE Calling BACKEND API FOR INSTRUCTOR DASHBOARD");
    const response = await apiConnector(
      "GET",
      'http://localhost:4000/api/v1/profile//instructorDashboard',
      null,
      {
        Authorisation: `Bearer ${token}`,
      }
    )
    console.log("AFTER Calling BACKEND API FOR INSTRUCTOR DASHBOARD");
    // console.log(
    //   "GET_INSTRUCTOR_DASHBOARD_API API RESPONSE............",
    //   response
    // )

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data.data;
  } catch (error) {
    console.log("GET_INSTRUCTOR_DASHBOARD_API API ERROR............", error)
    toast.error("Could Not Get Instructor Dashboard")
  }
  dispatch(setProgress(100));
  // toast.dismiss(toastId)
  return result
}