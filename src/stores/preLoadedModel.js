import { defineStore } from 'pinia';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export const useModelPreloadStore = defineStore('modelPreload', {
  state: () => ({
    data: null,
  }),
  actions: {
    loadModel(modelUrl) {
        console.log('Preloading INPUT model');
        const loader = new GLTFLoader();
  
        return new Promise((resolve, reject) => {
          loader.load(
            modelUrl,
            (gltf) => {
              this.data = gltf.scene; // Store the scene directly

              console.log('INPUT Model Stored');
              console.log(this.model);
              resolve("gltf.scene");
            },
            undefined, // onProgress callback
            (error) => {
              console.error('Error loading model:', error);
              reject(error);
            }
          );
        });
      }
    
    ,
    getData() {
      console.log('Returning Data');
      console.log(this.data);
      return this.data;
    },
  },
});


export const demoModelPreload = defineStore('demoModelPreload', {
    state: () => ({
      model: null, // Store the Three.js model directly
    }),
    actions: {
      loadModel() {
        console.log('Preloading DEMO model');
        const demoModelUrl = 'https://myassembly.co/src/assets/glbModel/project_0.glb';
        const loader = new GLTFLoader();
  
        return new Promise((resolve, reject) => {
          loader.load(
            demoModelUrl,
            (gltf) => {
              this.model = gltf.scene; // Store the scene directly
              console.log('DEMO Model Stored');
              console.log(this.model);

              resolve("gltf.scene");
            },
            undefined, // onProgress callback
            (error) => {
              console.error('Error loading model:', error);
              reject(error);
            }
          );
        });
      },
      getData() {
        return this.model;
      },
    },
  });
