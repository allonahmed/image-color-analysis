import React, {useState} from 'react';
import { ImageUpload } from '../features/ImageUpload/ImageUpload';
import { Upload } from '../features/ImageUpload/Upload';

function Home() {
  const [image, setImage] = useState<File[] | null>(null);
  return (
    <div>
      <ImageUpload image={image} setImage={setImage}/>
      <Upload />
    </div>
  );
}

export default Home;