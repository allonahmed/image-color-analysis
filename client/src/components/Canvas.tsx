import React, {useEffect, useRef, useState} from 'react';

type Dimensions = {
  height: number | undefined;
  width: number | undefined;
}

export const Canvas : React.FunctionComponent = () => {
  const [canvasDimensions, setDimensions] = useState<Dimensions>();

  useEffect(()=> {
    window.onload = () => {
      const c : any  = document.getElementById('canvas');
      const ctx = c.getContext('2d');
      const img = document.getElementById('img');
      setDimensions({ height: img?.clientHeight, width: img?.clientWidth });
      ctx.drawImage(img, 10, 10,img?.clientHeight, img?.clientWidth );
    };
  });

  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <img 
        id='img' 
        src= 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F13%2F2015%2F04%2F05%2Ffeatured.jpg&q=60' 
        style={{height: '300px'}}
      />
      <canvas id='canvas' style={{border: '1px solid black'}}></canvas>
    </div>
  );
};