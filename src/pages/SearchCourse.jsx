import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { searchCourse } from '../services/operations/courseDetailsAPI';
import {HiOutlineEmojiSad} from 'react-icons/hi'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import CatalogCard from '../components/core/Catalog/CatalogCard'

const SearchCourse = () => {
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {searchQuery} = useParams();
    const fetchSearchResults = async()=>{
        setLoading(true);
        const res = await searchCourse(searchQuery,dispatch);
        setSearchResult(res);
        setLoading(false);
        console.log(res);
    }

    useEffect(()=>{
        fetchSearchResults();
    },[searchQuery])
  return (
    <div>
      <div className='mx-auto flex min-h-[260px]  flex-col justify-center gap-4 p-5 bg-richblack-800 '>
      <p className='text-sm text-richblack-300'>Home / Search / <span className='text-yellow-25'>{searchQuery}</span> </p>
        <p className='text-3xl text-richblack-5'>Search Results for {searchQuery}</p>
        <p className='max-w-[870px] text-richblack-200'>
            {searchResult?.length} results found for {searchQuery}
        </p>
      </div>

      {
        loading?(
        <div className='flex gap-6 flex-wrap justify-evenly overflow-hidden m-9'>
            <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div>
                    <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
            </SkeletonTheme>

            <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div>
                    <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
            </SkeletonTheme>

            <SkeletonTheme baseColor="#2C333F" highlightColor="#161D29">
                <div>
                    <Skeleton  className="md:h-[200px] lg:w-[400px] h-[100px] w-[200px] rounded-xl" />
                  <Skeleton className=" md:h-[20px] w-[70px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md" />
                  <Skeleton className="md:h-[20px] md:w-[400px] rounded-md"/>
                </div>
            </SkeletonTheme>
        </div>
        ):(searchQuery?.length===0?(<div className='mx-auto flex min-h-[500px] items-center  flex-col justify-center gap-4 p-5 bg-richblack-900'>
            <p className='text-3xl text-richblack-5'>No Results Found</p>
            <HiOutlineEmojiSad className=' text-richblack-100 text-[100px]' />
        </div>
        ):(
        <div className='mx-auto flex flex-wrap p-5 gap-4 justify-evenly m-5'>
            {searchResult?.map((item,index)=>(
                <div className='flex flex-col gap-4' key={index}>
                    <CatalogCard course={item} Height={"lg:h-[250px] h-[100px]"}/>
                </div>
            ))}
        </div>
        ))
      }
    </div>
  )
}

export default SearchCourse
