import React from 'react';
import { DisplayColors } from '../features/imageRender/DispayColors';
import { Upload } from '../features/ImageUpload/Upload';
import { SneakerSelect } from '../features/sneakerRender/SneakerSelect';
import { EyeDropper } from '../components/EyeDropper';

import '../styles/home.css';

function Home() {
  return (
    <div className='home-container'>
      <div style={{display:'flex', justifyContent:'center', height: '100px'}}>
        <SneakerSelect />
        <p style={{padding: '20px 20px', fontSize: '20px'}}>or</p>
        <Upload />
      </div>
      <DisplayColors />
    </div>
  );
}

export default Home;