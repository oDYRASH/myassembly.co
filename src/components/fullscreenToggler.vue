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
</script>

<template>
<!-- FullScreenToggleButton -->
    <button class="js-toggle-fullscreen-btn toggle-fullscreen-btn" aria-label="Enter fullscreen mode" @click="toggleFS">
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