import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 4;

// const light = new THREE.DirectionalLight(0xffffff, 0.5);
// light.position.set(1, 1, 1);
// scene.add(light);

const texture = new THREE.TextureLoader();
let earthTexture = texture.load('./earth.jpg');
let cloudTexture = texture.load('./cloud.jpg');
earthTexture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.SphereGeometry(1, 75, 75);
const material = new THREE.MeshPhysicalMaterial({
  map: earthTexture,
});
const sphere = new THREE.Mesh(geometry, material);

const geometry2 = new THREE.SphereGeometry(1.01, 75, 75);
const material2 = new THREE.MeshPhysicalMaterial({
  alphaMap: cloudTexture,
});
material2.transparent = true;
const sphere2 = new THREE.Mesh(geometry2, material2);

scene.add(sphere);
scene.add(sphere2);

const hdri = new RGBELoader();
hdri.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/derelict_airfield_02_2k.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  // scene.background = texture;
  scene.environment = texture;
  // animate();
}); 



const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);

controls.update();
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  sphere2.rotation.y += 0.0003;
  sphere.rotation.y += 0.0001;
  renderer.render(scene, camera);
}
animate();
