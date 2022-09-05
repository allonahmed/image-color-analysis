import React, {useState} from 'react';
import { EyeDropper as ColorDropper } from 'react-eyedrop';


export const EyeDropper = () => {
  const [color, setColor] = useState<any>(null);

  const getColor = ({rgb}: any) => {
    setColor(rgb);
  }; 

  console.log(color);

  return (
    <div>
      <ColorDropper
        onChange={getColor}
      >
        select color
      </ColorDropper>
      <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ItjUjmdyS3oifHWUhSGsSpNphIZ38hZ3Obdz2FjU&s'/>
    </div>
  );
};