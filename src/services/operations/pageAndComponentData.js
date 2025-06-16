import toast from "react-hot-toast";
import { catalogData } from "../apis";
import { setProgress } from "../../slices/loadingBarSlice";
import { apiConnector } from "../apiconnector";


export const getCatalogPageData = async(categoryId,dispatch)=>{
    dispatch(setProgress(50));
    let result = [];
    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId:categoryId,});
        console.log("CATALOG PAGE DATA API RESPONSE....", response);
        if(!response.data.success){
            throw new Error("Could not Fetch Category page data error",response);
        }
        result = response?.data;
    }
    catch(error){
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error("No Course added to this category yet");
        result = error.response?.data;
    }
    dispatch(setProgress(100));
    return result;
}