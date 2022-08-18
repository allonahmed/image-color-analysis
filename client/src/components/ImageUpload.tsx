import React, { SetStateAction } from "react";
import { InputImage } from "./InputImage";

import '../styles/inputimage.css'

type Props = {
    image: any;
    setImage: React.Dispatch<SetStateAction<any>>
}

export const ImageUpload: React.FunctionComponent<Props> = ({
    image, setImage
}) => {
    console.log('image: ', image && image[0])
    return (
        <div className="image-upload-container">
            <InputImage setImage={setImage} />
            {image && <img src={URL.createObjectURL(image[0])} alt="file uploaded" className="uploaded-image" />}
        </div>
    )
}