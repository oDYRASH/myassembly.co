import * as THREE from 'three';

import Stats from 'stats-js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Group } from '@tweenjs/tween.js';

import { Model } from '@/model3d/model.js';
import { openingAnimation, TG } from '@/model3d/modelAnimation.js';
import { useModelPreloadStore, demoModelPreload } from '@/stores/preLoadedModel'; // Adjust import path as needed

    
let scene, camera, renderer, orbitControls, pivot, labelRenderer, cId, animationFrameId;


function initThreeJs(containerId = null, autoSpin = false, controls = true, callback = null, modelName, preloadedModel=false) {
    
    
    const atHomePage = window.location.pathname == "/";

    cId = containerId;
    const modelColor = 0xffffff; // 0x242331
    const sceneColor = 0xffffff; // 0xFBF7F4
    
    const base = { x: 0, y: 5, z: 18 };
    const sceneContainer = document.getElementById(containerId);
    
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
    
    // Label renderer
    labelRenderer = new CSS2DRenderer();

    if (containerId) {
        console.log('Container ID provided');
        renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
        labelRenderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
    } else {
        console.log('No container ID provided');
        renderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
    }

    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.right = '0px';
    document.body.appendChild(labelRenderer.domElement);

    if (controls) {
        console.log('Controls enabled');
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
        // orbitControls.minDistance = 10;
        // orbitControls.maxDistance = 20;
    }else{
        console.log('No controls');
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
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


    if(preloadedModel===true) {

        console.log('Loading demo model FROM STORE');
        const storedData = useModelPreloadStore().getData()
        if(!storedData){
            loadModelByFileName(modelName);
            return;
        }
        const preloadedModel = storedData.clone();
        loadModel(preloadedModel);    

    }else if(window.location.href.includes('demo') || atHomePage ){ 

        const storedData = demoModelPreload().getData()

        if(!storedData){
            loadModelByFileName('demo');
            return;
        }

        const demoModel = storedData.clone();
        loadModel(demoModel);    
    
    
    }else{
        console.log('Else : loadModelByFileName');
        loadModelByFileName(modelName);

    }

    function loadModelByFileName(modelName) {
        console.log('Loading model from URL :', modelName);
        new GLTFLoader().load(`https://myassembly.co/src/assets/glbModel/${modelName}.glb`, (loadedModel) => {
            loadModel(loadedModel.scene);
        });
    }



    function loadModel(model) {
        console.log("MODEL :", model);
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

        if(!atHomePage){ document.getElementById('sidebarCollapse').addEventListener('click', () => {

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

        // fitCameraToModel(camera, model, orbitControls);

    }else{
        openingAnimation(base, camera);
    }


        console.log('Model loaded, initializing Model class');
        const model3D = new Model(model, orbitControls, renderer, camera);
        if (callback) {
            callback(model3D);
        }
    }



    // Animation loop
    const animate = () => {

        animationFrameId = requestAnimationFrame(animate);
        TG.update();
        
        // monitored code here
        renderer.render(scene, camera);
        if (orbitControls) {
            orbitControls.update();
        }
        labelRenderer.render(scene, camera);

    };

    animate();

};


function fitCameraToModel(camera, model, controls, offset = 1.25) {
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const distance = Math.abs(maxDim / 2 / Math.sin(fov / 2));

    camera.position.set(center.x, center.y, distance * offset);
    camera.lookAt(center);

    // Adjust near and far planes
    const minZ = box.min.z;
    const cameraToFarEdge = (minZ < 0) ? -minZ + distance * offset : distance * offset - minZ;

    camera.near = cameraToFarEdge / 100;
    camera.far = cameraToFarEdge * 100;
    camera.updateProjectionMatrix();

    if (controls) {
        controls.target.copy(center);
        controls.update();
    }

    console.log('Camera position:', camera.position);
    console.log('Camera near/far:', camera.near, camera.far);
}



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
    TG.removeAll();

    if(cId){
        const sceneContainer = document.getElementById(cId);
        sceneContainer.remove()
    }

}