import * as THREE from "https://unpkg.com/three@0.134.0/build/three.module.js";
import { ARButton } from "https://unpkg.com/three@0.134.0/examples/jsm/webxr/ARButton.js";

let scene, camera, renderer, controller;
let cylinderGeo;

let l_spheres = [];
let l_cubes = [];

init();
animate();

function init(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    renderer.xr.enabled = true;

    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );
    document.body.appendChild( ARButton.createButton(renderer) );
    container.appendChild( renderer.domElement );

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
    light.position.set( 0.5, 1, 0.25 );
    scene.add( light );

    cylinderGeo = new THREE.CylinderGeometry( 0, 0.05, 0.2, 32 ).rotateX( Math.PI / 2 );

    function onSelect() {
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
        const mesh = new THREE.Mesh( cylinderGeo, material );
        mesh.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
        //mesh.quaternion.setFromRotationMatrix( controller.matrixWorld );
        scene.add( mesh );

        //createARCube(1, 0x3232c2);
    }

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', onSelect);
    scene.add(controller);

    window.addEventListener( 'resize', onWindowResize );

    createSphere({x: 0, y: 0, z: 0}, 1, 10, 0xffffff);
    createCube({x: 0, y: 1, z: 0}, 1, 0x3232c2);
    camera.position.z = 5;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function createSphere(pos, radius, segments, color){
    let geometry = new THREE.SphereGeometry(radius, segments, segments);
    let material = new THREE.MeshBasicMaterial( {color: color} );
    let sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(pos.x, pos.y, pos.z);
    sphere.name = "sphere" + l_spheres.length;
    scene.add(sphere);
    l_spheres.push(sphere);
}

function createARCube(size, color){
    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial( {color: color} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set( 0, 0, - 0.3 ).applyMatrix4( controller.matrixWorld );
    cube.quaternion.setFromRotationMatrix( controller.matrixWorld );
    cube.name = "cube" + l_cubes.length;
    scene.add(cube);
    l_cubes.push(cube);
}

function createCube(pos, size, color){
    let geometry = new THREE.BoxGeometry(size, size, size);
    let material = new THREE.MeshBasicMaterial( {color: color} );
    let cube = new THREE.Mesh( geometry, material );
    cube.position.set(pos.x, pos.y, pos.z);
    cube.name = "cube" + l_cubes.length;
    scene.add(cube);
    l_cubes.push(cube);
}

function animate() {
	renderer.setAnimationLoop(render);
}

function render(){
    renderer.render(scene,camera);
}