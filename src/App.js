import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigations/Navigations';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
        "value": 100
    },
    "size": {
        "value": 0
    },
    "links": {
        "color": {
            "distance": 200,
            "opacity": 1
        },
        "width": 5
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputLink: '',
      imgLink: '',
      box: {},
      route: 'signin',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    };
  }

  loadUser = userData => {
    this.setState({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        entries: userData.entries,
        joined: userData.joined
      }
    });
  }

  calculateFacelocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }

  displayBoundingBox = box => {
    this.setState({box: box});
  }

  onInputChange = event => {
    this.setState({inputLink: event.target.value});
  }

  onImageSubmit = () => {
    this.setState({imgLink: this.state.inputLink});
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.inputLink)
      .then(response => {
        if (response.outputs[0]) {
          fetch('https://powerful-beach-15259.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(newEntries => {
              Object.assign(this.state.user, {entries: newEntries});
              this.displayBoundingBox(this.calculateFacelocation(response));
            });
        }
      })
      .catch(err => console.log(err));
  }

  onStateChange = (route) => {
    this.setState({
      route: route,
      inputLink: '',
      imgLink: ''
    });
  }

  render() {
    return (
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        { this.state.route === 'home'
          ? <div>
              <Navigation onStateChange={this.onStateChange} />
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm inputChange={this.onInputChange} buttonClicked={this.onImageSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imgLink} />
            </div>
          : (this.state.route === 'signin'
              ? <div>
                  <Logo />
                  <Signin loadUser={this.loadUser} onStateChange={this.onStateChange} />
                </div>
              : <div>
                  <Logo />
                  <Register loadUser={this.loadUser} onStateChange={this.onStateChange} />
                </div>
            )
        }
      </div>
    );
  }
}

export default App;
