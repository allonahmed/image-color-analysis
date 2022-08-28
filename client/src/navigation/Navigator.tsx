import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import { useCurrentPath } from '../hooks';
import { IoBagAddSharp, IoLogIn, IoSettingsSharp } from 'react-icons/io5';
import logo from '../assets/icons/fflogo.png';

import '../styles/header.css';

export const  Navigator = () => {
  console.log(useCurrentPath());
  return (
    <div className='navigation'>
      <img src={logo} className='navigation-logo'/>
      {NavLinks.map((link, id)=>{
        return (
          <Link 
            key={id} 
            to={link.link} 
            className={useCurrentPath() === link.link ? 
              'navigation-link active-navigation-link': 
              'navigation-link'}
          >
            {link.title}
          </Link>
        );
      })}
      <div className='nav-icon-container'>
        <IoBagAddSharp className='nav-icons' style={{fontSize: '24px', color: '#FDB777'}}/>
        <IoSettingsSharp className='nav-icons' style={{fontSize: '24px', color: '#FD9346'}}/>
        <IoLogIn className='nav-icons' style={{fontSize: '30px', color: '#FD7F2C'}}/>
      </div>
    </div>
  );
};


