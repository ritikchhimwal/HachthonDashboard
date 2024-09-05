import React from 'react'
import logo from '../assets/icons/mainimg.svg'
import './css/header.css';

const Header = () => {
  return (
    <div className='header'>
        <a href='/'><img src={logo}/></a>
    </div>
  )
}

export default Header