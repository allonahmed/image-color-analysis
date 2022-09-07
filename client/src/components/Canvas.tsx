import React, {useEffect} from 'react';

export const Canvas : React.FunctionComponent = () => {

  useEffect(()=> {
    window.onload = () =>{
      const img : any = document.getElementById('img');
      const canvasElement : any  = document.getElementById('canvas');
      const ctx = canvasElement.getContext('2d');
      const canvas = ctx.canvas;
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0,0, img.width, img.height);
    };
  });

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <img 
        id='img' 
        src= 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60' 
        style={{height: '400px'}}
      />
      <canvas id='canvas' style={{border: '1px solid black' }}></canvas>
    </div>
  );
};