import React, { useRef, SetStateAction } from 'react';
import { IoIosImages } from 'react-icons/io';
import { UploadImage } from '../../api/uploadImage';
import { updateImageColors, updateImage } from '../../redux/reducers/image';
import { updateLoading } from '../../redux/reducers/system';
import { useAppDispatch, useAppSelector } from '../../hooks';

import '../../styles/inputimage.css';

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
    <form onSubmit={(event) => {
      dispatch(updateLoading(true));
      UploadImage(event, image).then((res) => {
        dispatch(updateLoading(false));
        dispatch(updateImageColors(res));
      });
    }}
    className='image-upload-form'>
      <div
        className={image ? 'image-container' : 'image-container hover-upload'}
        onClick={() => image === null && refFileChange()}
      >
        <>
          <IoIosImages />
          <h3>Upload Image</h3>
        </>
      </div>
      <div>
        <input
          type="file"
          alt='image upload'
          accept="image/png, image/jpeg, image/jpg"
          ref={inputFileRef}
          onChange={onFileChange}
        />
        <input type='submit' name="Submit" />
      </div>
    </form>

  );
};