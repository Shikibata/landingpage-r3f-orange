/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.1 orange-v1.glb --transform --simplify
*/

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/orange-v1-transformed.glb')
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.orange.geometry} material={materials.skin} scale={0.78} />
    </group>
  )
}

useGLTF.preload('/orange-v1-transformed.glb')
