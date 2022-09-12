import React from 'react';
import { useAppSelector } from '../../hooks';
import { Canvas } from '../../components/Canvas';
import { rgbToHex } from '../../helpers';

import '../../styles/Imagedisplay.css';

const toPercent = (number: number) => {
  return `${(number.toFixed(2))}%`;
};

export const DisplayColors: React.FC = () => {
  const { imageUrl, imageColors, imageData} = useAppSelector(state => state.image);

  return (
    (imageUrl && imageColors) &&
        <div
          className='display-container'
        >
          <div className='image-data'>
            {
              imageData && 
                <div>
                  <h3 >{imageData.brand}</h3>
                  <h1 >{imageData.name}</h1>
                  <h2 >{imageData.silhouette}</h2>
                  <p>Release Date: {imageData.release_date}</p>
                  <p>Market Value Price: ${imageData.estimated_market_value}</p>      
                </div>
            }
          </div>
          <div className='image-and-colors'>
            <Canvas image={imageUrl}/>
            <div className='palette'>
              {imageColors.map((color: any, id: number) => {
                return (
                  <div key={id} className='palette-item'>
                    {/* <div style={{fontSize:'8px'}}>rgb({color.color[0]},{color.color[1]}, {color.color[2]})</div> */}
                    <div
                      className='palette-color'
                      style={{
                        // backgroundColor: `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]}`,
                        backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                        boxShadow: `0 0 5px 1px rgb(${color[0]}, ${color[1]}, ${color[2]})`
                      }}
                    >
                      <div className='palette-hex'>
                        {rgbToHex(color[0], color[1], color[2])}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  );
};
