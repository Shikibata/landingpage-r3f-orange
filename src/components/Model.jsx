import React, {useRef, useState} from "react";
import {Sparkles, useGLTF} from "@react-three/drei";
import {useFrame, useThree} from "@react-three/fiber";
import * as THREE from "three";

export default function Model({ z }){
  const ref = useRef()
  const { nodes, materials } = useGLTF('/models/ring-v2-transformed.glb')
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
    ref.current.rotation.set((data.rX += 0.005), (data.rY -= 0.01), (data.rZ -= 0.002))
    ref.current.position.set(data.x * width, (data.y += 0.02), z)
    if(data.y > height) data.y = -height
  })

  return (
        <mesh ref={ref} geometry={nodes.ring.geometry} material={materials.skin} scale={175} z={z}/>
  )

}