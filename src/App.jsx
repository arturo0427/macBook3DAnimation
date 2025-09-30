import { useGSAP } from '@gsap/react';
import {
  Environment,
  Preload,
  ScrollControls,
  Loader,
  useProgress,
} from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import gsap from 'gsap';
import MacContainer from './MacContainer';

function App() {
  const { active } = useProgress();

  useGSAP(
    () => {
      if (active) return;
      //GSAP Animations here
      const tl = gsap.timeline();

      tl.from('nav a', {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
      })
        .from(
          '.masked',
          {
            y: -30,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
          },
          '-=1'
        )
        .from(
          'h5',
          {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=1'
        )
        .from(
          'p',
          {
            y: -20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
          },
          '-=0.5'
        );
    },
    { dependencies: [active] }
  );

  return (
    <div className="w-full h-screen">
      <nav className="absolute line top-0 left-1/2 -translate-x-1/2 flex items-center gap-10 pt-8 pb-3 text-white z-2">
        {[
          'iPhone',
          'MacBook',
          'iPad',
          'iPod',
          'Watch',
          'AirPods',
          'Accessories',
          'Support',
          'Store',
        ].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-md font-[400] hover:text-gray-400 cursor-pointer text-sm"
          >
            {item}
          </a>
        ))}
      </nav>

      <div className="absolute flex flex-col items-center text-white top-32 left-1/2 -translate-x-1/2">
        <h3 className="masked text-7xl tracking-tighter font-[700]">
          MacBook pro 3D Animation
        </h3>
        <h5 className="text-2xl mt-4 font-[500]">
          Scroll down to see the magic
        </h5>
        <p className="text-center w-2/4 mt-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora
          laudantium similique cumque cum praesentium molestiae odit officiis.
          Eum quia unde ea possimus obcaecati quibusdam doloribus, molestias,
          natus animi amet repudiandae.
        </p>
      </div>

      <Canvas
        camera={{ fov: 12, near: 0.1, far: 1000, position: [0, -10, 250] }}
      >
        <Environment files={'/studio_small_09_1k.hdr'} />
        <ScrollControls pages={3} damping={0.1}>
          <MacContainer />
        </ScrollControls>
        <Preload all />
      </Canvas>
      <Loader />
    </div>
  );
}

export default App;
