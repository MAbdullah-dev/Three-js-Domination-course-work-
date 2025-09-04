const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    20
);
camera.position.z = 5;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 ,wireframe: true });
const cube = new THREE.Mesh(geometry, material);

// cube.position.x = 4;
// cube.position.y = 2;
// cube.position.z = -2;

cube.rotation.x =1;

scene.add(cube);

const canvas = document.getElementById('canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.render(scene, camera);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);