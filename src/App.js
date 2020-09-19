import React from 'react';
import Home from './components/Home'
import Fade from 'react-reveal/Fade'
import { proAppsInitials } from './constants/Images'


import './App.css';

const App = () => {
  return (
    <div className="App">
      <Fade>
        <Home /> 
      </Fade>
      <span style={{display: 'flex', flex: 1, justifyContent: 'flex-end', padding: 10}}>
        <img className="App-logo-small" src={proAppsInitials} alt="proapps small logo" />
      </span>

    </div>
  );
}

export default App

