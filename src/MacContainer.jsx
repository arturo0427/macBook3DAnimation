import { useGLTF, useScroll, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MacContainer = () => {
  //Get model
  let macGltf = useGLTF('./mac.glb');
  let texture = useTexture('./red.jpg');

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

  return (
    <group position={[0, -10, 20]}>
      <primitive object={macGltf.scene} scale={1} />
    </group>
  );
};

export default MacContainer;
