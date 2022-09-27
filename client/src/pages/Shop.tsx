import React from 'react';
import { generateDummyClothes } from '../assets/data/dummdata';

export const Shop = () => {

  generateDummyClothes(100);
  return (
    <div>
      custom merch here

    </div>
  );
};

