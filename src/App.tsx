import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Scene from "./components/Scene";
import {Canvas} from "@react-three/fiber";
import UiLayer from "./components/UiLayer";

console.log(window.navigator)

function App() {
    // preloader hotfix
    const [uiEnabled, setUiEnabled] = useState(false)

    const distance = useMemo(() =>
        window.innerWidth > window.innerHeight ? 10 : 20,
        []
    )

    useEffect(() => {
        const timeout = setTimeout(() => setUiEnabled(true), 100)
        return () => clearTimeout(timeout)
    }, [])

    return (
        <main className="site-content">
            {uiEnabled && <UiLayer/>}
            <Canvas
                className="planetarium-canvas"
                frameloop="always"
                camera={{ position: [-distance, distance, distance] }}
            >
                <Scene />
            </Canvas>
        </main>
    );
}

export default App;
