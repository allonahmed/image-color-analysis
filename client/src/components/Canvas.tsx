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

  const [color, setColor] = useState<any>(null);
  const [ position, setPosition ] = useState<any>(null);
  const [ updateColor, setUpdateColor] = useState<boolean>(false);
  const { imageColors } = useAppSelector(state => state.image);
  const [palleteColors, setPalleteColors] = useState<any>(imageColors);
  const { loading } = useAppSelector(state => state.system);
  const dispatch = useAppDispatch();
  const [mousePosition ,setMousePosition] = useState<any>(null);
  const [shapes, setShapes] = useState<Array<any>>([]); 
  let imageCanvas: any;
  let imageContext: any;

  let colorCanvas: any;
  let colorContext: any;

  useEffect(()=> {
    setPalleteColors(imageColors);
  },[imageColors]);

  useEffect(()=> {
    console.log('things');
    if (image && imageColors){
      //create element element with image source
      const img : any = new Image();
      img.src = image;
      img.height = 500; 
      img.width = 500; 
      img.crossOrigin = 'Anonymous';

      //when image loads, create canvas of image
      img.onload = () => {
        //creating canvas from image  
        imageCanvas   = document.getElementById('canvas');
        imageContext = imageCanvas.getContext('2d');
        const canvas = imageContext.canvas;   
        imageContext.clearRect(0, 0, canvas.width, canvas.height);
        canvas.height = img.height; 
        canvas.width = img.width;
        imageContext.drawImage(img, 0,0, img.width, img.height);
        // removeBackground(ctx, canvas.height, canvas.width);
        // getColors();
        colorCanvas   = document.getElementById('colors');
        colorContext = colorCanvas.getContext('2d');
        const myc = colorContext.canvas;   
        colorContext.clearRect(0, 0, myc.width, myc.height); 
        myc.height = 500; 
        myc.width = 500;  

        CreateShape(
          canvas.height, 
          canvas.width, 
          `rgba(${imageColors[0].color[0]}, ${imageColors[0].color[1]}, ${imageColors[0].color[2]}, ${imageColors[0].color[3]})`,
          getPositionFromColor(imageContext, [imageColors[0].color[0], imageColors[0].color[1], imageColors[0].color[2]]),
        );
        CreateShape(
          canvas.height, 
          canvas.width, 
          `rgba(${imageColors[1].color[0]}, ${imageColors[1].color[1]}, ${imageColors[1].color[2]}, ${imageColors[1].color[3]})`,
          getPositionFromColor(imageContext, [imageColors[1].color[0], imageColors[1].color[1], imageColors[1].color[2]]),
        );
        CreateShape(
          canvas.height, 
          canvas.width, 
          `rgba(${imageColors[2].color[0]}, ${imageColors[2].color[1]}, ${imageColors[2].color[2]}, ${imageColors[2].color[3]})`, 
          getPositionFromColor(imageContext, [imageColors[2].color[0], imageColors[2].color[1], imageColors[2].color[2]]),
        );
        
        DrawAllShapes();

      };
    }
  },[loading]);

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
    /// iterating x/y instead of forward to get position the easy way
    for(;y < h; y++) {
      /// common value for all x
      p = y * 4 * w;
      for(x = 0; x < w; x++) {
        /// next pixel (skipping 4 bytes as each pixel is RGBA bytes)
        px = p + x * 4;
        /// if red component match check the others
        if ((buffer[px ] + 20 >= color[0] && buffer[px] - 20 <= color[0])) {
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
  // console.log(position);
  // console.log('mouseposition',mousePosition);
  // console.log('position',position);

  // function for getting mouseposition when hovering over canvas (onmouseover method)
  const getPosition = (e: SyntheticEvent) => {
    // canvas of color shape
    const colorCanvas : any  = document.getElementById('colors');
    const colorContext = colorCanvas.getContext('2d');

    const pos = getMousePosition(colorCanvas, e);
    const x = pos.x;
    const y =  pos.y;
    // console.log([x,y]);
    
    // set color of current mouseover location by getting imagedata of canvas pixel
    // setColor(`rgba(${imageCtx.getImageData(x, y, 1, 1).data[0]},${imageCtx.getImageData(x, y, 1, 1).data[1]}, ${imageCtx.getImageData(x, y, 1, 1).data[2]}, 1)`);
    //update position as state
    // positionCheck(x, y);
  };
  const moveColor = (e: SyntheticEvent) => {
    // canvas of color shapes
    if(updateColor && imageColors){
    // for(let i = 0; i < shapes.length; i+=1){
 
      //   const shape = shapes[i].ctx;
      //   console.log(shape);
      const imageCanvas : any  = document.getElementById('canvas');
      const imageCtx = imageCanvas.getContext('2d');
        
      const colorCanvas : any  = document.getElementById('colors');
      const colorContext = colorCanvas.getContext('2d');
      const pos = getMousePosition(colorCanvas, e);
      const x = pos.x;
      const y =  pos.y;
      //   // set color of current mouseover location by getting imagedata of canvas pixel
      setColor(`rgba(${imageCtx.getImageData(x, y, 1, 1).data[0]},${imageCtx.getImageData(x, y, 1, 1).data[1]}, ${imageCtx.getImageData(x, y, 1, 1).data[2]}, 1)`);
      //   DrawShapes(shape);
      if((shapes[0].xPos + 30 >= mousePosition.x && shapes[0].xPos - 30 <= mousePosition.x) && (shapes[0].yPos + 30 >= mousePosition.y && shapes[0].yPos - 30 <= mousePosition.y)){
        const colorCanvas : any  = document.getElementById('colors');
        const colorContext = colorCanvas.getContext('2d');
        colorContext.clearRect(0, 0, colorCanvas.width, colorCanvas.height);
        const data = shapes;
        data[0].xPos = mousePosition.x;
        data[0].yPos = mousePosition.y;
        data[0].fill = color;
        dispatch(updateImageColors([
          {
            color: [imageCtx.getImageData(x, y, 1, 1).data[0], imageCtx.getImageData(x, y, 1, 1).data[1], imageCtx.getImageData(x, y, 1, 1).data[2]],
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
        dispatch(updateImageColors([
          imageColors[0],
          {
            color: [imageCtx.getImageData(x, y, 1, 1).data[0], imageCtx.getImageData(x, y, 1, 1).data[1], imageCtx.getImageData(x, y, 1, 1).data[2]],
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
        dispatch(updateImageColors([
          imageColors[0],
          imageColors[1],
          {
            color: [imageCtx.getImageData(x, y, 1, 1).data[0], imageCtx.getImageData(x, y, 1, 1).data[1], imageCtx.getImageData(x, y, 1, 1).data[2]],
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
    // if ( colorContext.isPointInPath(mousePosition.x, mousePosition.y) ){
    //   // canvas of image
        

    //   //update position as state
    //   positionCheck(x, y);
    // }
    // }
    // }
    // else{
    //   setUpdateColor(false);
    // }
    
  };

  

  
  useEffect(()=>{
    // getColors();
  },[ position ]);

  // gets the color locations in the palette and creates blocks to reference their location
  const getColors = () => {
    if(imageColors){
      
      const canvas : any  = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      
      //get postition of specific color in canvas
      let pos1, pos2 = null, pos3 = null;
      if(position === null){
        pos1 = getPositionFromColor(ctx, [imageColors[0].color[0], imageColors[0].color[1], imageColors[0].color[2]]);
        setPosition(pos1);
      }

      pos2 = getPositionFromColor(ctx, [imageColors[1].color[0], imageColors[1].color[1], imageColors[1].color[2]]);
      pos3 = getPositionFromColor(ctx, [imageColors[2].color[0], imageColors[2].color[1], imageColors[2].color[2]]);


      const cvs : any  = document.getElementById('colors');
      const context = cvs.getContext('2d');
      const myc = context.canvas;   
      context.clearRect(0, 0, myc.width, myc.height);
      myc.height = 500; 
      myc.width = 500;
      //create circles two reference where the colors are located in thhe canvas
      context.lineWidth = 5;
      context.strokeStyle='#fff';
      context.fillStyle = color ? color : `rgba(${imageColors[0].color[0]}, ${imageColors[0].color[1]}, ${imageColors[0].color[2]}, ${imageColors[0].color[3]})`;
      context.beginPath();
      context.arc (position ? position[0] : (pos1 && pos1[0]), position ? position[1] : (pos1 && pos1[1]), 20, 0, 2 * Math.PI);
      context.stroke();
      context.fill();

      // context.beginPath();
      // context.fillStyle = `rgba(${imageColors[1].color[0]}, ${imageColors[1].color[1]}, ${imageColors[1].color[2]}, ${imageColors[1].color[3]}`;
      // context.arc (pos2 && pos2[0], pos2 && pos2[1], 20, 0, 2 * Math.PI); 
      // context.stroke();
      // context.fill();
 
      // context.beginPath();
      // context.fillStyle = `rgba(${imageColors[2].color[0]}, ${imageColors[2].color[1]}, ${imageColors[2].color[2]}, ${imageColors[2].color[3]}`;
      // context.arc (pos3 && pos3[0], pos3 && pos3[1], 20, 0, 2 * Math.PI); 
      // context.stroke();
      // context.fill();
      
    }
  };

  //create shape object
  const CreateShape = (height: number, width: number, fill: string, pos: any) => {
    if(imageColors){
      const list = shapes;
      const shape = {
        xPos: pos[0],
        yPos: pos[1],
        width: width,
        height: height,
        fill: fill,
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
      colorContext.lineWidth = 5;
      colorContext.strokeStyle='#fff';
      colorContext.fillStyle = shape.fill;
      colorContext.beginPath();
      colorContext.arc (shape.xPos, shape.yPos, 20, 0, 2 * Math.PI);
      colorContext.stroke();
      colorContext.fill();
      // colorContext.closePath();
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
      <canvas 
        id={'canvas'}
        onMouseMove={(e)=>{
          getPosition(e);
          moveColor(e);
        }}
      />
      <canvas  
        style={{position:'absolute', zIndex: 300, top: 0, right: 0, cursor: 'grab'}} 
        id='colors' 
        onMouseMove={(e)=>{
          getPosition(e);
          moveColor(e);
        }}
        onClick={()=>setUpdateColor(!updateColor)}
      />
      {/* <div style={{height: '50px', width: '50px', backgroundColor: color || 'green', marginBottom: '50px'}}></div> */}
      <div className='palette'>
        {palleteColors && palleteColors.map((color: any, id: number) => {
          const bg = `rgb(${palleteColors[id].color[0]}, ${palleteColors[id].color[1]}, ${palleteColors[id].color[2]})`;
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