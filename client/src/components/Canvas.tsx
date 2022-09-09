import React, { useEffect } from 'react';

/**
 * @todos :
 * 1. add circle withen canvas to show location of palette colors
 * 2. be able to add eyedropper to read colors from all points in canvas
 * @returns a canvas element generated from image uploaded
 */

type Props = {
  image: string
}

export const Canvas : React.FunctionComponent<Props> = ({ image }) => {
  
  useEffect(()=> {
    if (image){
      //creating elemeent with uploaded image url
      const img : any = new Image();
      img.src = image;
      img.height = 400;
      img.width = 400;

      //creating canvas from image
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
    }
  },[image]);

  return (
    <canvas id={'canvas'} />
  );
};