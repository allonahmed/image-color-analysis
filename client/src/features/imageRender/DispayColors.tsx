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
          { imageData && 
          <div className='image-data'>
            <div className='product-header'> 
              <h2 >{imageData.silhouette}</h2>
              <h3 >{imageData.name} ({imageData.release_year})</h3>
            </div>
            <div className='product-info'>
              <h4>Product Information</h4>
              <p>
                <span style={{color: 'rgba(0,0,0,.7)'}}>Colorway:</span> 
                {imageData.colorway}
              </p>
              <p>
                <span style={{color: 'rgba(0,0,0,.7)'}}>Release Date: </span>
                {imageData.release_date}
              </p>
              <p>
                <span style={{color: 'rgba(0,0,0,.7)'}}>Market Value Price: </span>
                ${imageData.estimated_market_value}
              </p>      
            </div>
          </div> }

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
