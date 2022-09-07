import React, {useEffect} from 'react';
import { useAppSelector } from '../hooks';

export const Canvas : React.FunctionComponent = () => {

  const image = useAppSelector((state) => state.image.image);
  console.log(image);
  useEffect(()=> {
    if (image){
      const img : any = new Image();
      img.src = image;
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
    }
  },[image]);

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <canvas id='canvas' style={{border: '1px solid black' }}></canvas>
    </div>
  );
};