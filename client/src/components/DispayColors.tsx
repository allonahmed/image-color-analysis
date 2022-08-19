import React from "react";
import { useSelector } from "react-redux";



export const DisplayColors: React.FC = () => {
    const colors = useSelector((state: any) => state.image.imageColors)

    return (
        <div>

        </div>
    )
}