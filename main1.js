import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//GLTFLoader import from threee.js 

// Create scene
const scene = new THREE.Scene();

// Create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create renderer
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight);

// Add OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);

// Load HDRI environment map

const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/zwartkops_pit_1k.hdr', function(texture) {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    // scene.background = texture;
    scene.environment = texture;
});

const loader = new GLTFLoader();
loader.load('../wooden_box.glb', function(gltf) {
    gltf.scene.position.y = -1.8;
    scene.add(gltf.scene);
});



    // Add a simple cube to the scene
    // const geometry = new THREE.BoxGeometry();
    // const material = new THREE.MeshStandardMaterial({ 
    //   metalness: 0.7,
    //   roughness: 0.2
    // });
    // const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}
