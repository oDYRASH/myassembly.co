<script setup>
import SideBar from '../components/SideBar.vue'
import Assembly from '../components/Assembly.vue'
import fullscreenToggler from '../components/fullscreenToggler.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Reactive state for the 3D model
const assembly3DModel = ref(null);

// Function to update the 3D model
const updateAssembly = (model) => {
  console.log('updateAssembly :', model);
  assembly3DModel.value = model;
};

const route = useRoute();
const modelName = ref(route.params.modelName);

</script>

<template>
  <fullscreenToggler></fullscreenToggler>

  <div class="d-flex" style="overflow: hidden;">
    <div class="d-flex flex-row" style="position: absolute; bottom: 10px; right: 10px; width: fit-content;">

      <!-- <a href="/" class="btn btn-dark font-weight-bold"
      style="background-color: #15171a !important;  z-index: 1000; font-weight: 700;"
      >MyAssembly.co
    </a> -->
    <a href="/dashboard" class="btn btn-dark font-weight-bold"
      style="background-color: #00A6ED!important; color: #171f38; z-index: 1000; font-weight: 700; align-items: center; justify-content: center; display: flex; flex-direction:row">
      <span class="material-icons" style="margin-right: 10px;">add</span>
        Build Your Own Assembly
    </a>
  
  </div>
    <!-- SIDE BAR -->
    <SideBar :model="assembly3DModel"></SideBar>
    <!-- ASSEMBLY -->
    <Assembly @set-assembly="updateAssembly" :modelName="modelName ?  modelName : 'project_0'" :controls="true"></Assembly>
  </div>
</template>



<style>

  #app {
    max-width: 100vw;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    font-weight: normal;
  }

</style>
