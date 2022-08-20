import React from "react";
import { useSelector } from "react-redux";

export const DisplayColors: React.FC = () => {
    const colors = useSelector((state: any) => state.image.imageColors)

    return (
        colors &&
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            {colors.map((color: any, id: number) => {
                return (
                    <div
                        key={id}
                        style={{
                            height: "60px",
                            width: "60px",
                            backgroundColor: `rgb(${color[0]}, ${color[1]}, ${color[2]}`,
                            margin: '0 10px'
                        }} >
                    </div>
                )
            })}
        </div>
    )
}