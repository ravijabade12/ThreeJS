import * as THREE from 'three';
import * as lil from 'lil-gui';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



// Add directional light
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// directionalLight.position.set(10, 10, 10);
// scene.add(directionalLight);


// Add studio lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

//add directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(directionalLight);

//add directional light helper
const helper = new THREE.DirectionalLightHelper( directionalLight, 2 );
scene.add( helper );



//add point light
const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2);
pointLight.position.set(1, -1, 1);
scene.add(pointLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
scene.add( pointLightHelper );


// const keyLight = new THREE.DirectionalLight(0xffffff, 1);
// keyLight.position.set(5, 5, 5);
// scene.add(keyLight);

// const fillLight = new THREE.DirectionalLight(0xffffff, 0.7);
// fillLight.position.set(-5, 5, 5);
// scene.add(fillLight);

// const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
// backLight.position.set(0, 5, -5);
// scene.add(backLight);

// Add light helpers for all lights
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

// const keyLightHelper = new THREE.DirectionalLightHelper(keyLight, 1);
// scene.add(keyLightHelper);

// const fillLightHelper = new THREE.DirectionalLightHelper(fillLight, 1);
// scene.add(fillLightHelper);

// const backLightHelper = new THREE.DirectionalLightHelper(backLight, 1);
// scene.add(backLightHelper);

// Note: AmbientLight doesn't have a helper as it doesn't have a specific direction or position



let loader = new THREE.TextureLoader();
let color = loader.load('./texture/color.jpg');

//add roughness
let roughness = loader.load('./texture/roughness.jpg');
//add normal
let normal = loader.load('./texture/normal.png');
//add height
let height = loader.load('./texture/height.png');

const geometry = new THREE.BoxGeometry(3,1.8,2);
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00,side: THREE.DoubleSide } );
const material = new THREE.MeshStandardMaterial( { map: color ,roughnessMap:roughness,normalMap:normal,heightMap:height } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize( window.innerWidth, window.innerHeight );



// Create GUI
const gui = new lil.GUI();

// Color folder
// const colorFolder = gui.addFolder('Color');
// const colorParams = { color: '#ffffff' };
// colorFolder.addColor(colorParams, 'color').onChange((value) => {
//   material.color.set(value);
// });


// Material folder
const materialFolder = gui.addFolder('Material');
materialFolder.add(material, 'wireframe');
materialFolder.add(material, 'flatShading').onChange(() => material.needsUpdate = true);
materialFolder.add(material, 'roughness', 0, 1);
materialFolder.add(material, 'metalness', 0, 1);
materialFolder.addColor(material,'color').name('Color');


// Mesh folder
const meshFolder = gui.addFolder('Mesh');
meshFolder.add(cube.rotation, 'x', 0, Math.PI * 2);
meshFolder.add(cube.rotation, 'y', 0, Math.PI * 2);
meshFolder.add(cube.rotation, 'z', 0, Math.PI * 2);
meshFolder.add(cube.position, 'x', -5, 5);
meshFolder.add(cube.position, 'y', -5, 5);
meshFolder.add(cube.position, 'z', -5, 5);
meshFolder.add(cube.scale, 'x', 0.1, 2);
meshFolder.add(cube.scale, 'y', 0.1, 2);
meshFolder.add(cube.scale, 'z', 0.1, 2);

// Light folder
const lightFolder = gui.addFolder('Lights');
lightFolder.add(ambientLight, 'amintensity', 0, 2);
lightFolder.add(directionalLight, 'intensity', 0, 2);
lightFolder.add(pointLight, 'intensity', 0, 2);


window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


const controls = new OrbitControls( camera, renderer.domElement );
// controls.enableDamping = true;
// controls.autoRotate = true;
// controls.dampingFactor = 0.1;
// controls.autoRotateSpeed = 110;
// controls.enableZoom = false;

function animate() {
  window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
  controls.update()
//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;
}

animate();