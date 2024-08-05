<template>
    <canvas id="model3dHome"></canvas>
</template>
  
<script setup>
  import { onMounted } from 'vue';
  import * as THREE from 'three';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
  import { Tween, Easing, update } from '@tweenjs/tween.js';
  import modelPath from '@/assets/glbModel/HomePageModel.glb'; // Ensure this path is correct
  
  const base = { x: 0, y: 5, z: 14 };
  
  const initThreeJs = () => {
    // Scene
    const scene = new THREE.Scene();
  
    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(base.x, base.y, base.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
   
    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.getElementById('model3dHome') });
    console.log(renderer.useLegacyLights);
    renderer.useLegacyLights =  false;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 0); // Set background color to white
  
    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);


    // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x8d8d8d, 1 );
    // hemiLight.position.set( 0, 20, 0 );
    // scene.add( hemiLight );

    const dirLight = new THREE.DirectionalLight( 0xffffff, 3 );
    dirLight.position.set( 10, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = - 4;
    dirLight.shadow.camera.left = - 4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add( dirLight );


  
    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 5;
    controls.maxDistance = 50;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableZoom = false;
  
    // GLTF Loader
    let model;
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      model = gltf.scene;
      scene.add(model);
      model.traverse((child) => {
        if (child.isMesh) {
          child.material.transparent = true;
          child.material.opacity = 1;
          child.userData.originalPosition = child.position.clone();
          child.material = child.material.clone();
          const direction = new THREE.Vector3().copy(child.position).normalize();
          child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
        }
      });
      console.log('Model loaded:', model);
    }, undefined, (error) => {
      console.error(error);
    });
  

    // THE CODE YOU CHAT-GPT ADD

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      update(); // Update tweens
      renderer.render(scene, camera);
    };
  
    animate();
  };
  
  onMounted(() => {
    initThreeJs();
  });

  </script>
  <style>
  canvas {
    position: fixed;
    top: 0;
    left: 20vw;
    width: 100vw;
  }</style>