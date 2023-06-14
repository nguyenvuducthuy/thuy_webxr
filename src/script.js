import * as THREE from "three"
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import sl from '../assets/planet.glb';

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
  const geometry = new THREE.SphereGeometry(.04, 50, 50);

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
    const tex_loader = new THREE.TextureLoader();
    //loading texture
    var randIndex = THREE.Math.randInt(0, texturesList.length - 1);
    var texture = tex_loader.load(texturesList[randIndex]);

    material.map = texture;

    // var gltf_loader = new GLTFLoader();
    // gltf_loader.load( sl, function ( gltf )
    // {
    //     var scn = gltf.scene;
    //     scn.visible = true;
    //     scn.material = material;
    //     scn.position.set( 0, 0, 0 ).applyMatrix4( controller.matrixWorld );
    //     scn.quaternion.setFromRotationMatrix( controller.matrixWorld );
    //     scn.scale.set(1, 1, 1);

    //     // console.log(scn);

    //     // mixer = new THREE.AnimationMixer(scn);
    //     // action = mixer.clipAction(gltf.animations[ 0 ]);
    //     // action.setLoop(THREE.LoopRepeat, 0);

    //     scene.add(scn);
    // });

    const mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 0, -.3 ).applyMatrix4( controller.matrixWorld );
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

// --------------------------------------------

// let container;
// let camera, scene, renderer;
// let controller;

// let reticle;

// let hitTestSource = null;
// let hitTestSourceRequested = false;

// init();
// animate();

// function init() {

//   container = document.createElement( 'div' );
//   document.body.appendChild( container );

//   scene = new THREE.Scene();

//   camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 20 );

//   const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
//   light.position.set( 0.5, 1, 0.25 );
//   scene.add( light );

//   //

//   renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
//   renderer.setPixelRatio( window.devicePixelRatio );
//   renderer.setSize( window.innerWidth, window.innerHeight );
//   renderer.xr.enabled = true;
//   container.appendChild( renderer.domElement );

//   //

//   document.body.appendChild( ARButton.createButton( renderer, { requiredFeatures: [ 'hit-test' ] } ) );

//   //

//   // const geometry = new THREE.CylinderGeometry( 0.1, 0.1, 0.2, 32 ).translate( 0, 0.1, 0 );
//   const geometry = new THREE.SphereGeometry(.04, 50, 50, 0, Math.PI * 2, 0, Math.PI * 2);

//   var texturesList = [
//     _Sun,
//     _Mercury,
//     _Venus,
//     _Earth,
//     _Mars,
//     _Jupiter,
//     _Saturn,
//     _Neptune,
//     _Uranus
//   ];

//   function onSelect() {

//     if ( reticle.visible ) {

//       // const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
//       const material = new THREE.MeshPhongMaterial();
//       //initialization
//       const loader = new THREE.TextureLoader();
//       //loading texture
//       // const texture = loader.load ('textures/texture.png')
//       var randIndex = THREE.Math.randInt(0, texturesList.length - 1);
//       var texture = loader.load(texturesList[randIndex]);
  
//       material.map = texture;

//       const mesh = new THREE.Mesh( geometry, material );
//       reticle.matrix.decompose( mesh.position, mesh.quaternion, mesh.scale );
//       // mesh.scale.y = Math.random() * 2 + 1;
//       mesh.scale.set(6,6,6);
//       scene.add( mesh );

//     }

//   }

//   controller = renderer.xr.getController( 0 );
//   controller.addEventListener( 'select', onSelect );
//   scene.add( controller );

//   reticle = new THREE.Mesh(
//     new THREE.RingGeometry( 0.15, 0.2, 32 ).rotateX( - Math.PI / 2 ),
//     new THREE.MeshBasicMaterial()
//   );
//   reticle.matrixAutoUpdate = false;
//   reticle.visible = false;
//   scene.add( reticle );

//   //

//   window.addEventListener( 'resize', onWindowResize );

// }

// function onWindowResize() {

//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();

//   renderer.setSize( window.innerWidth, window.innerHeight );

// }

// //

// function animate() {

//   renderer.setAnimationLoop( render );

// }

// function render( timestamp, frame ) {

//   if ( frame ) {

//     const referenceSpace = renderer.xr.getReferenceSpace();
//     const session = renderer.xr.getSession();

//     if ( hitTestSourceRequested === false ) {

//       session.requestReferenceSpace( 'viewer' ).then( function ( referenceSpace ) {

//         session.requestHitTestSource( { space: referenceSpace } ).then( function ( source ) {

//           hitTestSource = source;

//         } );

//       } );

//       session.addEventListener( 'end', function () {

//         hitTestSourceRequested = false;
//         hitTestSource = null;

//       } );

//       hitTestSourceRequested = true;

//     }

//     if ( hitTestSource ) {

//       const hitTestResults = frame.getHitTestResults( hitTestSource );

//       if ( hitTestResults.length ) {

//         const hit = hitTestResults[ 0 ];

//         reticle.visible = true;
//         reticle.matrix.fromArray( hit.getPose( referenceSpace ).transform.matrix );

//       } else {

//         reticle.visible = false;

//       }

//     }

//   }

//   renderer.render( scene, camera );

// }