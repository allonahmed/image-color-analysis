import React, { SyntheticEvent, useEffect, useState } from 'react';
import { rgbToHex } from '../helpers';
import { useAppSelector } from '../hooks';

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

  const [color, setColor] = useState<any>(null);
  const { imageColors} = useAppSelector(state => state.image);

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

  const getPositionFromColor = (ctx: any, color: any) => {

    const w = ctx.canvas.width,
      h = ctx.canvas.height,
      data = ctx.getImageData(0, 0, w, h), /// get image data
      buffer = data.data,                  /// and its pixel buffer
      len = buffer.length;                 /// cache length
    let x, y = 0, p, px;                     /// for iterating

    /// iterating x/y instead of forward to get position the easy way
    for(;y < h; y++) {

      /// common value for all x
      p = y * 4 * w;

      for(x = 0; x < w; x++) {

        /// next pixel (skipping 4 bytes as each pixel is RGBA bytes)
        px = p + x * 4;

        /// if red component match check the others
        if (buffer[px] === color[0]) {
          if (buffer[px + 1] === color[1] &&
                    buffer[px + 2] === color[2]) {

            return [x, y];
          }
        }
      }
    }
    return null;
  };

  function getMousePos(canvas: any, evt: any) {
    const rect = canvas.getBoundingClientRect();
    console.log(rect);
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
    console.log(getPositionFromColor(ctx, [ctx.getImageData(x, y, 1, 1).data[0], ctx.getImageData(x, y, 1, 1).data[1], ctx.getImageData(x, y, 1, 1).data[2]]));
    console.log(ctx.getImageData(x, y, 1, 1).data);
    setColor(`rgba(${ctx.getImageData(x, y, 1, 1).data[0]},${ctx.getImageData(x, y, 1, 1).data[1]}, ${ctx.getImageData(x, y, 1, 1).data[2]}, 1)`);
    console.log('x:', x, 'y:', y);
  };

  return (
    <>
      <canvas 
        id={'canvas'}
        onMouseMove={getPosition}
      />
      <div style={{height: '50px', width: '50px', backgroundColor: color || 'green', marginBottom: '50px'}}></div>
      <div className='palette'>
        {imageColors && imageColors.map((color: any, id: number) => {
          return (
            <div key={id} className='palette-item'>
              {/* <div style={{fontSize:'8px'}}>rgb({color.color[0]},{color.color[1]}, {color.color[2]})</div> */}
              <div
                className='palette-color'
                style={{
                  backgroundColor: `rgba(${color.color[0]}, ${color.color[1]}, ${color.color[2]}, ${color.color[3]}`,
                  // backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                  boxShadow: `0 0 5px 1px rgb(${color[0]}, ${color[1]}, ${color[2]})`
                }}
              >
                      
                <div className='palette-hex'>
                  {rgbToHex(color.color[0], color.color[1], color.color[2])}
                </div>
              </div>
              {/* <div>{toPercent(color.percentage)}</div> */}
            </div>
          );
        })}
      </div>
    </>
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