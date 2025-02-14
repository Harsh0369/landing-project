import React from 'react'
import { ThreeDCardDemo } from './ThreeDCardDemo'
import { WavyBackgroundDemo } from './WavyBackgroundDemo'
import { AuroraBackgroundDemo } from './AuroraBackground'
import { BackgroundBoxesDemo } from './BackgroundBoxesDemo'
import { FeaturesSectionDemo } from './FeaturesSectionDemo'
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      {/* <AuroraBackgroundDemo /> */}
      {/* <ThreeDCardDemo /> */}
      {/* <WavyBackgroundDemo /> */}
      <BackgroundBoxesDemo />
      <FeaturesSectionDemo/>
    </div>
  )
}

export default App