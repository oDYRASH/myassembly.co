import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';
import modelPath from '@/assets/glbModel/HomePageModel.glb'; // Ensure this path is correct

let scene, camera, renderer, TG, orbitControls;

export async function initThreeJs (containerId = null, autoSpin = false, controls = false, callback = null) {
    const base = { x: 0, y: 4, z: 14 };
    const sceneContainer = document.getElementById(containerId);

    TG = new Group();

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(base.x, base.y, base.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer
    renderer = sceneContainer ? new THREE.WebGLRenderer({ antialias: true, canvas: sceneContainer }) : new THREE.WebGLRenderer({ antialias: true});//, canvas: document.getElementById('model3dHome') 
    renderer.useLegacyLights =  false;

    renderer.setClearColor(0xffffff, 0); // Set background color to white
    if(containerId) {
        renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
    }else{
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    if(controls) {
        // Controls
        orbitControls = new OrbitControls(camera, renderer.domElement);
        orbitControls.enableDamping = true;
        orbitControls.dampingFactor = 0.25;
        orbitControls.enableZoom = true;
        orbitControls.autoRotate = autoSpin;
        orbitControls.autoRotateSpeed = 1.5;
        orbitControls.enablePan = false;
        orbitControls.minPolarAngle = Math.PI / 4;
        orbitControls.maxPolarAngle = Math.PI / 1.5;
        orbitControls.minDistance = 10;
        orbitControls.maxDistance = 20;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, .5);
    scene.add(ambientLight);

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

    // GLTF Loader
    var model;
    const loader = new GLTFLoader();

    loader.load(modelPath, (gltf) => {
        model = gltf.scene;
        model.name = 'modelHomeView';
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

        if(callback) {
            callback(model);
        }

    }, undefined, (error) => {
        console.error(error);
    })

    // Rotate model
    // .onComplete(() => {
    //     const modelObj = scene.getObjectByName('modelHomeView');
    //     let t3 = new Tween(modelObj.rotation)
    //         .to({ x: .25 }, 2222)
    //         .easing(Easing.Cubic.InOut)
    //         .start();
    //     TG.add(t3);
    // });


    document.addEventListener("DOMContentLoaded", () => {

        let t1 = new Tween(camera.position)
            .to({ y: 8, z: 0 }, 25)
            .easing(Easing.Cubic.InOut)
            .start()
            

        TG.add(t1);

            setTimeout(() => {
                let t2 = new Tween(camera.position)
                    .to(base, 2200)
                    .easing(Easing.Cubic.InOut)
                    .start()


                TG.add(t2);
            }, 50);

           

        });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Animation loop
    const animate = () => {

        requestAnimationFrame(animate);
        
        TG.update(); 

        renderer.render(scene, camera);

        if (orbitControls) orbitControls.update();
        

        // if(autoSpin) {
        //     // model.rotation.y += 0.01;
        //     console.log('autoSpin');
        // }

    };

    animate();
};

// remove all objects from scene
export function cleanupThreeJs() {
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement = null;
        renderer = null;
    }

    if (scene) {
        while (scene.children.length > 0) {
            const child = scene.children[0];
            scene.remove(child);
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach(material => material.dispose());
                } else {
                    child.material.dispose();
                }
            }
        }
        scene = null;
    }

    camera = null;
    TG = null;

    const canvas = document.querySelector('canvas');
    if (canvas) {
        canvas.remove();
    }
}