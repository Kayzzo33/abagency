import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const Scene = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(60, aspect, 0.01, 1000);
      camera.position.set(0, 0.1, 0.4);
      camera.zoom = 1.0;
      camera.updateProjectionMatrix();

      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      // Mouse tracking state
      let targetRotX = 0;
      let targetRotY = 0;
      let currentRotX = 0;
      let currentRotY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (window.scrollY < 300) {
          const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          targetRotY = mouseX * (Math.PI / 8);
          targetRotX = mouseY * (Math.PI / 16);
        }
      };

      window.addEventListener("mousemove", handleMouseMove);

      const light = setLighting(scene);
      let progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let isCancelled = false;
      let loadedModel: THREE.Object3D | null = null;

      loadCharacter().then((gltf) => {
        if (isCancelled) return;
        
        if (gltf) {
          const animations = setAnimations(gltf);
          hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          character.rotation.order = "YXZ";
          loadedModel = character;
          setChar(character);
          scene.add(character);
          progress.loaded().then(() => {
            setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
              // After the intro layout shifts and settles, we refresh ScrollTrigger
              // to fix any pinSpacing bugs that cause section overlaps 
              setTimeout(() => {
                import("gsap/ScrollTrigger").then((module) => {
                  module.ScrollTrigger.refresh(true);
                });
              }, 1000); // 1s after intro starts
            }, 2500);
          });
          window.addEventListener("resize", () =>
            handleResize(renderer, camera, canvasDiv, character)
          );
        }
      });

      const animate = () => {
        if (isCancelled) return;
        requestAnimationFrame(animate);
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }

        // Smooth mouse-based rotation for iPhone (only when near top)
        if (loadedModel && window.scrollY < 300) {
          currentRotY = lerp(currentRotY, targetRotY, 0.05);
          currentRotX = lerp(currentRotX, targetRotX, 0.05);
          loadedModel.rotation.y = currentRotY;
          loadedModel.rotation.x = currentRotX;
        }

        renderer.render(scene, camera);
      };
      animate();
      return () => {
        isCancelled = true;
        scene.clear();
        renderer.dispose();
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", () => {
          if (character) {
             handleResize(renderer, camera, canvasDiv, character);
          }
        });
        if (canvasDiv.current) {
          canvasDiv.current.removeChild(renderer.domElement);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;

