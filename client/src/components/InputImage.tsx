import React, { useRef } from 'react';
import '../styles/inputimage.css'
import { IoIosImages } from 'react-icons/io'

export const InputImage: React.FunctionComponent = () => {
    const inputFileRef: any = useRef(null);

    const onFileChange = (e: any) => {
        console.log(e.target.files);
    }
    const refFileChange = () => {
        inputFileRef.current.click();
    }

    return (
        <div className="image-upload-form" onClick={refFileChange}>
            <input
                type="file"
                ref={inputFileRef}
                onChange={onFileChange}
                className='image-upload-input'
            />
            <IoIosImages />
            <h3>Upload Image</h3>
        </div>
    )
}