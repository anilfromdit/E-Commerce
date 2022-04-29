import React from 'react'
import './navbar.css'
import {AiTwotoneHome} from 'react-icons/ai'
import {AiOutlineUser} from 'react-icons/ai'
import {AiOutlineProject} from 'react-icons/ai'
import {BiBook} from 'react-icons/bi'
import {BiMessageSquareDetail} from 'react-icons/bi'
import { BsCart4} from 'react-icons/bs'
import { useEffect } from 'react'

import { useState } from 'react'
const Navbar = () => {
    useEffect(() => {
      setActive(window.location.pathname)
      console.log(window.location.pathname)
    }, [window.location.pathname])
    
  const [active,setActive]= useState('/');
  return (
    <nav>
      <a href='/'  className={active==='/' ? 'active' : ''}><AiTwotoneHome/> </a>
      <a href='/account'className={active==='/account' ? 'active' : ''}><AiOutlineUser/> </a>
      <a href='/myOrders' className={active==='/myOrders' ? 'active' : ''}><BiBook/> </a>
      <a href='/products' className={active==='/products' ? 'active' : ''}><AiOutlineProject/> </a>
      <a href='/cart' className={active==='cart' ? 'active' : ''}><BsCart4/> </a>
      <a href='https://anilgulati.herokuapp.com/#contact'onClick={()=>setActive('contact')} className={active==='contact' ? 'active' : ''}><BiMessageSquareDetail/> </a>


    </nav>

  )
}

export default Navbar