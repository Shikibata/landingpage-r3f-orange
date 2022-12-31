import {Canvas} from "@react-three/fiber";
import React, {Suspense} from "react";
import {Environment, Stats} from "@react-three/drei";
import Model from "./Model.jsx";
import {DepthOfField, EffectComposer} from "@react-three/postprocessing";

export default function CanvasContainer({count = 120, depth = 65, z}) {

    return (
    <>
        <div className="page-title">
          <h2>A SIMPLE</h2>
          <h1>LANDING PAGE</h1>
        </div>
        <div className="quote">
          <p>"And some things that should not have been forgotten were lost. History became legend. Legend became myth. And for two and a half thousand years, the ring passed out of all knowledge."</p>
        </div>
        <Canvas className={"canvas"} gl={{alpha : false}} camera={{near: 0.01, far: 100, fov: 30}} dpr={1}>
          <color attach={"background"} args={["#f3edd8"]} />
          <ambientLight intensity={0.2} />
          <spotLight position={[10, 10, 10]} intensity={0.10} />
          <Suspense fallback={null}>
            <Environment
                preset={"forest"}
                blur={1}
            />
            {Array.from({ length : count}, (_, i) => (
                <Model key={i} z={(-i / count) * depth - 17} />
            ))}
            <EffectComposer>
              <DepthOfField target={[0, 0, depth / 2]} focalLength={0.4} bokehScale={11} height={800}/>
            </EffectComposer>
          </Suspense>
        </Canvas>
    </>
    )
  }
