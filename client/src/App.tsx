import React from 'react';
import './App.css';
import { ButtonStd } from './components/ButtonStd';
import { ImageUpload } from './components/ImageUpload';

function App() {
  return (
    <div className="App">
      react app
      <ButtonStd onClick={() => alert('clicked')}>
        Click me
      </ButtonStd>
      <ImageUpload />
    </div>
  );
}

export default App;
