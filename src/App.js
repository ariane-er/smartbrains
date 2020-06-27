import React, { Component } from 'react';
import Particles from "react-particles-js";

import Navigation from "./components/navigation/navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imageLinkForm/imageLinkForm";
import Rank from "./components/rank/rank";
import FaceRecognition from "./components/faceRecognition/faceRecognition";
import SignIn from "./components/signIn/signIn";
import Register from "./components/register/register";


import './App.css';


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

const initialState =  {
  input: "",
  imageUrl: "",
  boxes: {},
  route: "signin",
  isSignedIn: false, //tracks where we are
  user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "", 
  }
}

class App extends Component {

  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined,
      }
    })
  }

  calculateFaceLocation = (data) => {
    const arrayOfRegions = data.outputs[0].data.regions;
    const arrayOfBoundingBoxes = arrayOfRegions.map(region => region.region_info.bounding_box);
    
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    const arrayOfCoords = arrayOfBoundingBoxes.map(boundingBox => ( {
      leftCol: boundingBox.left_col * width,
      topRow: boundingBox.top_row * height,
      rightCol: width - (boundingBox.right_col * width),
      bottomRow: height - (boundingBox.bottom_row * height)}
    ));

    return arrayOfCoords;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {

    this.setState({imageUrl: this.state.input});

    //API CALL
    fetch("https://cryptic-bastion-56567.herokuapp.com/imageurl", {
      method:"post",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response) { //another fetch to update entry count
          fetch("https://cryptic-bastion-56567.herokuapp.com/image", {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    id: this.state.user.id
                })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))})
      .catch(error => console.log(error));

      
  }

  onRouteChange = (route) => {
    if (route === "signin") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({ isSignedIn: true })
    }
    this.setState({route: route});
  }

  render() {
    //destructure the state
    const { isSignedIn, imageUrl, route, boxes } = this.state;

    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        
        { route === "home"
        ? <div>        
            
            <div className="flex items-center">
            <Logo/>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            </div>
            <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onPictureSumbit={this.onPictureSubmit}/> 
            
            <FaceRecognition boxes={boxes} imageUrl={imageUrl}/>
          </div>

        : (
          route === "signin"
          ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
        
        
        
      </div>
    );
}

}

export default App;
