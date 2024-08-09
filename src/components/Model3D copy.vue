<template>
    <canvas id="the-3d-scene"></canvas>
</template>

<script>
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween, Easing, update } from '@tweenjs/tween.js';

import modelPath from '@/assets/glbModel/HomePageModel.glb'; // Ensure this path is correct

export default {
name: 'Model3D',
mounted() {
    try {
    this.initThreeJS();
    } catch (error) {
    console.error('An error occurred during the mounted hook:', error);
    }
},
methods: {
    initThreeJS() {
    try {
        const sceneCanvas = document.getElementById('the-3d-scene')

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas });

        renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.55);
        camera.position.set(0, 1, 5);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(1, 1, 1).normalize();
        scene.add(light);

        const loader = new GLTFLoader();
        loader.load(
        modelPath,
        function (gltf) {
            scene.add(gltf.scene);
        },
        undefined,
        function (error) {
            console.error('An error occurred while loading the model:', error);
        }
        );

        function animate() {
        requestAnimationFrame(animate);
        update();
        controls.update();
        renderer.render(scene, camera);
        }

        animate();
    } catch (error) {
        console.error('An error occurred during the initThreeJS method:', error);
    }
    }
}
}
</script>