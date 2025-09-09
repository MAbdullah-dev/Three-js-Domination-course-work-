import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Grab the existing canvas from index.html
const canvas = document.getElementById('canvas');

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Scene
const scene = new THREE.Scene();

// Subtle background color (can be overridden by alpha on canvas)
scene.background = new THREE.Color(0x0e0e12);

// Camera
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(4, 2.2, 6);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// Environment (studio-like reflections)
const environment = new RoomEnvironment();
const pmremGenerator = new THREE.PMREMGenerator(renderer);
scene.environment = pmremGenerator.fromScene(environment, 0.04).texture;

// Ground plane (studio floor)
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.ShadowMaterial({ opacity: 0.25 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// Materials (physical)
const metalMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x6ab1ff,
  metalness: 0.9,
  roughness: 0.2,
  envMapIntensity: 1.0,
  clearcoat: 0.6,
  clearcoatRoughness: 0.1,
});

const paintMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff6a6a,
  metalness: 0.1,
  roughness: 0.35,
  envMapIntensity: 1.0,
  sheen: 0.5,
});

// Geometry + Meshes
const box = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.2, 1, 1, 1), metalMaterial);
box.position.set(-1.6, 0.6, 0);
box.castShadow = true;
box.receiveShadow = false;
scene.add(box);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.75, 64, 64), paintMaterial);
sphere.position.set(1.6, 0.75, 0);
sphere.castShadow = true;
scene.add(sphere);

// Studio lighting setup
// Key light (soft directional)
const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
keyLight.position.set(5, 6, 4);
keyLight.castShadow = true;
keyLight.shadow.mapSize.set(2048, 2048);
keyLight.shadow.camera.near = 0.5;
keyLight.shadow.camera.far = 20;
keyLight.shadow.radius = 4;
scene.add(keyLight);

// Fill light (broad, cooler)
const fillLight = new THREE.RectAreaLight(0xbfd6ff, 2.0, 4, 4);
fillLight.position.set(-4, 3, 2);
fillLight.lookAt(0, 1, 0);
scene.add(fillLight);

// Rim light (back separation)
const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
rimLight.position.set(-3, 5, -4);
scene.add(rimLight);

// Ambient bounce
const ambient = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambient);

// Resize handling
function onWindowResize() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
}
window.addEventListener('resize', onWindowResize);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

let hoveredObject = null;
let previousColor = null;

function onPointerMove(event) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);

  const intersects = raycaster.intersectObjects([box, sphere], false);
  const first = intersects.length > 0 ? intersects[0].object : null;

  if (first !== hoveredObject) {
    // Restore previously hovered object's color
    if (hoveredObject && previousColor) {
      hoveredObject.material.color.copy(previousColor);
    }

    hoveredObject = first;
    if (hoveredObject) {
      previousColor = hoveredObject.material.color.clone();
      hoveredObject.material.color.set(0xff0000);
    } else {
      previousColor = null;
    }
  }
}

function onPointerLeave() {
  if (hoveredObject && previousColor) {
    hoveredObject.material.color.copy(previousColor);
  }
  hoveredObject = null;
  previousColor = null;
}

// Attach the events
canvas.addEventListener('pointermove', onPointerMove);
canvas.addEventListener('pointerleave', onPointerLeave);

// Animation loop
const clock = new THREE.Clock();
function animate() {
  const elapsed = clock.getElapsedTime();

  // Subtle motion
  box.rotation.y = elapsed * 0.35;
  box.rotation.x = Math.sin(elapsed * 0.25) * 0.15;
  sphere.rotation.y = -elapsed * 0.25;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();


