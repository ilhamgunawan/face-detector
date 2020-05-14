import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigations/Navigations';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: '6c5fa1e77ebe4b4aa4fa72b8ed45b7ce'
 });

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

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputLink: '',
      imgLink: ''
    };
  }

  onInputChange = (event) => {
    this.setState({inputLink: event.target.value});
  }

  onButtonClick = () => {
    this.setState({imgLink: this.state.inputLink});
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.inputLink).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm inputChange={this.onInputChange} buttonClicked={this.onButtonClick} />
        <FaceRecognition imageUrl={this.state.imgLink} />

  
      </div>
    );
  }
}

export default App;
