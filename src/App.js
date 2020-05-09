import React from 'react';
import Home from './components/Home'
import Fade from 'react-reveal/Fade'

import './App.css';

const App = () => {
  return (
    <div className="App">
      <Fade>
        <Home /> 
      </Fade>
    </div>
  );
}

export default App

