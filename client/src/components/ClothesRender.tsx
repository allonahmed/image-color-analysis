import React from 'react';

/**
 * @returns component that contains clothes data (gym shark data for now)
 */

type Props = {
  clothesData: any;
}

const Clothes : React.FunctionComponent<{ item: any }> = ({ item }) => {
  return (
    <div style={{display:'flex', flexDirection:'column'}}> 
      <img src={item.img_url} style={{width: '320px', height: '350px'}}/>
      <div style={{width: '320px'}}>{item.name}</div>
    </div>  
  );
};

export const ClothesRender : React.FunctionComponent<Props> = ({ clothesData }) => {
  return (
    <div style={{
      display:'grid', 
      gridTemplateColumns: 'repeat(3, 1fr)', 
      gridColumnGap: '10px', 
      gridRowGap: '10px',
      justifyItems:'center',
    }}>
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