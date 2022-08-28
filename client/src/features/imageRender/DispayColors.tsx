import React from 'react';
import { useAppSelector } from '../../hooks';
import { imageColors } from '../../redux/reducers/image';

import '../../styles/Imagedisplay.css';

const toPercent = (number: number) => {
  return `${Math.floor(number * 100)}%`;
};

export const DisplayColors: React.FC = () => {
  const { image, imageColors, current} = useAppSelector(state => state.image);
  console.log(imageColors);

  return (
    (image && imageColors) &&
        <div
          className='display-container'
        >
          <div className='color-display-container'>
            {imageColors.map((color: imageColors, id: number) => {
              return (
                <div key={id} >
                  <div>{toPercent(color.percentage)}</div>
                  <div
                    style={{
                      height: '60px',
                      width: '60px',
                      backgroundColor: `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]}`,
                      marginRight: '20px'
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className='image-data'>
            <img src={image} />
            {
              current && 
                <div style={{marginTop:'-50px'}}>
                  <h3 >{current.brand}</h3>
                  <h1 >{current.name}</h1>
                  <h2 >{current.silhouette}</h2>
                  <p>Release Date: {current.release_date}</p>
                  <p>Market Value Price: ${current.estimated_market_value}</p>
                  
                </div>
              
            }
          </div>
        </div>
  );
};
