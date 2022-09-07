import React from 'react';
import { useAppSelector } from '../../hooks';
import { imageColors } from '../../redux/reducers/image';
import { Canvas } from '../../components/Canvas';

import '../../styles/Imagedisplay.css';

const toPercent = (number: number) => {
  return `${(number.toFixed(2))}%`;
};

export const DisplayColors: React.FC = () => {
  const { image, imageColors, current} = useAppSelector(state => state.image);
  
  console.log(imageColors);

  return (
    (image && imageColors) &&
        <div
          className='display-container'
        >
          <div className='image-data'>
            {
              current && 
                <div>
                  <h3 >{current.brand}</h3>
                  <h1 >{current.name}</h1>
                  <h2 >{current.silhouette}</h2>
                  <p>Release Date: {current.release_date}</p>
                  <p>Market Value Price: ${current.estimated_market_value}</p>      
                </div>
            }
          </div>
          <div className='image-and-colors'>
            <Canvas />
            <div className='palette'>
              {imageColors.map((color: any, id: number) => {
                return (
                  <div key={id} className='palette-item'>
                    <div className='palette-rgb'>
                      {`rgb(${color[0]}, ${color[1]}, ${color[2]})`}
                    </div>
                    {/* <div style={{fontSize:'8px'}}>rgb({color.color[0]},{color.color[1]}, {color.color[2]})</div> */}
                    <div
                      className='palette-color'
                      style={{
                        // backgroundColor: `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]}`,
                        backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
  );
};
