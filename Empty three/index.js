import * as THREE from 'three';

let scene, camera, renderer;

let cubes = [];

init()

async function init(){
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    createCube({x: 0, y: 0, z: 0}, 1, 10, 0xffffff);
}

function createCube(pos, radius, segments, color){
    let geometry = new THREE.SphereGeometry(radius, segments, segments);
    let material = new THREE.MeshBasicMaterial( {color: color} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(pos.x, pos.y, pos.z);
    scene.add( cube );
    cubes.add(cube);
}