import React from 'react';
import './App.css';
import Scene from "./components/Scene";
import {Canvas} from "@react-three/fiber";


function App() {
  return (
    <main className="site-content">
        <Canvas className="planetarium-canvas">
            <Scene />
        </Canvas>
    </main>
  );
}

export default App;
