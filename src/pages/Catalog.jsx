import React, { useDebugValue, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CatalogCard from '../components/core/Catalog/CatalogCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';


const Catalog = () => {
    const Catalog = useParams();
    const [Desc,setDesc] = useState([]);
    const [CatalogPageData,setCatalogPageData] = useState(null);
    const [categoryID,setcategoryID] = useState(null);
    const [activeOption,setActiveOption] = useState(1);
    const dispatch = useDispatch();

    const fetchSublinks = async ()=>{
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            const category_id = result.data.data.filter((item)=>item.name===Catalog.catalog)[0]._id;
            setcategoryID(category_id);
            setDesc(result.data.data.filter((item)=>item.name===Catalog.catalog)[0]);
        }
        catch(error){
            console.log("could not fetch sublinks");
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchSublinks();
    },[Catalog])

    useEffect(()=>{
        const fetchCatalogPageData = async()=>{
            const result = await getCatalogPageData(categoryID,dispatch);
            setCatalogPageData(result);
        }
        if(categoryID){
            fetchCatalogPageData();
        }
    },[categoryID])

  return (
    <div>
        <div className='box-content bg-richblack-800 px-4'>
            <div className='mx-auto flex flex-col min-h-[260px] justify-center gap-4'>
                <p className='text-sm text-richblack-300'>Home / Catalog / <span className='text-yellow-25'>{Catalog.catalog}</span></p>
                <p className='text-3xl text-richblack-5'>{Catalog.catalog}</p>
                <p className='max-w-[870px] text-richblack-200'>{Desc?.description}</p>
            </div>
        </div>

        <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
        Courses to get you started
        </h2>
        <CourseSlider Courses={CatalogPageData?.selectedCourses}/>        
      </div>


      <div className=' mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Similar to {Catalog.catalog}
        </h2>
        <CourseSlider Courses={CatalogPageData?.differentCourses}/>
      </div>


      <div className=' mx-auto box-content w-full max-w-maxContentTab px-2 py-12 lg:max-w-maxContent'>
        <h2 className='section_heading mb-6 md:text-3xl text-xl'>
          Frequently BoughtTogether
          </h2>
          <div className='grid grid-cols-2 gap-3 lg:gap-6 lg:grid-cols-2 pr-4'>
            {
              CatalogPageData?.mostSellingCourses?.map((item,index)=>(
                <CatalogCard key={index} course={item} Height={"h-[100px] lg:h-[400px]"} />
              ))
            }
          </div>
      </div>

    </div>
  )
}

export default Catalog
