import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.jpg"
import { NavbarLinks } from '../data/navbar-link'
import { matchPath,useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineMenu,AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropdown from '../components/Auth/ProfileDropdown'
import { ACCOUNT_TYPE } from '../utils/constant'
import {apiConnector} from "../services/apiconnector"
import { categories } from '../services/apis'
import { HiSearch } from "react-icons/hi";



const Navbar = () => {
    const {token} = useSelector((state)=>state.auth)
    const {user} = useSelector((state)=>state.profile)
    const {totalItems} = useSelector((state)=>state.cart)
    const[searchValue,setSearchValue] = useState("")
    const navigate = useNavigate()

    const location = useLocation();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname)
    }

    const [subLinks,setSubLinks] = useState([]);
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      ;(async ()=>{
        setLoading(true)
        try{
          const res = await apiConnector("GET",categories.CATEGORIES_API)
          setSubLinks(res.data.data) 
        }
        catch(error){
            console.log("Could not fetch categories.",error)
        }
        setLoading(false)
      })()
    },[])

    const handelSearch = (e)=>{
      e.preventDefault();
      if(searchValue?.length>0){
        navigate(`/search/${searchValue}`);
        setSearchValue("");
      }
    }

  return (
    <div className='h-14 border-b border-richblack-600'>
      <div className=' flex w-11/12  items-center justify-between mt-2'>

        {/* Logo */}
      <div className=''>
        <Link to="/">
            <img src={Logo} alt="logo" width={40} height={8} className='rounded-full' />
        </Link>
      </div>

      <nav>
        <ul className='flex flex-row gap-6'>
            {NavbarLinks.map((link,index)=>(
                <li key={index}>
                    {link.title==="Catalog"?(
                      <div className={`group relative flex cursor-pointer items-center gap-1 ${
                        matchRoute("/catalog/:catalogName")?"text-yellow-25":"text-richblack-25"
                      }`}>
                        <p>{link.title}</p>
                        <BsChevronDown/>
                        <div className='invisible absolute z-[1000] flex flex-col w-[200px]  bg-richblack-100 left-[20%] top-[95%] rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-50 group-hover:opacity-100 lg:w-[300px] group-hover:visible'>
                        <div className='absolute rotate-45 top-0 -z-10 h-6 w-6 rounded bg-richblack-5 top-[0.5%]'></div>
                        {loading ? (<p className='text-center'>Loading...</p>):(subLinks && subLinks.length)?(
                          <>
                            {subLinks?.filter(
                              (subLinks)=>subLinks?.length>0
                            )
                            ?.map((subLinks,i)=>(
                              <Link to={`/catalog/${subLinks.name
                                .split(" ")
                                .join("-")
                                .toLowerCase()
                              }`} className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'
                              key={i}
                              >
                                <p>{subLinks.name}</p>

                              </Link>
                            ))
                            }
                          </>
                        ):(
                          <p className="text-center">No Courses Found</p>
                        )}
                        </div>

                      </div>
                    ):(
                        <Link to={link?.path}>
                            <p 
                             className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}
                            >{link.title}</p>

                        </Link>
                    )}
                </li>
            ))}
             <form onSubmit={handelSearch} className="flex items-center relative">
              <input
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  id="searchinput"
                  type="text"
                  placeholder="Search"
                  className="border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700"
                  aria-label="Search" // Added for accessibility
              />
              <button
                  type="submit"
                  id="searchicon"
                  className="absolute top-1 left-20 text-richblack-100 cursor-pointer"
              >
                  <HiSearch size={20} />
    </button>
</form>
        </ul>
      </nav>

            {/* Login/SignUp/DashBoard */}
            <div className='flex flex-row gap-x-8'>
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className='text-2xl text-richblack-100'/>
                {totalItems>0 && (
                  <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {token===null && (
              <Link to="/login">
                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 mr-3'>
                  Log In
                </button>
              </Link>
            )}

            {token===null && (
                 <Link to="/signup">
                    <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                     Sign Up
                      </button>
                    </Link>
             )}

             {token!==null && <ProfileDropdown/>}


            </div>

    </div>
    </div>
  )
}

export default Navbar