import * as THREE from "three";
import { GLTF } from "three-stdlib";

const setAnimations = (gltf: GLTF) => {
  let character = gltf.scene;
  let mixer = new THREE.AnimationMixer(character);

  // Simplified no-op animations for iPhone
  function startIntro() {
    // No intro for now
  }

  function hover(_gltf: GLTF, _hoverDiv: HTMLDivElement) {
    return () => {};
  }

  return { mixer, startIntro, hover };
};

export default setAnimations;
