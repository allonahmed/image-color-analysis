import React from 'react';
import { useAppSelector } from '../../hooks';
import { Canvas } from '../../components/Canvas';
import { rgbToHex } from '../../helpers';

import '../../styles/Imagedisplay.css';
import { Relateable } from './RelateableSlider';

const toPercent = (number: number) => {
  return `${(number.toFixed(2))}%`;
};

const removeExtra = (data: string) => {
  if(data.includes('(')){
    const substring = data.substring(data.indexOf('('), data.indexOf(')') + 1);
    return data.replace(substring, '');
  }
  return data;
};

export const DisplayColors: React.FC = () => {
  const { imageUrl, imageColors, imageData, related} = useAppSelector(state => state.image);
  console.log(imageColors);
  return (
    (imageUrl && imageColors) &&
        <div
          className='display-container'
        >
          { imageData && 
          <div className='image-data'>
            <div className='product-header'> 
              <h2 >{imageData.silhouette}</h2>
              <h3 >{removeExtra(imageData.name)} {imageData.release_year && `(${imageData.release_year})`}</h3>
            </div>

            <div className='product-info'>
              <h4>Product Information</h4>
              <div className='table'>
                <div className='label'>
                  <p>SKU</p>
                  <p>Colorway </p>
                  <p>Release Date</p>
                  <p>Retail Price</p>
                  <p>Market Price</p>
                </div>
                <div className='data'>
                  <p>{imageData.sku}</p>
                  <p>{imageData.colorway}</p>
                  <p>{imageData.release_date}</p>
                  <p>{imageData.retail_price ? `$${imageData.retail_price}` : '???'}</p>
                  <p>{imageData.estimated_market_value ? `$${imageData.estimated_market_value}` : '???'}</p>
                </div>
              </div>     
            </div>

            <div style={{width:'100%'}}>
              <Relateable data={related}/>
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
                        backgroundColor: `rgba(${color.color[0]}, ${color.color[1]}, ${color.color[2]}, ${color.color[3]}`,
                        // backgroundColor:`rgb(${color[0]}, ${color[1]}, ${color[2]})`,
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
