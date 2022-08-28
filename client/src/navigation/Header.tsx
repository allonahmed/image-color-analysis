import React from 'react';
import '../styles/header.css';
import logo from '../assets/icons/fflogo.png';

export const Header = () => {
  return (
    <div className='header'>
      {/* <h1 className='header-title'>Header goes here</h1> */}
      <img src={logo} className='header-logo'/>
    </div>
  );
};

