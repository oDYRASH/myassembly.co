<script setup>
  import { RouterView } from 'vue-router'
  // preloads the 3D model
  import { demoModelPreload } from '@/stores/preLoadedModel'; // Adjust import path as needed

  async function preloadModel() {
    const demoModelStore = demoModelPreload();
    await demoModelStore.loadModel();
  }

  preloadModel();
</script>

<template>
  <RouterView/>
</template>

<style scoped>
title {
  display: none;
}
</style>
