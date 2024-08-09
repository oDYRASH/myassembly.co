<script setup>

import Model3d from './Model3D.vue'

const emit = defineEmits(['set-assembly']);

// set props modelName
const props = defineProps({
    modelName: {
        type: String,
        default: 'HomePageModel'
    }
});

// Emit event to set the assembly model
const setModel = (m) => {
    emit('set-assembly', m);
};

</script>

<template>
    <div id="assembly-container">
        <canvas id="assemblyScene" style="width: -webkit-fill-available"></canvas>
        <Model3d 
            :scrollPosition="0" 
            :assemblyContainerId="'assemblyScene'" 
            :autoSpin="true" 
            :controls="true"
            :callback="setModel" 
            :modelName="modelName">
        </Model3d>
    </div>
</template>

<style>
#assembly-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: aquamarine;
}

#assemblyScene {
    height: 100% !important;
    position: fixed;
    top: 0;

    background-color: aquamarine;
}

/* CSS for the canvas when the sidebar is hidden */
.canvas-full-width {
    width: 100vw !important;
    transition: width 0.5s ease; /* Match this with the sidebar transition */
}

</style>