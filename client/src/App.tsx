import React, { useEffect, useState } from 'react';
import './App.css';
import { DisplayColors } from './components/DispayColors';
import { ImageUpload } from './components/ImageUpload';

const App: React.FC = () => {
  const [image, setImage] = useState<any>(null);
  useEffect(() => {
    console.log('image state: ', image)
  }, [image])

  return (
    <div className="App">
      <ImageUpload setImage={setImage} image={image} />
      <DisplayColors />
    </div>
  );
}

export default App;
