import React from 'react';
import { useAppSelector } from '../hooks';

import '../styles/loading.css';

export const Loading: React.FC = () => {
  const status = useAppSelector((state) => state.system.loading);

  return (
    <div className="loading-container" style={{ display: status ? 'flex' : 'none' }}>
      <div className="lds-spinner">
        {Array.from({ length: 12 }, (_, id) => {
          return (
            <div key={id}></div>
          );
        })}
      </div>
    </div>
  );
}; 