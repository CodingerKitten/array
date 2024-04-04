"use client"

import React, {useState, useRef, Suspense} from 'react'
import {Canvas, useFrame} from '@react-three/fiber'
import {Points, PointMaterial, Preload} from '@react-three/drei'

const StarBackground = (props:any) => {
    const ref:any= useRef()
    const random = require('maath/random/dist/maath-random.esm')
    const [sphere] = useState(()=>
    random.inSphere(new Float32Array(5000*3), {radius: 1.2})
    );

    useFrame((state,delta)=>{
        ref.current.rotation.x -= delta/10;
        ref.current.rotation.y -= delta/15;
    })
  return (
      <group rotation={[0,0, Math.PI/4]}>
        <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled{...props}
        >
            <PointMaterial 
            transparent
            color='#fff'
            size={0.002}
            sizeAttenuation={true}
            dethWrite={false}
            />
        </Points>
      </group>
  )
}
const StarsCanvas = () => (
    <div className="w-full h-auto fixed inset-0 z-[20]">
        <Canvas camera={{position: [0.001,0.001,1]}}>
            <Suspense fallback={null}>
                <StarBackground/>
            </Suspense>
        </Canvas>
    </div>
)
export default StarsCanvas
