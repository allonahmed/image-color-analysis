import React, { useEffect, useState } from 'react';
import './App.css';
import { ImageUpload } from './components/ImageUpload';

import { MockApi, UploadImage } from './api/testapi'

const App: React.FC = () => {
  const [image, setImage] = useState<any>(null);
  useEffect(() => {
    console.log('uploaded image: ', image)
  }, [image])

  return (
    <div className="App">
      <button onClick={() => UploadImage()}>api test</button>
      <ImageUpload setImage={setImage} image={image} />
    </div>
  );
}

export default App;
