import {Canvas} from "@react-three/fiber";
import React, {Suspense} from "react";
import {Environment, Stats} from "@react-three/drei";
import Model from "./Model.jsx";
import {DepthOfField, EffectComposer} from "@react-three/postprocessing";

export default function CanvasContainer({count = 120, depth = 65}) {

    return (
        <Canvas gl={{alpha : false}} camera={{near: 0.01, far: 110, fov: 30}} dpr={1}>
          <color attach={"background"} args={["#e58739"]} />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Environment preset={"sunset"} />
            {Array.from({ length : count}, (_, i) => (
                <Model key={i} z={(-i / count) * depth - 25} />
            ))}
            <EffectComposer>
              <DepthOfField target={[0, 0, depth / 2]} focalLength={0.4} bokehScale={11} height={800}/>
            </EffectComposer>
          </Suspense>
          <Stats />
        </Canvas>

    )
  }
