import React from 'react';
import { useAppSelector } from '../../hooks';
import { imageColors } from '../../redux/reducers/image';

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
          <div className='color-display-container'>
            {imageColors.map((color: any, id: number) => {
              return (
                <div key={id} >
                  {/* <div>0{toPercent(color.percentage * 100)}</div> */}
                  {/* <div style={{fontSize:'8px'}}>rgb({color.color[0]},{color.color[1]}, {color.color[2]})</div> */}
                  <div
                    style={{
                      height: '75px',
                      width: '75px',
                      // backgroundColor: `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]}`,
                      backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
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
