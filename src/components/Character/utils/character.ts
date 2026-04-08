import * as THREE from "three";
import { DRACOLoader, GLTF, GLTFLoader } from "three-stdlib";
import { setCharTimeline, setAllTimeline } from "../../utils/GsapScroll";

// Mantendo o modelo base requisitado intacto
const iphoneModel = "/models/iphone_final_v1.glb";


const setCharacter = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
) => {
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("/draco/");
  loader.setDRACOLoader(dracoLoader);

  const loadCharacter = () => {
    return new Promise<GLTF | null>(async (resolve, reject) => {
      try {
        let character: THREE.Object3D;
        
        loader.load(
          iphoneModel,
          async (gltf) => {
            character = gltf.scene;

            // Carrega nossa imagem que vamos aplicar "como um adesivo" sobre o celular
            const textureLoader = new THREE.TextureLoader();
            const screenTexture = textureLoader.load('/images/conteudotela.PNG');
            screenTexture.flipY = false; // UVs/Planes podem precisar inverter. Ajusto em planeMaterial se necessário.
            screenTexture.colorSpace = THREE.SRGBColorSpace;
            
            // Corrige material original e desliga vidros coloridos
            character.traverse((child: any) => {
              if (child.isMesh) {
                const mesh = child as THREE.Mesh;
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                mesh.frustumCulled = true;
                
                const material = mesh.material as THREE.MeshStandardMaterial;
                if (!material) return;
                
                // Se algum material tiver emissão roxa, desligamos para não interferir na nossa nova tela brilhante!
                if (material.emissiveMap) {
                    material.emissiveMap = null;
                    material.emissiveIntensity = 0;
                    material.emissive = new THREE.Color(0x000000);
                    material.needsUpdate = true;
                }
              }
            });

            // Cria um painel 3D perfeito (Plane) para cobrir exatamente a parte da tela
            // Box3 ajuda a medir o tamanho que o modelo 3D tem no mundo atualmente
            const box = new THREE.Box3().setFromObject(character);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Tamanho da tela do iphone: usa o tamanho total menos as bordas de metal
            // Um ajuste seguro é largura 90% e altura 94%
            const screenWidth = size.x * 0.91; 
            const screenHeight = size.y * 0.945; 

            const planeGeo = new THREE.PlaneGeometry(screenWidth, screenHeight);
            
            // Inverter flipY na textura, pois PlaneGeometry com flipY=false fica de cabeça para baixo!
            screenTexture.flipY = true;
            
            const planeMat = new THREE.MeshBasicMaterial({ 
                map: screenTexture,
                transparent: true,
                side: THREE.FrontSide
            });
            const screenMesh = new THREE.Mesh(planeGeo, planeMat);
            
            // Posicionar exatamente no centro do celular e puxar o Z apenas o suficiente para saltar a carcaça 
            // O celular normal tem tela voltada para Z positivo
            screenMesh.position.set(center.x, center.y, center.z + (size.z / 2) + 0.003);
            
            // O modelo original de iPhone pode apresentar pequenas inclinações. 
            // Como este Plane é adicionado AO character, ele roda/translada junto com o modelo original (perfeito)!
            character.add(screenMesh);
            
            await renderer.compileAsync(character, camera, scene);
            resolve(gltf);
            
            setCharTimeline(character, camera);
            setAllTimeline();
            dracoLoader.dispose();
          },
          undefined,
          (error) => {
            console.error("Error loading GLTF model:", error);
            reject(error);
          }
        );
      } catch (err) {
        reject(err);
        console.error(err);
      }
    });
  };

  return { loadCharacter };
};

export default setCharacter;
