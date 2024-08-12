import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Tween, Easing, Group } from '@tweenjs/tween.js';

import { Model } from '@/model3d/model.js';
import { useModelPreloadStore, demoModelPreload } from '@/stores/preLoadedModel'; // Adjust import path as needed

    
let scene, camera, renderer, TG, orbitControls, pivot, labelRenderer, cId, animationFrameId;


function initThreeJs(containerId = null, autoSpin = false, controls = true, callback = null, modelName, preloadedModel=false) {
    cId = containerId;
    const modelColor = 0xffffff; // 0x242331
    const sceneColor = 0xffffff; // 0xFBF7F4
    
    const base = { x: 0, y: 4, z: 14 };
    const sceneContainer = document.getElementById(containerId);
    
    TG = new Group();

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, sceneContainer.offsetWidth / sceneContainer.offsetHeight, 0.1, 1000);
    camera.position.set(base.x, base.y, base.z);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer
    renderer = sceneContainer ? new THREE.WebGLRenderer({ antialias: true, canvas: sceneContainer }) : new THREE.WebGLRenderer({ antialias: true });
    renderer.useLegacyLights =  false;
    renderer.setClearColor(sceneColor, 0); // Set background color to white
    
    const pr = window.devicePixelRatio 
    renderer.setPixelRatio(pr);
    
    console.log('pixel ratio', pr);
    // Label renderer
    labelRenderer = new CSS2DRenderer();

    if (containerId) {
        renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
        labelRenderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.right = '0px';
    document.body.appendChild(labelRenderer.domElement);

    if (controls) {
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

    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(10, 10, 10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 4;
    dirLight.shadow.camera.bottom = -4;
    dirLight.shadow.camera.left = -4;
    dirLight.shadow.camera.right = 4;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-10, 10, -10);
    scene.add(dirLight2);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    const pointLight1 = new THREE.PointLight(0xffffff, 1, 50);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, 1, 50);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);


    if(preloadedModel===true) {

        console.log('Loading demo model FROM STORE');
        const storedData = useModelPreloadStore().getData()
        if(!storedData){
            loadModelByFileName(modelName);
            return;
        }
        const preloadedModel = storedData.clone();
        
        scene.add(preloadedModel);
        const box = new THREE.Box3().setFromObject(preloadedModel);
        const center = box.getCenter(new THREE.Vector3());
        preloadedModel.position.set(-center.x, -center.y, -center.z);
        const model3D = new Model(preloadedModel, orbitControls, renderer);
        if (callback) {
            callback(model3D);
        }
    }else if(window.location.href.includes('demo') || window.location.pathname == "/" ){ 

        console.log('Loading demo model FROM STORE');
        const demoModel = demoModelPreload().getData().clone();

        scene.add(demoModel);
        const box = new THREE.Box3().setFromObject(demoModel);
        const center = box.getCenter(new THREE.Vector3());
        demoModel.position.set(-center.x, -center.y, -center.z);
        const model3D = new Model(demoModel, orbitControls, renderer);
        if (callback) {
            callback(model3D);
        }
    
    
    }else{

        loadModelByFileName(modelName);

    }

    function loadModelByFileName(modelName) {
        console.log('Loading model from URL');
        new GLTFLoader().load(`https://myassembly.co/src/assets/glbModel/${modelName}.glb`, (loadedModel) => {
            loadModel(loadedModel);
        });
    }



    function loadModel(loadedModel) {
        let model = loadedModel.scene;
        model.name = 'modelHomeView';
        scene.add(model);
        
        pivot = new THREE.Object3D();
        scene.add(pivot);
        pivot.add(model);
        
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.set(-center.x, -center.y, -center.z);

        // If the model needs to maintain its scale on resize, save the original scale
        const originalScale = model.scale.clone();

        // Adjust scaling on resize based on the container size
        window.addEventListener('resize', () => {
            const containerWidth = sceneContainer ? sceneContainer.offsetWidth : window.innerWidth;
            const containerHeight = sceneContainer ? sceneContainer.offsetHeight : window.innerHeight;
            
            // Update camera aspect ratio
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();
            
            // Update renderer and label renderer sizes
            renderer.setSize(containerWidth, containerHeight);
            labelRenderer.setSize(containerWidth, containerHeight);

            // Reapply original scale to maintain model proportions
            model.scale.copy(originalScale);
        });

        document.getElementById('sidebarCollapse').addEventListener('click', () => {

            document.getElementById('assemblyScene').style.width = '-webkit-fill-available';

            setTimeout(() => {
                const containerWidth = sceneContainer.offsetWidth;
                const containerHeight = sceneContainer.offsetHeight;
                
                // Update camera aspect ratio
                camera.aspect = containerWidth / containerHeight;
                camera.updateProjectionMatrix();
        
                // Update renderer and label renderer sizes
                renderer.setSize(containerWidth, containerHeight);
                labelRenderer.setSize(containerWidth, containerHeight);
        
                // Reapply original scale to maintain model proportions
                if (model) {
                    model.scale.copy(originalScale);
                }
            }, 333); // Match this duration with the CSS transition time for the sidebar
        });
        
        const model3D = new Model(model, orbitControls, renderer);
        if (callback) {
            callback(model3D);
        }
    }

    // Animation loop
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        TG.update();
        renderer.render(scene, camera);
        if (orbitControls) orbitControls.update();
        labelRenderer.render(scene, camera);
    };

    animate();

};



//Three.js init
export function build3Dmodel(containerId = null, autoSpin = false, controls = true, callback = null, modelName, preloadedModel=false) {

    const sceneModel = initThreeJs(containerId, autoSpin, controls, callback, modelName, preloadedModel);

}


// remove all objects from scene
export function cleanupModelScene() {
    console.log('Cleaning up model scene');

    // Cancel the animation loop
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    if (renderer) {
        console.log('disposing renderer');
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement = null;
        renderer = null;
    }

    if (labelRenderer) {
        console.log('disposing label renderer');
        // labelRenderer.dispose();
        labelRenderer.domElement.remove();
        labelRenderer = null;
    }

    if (scene) {
        console.log('disposing scene');
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

    if(cId){
        const sceneContainer = document.getElementById(cId);
        sceneContainer.remove()
    }

}