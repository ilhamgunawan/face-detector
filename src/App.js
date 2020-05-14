import React from 'react';
import Navigation from './components/Navigations/Navigations';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  "particles": {
    "number": {
        "value": 50
    },
    "size": {
        "value": 3
    }
  },
  "interactivity": {
    "events": {
        "onclick": {
            "enable": true,
            "mode": "push"
        }
    }
  }
};

function App() {
  return (
    <div className='App'>
      <Particles className='particles' params={particlesOptions} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />

    </div>
  );
}

export default App;
