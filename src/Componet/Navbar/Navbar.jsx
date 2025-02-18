import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext';

import logo from '../../assets/logo.png'
export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  let navigate = useNavigate();
  function Logout() {
    localStorage.removeItem('usertoken')
    setuserLogin(null)
    navigate('/Login')
  }
  return <>
    <div className='bg-gray-200 py-4 z-50  fixed top-0 left-0 flex justify-between  right-0 '>
      <div>
        
        <ul className='flex items-center  flex-col lg:flex-row'>
        <div className='flex items-center'><img src={logo} className='w-10  flex items-center   ms-5' alt="fresh cat logo" />
        <h2 className='text-2xl me-4 ps-2  font-extrabold'>Fresh Cart</h2></div>
          {userLogin !== null ? <>
            <li ><NavLink to="/"><span className='pe-4  ms-2 text-black font-bold'>home</span></NavLink></li>
            <li><NavLink to="Cart"><span className='px-4 text-black font-bold'>Cart</span></NavLink></li>
            <li><NavLink to="proudcts"><span className='px-4 text-black font-bold'>proudcts</span></NavLink></li>
            <li><NavLink to="Brands"><span className='px-4 text-black font-bold'>Brands</span></NavLink></li>
            <li><NavLink to="categories"><span className='px-4 text-black font-bold'>categories</span></NavLink></li></> : null}
        </ul></div>
      <div><ul className='flex flex-col lg:flex-row items-center'> {userLogin === null ? <><li><NavLink to="Regester"><span className='mx-2 text-black font-bold'>Regester</span></NavLink></li>
        <li><NavLink to="Login"><span className='mx-2  text-black font-bold'>login</span></NavLink></li></> :
        <li><span onClick={Logout} className='text-black cursor-pointer pe-6 font-bold'>Logout</span></li>
      }
        <div className='flex py-2 me-6'>    <i className='fas fa-brands px-1 fa-facebook'></i>
          <i className='fas fa-brands px-1 fa-instagram'></i>
          <i className='fas fa-brands px-1 fa-twitter'></i>
          <i className='fas fa-brands px-1 fa-youtube'></i>
          <i className='fas fa-brands px-1 fa-tiktok'></i></div>
      </ul>

      </div>


    </div>

  </>
}
