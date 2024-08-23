<script setup>
    import { RouterLink } from 'vue-router'

    const props = defineProps({
        value: {
            type: Boolean,
            default: false
        }
    })

</script>

<template>

    <RouterLink v-if="value" :to="'/get-started'" class="btn btn-primary d-flex flex-row get-started-btn">       
        <p>{{ value }}</p>
    </RouterLink>

    <RouterLink v-else :to="'/get-started'" class="btn btn-primary d-flex flex-row get-started-btn">       
        <p style="font-weight: bold; margin-right: 1ch;">Get Started</p>
        <p> — it's free</p>
    </RouterLink>
</template>

<style>
.get-started-btn {
    width: fit-content !important;
}
</style>