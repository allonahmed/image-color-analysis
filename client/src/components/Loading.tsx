import React from 'react';
import { useAppSelector } from '../hooks';

import '../styles/loading.css';

export const Loading: React.FC = () => {
  const status = useAppSelector((state) => state.system.loading);

  return (
    <div className="loading-container" style={{ display: status ? 'flex' : 'none' }}>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}; 