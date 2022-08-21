import React, { useEffect, useState } from 'react';
import './App.css';
import { DisplayColors } from './components/DispayColors';
import { ImageUpload } from './components/ImageUpload';
import { Loading } from './components/Loading';
import { UploadSneaker } from './api/uploadSneakers';

const App: React.FC = () => {
  const [image, setImage] = useState<File[] | null>(null);
  useEffect(() => {
    console.log('image state: ', image);
  }, [image]);

  return (
    <div className="App">
      <ImageUpload setImage={setImage} image={image} />
      <DisplayColors />
      <Loading />
      <button onClick={UploadSneaker}> upload </button>
    </div>
  );
};

export default App;
