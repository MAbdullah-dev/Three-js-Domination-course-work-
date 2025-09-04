// aniamtion
import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
);

camera.position.z = 5; // 👈 Move camera back

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.render(scene, camera);
renderer.render(scene, camera);

let clock = new THREE.Clock();

function animate() {
    window.requestAnimationFrame(animate);
    cube.rotation.y = clock.getElapsedTime() * 2; // Rotate cube
    renderer.render(scene, camera);
}

animate();
