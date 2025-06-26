import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from "../assets/logo.jpg"
import { NavbarLinks } from '../data/navbar-link'
import { matchPath, useLocation } from 'react-router-dom'
import { useSelector } from "react-redux"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import ProfileDropdown from '../components/Auth/ProfileDropdown'
import { ACCOUNT_TYPE } from '../utils/constant'
import { apiConnector } from "../services/apiconnector"
import { categories } from '../services/apis'
import { HiSearch } from "react-icons/hi";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const { totalItems } = useSelector((state) => state.cart)
  const [searchValue, setSearchValue] = useState("")
  const [subLinks, setSubLinks] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  const fetchSublinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API)
      if (result?.data?.data?.length > 0) {
        setSubLinks(result?.data?.data)
        localStorage.setItem("sublinks", JSON.stringify(result.data.data))
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchSublinks()
  }, [])

  const handelSearch = (e) => {
    e.preventDefault()
    if (searchValue?.length > 0) {
      navigate(`/search/${searchValue}`)
      setSearchValue("")
    }
  }

  return (
    <div className='h-14 border-b border-richblack-600'>
      <div className='flex w-11/12 mx-auto items-center justify-between mt-2'>

        {/* Logo */}
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" width={40} height={8} className='rounded-full' />
          </Link>
        </div>

        {/* Nav Links */}
        <nav>
          <ul className='flex flex-row gap-6'>
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className={`group relative flex cursor-pointer items-center gap-1 ${matchRoute("/catalog/:catalogName") ? "text-yellow-25" : "text-richblack-25"}`}>
                    <p>{link.title}</p>
                    <BsChevronDown />

                    {/* Dropdown */}
                    <div className="invisible absolute z-[1000] flex flex-col w-[200px] lg:w-[300px] bg-richblack-5 p-4 text-richblack-900 rounded-lg opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:visible left-1/2 -translate-x-1/2 top-[120%] shadow-md">
                      {/* Arrow */}
                      <div className="absolute rotate-45 h-4 w-4 bg-richblack-5 top-[1px] left-1/2 -translate-x-1/2 -z-10"></div>

                      {loading ? (
                        <p className="text-center text-black">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((subLink, i) => (
                          <Link
                            to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`}
                            className="rounded-lg bg-transparent py-2 px-2 hover:bg-richblack-50"
                            key={i}
                          >
                            <p>{subLink.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-center">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}

            {/* Search Bar */}
            <form onSubmit={handelSearch} className="flex items-center relative">
              <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                id="searchinput"
                type="text"
                placeholder="Search"
                className="border-0 focus:ring-1 ring-richblack-400 rounded-full px-2 py-1 text-[15px] w-28 text-richblack-50 focus:outline-none focus:border-transparent bg-richblack-700"
              />
              <button type="submit" className="absolute top-1 left-20 text-richblack-100 cursor-pointer">
                <HiSearch size={20} />
              </button>
            </form>
          </ul>
        </nav>

        {/* Right-side Buttons */}
        <div className='flex flex-row gap-x-8'>
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart className='text-2xl text-richblack-100' />
              {totalItems > 0 && (
                <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {!token && (
            <>
              <Link to="/login">
                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 mr-3'>
                  Log In
                </button>
              </Link>
              <Link to="/signup">
                <button className='rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100'>
                  Sign Up
                </button>
              </Link>
            </>
          )}

          {token && <ProfileDropdown />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
