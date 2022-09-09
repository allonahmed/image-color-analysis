import React, { useEffect, useState } from 'react';

//create your forceUpdate hook
function useForceUpdate(){
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update state to force render
  // An function that increment 👆🏻 the previous state like here 
  // is better than directly setting `value + 1`
}
export const Canvas : React.FunctionComponent<{image: string}> = ({image}) => {
  // const image = useAppSelector((state) => state.image.image);
  const forceUpdate = useForceUpdate();
  
  useEffect(()=> {
    console.log('checking');
    if (image){
      console.log('checking');
      const img : any = new Image();
      img.src = image;
      // const img : any = document.getElementById(`${image}-image`);
      img.height = 400;
      img.width = 400;
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      console.log(canvas);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
      forceUpdate();
    }
  },[image]);

  return (
    <canvas id={'canvas'} />
  );
};