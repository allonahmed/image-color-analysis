import React, { useRef, SetStateAction } from 'react';
import { IoIosImages } from 'react-icons/io'

type Props = {
    setImage: React.Dispatch<SetStateAction<any>>
}

export const InputImage: React.FunctionComponent<Props> = ({
    setImage
}) => {
    const inputFileRef: any = useRef(null);

    const onFileChange = (e: any) => {
        setImage(e.target.files);
    }
    const refFileChange = () => {
        inputFileRef.current.click();
    }

    return (
        <div className="image-upload-form" onClick={refFileChange}>
            <input
                type="file"
                alt='image upload'
                accept="image/png, image/jpeg, image/jpg"
                ref={inputFileRef}
                onChange={onFileChange}
                className='image-upload-input'
            />
            <IoIosImages />
            <h3>Upload Image</h3>
        </div>
    )
}