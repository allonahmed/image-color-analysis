import React from 'react';
import { DisplayColors } from '../features/imageRender/DispayColors';
import { Upload } from '../features/ImageUpload/Upload';

function Home() {
  return (
    <div>
      <Upload />
      <DisplayColors />
    </div>
  );
}

export default Home;