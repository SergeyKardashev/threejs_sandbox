import * as THREE from "three";

// We will ask three.js to draw into that canvas so we need to look it up.
const canvas = document.querySelector("#c");

// The renderer is the thing responsible for actually taking all the data
// you provide and rendering it to the canvas.
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

// We'll create a PerspectiveCamera.
const fov = 75;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

camera.position.z = 2;

// A Scene in three.js is the root of a form of scene graph.
// Anything you want three.js to draw needs to be added to the scene.
const scene = new THREE.Scene();

// Next up we create a BoxGeometry which contains the data for a box.
// Almost anything we want to display in Three.js needs geometry
// which defines the vertices that make up our 3D object.
const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

// Add material
// shiny or flat, what color, what texture(s) to apply
// The first material applied was visible without light. 
// const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });
// The MeshBasicMaterial is not affected by lights. 
// Let's change it to a MeshPhongMaterial which is affected by lights.
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

// A Mesh in three.js represents the combination of three things
// 1) Geometry, 2) Material, 3) position, orientation, and scale
const cube = new THREE.Mesh(geometry, material);

// And finally we add that mesh to the scene
scene.add(cube);

// We can then render the scene by calling the renderer's render function
// and passing it the scene and the camera
renderer.render(scene, camera);

// To animate it we'll render inside a render loop 
// using `requestAnimationFrame`.
function render(time) {
  time *= 0.001; // convert time to seconds

  cube.rotation.x = time;
  cube.rotation.y = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);