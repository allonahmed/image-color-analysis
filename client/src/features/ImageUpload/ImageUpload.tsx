import React, { useRef } from 'react';
import { IoIosImages } from 'react-icons/io';
import { UploadImage } from '../../api/uploadImage';
import { updateImageColors, updateImage } from '../../redux/reducers/image';
import { updateLoading, updateModal } from '../../redux/reducers/system';
import { useAppDispatch } from '../../hooks';

export const ImageUpload: React.FunctionComponent = () => {
  const inputFileRef = useRef<any>(null);
  const dispatch = useAppDispatch();

  const onFileChange = (e: any) => {
    dispatch(updateImage(URL.createObjectURL(e.target.files[0])));
    dispatch(updateLoading(true));
    UploadImage(e.target.files, e).then((res) => {
      dispatch(updateImageColors(res));
      dispatch(updateLoading(false));
    }).then(()=> {
      dispatch(updateModal(false));
    });
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
      <IoIosImages size={34}/>
      <p>Upload an image</p>
    </div>
  );
};