import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';

import { Model } from '@/model3d/model.js';

    
let scene, camera, renderer, TG, orbitControls, pivot, labelRenderer;

function initThreeJs (containerId = null, autoSpin = false, controls = false, callback = null, modelName) {
    
    const modelColor = 0xffffff; // 0x242331
    const sceneColor = 0xffffff; // 0xFBF7F4
    
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
    renderer.setClearColor(sceneColor, 0); // Set background color to white

    // Label renderer
    labelRenderer = new CSS2DRenderer();



    if(containerId) {
        renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
        labelRenderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
    }else{
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }


    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.right = '0px';
    document.body.appendChild(labelRenderer.domElement);



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

    window.location.pathname == '/' ? renderer.domElement.style.left ="24vw" :  false;

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


    //Additional directional light
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-10, 10, -10);
    scene.add(dirLight2);

    // Hemisphere light for overall ambient light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff,0.7);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Point lights for filling in shadows
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);


    // GLTF Loader
    var model;
    const loader = new GLTFLoader();
    
    const modelUrl = `https://myassembly.co/src/assets/glbModel/${modelName}.glb`

    loader.load(modelUrl, (gltf) => {
        model = gltf.scene;
        model.name = 'modelHomeView';
        scene.add(model);
        
        pivot = new THREE.Object3D();
        scene.add(pivot);
        pivot.add(model);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -center.y, -center.z);
  

        model.traverse((child) => {
            if (child.isMesh) {
                // child.material.transparent = false;
                // // child.material.color.setHex('0x' + settings.colors[Math.floor(Math.random() * settings.colors.length)]);
                // child.userData.originalPosition = child.position.clone();
                // // child.material = child.material.clone();
                // const direction = new THREE.Vector3().copy(child.position).normalize();
                // child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
            }
        });
        //TO EXPORT CODE TO FUNCTION || CLASS
        // making groups and stuff to interact with the model
        const model3D = new Model(model, orbitControls);
        
        if(callback) {
            callback(model3D);
        }

    }, undefined, (error) => {
        //redirect user to /demo
        // alert('Model not found, redirecting to demo page');
        // window.location.href = '/demo';
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
        labelRenderer.render(scene, camera); // Add this line

    };

    animate();
};


//Three.js init
export function build3Dmodel(containerId = null, autoSpin = false, controls = false, callback = null, modelName) {

    const sceneModel = initThreeJs(containerId, autoSpin, controls, callback, modelName);



}


// remove all objects from scene
export function cleanupModelScene() {
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement = null;
        renderer = null;
    }

    if (labelRenderer) {
        // labelRenderer.dispose();
        labelRenderer.domElement.remove();
        labelRenderer = null;
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