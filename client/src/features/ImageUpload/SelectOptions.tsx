import React, { SetStateAction } from 'react';
import { ImageUpload } from './ImageUpload';

type Props = {
  type: string;
  image: File[] | null;
  setImage: React.Dispatch<SetStateAction<File[] | null>>
}

export const SelectOptions : React.FunctionComponent<Props> = ({
  type, image, setImage
}) => {
  switch(type) {
    case 'Upload':
      return <ImageUpload image={image} setImage={setImage}/>;
    default:
      return <div></div>;
  }
};