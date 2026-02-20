import { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';

type Spline3DBackgroundProps = {
  className?: string;
};

function SplineScene() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Loading shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      )}

      <div className={`absolute inset-0 transition-opacity duration-700 ${isLoaded ? 'opacity-40' : 'opacity-0'}`}>
        <Spline
          scene="https://prod.spline.design/b3c1fafd-932e-42bd-959a-3290aaf3965c/scene.splinecode"
          onLoad={() => setIsLoaded(true)}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </>
  );
}

export function Spline3DBackground({ className = "" }: Spline3DBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <Suspense fallback={
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5" />
      }>
        <SplineScene />
      </Suspense>

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/90 pointer-events-none" />
    </div>
  );
}
