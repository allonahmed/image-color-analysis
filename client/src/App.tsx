import React, { useEffect, useState } from 'react';
import './App.css';
import { ImageUpload } from './components/ImageUpload';

function App() {
  const [image, setImage] = useState<any>(null);
  useEffect(() => {
    console.log('uploaded image: ', image)
  }, [image])

  return (
    <div className="App">
      <ImageUpload setImage={setImage} image={image} />
    </div>
  );
}

export default App;
