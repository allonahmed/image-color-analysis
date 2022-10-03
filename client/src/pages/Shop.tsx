import React, { useEffect, useState } from 'react';
import { getGymShark } from '../api/clothes';
import { ClothesRender } from '../components/ClothesRender';

export const Shop = () => {

  const [clothesData, setClothesData] = useState<any>(null);

  useEffect(()=> {
    getGymShark().then((res)=>{
      setClothesData(res);
    });
  },[]);
  console.log(clothesData);

  return (
    <div>
      {clothesData && <ClothesRender clothesData={clothesData}/>}
    </div>
  );
};

