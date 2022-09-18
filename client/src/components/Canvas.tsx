import React, { SyntheticEvent, useEffect } from 'react';


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
      //create element element with image source
      const img : any = new Image();
      img.src = image;
      img.height = 500; 
      img.width = 500; 
      img.crossOrigin = 'Anonymous';

      //when image loads, create canvas of image
      img.onload = () => {
        //creating canvas from image  
        const canvasElement : any  = document.getElementById('canvas');
        const ctx = canvasElement.getContext('2d');
        const canvas = ctx.canvas;   
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = img.height; 
        canvas.width = img.width;
        ctx.drawImage(img, 0,0, img.width, img.height);
      };
      // removeBackground(ctx, canvas.height, canvas.width);
    }
  },[image]);


  function getMousePos(canvas: any, evt: any) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  const getPosition = (e: SyntheticEvent) => {
    const canvasElement : any  = document.getElementById('canvas');
    const ctx = canvasElement.getContext('2d');
    const pos = getMousePos(canvasElement, e);
    const x = pos.x;
    const y =  pos.y;
    console.log('x:', x, 'y:', y);
    ctx.fillStyle = '#000000';
    ctx.fillRect (pos.x, pos.y, 4, 4);
  };

  return (
    <canvas 
      id={'canvas'}
      onMouseMove={getPosition}
    />
  );
};


//test function for removing background of canvas on client
export const removeBackground = (context: any, height: number, width: number) => {

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