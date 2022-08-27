import React from 'react';
import { useAppSelector } from '../../hooks';
import { imageColors } from '../../redux/reducers/image';

const toPercent = (number: number) => {
  return `${Math.floor(number * 100)}%`;
};

export const DisplayColors: React.FC = () => {
  const colors = useAppSelector(state => state.image.imageColors);

  console.log(colors);

  return (
    colors &&
        <div
          style={{ display: 'flex', justifyContent: 'center', margin: '20px 0', flexWrap: 'wrap' }}
        >
          {colors.map((color: imageColors, id: number) => {
            return (
              <div key={id} >
                <div>{toPercent(color.percentage)}</div>
                <div

                  style={{
                    height: '60px',
                    width: '60px',
                    backgroundColor: `rgb(${color.color[0]}, ${color.color[1]}, ${color.color[2]}`,
                    margin: '0 10px'
                  }}
                />
              </div>
            );
          })}
        </div>
  );
};
