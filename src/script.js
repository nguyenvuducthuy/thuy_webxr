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


// // To start an AR scene with webXR, we can use a handy button provided by three.js
// // We first have to import it because it is a javascript module
// import * as THREE from "three"
// import { ARButton } from "three/examples/jsm/webxr/ARButton";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import sl from '../assets/Jupiter.glb';

// let camera, scene, renderer;
// let mesh;

// init();
// animate();

// function init() {
//   const container = document.createElement('div');
//   document.body.appendChild(container);

//   scene = new THREE.Scene();

//   camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

//   renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//   renderer.setPixelRatio(window.devicePixelRatio);
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   // This next line is important to to enable the renderer for WebXR
//   renderer.xr.enabled = true; // New!
//   container.appendChild(renderer.domElement);

//   var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
//   light.position.set(0.5, 1, 0.25);
//   scene.add(light);

//   // const geometry = new THREE.IcosahedronGeometry(0.1, 1);
//   // const material = new THREE.MeshPhongMaterial({
//   //   color      :  new THREE.Color("rgb(226,35,213)"),
//   //   shininess  :  6,
//   //   flatShading:  true,
//   //   transparent: 1,
//   //   opacity    : 0.8
//   // });
  
//   // mesh = new THREE.Mesh(geometry, material);
//   // mesh.position.set(0, 0, -0.5);
//   // scene.add(mesh);

//   var loader = new GLTFLoader();
//   loader.load( sl, function ( gltf )
//   {
//       mesh = gltf.scene;
//       mesh.scale.set(.4,.4,.4);
//       // mesh.position.y = 4;
//       // mesh.rotation.y = 30;
//       mesh.position.set(0, 0, -3.0);
//       scene.add(mesh);
//   } );

//   // Add the AR button to the body of the DOM
//   document.body.appendChild(ARButton.createButton(renderer));

//   window.addEventListener('resize', onWindowResize, false);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// function animate() {
//   if (mesh)
//   {
//     mesh.rotation.y += .001;
//   }
//   requestAnimationFrame(animate);
//   renderer.setAnimationLoop(render);
// }

// function render() {      
//   renderer.render(scene, camera);
// }

import * as THREE from "three"
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import sl from '../assets/Jupiter.glb';

import _Sun from "../assets/SolarTexture/2k_sun.jpg";
import _Mercury from "../assets/SolarTexture/2k_mercury.jpg";
import _Venus from "../assets/SolarTexture/2k_venus.jpg";
import _Earth from "../assets/SolarTexture/2k_earth.jpg";
import _Mars from "../assets/SolarTexture/2k_mars.jpg";
import _Jupiter from "../assets/SolarTexture/2k_jupiter.jpg";
import _Saturn from "../assets/SolarTexture/2k_saturn.jpg";
import _Neptune from "../assets/SolarTexture/2k_neptune.jpg";
import _Uranus from "../assets/SolarTexture/2k_uranus.jpg";

let camera, scene, renderer;
let controller;

init();
animate();

function init() {

  const container = document.createElement( 'div' );
  document.body.appendChild( container );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

  const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
  light.position.set( 0.5, 1, 0.25 );
  scene.add( light );

  //

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.xr.enabled = true;
  container.appendChild( renderer.domElement );

  //

  document.body.appendChild( ARButton.createButton( renderer ) );

  //

  // const geometry = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );
  const geometry = new THREE.SphereGeometry(.04, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);

  var texturesList = [
    _Sun,
    _Mercury,
    _Venus,
    _Earth,
    _Mars,
    _Jupiter,
    _Saturn,
    _Neptune,
    _Uranus
  ];

  function onSelect() {

    // const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
    const material = new THREE.MeshPhongMaterial();
    //initialization
    const loader = new THREE.TextureLoader();
    //loading texture
    // const texture = loader.load ('textures/texture.png')
    var randIndex = THREE.Math.randInt(0, texturesList.length - 1);
    var texture = loader.load(texturesList[randIndex]);

    material.map = texture;

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
    mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
    scene.add( mesh );

  }

  controller = renderer.xr.getController( 0 );
  controller.addEventListener( 'select', onSelect );
  scene.add( controller );

  //

  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function animate() {

  renderer.setAnimationLoop( render );

}

function render() {

  renderer.render( scene, camera );

}