import React, { useRef, SetStateAction } from 'react';
import { IoIosImages } from 'react-icons/io';
import { UploadImage } from '../../api/uploadImage';
import { updateImageColors, updateImage } from '../../redux/reducers/image';
import { updateLoading } from '../../redux/reducers/system';
import { useAppDispatch } from '../../hooks';


type Props = {
  image: File[] | null;
  setImage: React.Dispatch<SetStateAction<File[] | null>>
}
export const ImageUpload: React.FunctionComponent<Props> = ({
  setImage, image
}) => {
  const inputFileRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const onFileChange = (e: any) => {
    setImage(e.target.files);
    dispatch(updateImage(URL.createObjectURL(e.target.files[0])));
  };

  const refFileChange = () => {
    inputFileRef.current.click();
  };

  return (
    <div onClick={refFileChange} className='image-upload-form'>
      <input 
        type="file"
        alt='image upload'
        accept="image/png, image/jpeg, image/jpg"
        ref={inputFileRef}
        onChange={onFileChange}
        style={{display:'none'}}
      />
      <IoIosImages />
      <p>Upload Image</p>
    </div>

  );
};