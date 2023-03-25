import React from 'react';
import './App.css';
import Scene from "./components/Scene";
import {Canvas} from "@react-three/fiber";
import UiLayer from "./components/UiLayer";


function App() {
    return (
    <main className="site-content">
        <UiLayer />
        <Canvas className="planetarium-canvas">
            <Scene />
        </Canvas>
    </main>
    );
}

export default App;
