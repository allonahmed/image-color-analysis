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

  const removeBackground = (context: any, height: number, width: number) => {

    const imageData = context.getImageData(0,0, height, width);
    const pixel = imageData.data;

    const r=0, g=1, b=2,a=3;
    for (let p = 0; p<pixel.length; p+=4)
    { 
      if (
        pixel[p+r] >= 240 &&
          pixel[p+g] >= 240 && 
          pixel[p+b] >= 240) // if white then change alpha to 0
      {pixel[p+a] = 0;}  
    } 

    context.putImageData(imageData,0,0);
  };

  useEffect(()=> {
    if (image){
      //creating elemeent with uploaded image url
      const img : any = new Image();
      img.src = image;
      img.height = 400; 
      img.width = 400;
      // img.crossOrigin = 'Anonymous';

      //creating canvas from image
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
      // removeBackground(ctx, canvas.height, canvas.width);
    }
  },[image]);

  return (
    <canvas id='canvas' />
  );
};