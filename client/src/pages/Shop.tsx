import React, { useEffect, useState } from 'react';
import { getGymShark } from '../api/clothes';
import { ClothesRender } from '../components/ClothesRender';

export const Shop = () => {

  const [clothesData, setClothesData] = useState<any>(null);

  useEffect(()=> {
    getGymShark().then((res)=>{
      setClothesData(res);
      console.log(12, res);
      for (let i = 0; i < res.length; i += 1){
        // console.log(res[i].img_url);
        const request = new XMLHttpRequest();
        request.open('GET', res[i].img_url, true);
        request.send();
        request.onload = function() {
  
          if (request.status == 200) //if(statusText == OK)
          {
            console.log('image exists');
          } else {
            console.log('image doesn\'t exist');
          }
        };
      }
    });

  },[]);
  // console.log(clothesData);

  return (
    <div>
      {clothesData && <ClothesRender clothesData={clothesData}/>}
    </div>
  );
};

