import React from 'react';
import Home from '../pages/Home';
import Sneaker from '../pages/Sneaker';

export const NavLinks = [
  {
    title: 'Sneaker Pallete',
    link:'/',
    component:<Home/>
  },
  {
    title: 'Sneaker Database',
    link:'/sneaker-api',
    component: <Sneaker />
  }
];