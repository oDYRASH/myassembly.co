<!-- <template></template>
  
<script setup>

    import { defineProps, computed, onMounted, watch } from 'vue';
    import { initThreeJs } from '@/model3d/model3d.js';

    // Define props
    const props = defineProps({
        scrollPosition: Number
    });


    // Compute background color and trigger functions based on scrollPosition
    const activeSection = computed(() => {
        switch (props.scrollPosition) {
            case 0:
                console.log('Case 0');
                return
            case 1:
                console.log('Case 1');
                return
            case 2:
                console.log('Case 2');
                return
            case 3:
                console.log('Case 3');
                return
            default:
                console.log('Default case function triggered');
                return; // Default color if no match
        }
    });

    watch(activeSection);



    onMounted(() => {
        initThreeJs()
    });
    
  
</script>

<style>
    canvas {
        position: fixed;
        top: 0;
        width: 100vw;
        z-index: 1;
    }
</style> -->


<script setup>
    import { defineProps, computed, onMounted, watch, onBeforeUnmount } from 'vue';
    import { build3Dmodel, cleanupModelScene } from '@/model3d/model3d.js';

    const props = defineProps({
        scrollPosition: Number,
        assemblyContainerId: String,
        autoSpin: Boolean,
        controls: Boolean,
        callback: Function,
        modelName: String
    });


    const LOG = false;
    const activeSection = computed(() => {
        switch (props.scrollPosition) {
            case 0:
                if(LOG) console.log('Case 0');
                return;
            case 1:
                if(LOG) console.log('Case 1');
                return;
            case 2:
                if(LOG) console.log('Case 2');
                return;
            case 3:
                if(LOG) console.log('Case 3');
                return;
            default:
                if(LOG) console.log('Default case function triggered');
                return;
        }
    });

    watch(activeSection);


    onMounted(() => {

        build3Dmodel(props.assemblyContainerId, props.autoSpin, props.controls, props.callback, props.modelName);

        // Update the shared state with the created model
    });

    onBeforeUnmount(() => {
        cleanupModelScene();
    });
</script>

