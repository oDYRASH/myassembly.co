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
                const sceneCanvas = document.getElementById('the-3d-scene');
                
                // Scene
                const scene = new THREE.Scene();
                
                // Camera
                const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
                camera.position.set(0, 5, 14);
                camera.lookAt(new THREE.Vector3(0, 0, 0));
                
                // Renderer
                const renderer = new THREE.WebGLRenderer({ canvas: sceneCanvas, antialias: true });
                renderer.setSize(window.innerWidth * 0.4, window.innerHeight * 0.55);
                renderer.setClearColor(0xffffff, 0); // Set background color to white
                
                // Lights
                const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
                scene.add(ambientLight);
                
                const pointLight = new THREE.PointLight(0xffffff, 1, 100);
                pointLight.position.set(10, 10, 10);
                scene.add(pointLight);
                
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
                const loader = new GLTFLoader();
                loader.load(
                    modelPath,
                    (gltf) => {
                        const model = gltf.scene;
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
                    },
                    undefined,
                    (error) => {
                        console.error('An error occurred while loading the model:', error);
                    }
                );

                // Function to toggle explode
                function toggleExplode(reverse = false) {
                    if (!model) return;

                    model.traverse((child) => {
                        if (child.isMesh) {
                            if (child.userData.originalPosition && child.userData.explodedPosition) {
                                const startPosition = { x: child.position.x, y: child.position.y, z: child.position.z };
                                const targetPosition = reverse ? child.userData.originalPosition : child.userData.explodedPosition;

                                new Tween(startPosition)
                                    .to({ x: targetPosition.x, y: targetPosition.y, z: targetPosition.z }, 1000)
                                    .easing(Easing.Exponential.InOut)
                                    .onUpdate(() => {
                                        child.position.set(startPosition.x, startPosition.y, startPosition.z);
                                    })
                                    .start();
                            } else {
                                console.warn('Missing userData properties for:', child);
                            }
                        }
                    });
                    exploded = !exploded;
                }

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

<style scoped>
canvas {
    position: absolute;
    right: 0;
    width: 40vw;
    height: 35vw;
}
</style>
