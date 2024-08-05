import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoader';
import { OrbitControls } from 'OrbitControls';
import { Tween, Easing, update } from 'TWEEN';

import { isPanelName, isPanelPart } from "./utils.js"

export class SceneHandler {

    constructor(cameraPosition = { x: 0, y: 5, z: 14 }, clearColor = 0xffffff, ambientLightIntensity = 0.5, pointLightIntensity = 1) {
      
      this.name = "TEST_001"
      this.cameraPosition = cameraPosition;
      this.clearColor = clearColor;
      this.ambientLightIntensity = ambientLightIntensity;
      this.pointLightIntensity = pointLightIntensity;
      this.scene = new THREE.Scene();
      this.loader = new GLTFLoader();

      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();


      //specific to each model
      this.model = null;
      this.groups = {}

      window.addEventListener('resize', this.onWindowResize.bind(this), false);

      this.initScene()
    }
  
    initScene() {
      this.initCamera();
      console.log('camera initialized')
      this.initRenderer();
      console.log('renderer initialized')
      this.initLights();
      console.log('lights initialized')
      this.initControls();
      console.log('controls initialized')
      this.animate();
      console.log('animate initialized')
      this.setupNamingOnClick();
      console.log('naming initialized')
    }
  
    

    getGroupsArray(){
      return this.groups
    }

    initCamera() {
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
      this.camera.position.set(this.cameraPosition.x, this.cameraPosition.y, this.cameraPosition.z);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    }
  
    initRenderer() {

      const canvasObject = document.getElementById('main3dModelScene');

      this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasObject });
      this.renderer.setSize(window.innerWidth * 0.618, window.innerHeight);
      this.renderer.setClearColor(this.clearColor, 0); // Set background color
      canvasObject.__threeRenderer = this.renderer;
      // document.body.appendChild(this.renderer.domElement);
    }
  
    initLights() {
      this.ambientLight = new THREE.AmbientLight(0xffffff, this.ambientLightIntensity);
      this.scene.add(this.ambientLight);
  
      this.pointLight = new THREE.PointLight(0xffffff, this.pointLightIntensity, 100);
      this.pointLight.position.set(10, 10, 10);
      this.scene.add(this.pointLight);
    }
  
    initControls() {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.25;
      this.controls.screenSpacePanning = false;
      this.controls.minDistance = 5;
      this.controls.maxDistance = 50;
      this.controls.maxPolarAngle = Math.PI / 2;
      this.controls.enableZoom = true;
    }
  
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth * 0.618, window.innerHeight);
    }
  
    loadModel(fileName) {
      if (this.model) {
        this.scene.remove(this.model.parent);
        this.model = null;
      }

      this.loader.load(fileName + '.glb', (gltf) => {

        this.model = gltf.scene;
  
        const pivot = new THREE.Object3D();
        this.scene.add(pivot);
        pivot.add(this.model);
        
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.set(-center.x, -center.y, -center.z);
  
        this.pivot = pivot;

        this.setupCameraForModel()
        this.generateUi()
      }, undefined, (error) => {
        console.error(error);
      });
    }
  
    makeSpin() {
      if (!this.model) {
        alert('No model loaded');
        return;
      }
    
      if (this.pivot) {
        new Tween(this.pivot.rotation)
          .to({ y: this.pivot.rotation.y + Math.PI * 2 }, 1500)
          .start();
      }
    }

    setupCameraForModel() {

      if(!this.model) {
        alert('No model loaded');
      }

      console.log('model loaded')
      const box = new THREE.Box3().setFromObject(this.model);
      const center = box.getCenter(new THREE.Vector3());
  
      this.camera.position.set(center.x, center.y + 5, center.z + 14);
      this.camera.lookAt(center);
  
      this.controls.target.set(center.x, center.y, center.z);
    }
  
    setupCameraForGroup(childrenArray) {

      if (!this.model) {
        alert('No model loaded');
        return;
      }
    
      if (!childrenArray || childrenArray.length === 0) {
        console.warn('No children provided');
        return;
      }
    
      // Create a temporary parent to hold the children
      const tempParent = new THREE.Group();
      childrenArray.forEach(child => tempParent.add(child));
    
      // Calculate bounding box and center for the group
      const box = new THREE.Box3().setFromObject(tempParent);
      const center = box.getCenter(new THREE.Vector3());
    
      // Set camera position and lookAt
      this.camera.position.set(center.x, center.y + 5, center.z + 14);
      this.camera.lookAt(center);
    
      // Update orbit controls target (optional)
      if (this.controls) {
        this.controls.target.set(center.x, center.y, center.z);
      }
    }
    

    setupNamingOnClick() {

      // Add event listener for mousedown
      // window.addEventListener('mousedown', this.onMouseDown, false);
      return

    }

  //   onMouseDown(event) {
  //     // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
  //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  //     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  //     // Update the raycaster with the camera and mouse position
  //     this.raycaster.setFromCamera(this.mouse, camera);

  //     // Calculate objects intersecting the raycaster
  //     const intersects = this.raycaster.intersectObjects(scene.children, true);

  //     if (intersects.length > 0) {
  //         console.log('Clicked piece name:', intersects[0].object.name);
  //     }
  // }

    animate() {
      requestAnimationFrame(this.animate.bind(this));
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      update(); // Update tweens
      
    }

    allowTransprencyOnChild(child){
      if (child.isMesh) {
          child.material.transparent = true; // Ensure transparency support
          child.material.opacity = 1; // Set initial opacity to 1
          child.userData.originalPosition = child.position.clone();
          child.material = child.material.clone();

          const direction = new THREE.Vector3().copy(child.position).normalize();
          child.userData.explodedPosition = child.position.clone().add(direction.multiplyScalar(4));
      }
    }

    generateUi(){
      this.setGroups()
      this.UIM.generateUi(this.groups, this)
    }

    setGroups() {
      console.log("start setGroups")
      let currentGroupName = null;
  
      this.model.traverse((child) => {
          const name = child.name;
          // console.log(name  + "  " + isPanelName(name) + "  " + isPanelPart(name))
          let groupName = isPanelName(name)

          if (groupName) {

              currentGroupName = groupName;
              this.groups[currentGroupName] = [];

          } else if (currentGroupName && isPanelPart(name)) {
              this.allowTransprencyOnChild(child);
              // child.parent.remove(child);
              this.groups[currentGroupName].push(child);
          }

      });

      console.log("Groups set")
    }

    hideAllGroups() {
      this.model.traverse((child) => {
        if (child.isMesh) {

            new Tween(child.material)
                .to({ opacity: 0.15 }, 300)
                .easing(Easing.Cubic.InOut)
                .start();
        }
    });
    }

    toogleGroupVisibility(groupName) {

      this.hideAllGroups();
    
      setTimeout(() => {

        // this.setupCameraForGroup(this.groups[groupName]);

        this.groups[groupName].forEach((child) => {
          new Tween(child.material)
              .to({ opacity: 1.00 }, 150)
              .easing(Easing.Cubic.InOut)
              .start();
  
        });

      }, 301);

      

    }
    

}