import { useGSAP } from '@gsap/react';
import { useGLTF, useProgress, useScroll, useTexture } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import gsap from 'gsap';
import { useRef } from 'react';
import * as THREE from 'three';

useGLTF.preload('./mac.glb');
useTexture.preload('./red.jpg');

const MacContainer = () => {
  //Get model
  let macGltf = useGLTF('./mac.glb');
  let texture = useTexture('./red.jpg');
  const group = useRef();
  const { invalidate } = useThree();
  const { active } = useProgress();

  console.log(active);

  //Get all meshes
  let meshes = {};
  macGltf.scene.traverse((child) => {
    meshes[child.name] = child;
  });

  //Initial rotation -> Close the MacBook
  meshes.screen.rotation.x = THREE.MathUtils.degToRad(180);
  meshes.matte.material.map = texture;
  meshes.matte.material.emissiveIntensity = 0;
  meshes.matte.material.metalness = 0;
  meshes.matte.material.roughness = 1;

  //Scroll Animation
  let data = useScroll();
  useFrame(() => {
    meshes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
  });

  useGSAP(
    () => {
      if (active) return;
      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut', onUpdate: invalidate },
      });

      tl.from(group.current.position, { z: 140, duration: 2 })
        .from(group.current.rotation, { y: Math.PI / 4, duration: 2 }, '<')
        .from(
          group.current.scale,
          { x: 0.85, y: 0.85, z: 0.85, duration: 2 },
          '<'
        );
    },
    { dependencies: [active] }
  );

  return (
    <group ref={group} position={[0, -10, 20]}>
      <primitive object={macGltf.scene} scale={1} />
    </group>
  );
};

export default MacContainer;
