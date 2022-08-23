import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { NavLinks } from './navigation/NavLinks';

import './App.css';

const App: React.FC = () => {
  // const [image, setImage] = useState<File[] | null>(null);

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
