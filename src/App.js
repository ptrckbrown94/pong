import React from 'react';
import Paddle from "./components/Paddle/Paddle"
import Container from "./components/container" 


function App() {
  return (
    <div className="container">
      <Paddle />
      <Paddle isPlayerTwo/>
    </div>
  );
}

export default App;
