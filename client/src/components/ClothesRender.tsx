import React from 'react';

/**
 * @returns component that contains clothes data (gym shark data for now)
 */

type Props = {
  clothesData: any;
}

const Clothes : React.FunctionComponent<{ item: any }> = ({ item }) => {
  console.log(item.img_url);
  return (
    <div> 
      <img src={item.img_url} style={{width: '200px', height: '200px'}}/>
    </div>  
  );
};

export const ClothesRender : React.FunctionComponent<Props> = ({ clothesData }) => {
  return (
    <div>
      {
        clothesData.map((item: any, index: number)=> {
          return (
            <Clothes item={item}  key={index}/>
          );
        })
      }
    </div>
  );
};