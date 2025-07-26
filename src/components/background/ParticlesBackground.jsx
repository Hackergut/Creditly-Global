import React from 'react';
import DarkVeil from './DarkVeil';

export default function ParticlesBackground({ children }) {
  return (
    <div className="relative min-h-screen w-full">
      {/* DarkVeil Background */}
      <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
        <DarkVeil 
          hueShift={180}
          noiseIntensity={0.03}
          scanlineIntensity={0.05}
          speed={0.3}
          scanlineFrequency={0.005}
          warpAmount={0.2}
          resolutionScale={1}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        {children}
      </div>
    </div>
  );
}