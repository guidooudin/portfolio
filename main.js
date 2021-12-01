import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('bg')
});
renderer.pixelRatio = window.devicePixelRatio;
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

//defining the thorus
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshPhongMaterial({
  color: 0x250054,
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);
renderer.render(scene, camera);


// creating the lights
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// creating the controls
const controls = new OrbitControls(camera, renderer.domElement);

//adding random generated stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

//background
const space = new THREE.TextureLoader().load('espacio.jpg');
scene.background = space;

//creating my photo into a cube
const geometry1 = new THREE.BoxGeometry(5, 5, 5);
const meTexture = new THREE.TextureLoader().load('yo.jpg');
const guido = new THREE.Mesh(geometry1, new THREE.MeshBasicMaterial({ map: meTexture }));
scene.add(guido);
//creating the earth
const earthTexture = new THREE.TextureLoader().load('4505.jpg');
const geometry2 = new THREE.SphereGeometry(5, 32, 32); 
const earth = new THREE.Mesh(geometry2, new THREE.MeshBasicMaterial({ map: earthTexture }));
earth.position.setZ(30);
earth.position.setX(-10)

scene.add(earth);


//animation
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  guido.rotation.x += 0.01;
  guido.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}
animate();
