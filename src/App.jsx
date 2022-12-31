import React, {} from 'react';
import CanvasContainer from './components/CanvasContainer'

export default function App({count = 120, depth = 65}) {

  return (
      <div className={"app"}>
        <CanvasContainer />
      </div>
  )
}

