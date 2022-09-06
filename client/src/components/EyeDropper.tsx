import React, {useState} from 'react';
import { EyeDropper as ColorDropper } from 'react-eyedrop';


export const EyeDropper = () => {
  const [color, setColor] = useState<any>('#bada55');

  const getColor = ({rgb, hex}:any) => {
    setColor(rgb);
  }; 

  console.log(color);

  return (
    <div>
      {/* <div style={{background: color, height: '50px', width: '50px'}}>
        djdj
      </div>
      <ColorDropper
        onChange={getColor}
        cursorActive="pointer"
      >
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ItjUjmdyS3oifHWUhSGsSpNphIZ38hZ3Obdz2FjU&s'/>
      </ColorDropper> */}
      <canvas id="myCanvas" style={{border:'1px solid #000000', height: '100px', width: '100px'}}></canvas>
    </div>
  );
};