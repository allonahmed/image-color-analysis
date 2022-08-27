import React, {useState} from 'react';
import { ImageUpload } from '../components/ImageUpload';
import { Upload } from '../components/Upload';

function Home() {
  const [image, setImage] = useState<File[] | null>(null);
  return (
    <div>
      {/* <ImageUpload image={image} setImage={setImage}/> */}
      <Upload />
    </div>
  );
}

export default Home;