<script setup>
    function toggleFS() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    }

    const props = defineProps({
        right: {
            type: Number,
            default: 10
        },
        top: {
            type: Number,
            default: 10
        }
    });

</script>

<template>
<!-- FullScreenToggleButton -->
    <button class="js-toggle-fullscreen-btn toggle-fullscreen-btn" aria-label="Enter fullscreen mode" @click="toggleFS" :style="`right:${right}px; top:${top}px`">
        <svg class="toggle-fullscreen-svg" width="28" height="28" viewBox="-2 -2 28 28">
            <g class="icon-fullscreen-enter">
                <path d="M 2 9 v -7 h 7" />
                <path d="M 22 9 v -7 h -7" />
                <path d="M 22 15 v 7 h -7" />
                <path d="M 2 15 v 7 h 7" />
            </g>
            
            <g class="icon-fullscreen-leave">
                <path d="M 24 17 h -7 v 7" />
                <path d="M 0 17 h 7 v 7" />
                <path d="M 0 7 h 7 v -7" />
                <path d="M 24 7 h -7 v -7" />
            </g>
        </svg>
    </button>
</template>