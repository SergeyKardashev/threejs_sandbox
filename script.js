import * as THREE from "three";

// We will ask three.js to draw into that canvas so we need to look it up.
const canvas = document.querySelector("#c");

// The renderer is the thing responsible for actually taking all the data
// you provide and rendering it to the canvas.
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize( window.innerWidth / 2, window.innerHeight /2);

// Square renderer. It needs square aspect camera
// renderer.setSize(500, 500);

// To keep size of app, but render it at a lower resolution,
// call setSize with false as `updateStyle` (3rd argument). Example:
// setSize(window.innerWidth / 2, window.innerHeight / 2, false) 
// That will render your app at half resolution, 
// given that your < canvas > has 100 % width and height.


// We'll create a PerspectiveCamera.
const fov = 75; // field of view vertical (degrees)
// const aspect = 2; // the canvas default
// const aspect = 1; // for square renderer
const aspect = window.innerWidth / window.innerHeight; // to match renderer's aspect
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

// Add material :shiny or flat, what color, what texture(s) to apply

// This material is visible without light, but is not affected by lights
// const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

// MeshPhongMaterial is affected by lights, but invisible without light.
const material = new THREE.MeshPhongMaterial({ color: 0x44aa88 });

// A Mesh in three.js represents the combination of three things
// 1) Geometry, 2) Material, 3) position, orientation, and scale

// I don't use this cube since added 3 cubes bellow
// const cube = new THREE.Mesh(geometry, material);
// And finally we add that mesh to the scene
// scene.add(cube);

// We can then render the scene by calling the renderer's render function
// and passing it the scene and the camera
renderer.render(scene, camera);

// I don't use this simplest animation since added animation for 3 cubes 
// // Loop animation via `requestAnimationFrame`.
// function render(time) {
//   time *= 0.001; // convert time to seconds
//   cube.rotation.x = time;
//   cube.rotation.y = time;
//   renderer.render(scene, camera);
//   requestAnimationFrame(render);
// }
// requestAnimationFrame(render);

// Add light source to the scene
const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);


// Let's add 2 more cubes. We'll use the same geometry for each cube 
// but make a different material so each cube can be a different color.

// Function creates a new material with the specified color.
// Then it creates a mesh using the specified geometry 
// and adds it to the scene and sets its X position.

function makeInstance(geometry, color, x) {
  const material = new THREE.MeshPhongMaterial({color});
 
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
 
  cube.position.x = x;
 
  return cube;
}

// Then we'll call it 3 times with 3 different colors and X positions 
// saving the Mesh instances in an array.
const cubes = [
  makeInstance(geometry, 0x44aa88,  0),
  makeInstance(geometry, 0x8844aa, -2),
  makeInstance(geometry, 0xaa8844,  2),
];

// Finally we'll spin all 3 cubes in our render function.
// We compute a slightly different rotation for each one.

// Loop animation via `requestAnimationFrame`.
function render(time) {
  time *= 0.001; // convert time to seconds

  cubes.forEach((cube, ndx) => {
    const speed = 1 + ndx * .1;
    const rot = time * speed;
    cube.rotation.x = rot;
    cube.rotation.y = rot;
  });

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}

requestAnimationFrame(render);
