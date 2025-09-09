import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const geometry = new THREE.BoxGeometry(2, 2, 2);
const material = new THREE.MeshPhysicalMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 6;
// let light = new THREE.AmbientLight("#ffffff", 1);
// scene.add(light);

const light = new THREE.DirectionalLight("#ffffff", 1);
light.position.set(0, 0, 1);
scene.add(light);

const helper = new THREE.DirectionalLightHelper( light, 5 );
scene.add( helper );

// // spotlight
// const spotLight = new THREE.SpotLight(0xffffff);
// spotLight.position.set(5, 5, 5);
// // point light

// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(-5, -5, 5);
// scene.add(pointLight);
// scene.add(spotLight);

const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
const controls = new OrbitControls(camera, renderer.domElement);
// document.body.appendChild( renderer.domElement );


controls.update();

function animate() {
  controls.update();

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);