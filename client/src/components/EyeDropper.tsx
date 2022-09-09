import React, { useState } from 'react';
import { EyeDropper as ColorDropper } from 'react-eyedrop';

/**
 * @todos Need to be able to view all the colors from withen a canvas image and update palette
 * @returns Eyedropper component for viewing and updating color from canvas
 */

export const EyeDropper = () => {
  const [color, setColor] = useState<string>('#bada55');

  const getColor = ({ rgb } : { rgb:string }) => {
    setColor(rgb);
  }; 

  console.log(color);

  return (
    <div>
      <ColorDropper
        onChange={getColor}
        cursorActive="pointer"
      >
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ItjUjmdyS3oifHWUhSGsSpNphIZ38hZ3Obdz2FjU&s'/>
      </ColorDropper> 
    </div>
  );
};