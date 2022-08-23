import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLinks } from './navigation/NavLinks';
import { Header } from './navigation/Header';
import { Navigator } from './navigation/Navigator';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Navigator />
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
