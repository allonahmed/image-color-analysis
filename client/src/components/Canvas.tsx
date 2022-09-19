import React, { SyntheticEvent, useEffect, useState } from 'react';
import { getContrast, rgbToHex } from '../helpers';
import { useAppDispatch, useAppSelector } from '../hooks';
import { updateImageColors } from '../redux/reducers/image';

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

  let imageCanvas: any;
  let imageContext: any;

  let colorCanvas: any;
  let colorContext: any;
  const imageSize = 500;

  const [ color, setColor ] = useState<any>(null); // color of mouseposition pixel in canvas
  const [ updateColor, setUpdateColor ] = useState<boolean>(false); // boolean to allow shapes to be moved
  const [ mousePosition ,setMousePosition ] = useState<any>(null); // mouse position in canvas
  const [ shapes, setShapes ] = useState<Array<any>>([]); // array that contains the color shapes

  const { imageColors } = useAppSelector(state => state.image);
  const dispatch = useAppDispatch();

  // creates and loads image and places it in a canvas and creates the shapes from image color data
  useEffect(()=> { 
    if (image && imageColors){
      //create element element with image source
      const img : any = new Image();
      img.src = image;
      img.height = img.width = imageSize;
      img.crossOrigin = 'Anonymous';

      //when image loads, create canvas of image
      img.onload = () => {
        //creating canvas from image  
        imageCanvas = document.getElementById('canvas');
        imageContext = imageCanvas.getContext('2d');  
        imageCanvas.height = imageCanvas.width = imageSize; 
        imageContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
        imageContext.drawImage(img, 0,0, img.width, img.height);

        // create colors canvas and places shapes inside
        colorCanvas   = document.getElementById('colors');
        colorContext = colorCanvas.getContext('2d');
        colorCanvas.height = colorCanvas.width = imageSize;  
        colorContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height); 

        for(let i = 0; i < imageColors.length; i += 1){
          CreateShape(
            imageCanvas.height, 
            imageCanvas.width, 
            `rgba(${imageColors[i].color[0]}, ${imageColors[i].color[1]}, ${imageColors[i].color[2]}, ${imageColors[i].color[3]})`, 
            getPositionFromColor(imageContext, [imageColors[i].color[0], imageColors[i].color[1], imageColors[i].color[2]]),
            getContrast({
              r: imageColors[i].color[0],
              g: imageColors[i].color[1],
              b: imageColors[i].color[2],
            })
          );
        }
        
        DrawAllShapes();
      };
    }
  },[image]);

  // needs optimization... iterates through image data of each pixel in canvas and checks for match to inputted color... +-10 tolerance added 
  // added due to some colors may not be in actual image because quanitzation palette results may give a color that is slightly off from any of the current pixels
  // currently gets all pixels that match and returns a random position... again could be optimized a lot
  const getPositionFromColor = (ctx: any, color: any) => {
    const w = ctx.canvas.width,
      h = ctx.canvas.height,
      data = ctx.getImageData(0, 0, w, h), /// get image data
      buffer = data.data;                /// and its pixel buffer
    let x, y = 0, p, px;                     /// for iterating
    const res = [];
    for(;y < h; y++) { // iterating x/y instead of forward to get position the easy way
      p = y * 4 * w; // common value for all x
      for(x = 0; x < w; x++) { // next pixel (skipping 4 bytes as each pixel is RGBA bytes)
        px = p + x * 4;
        if ((buffer[px ] + 20 >= color[0] && buffer[px] - 20 <= color[0])) { // if red component match check the others
          if ((buffer[px + 1] + 20 >= color[1] && buffer[px + 1] - 20 <= color[1]) && (buffer[px + 2] + 20 >= color[2] && buffer[px + 2] - 20 <= color[2])) {
            res.push([x, y]);
          }
        }
      }
    }
    //return random element from res
    return res[Math.floor(Math.random()*res.length)];
  };

  // get x and y position of mouse
  function getMousePosition(canvas: any, evt: any) {
    const rect = canvas.getBoundingClientRect();
    positionCheck({
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    });
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  
  // prevents position change if goes out of bounds (color changes to black)
  const positionCheck = (obj : any) => {
    if (color === 'rgba(0,0, 0, 1)'){
      return;
    }
    else setMousePosition(obj);
  };

  // function for getting mouseposition when hovering over canvas (onmouseover method)
  const getPosition = (e: SyntheticEvent) => {
    // canvas of color shape
    const colorCanvas : any  = document.getElementById('colors');
    const pos = getMousePosition(colorCanvas, e);
    const x = pos.x;
    const y =  pos.y;
    return [x,y];
  };

  const moveColor = (e: SyntheticEvent) => {
    // canvas of color shapes
    if(updateColor && imageColors){
      const imageCanvas : any  = document.getElementById('canvas');
      const imageContext = imageCanvas.getContext('2d');
        
      const colorCanvas : any  = document.getElementById('colors');
      const { x, y } = getMousePosition(colorCanvas, e);  // mouse position
      const imageData = imageContext.getImageData(x, y, 1, 1).data; // color of position
      // set color of current mouseover location by getting imagedata of canvas pixel
      setColor(`rgba(${imageData[0]},${imageData[1]}, ${imageData[2]}, 1)`);

      if((shapes[0].xPos + 30 >= mousePosition.x && shapes[0].xPos - 30 <= mousePosition.x) && (shapes[0].yPos + 30 >= mousePosition.y && shapes[0].yPos - 30 <= mousePosition.y)){
        const colorCanvas : any  = document.getElementById('colors');
        const colorContext = colorCanvas.getContext('2d');
        colorContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
        const data = shapes;
        data[0].xPos = mousePosition.x;
        data[0].yPos = mousePosition.y;
        data[0].fill = color;
        data[0].stroke = getContrast({
          r: imageData[0],
          g: imageData[1],
          b: imageData[2]
        });
        dispatch(updateImageColors([
          {
            color: [imageData[0], imageData[1], imageData[2]],
            percentage: imageColors[0].percentage
          },
          imageColors[1],
          imageColors[2]
        ]));
        setShapes(data);
        DrawShapes(shapes[0]);
        DrawShapes(shapes[1]);
        DrawShapes(shapes[2]);
      }
      else if((shapes[1].xPos + 30 >= mousePosition.x && shapes[1].xPos - 30 <= mousePosition.x) && (shapes[1].yPos + 30 >= mousePosition.y && shapes[1].yPos - 30 <= mousePosition.y)){
        const colorCanvas : any  = document.getElementById('colors');
        const colorContext = colorCanvas.getContext('2d');
        colorContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
        const data = shapes;
        data[1].xPos = mousePosition.x;
        data[1].yPos = mousePosition.y;
        data[1].fill = color;
        data[1].stroke = getContrast({
          r: imageData[0],
          g: imageData[1],
          b: imageData[2]
        });
        
        dispatch(updateImageColors([
          imageColors[0],
          {
            color: [imageData[0], imageData[1], imageData[2]],
            percentage: imageColors[0].percentage
          },
          imageColors[2]
        ]));
        setShapes(data);
        DrawShapes(shapes[0]);
        DrawShapes(shapes[1]);
        DrawShapes(shapes[2]);
      }
      else if((shapes[2].xPos + 30 >= mousePosition.x && shapes[2].xPos - 30 <= mousePosition.x) && (shapes[2].yPos + 30 >= mousePosition.y && shapes[2].yPos - 30 <= mousePosition.y)){
        const colorCanvas : any  = document.getElementById('colors');
        const colorContext = colorCanvas.getContext('2d');
        colorContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
        const data = shapes;
        data[2].xPos = mousePosition.x;
        data[2].yPos = mousePosition.y;
        data[2].fill = color;
        data[2].stroke = getContrast({
          r: imageData[0],
          g: imageData[1],
          b: imageData[2]
        });
        dispatch(updateImageColors([
          imageColors[0],
          imageColors[1],
          {
            color: [imageData[0], imageData[1], imageData[2]],
            percentage: imageColors[0].percentage
          }
        ]));
        setShapes(data);
        DrawShapes(shapes[0]);
        DrawShapes(shapes[1]);
        DrawShapes(shapes[2]);
      }
      else {
        setUpdateColor(false); 
      }
    }
  };

  //create shape object
  const CreateShape = (height: number, width: number, fill: string, pos: any, stroke: any) => {
    if(imageColors){
      const list = shapes;
      const shape = {
        xPos: pos[0],
        yPos: pos[1],
        width: width,
        height: height,
        fill: fill,
        stroke: stroke
      };
      list.push(shape);
      setShapes(list);
      return shape;
    }
  };

  //properties for creatig color shap
  const DrawShapes = (shape: any) => {
    if(imageColors){
      const colorCanvas : any  = document.getElementById('colors');
      const colorContext = colorCanvas.getContext('2d');
      colorContext.lineWidth = 8;
      colorContext.strokeStyle = shape.stroke;
      colorContext.fillStyle = shape.fill;
      colorContext.beginPath();
      colorContext.arc (shape.xPos, shape.yPos, 20, 0, 2 * Math.PI);
      colorContext.stroke();
      colorContext.fill();
    }
  };

  //create all shapes
  const DrawAllShapes = () => {
    colorContext.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    for (let i = 0; i < shapes.length; i += 1){
      DrawShapes(shapes[i]);
    }
  };

  return (
    <div style={{position:'relative', zIndex: 20}}>
      <canvas id={'canvas'} />
      <canvas  
        style={{ position:'absolute', zIndex: 300, top: 0, right: 0, cursor: 'pointer' }} 
        id='colors' 
        onMouseMove={moveColor}
        onMouseLeave={() => setUpdateColor(false)}
        onClick={()=>setUpdateColor(!updateColor)}
      />
      <div className='palette'>
        {imageColors && imageColors.map((color: any, id: number) => {
          const bg = `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]})`;
          return (
            <div key={id} className='palette-item'>
              <div
                className='palette-color'
                style={{
                  backgroundColor: bg,
                  boxShadow: `0 0 5px 1px rgb(${color[0]}, ${color[1]}, ${color[2]})`
                }}
              >
                <div 
                  className='palette-hex'
                  style={{color: getContrast({r: color.color[0], g: color.color[1], b: color.color[2]})}}
                >
                  {/* {`rgba(${color.color[0]}, ${color.color[1]}, ${color.color[2]}, ${color.color[3]})`} */}
                  { rgbToHex(color.color[0], color.color[1], color.color[2]) }
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
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
    { 
      pixel[p+a] = 0;
    }  
  } 

  context.putImageData(imageData,0,0);
};