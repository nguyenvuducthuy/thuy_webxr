import './style.css'
import * as THREE from "three"

import vshader from '../shader/v.vert'
import fshader from '../shader/f.frag'

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const light = new THREE.AmbientLight(0x404040);
scene.add(light);

// var controls = new THREE.OrbitControls(camera, renderer.domElement);

let uniforms = {
  colorB: {type: 'vec3', value: new THREE.Color(0xACB6E5)},
  colorA: {type: 'vec3', value: new THREE.Color(0x74ebd5)},
  iResolution: {type: 'vec2', value: new THREE.Vector2(window.innerWidth,window.innerHeight)},
  iTime: {type: 'float', value: 1}
}
let m =  new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: fshader,
  vertexShader: vshader,
})


var geometry = new THREE.PlaneGeometry( window.innerWidth, window.innerHeight );
var mesh = new THREE.Mesh( geometry, m );
mesh.frustumCulled = false;
scene.add( mesh );

// var objLoader = new THREE.OBJLoader();
// objLoader.setPath("../01/asset/");
// objLoader.load( 'r2-d2.obj',
//     function( obj ){
//         obj.traverse( function( child ) {
//             if ( child instanceof THREE.Mesh ) {
//                 child.material = m;
//             }
//         } );
//         scene.add( obj );
//     },
// );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    m.uniforms.iTime.value += 0.01;
    renderer.render( scene, camera );
};
animate();