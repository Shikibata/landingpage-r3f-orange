import * as THREE from 'three'
import React, {Suspense, useRef, useState} from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {Environment, useGLTF} from "@react-three/drei";
import {DepthOfField, EffectComposer} from "@react-three/postprocessing";


function Orange({ z }){
    const ref = useRef()
    const { nodes, materials } = useGLTF('/ring-v2-transformed.glb')
    const { viewport, camera } = useThree()
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, z])
    const [data] = useState({
        x : THREE.MathUtils.randFloatSpread(2),
        y : THREE.MathUtils.randFloatSpread(height),
        rX : Math.random() * Math.PI,
        rY : Math.random() * Math.PI,
        rZ : Math.random() * Math.PI,
    })
    useFrame((state) => {
        ref.current.rotation.set((data.rX += 0.01), (data.rY -= 0.015), (data.rZ -= 0.002))
        ref.current.position.set(data.x * width, (data.y += 0.02), z)
        if(data.y > height) data.y = -height
    })

    return <mesh ref={ref} geometry={nodes.ring.geometry} material={materials.skin} scale={175}/>

}

export default function App({count = 70, depth = 70}) {

  return (
        <Canvas gl={{alpha : false}} camera={{near: 0.01, far: 110, fov: 30}}>
            <color attach={"background"} args={["#e58739"]} />
            <ambientLight intensity={0.2} />
            <spotLight position={[10, 10, 10]} intensity={1} />
            <Suspense fallback={null}>
                <Environment preset={"sunset"} />
                {Array.from({ length : count}, (_, i) => (
                    <Orange key={i} z={(-i / count) * depth - 25} />
                ))}
                <EffectComposer>
                    <DepthOfField target={[0, 0, depth / 2]} focalLength={0.4} bokehScale={11} height={800}/>
                </EffectComposer>
            </Suspense>
        </Canvas>
  )
}

