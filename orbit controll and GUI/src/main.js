import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import GUI from 'lil-gui';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 3;

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minAzimuthAngle = -Math.PI / 4;
controls.maxAzimuthAngle = Math.PI / 4;
controls.minPolarAngle = Math.PI / 4;
controls.maxPolarAngle = Math.PI / 1.25;
controls.minZoom = 2;
controls.maxZoom = 5;
controls.minDistance = 2;
controls.maxDistance = 10;
controls.update();

// GUI Controls
const gui = new GUI();

// Parameters object for cube
const cubeParams = {
  width: 1,
  height: 1,
  depth: 1,
  color: '#00ff00',
  wireframe: false,
  rotationSpeed: 0.01
};

// Size Controls
gui.add(cubeParams, 'width', 0.1, 5).onChange((val) => {
  cube.scale.x = val;
});
gui.add(cubeParams, 'height', 0.1, 5).onChange((val) => {
  cube.scale.y = val;
});
gui.add(cubeParams, 'depth', 0.1, 5).onChange((val) => {
  cube.scale.z = val;
});

// Color Control
gui.addColor(cubeParams, 'color').onChange((val) => {
  cube.material.color.set(val);
});

// Wireframe Toggle
gui.add(cubeParams, 'wireframe').onChange((val) => {
  cube.material.wireframe = val;
});

// Rotation Speed
gui.add(cubeParams, 'rotationSpeed', 0, 0.1);

// Animate Scene
function animate() {
  cube.rotation.x += cubeParams.rotationSpeed;
  cube.rotation.y += cubeParams.rotationSpeed;

  controls.update();
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
