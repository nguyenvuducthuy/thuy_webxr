// import './style.css'
// import * as THREE from "three"
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { ARButton } from "three/examples/jsm/webxr/ARButton";

// import vshader from '../shader/v.vert'
// import fshader from '../shader/f.frag'

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.xr.enabled = true;
// document.body.appendChild( renderer.domElement );

// const light = new THREE.AmbientLight(0x404040);
// scene.add(light);

// // var controls = new OrbitControls(camera, renderer.domElement);

// const arbtn = ARButton.createButton(renderer);
// document.body.appendChild(arbtn);

// let uniforms = {
//   colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
//   colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
//   iResolution: {type: 'vec2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
//   iTime: {type: 'float', value: 1}
// }
// let m =  new THREE.ShaderMaterial({
//   uniforms: uniforms,
//   fragmentShader: fshader,
//   vertexShader: vshader,
// })


// // var geometry        = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
// // var mesh            = new THREE.Mesh( geometry, m );
// // mesh.frustumCulled  = false;
// // scene.add( mesh );

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube     = new THREE.Mesh( geometry, material );
// scene.add( cube );

// // var objLoader = new THREE.OBJLoader();
// // objLoader.setPath("../01/asset/");
// // objLoader.load( 'r2-d2.obj',
// //     function( obj ){
// //         obj.traverse( function( child ) {
// //             if ( child instanceof THREE.Mesh ) {
// //                 child.material = m;
// //             }
// //         } );
// //         scene.add( obj );
// //     },
// // );

// camera.position.z = 5;

// function animate() {
//     requestAnimationFrame( animate );
//     m.uniforms.iTime.value += 0.01;
//     // controls.update();
//     renderer.render( scene, camera );
// };
// animate();


// To start an AR scene with webXR, we can use a handy button provided by three.js
// We first have to import it because it is a javascript module
import * as THREE from "three"
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // This next line is important to to enable the renderer for WebXR
  renderer.xr.enabled = true; // New!
  container.appendChild(renderer.domElement);

  var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  const geometry = new THREE.IcosahedronGeometry(0.1, 1);
  // const material = new THREE.MeshPhongMaterial({
  //   color      :  new THREE.Color("rgb(226,35,213)"),
  //   shininess  :  6,
  //   flatShading:  true,
  //   transparent: 1,
  //   opacity    : 0.8
  // });
  
  // mesh = new THREE.Mesh(geometry, material);
  // mesh.position.set(0, 0, -0.5);
  // scene.add(mesh);

  var loader = new GLTFLoader();
  loader.load( './assets/Jupiter.glb', function ( gltf )
  {
      var scn = gltf.scene;
      // scn.scale.set(2, 2, 2);
      // scn.position.y = 4;
      scn.position.set(0, 0, -3.0);
      scene.add(scn);
  } );

  // Add the AR button to the body of the DOM
  document.body.appendChild(ARButton.createButton(renderer));

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {      
  renderer.render(scene, camera);
}