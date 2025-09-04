const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    100 // Far clipping plane
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 , wireframe: true }); // Create a green wireframe material
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5; // Move the camera back so we can see the cube 

const canvas = document.getElementById('canvas'); // Create a canvas element
const renderer = new THREE.WebGLRenderer({ canvas: canvas }); // Create a WebGL renderer
renderer.setSize(window.innerWidth, window.innerHeight); // Set the size of the renderer
// document.body.appendChild(renderer.domElement); // Append the renderer to the document body
// renderer.render(scene, camera);

function animate() {
    window.  requestAnimationFrame(animate); // Request the next frame
    cube.rotation.x += 0.1; // Rotate the cube on the x-axis
    cube.rotation.y += 0.1; // Rotate the cube on the y-axis
    cube.rotation.z += 0.1; // Rotate the cube on the z-axis
    renderer.render(scene, camera); // Render the scene from the perspective of the camera
}
animate(); // Start the animation loop
