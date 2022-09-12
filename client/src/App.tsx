import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLinks } from './navigation/NavLinks';
import { Navigator } from './navigation/Navigator';
import { Loading } from './components/Loading';

import './App.css';
import { GetAll } from './api/testapi';


const App: React.FC = () => {
  React.useEffect(()=> {
    GetAll();
  },[]);

  return (
    <div className="App">
      <Navigator />
      <Loading />
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
