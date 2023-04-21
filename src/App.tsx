import './App.css'

import { Canvas } from '@react-three/fiber'
import React, { Suspense, useMemo } from 'react'

import { Delay } from './components/Delay'
import Preloader from './components/Preloader'
import Scene from './components/Scene'
import UiLayer from './components/UiLayer'

console.log(window.navigator)

function App() {
  const distance = useMemo(
    () => (window.innerWidth > window.innerHeight ? 10 : 20),
    []
  )

  return (
    <main className="site-content">
      <Suspense fallback={<Preloader />}>
        <UiLayer />
        {/* Prevents UI from loading before the scene */}
        <Delay value={500} />
      </Suspense>
      <Canvas
        className="planetarium-canvas"
        frameloop="always"
        camera={{ position: [-distance, distance, distance] }}
      >
        <Scene />
      </Canvas>
    </main>
  )
}

export default App
