import React, { Component } from 'react';
import Particles from "react-particles-js";
import Clarifai from "clarifai";

import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Rank from "./components/rank/rank";
import FaceRecognition from "./components/faceRecognition/faceRecognition";


import './App.css';

const appClarifai = new Clarifai.App({
  apiKey: '448b34108c1a49cdb1e480fc3c77be9b'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area:800,
      }
    }
  },
  interactivity: {
    events: {
      "onhover": {
        enable: true,
        mode: "repulse",
      }
    }
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {

    this.setState({imageUrl: this.state.input});

    //API CALL
    appClarifai.models.predict(
      Clarifai.COLOR_MODEL, 
      this.state.input)
      .then(function(response) {
      console.log(response);
      // do something with response
    },
    function(err) {
      // there was an error
    }
  );
  }

  render() {
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/> 
        
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
}

}

export default App;
