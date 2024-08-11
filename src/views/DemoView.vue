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

document.addEventListener("DOMContentLoaded", function () {
  console.log('DOMContentLoaded');
  const popoverTrigger = document.getElementById('popoverButton');
  const popover = new bootstrap.Popover(popoverTrigger, {
    trigger: 'manual'
  });

  // Trigger the popover after 20 seconds
  setTimeout(() => {
    console.log('showing popover');
    popover.show();
  }, 500);
});

</script>

<template>
  <a href="/dashboard" class="btn btn-dark font-weight-bold" id="popoverButton">
    <span class="material-icons" style="margin-right: 10px; color: black !important;">add</span>
    Build Your Own Assembly
  </a>

  <fullscreenToggler :right="10" :top="10"></fullscreenToggler>
  <div class="d-flex" style="overflow: hidden;">
    <div class="d-flex flex-row" style="position: absolute; bottom: 10px; left: 10px; width: fit-content;">

      <!-- <a href="/" class="btn btn-dark font-weight-bold"
      style="background-color: #15171a !important;  z-index: 1000; font-weight: 700;"
      >MyAssembly.co
    </a> -->

    </div>
    <!-- SIDE BAR -->
    <SideBar :model="assembly3DModel" :projectName="'Project_DEMO'"></SideBar>
    <!-- ASSEMBLY -->
    <Assembly @set-assembly="updateAssembly" :modelName="modelName ? modelName : 'project_0'" :controls="true">
    </Assembly>
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

#popoverButton {
  
  position: absolute;
  bottom: 10px;
  left: 10px;

  border: solid 1px #dbe0ed !important;
  border-radius: 0px !important;

  background-color: #FCFCFC;

  color: #0c0728;
  z-index: 1000;
  font-weight: 700;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row
  
}

.fx01 {
  color: white;
  border: 1px solid rgb(255, 255, 255);
  box-shadow: inset 0 0 0 1px black;
  overflow: hidden;
  position: relative;
  transition: all .3s ease-in-out;
}

.fx01 span {
  transition: all 0.5s ease-out;
  z-index: -2;
}

.fx01::after {
  background: #BA274A;
  border: 0 solid #BA274A;
  content: '';
  height: 155px;
  position: absolute;
  left: -75px;
  top: -50px;
  opacity: .8;
  transform: rotate(35deg);
  width: 50px;
  transition: all 1s cubic-bezier(.175, .52, .165, 1);
  z-index: 1;
}

/* 10s */
.fx01.vclass {
  animation: fx01-loop 4s infinite ease-in-out;
}

@keyframes fx01-loop {

  0%,
  90% {
    border: 4px solid black;
  }

  95% {
    border: 4px solid gray;
  }

  100% {
    border: 4px solid black;
  }
}

.fx01.vclass::after {
  animation: fx01-after-loop 10s infinite cubic-bezier(.175, .52, .165, 1);
}

@keyframes fx01-after-loop {

  40%,
  80% {
    left: -75px;
    opacity: .8;
    transform: rotate(35deg);
    border: 0 solid #000;
  }

  85% {
    left: 120%;
    opacity: 0;
    transform: rotate(40deg);
    border: 20px solid #000;
  }

  100% {
    left: -75px;
    opacity: .8;
    transform: rotate(35deg);
    border: 0 solid #000;
  }
}

.fx01.vclass span {
  animation: fx01-span-loop 10s infinite ease-out;
}

@keyframes fx01-span-loop {

  0%,
  90% {
    letter-spacing: normal;
    color: #BA274A;
  }

  95% {
    letter-spacing: .1em;
    color: #333;
  }

  100% {
    letter-spacing: normal;
    color: #BA274A;
  }
}
</style>
