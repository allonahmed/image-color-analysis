import React, {useState} from 'react';
import { ImageUpload } from '../components/ImageUpload';

function Home() {
  const [image, setImage] = useState<File[] | null>(null);
  return (
    <div>
      <ImageUpload image={image} setImage={setImage}/>
    </div>
  );
}

export default Home;