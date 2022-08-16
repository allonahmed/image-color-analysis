import React from 'react';
import './App.css';
import { ButtonStd } from './components/ButtonStd';

function App() {
  return (
    <div className="App">
      react app
      <ButtonStd onClick={() => alert('clicked')}>
        Click me
      </ButtonStd>
    </div>
  );
}

export default App;
