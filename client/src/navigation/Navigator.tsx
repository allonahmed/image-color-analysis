import React from 'react';
import { Link } from 'react-router-dom';
import { NavLinks } from './NavLinks';
import { useCurrentPath } from '../hooks';

export const  Navigator = () => {
  console.log(useCurrentPath());
  return (
    <div style={styles.nav}>
      {NavLinks.map((link, id)=>{
        return (
          <Link 
            key={id} 
            to={link.link} 
            style={{
              ...styles.link,
              backgroundColor: useCurrentPath() === link.link ? '#fff' : '#f1f1f1'
            }}>
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

const styles = {
  nav:{
    display:'flex'
  },
  link:{
    width: `calc(100% / ${NavLinks.length})`,
    display: 'flex',
    justifyContent: 'center',
    border: '5px solid #f1f1f1',
    textDecoration: 'none',
    color: 'black',
    padding: '10px 0',
  }
};