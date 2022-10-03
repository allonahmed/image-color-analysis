import React from 'react';
import { generateDummyClothes } from '../assets/data/dummdata';
import { ClothesRender } from '../components/ClothesRender';

export const Shop = () => {

  generateDummyClothes(100);
  return (
    <div>
      <ClothesRender clothesData={{}}/>
    </div>
  );
};

