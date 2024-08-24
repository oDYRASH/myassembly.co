<template></template>
<script setup>
import { computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { build3Dmodel, cleanupModelScene, homePageAnimation } from '@/model3d/model3d.js';
import { ref } from 'vue';
const props = defineProps({
    scrollPosition: Number,
    assemblyContainerId: String,
    autoSpin: Boolean,
    controls: Boolean,
    callback: Function,
    modelName: String,
    preLoadedModel: Boolean
});

const lastStep = ref(0);

function setLastStep(step) {
    lastStep.value = step;
}

if (props.assemblyContainerId == "homePageCanvas") {

    const LOG = 1;
    const activeSection = computed(() => {
        
        switch (props.scrollPosition) {
            case 0:
                setLastStep(0);
                console.log('lastStep: ', lastStep.value);
                if (lastStep.value != 0) homePageAnimation(0);
                return;
            case 1:
                setLastStep(1);
                if (LOG) homePageAnimation(1);
                return;
            case 2:
                setLastStep(2);
                if (LOG) homePageAnimation(2);
                return;
            case 3:
                setLastStep(3);
                if (LOG) homePageAnimation(3);
            case 4:
                setLastStep(4);
                if (LOG) homePageAnimation(4);
                return;
            default:
                if (LOG) console.log('Default case function triggered');
                return;
        }
    });

    watch(activeSection, (newVal) => { });


    }
    onMounted(() => {

        build3Dmodel(props.assemblyContainerId, props.autoSpin, props.controls, props.callback, props.modelName, props.preLoadedModel);

    });

    onBeforeUnmount(() => {

        cleanupModelScene();
        
    });
</script>
