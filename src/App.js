import React from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import Banner from './Components/Banner/Banner';
import RawPost from './Components/RawPost/RawPost';
import {originals, action} from "./urls"

function App() {
  return (
    <div className="App">
     
    <NavBar />
    <Banner />
    <RawPost url={originals} title = "Netflix Originals"/>
    <RawPost url={action} title = "Action" isSmall />
  
  

    </div>
  );
}

export default App;
