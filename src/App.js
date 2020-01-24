import React from 'react';
import Paddle from "./components/Paddle/Paddle";
import Ball from "./components/Ball/Ball"
import Container from "./components/container"; 




function App() {
  return (
    <div className="container">
      <Paddle />
      <Paddle isPlayerTwo/>
      <Ball />
    </div>
  );
}

export default App;
