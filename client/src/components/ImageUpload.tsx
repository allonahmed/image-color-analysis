import React, { useRef, SetStateAction, useState } from 'react';
import { IoIosImages } from 'react-icons/io';
import '../styles/inputimage.css';
import { UploadImage } from '../api/testapi';

type Props = {
    image: any;
    setImage: React.Dispatch<SetStateAction<any>>
}
export const ImageUpload: React.FunctionComponent<Props> = ({
    setImage, image
}) => {
    const [imageData, setImageData] = useState<any>(null);
    const inputFileRef: any = useRef(null);

    const onFileChange = (e: any) => {
        setImage(e.target.files);
    }
    const refFileChange = () => {
        inputFileRef.current.click();
    }

    console.log(imageData);
    return (
        <form onSubmit={(event) => {
            UploadImage(event, image).then((res) => setImageData(res))
        }}
            className='image-upload-form'>
            <div
                className={image ? "image-container" : "image-container hover-upload"}
                onClick={() => image === null && refFileChange()}
            >
                {image ? <img src={URL.createObjectURL(image[0])} alt="file uploaded" className="uploaded-image" /> :
                    <>
                        <IoIosImages />
                        <h3>Upload Image</h3>
                    </>
                }
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
    )
}