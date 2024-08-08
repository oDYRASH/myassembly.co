<script setup>
import SideBar from '../components/SideBar.vue'
import Assembly from '../components/Assembly.vue'
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// Reactive state for the 3D model
const assembly3DModel = ref(null);

// Function to update the 3D model
const updateAssembly = (model) => {
  assembly3DModel.value = model;
};

const route = useRoute();
const modelName = ref(route.params.modelName);

</script>

<template>
  <div class="d-flex">
    <!-- SIDE BAR -->
    <SideBar :model="assembly3DModel"></SideBar>
    <!-- ASSEMBLY -->
    <Assembly @set-assembly="updateAssembly" :modelName="modelName"></Assembly>
  </div>
</template>



<style>

  #app {
    max-width: 100vw;
    margin: 0 auto;
    font-weight: normal;
  }

</style>
<style scoped>
template {
  display: flex;
  flex-direction: row;
}
</style>