import React from 'react';
import { DisplayColors } from '../features/imageRender/DispayColors';
import { Upload } from '../features/ImageUpload/Upload';
import { SneakerSelect } from '../features/sneakerRender/SneakerSelect';

import '../styles/home.css';

function Home() {
  return (
    <div className='home-container'>
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Upload />
        <p style={{padding: '0 20px', fontSize: '20px'}}>or</p>
        <SneakerSelect />
      </div>
      <DisplayColors />
    </div>
  );
}

export default Home;