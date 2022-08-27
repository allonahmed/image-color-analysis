import React, {useState} from 'react';
import {IoMdClose} from 'react-icons/io';
import { ImageUpload } from './ImageUpload';
/**
 * 
 * @returns modal for image selecting 
 */

export const ImageSelect : React.FunctionComponent = () => {
  const [currentNav, setNav] = useState<string>('Upload');

  const Navigation : React.FunctionComponent = () => {
    return (
      <div style={styles.navigation}>
        {['Upload', 'URL', 'Camera', 'Stock'].map((item, id: number) => {
          return (
            <button 
              key={id} 
              onClick={()=>setNav(item)}
              style={{
                ...styles.navButton,
                border: 'none',
                boxSizing: 'border-box',
                color: item === currentNav ? '#0066ff' : '#636363',
                boxShadow: item=== currentNav ? '#0066ff 0 1px 0 0, inset #0066ff 0 -1px 0 0' : 'none'
              }}
            >
              {item}
            </button> 
          );})}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <IoMdClose 
          size={24} 
          style={{  
            position: 'absolute',
            right: '19px',
            top: '19px'
          }}
        />
        <h3 style={{fontSize: '18px'}}>
          Select Image
        </h3>
      </div>
      <Navigation />
      
    </div>
  );
};

const styles = {
  container:{
    width: '100%', 
    height: '100%', 
    padding: '0', 
    margin: '0'
  },
  header:{
    display:'flex',
    justifyContent:'center',
    padding: '20px 0',
  },
  close: {

  },
  navigation: {
    display:'flex',
    justifyContent: 'center',
    borderBottom: '1px solid #b6b6b6',
    borderTop: '1px solid #b6b6b6',
  },
  navButton: {
    padding: '20px 10px',
    margin: '0 0px',
    backgroundColor: 'transparent',
    fontSize: '18px',
    // fontFamily: 'inter'
  }
};