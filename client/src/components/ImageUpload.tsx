import React, { SetStateAction } from "react";
import { InputImage } from "./InputImage";

type Props = {
    image: any;
    setImage: React.Dispatch<SetStateAction<any>>
}

export const ImageUpload: React.FunctionComponent<Props> = ({
    image, setImage
}) => {
    return (
        <InputImage setImage={setImage} />
    )
}