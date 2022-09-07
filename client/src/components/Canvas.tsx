import React, { useEffect } from 'react';
import { useAppSelector } from '../hooks';

export const Canvas : React.FunctionComponent = () => {
  const image = useAppSelector((state) => state.image.image);
  
  useEffect(()=> {
    if (image){
      const img : any = new Image();
      img.src = image;
      img.height = 400;
      img.width = 400;
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
    }
  },[image]);

  return (
    <canvas 
      id='canvas'
    />
  );
};