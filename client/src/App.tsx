import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLinks } from './navigation/NavLinks';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        {NavLinks.map((link, id)=>{
          return (
            <Route key={id} path={link.link} element={link.component} />
          );
        })}
      </Routes>
    </div>
  );
};

export default App;
