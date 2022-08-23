import React from 'react';
import Home from '../pages/Home';
import Sneaker from '../pages/Sneaker';

export const NavLinks = [
  {
    title: 'Home',
    link:'/',
    component:<Home/>
  },
  {
    title: 'Sneaker',
    link:'/sneaker-api',
    component: <Sneaker />
  }
];