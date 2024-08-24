<script setup>

    import { onMounted, ref } from 'vue'
    //use on mounted for the whole script

    const playingAnimationState = ref(0)

    onMounted(() => {
        // Attach event listener to the sidebarCollapse element

        const sidebarCollapse = document.getElementById('sidebarCollapse')
        
        if(sidebarCollapse) sidebarCollapse.addEventListener('click', toggleSidebar)
        
        document.addEventListener('click', stopModelAutoRotation)

    })

    function toggleSidebar() {
        document.getElementById('sidebar').classList.toggle('active')
        const spanValue = document.getElementById('hideSideBar')
        spanValue.innerText = spanValue.innerText === '<' ? '>' : '<'

        const canvas = document.getElementById('assemblyScene')
        canvas.classList.toggle('canvas-full-width')

    }

    const props = defineProps({
        model: {
            type: Object,
            default: null
        },
        projectName: {
            type: String,
            default: 'Your Project'
        }
    });

    function showThePanel(panelName){
      props.model.showThePanel(panelName)
    }

    function toggelPanelVisibility(panelName) {
        //use method show on the model option
        props.model.togglePanelVisibility(panelName)
    }

    let stopped = false
    function stopModelAutoRotation() {
      if(stopped) return
      stopped = true
      //use method stopAutoRotation on the model option
      props.model.stopAutorotate()
    }

    function toggleGroupVisibility(gropuName, index) {
      //stop propagation
      let toggleButton = document.getElementById('toggleGroupVisibility_'+index)
      let currentState = toggleButton.innerText

      toggleButton.innerText = currentState == "visibility" ? "visibility_off" : "visibility"

      currentState == "visibility" ? props.model.hideGroup(gropuName) : props.model.showGroup(gropuName)
    }


    function playBuildingAnimation() {
      playingAnimationState.value = 1
      props.model.playBuildingAnimation()
    }

    function pauseBuildingAnimation() {
      playingAnimationState.value = 2
      props.model.pauseBuildingAnimation()
    }

    function stopBuildingAnimation() {
      playingAnimationState.value = 0
      props.model.stopBuildingAnimation()
      props.model.showAll()
    }

    function resumeBuildingAnimation() {
      playingAnimationState.value = 1
      props.model.resumeBuildingAnimation()
    }

    const sliderValue = ref(window.devicePixelRatio)

    function updateRendererPixelRatio(){
      props.model.renderer.setPixelRatio(sliderValue.value)
    }





</script>

<template>


    <!-- Sidebar  -->
    <nav id="sidebar" class="">
          <!-- :style="playingAnimationState != 0 ? 'width:84px; right:-65px' : 'width:50px;right:-46px'" -->
    <div id="player"  :style="playingAnimationState != 0 ? 'width:84px; right:-84px' : 'width:50px;right:-50px'" style="position: absolute;  z-index: 88; ">
      <span v-if="playingAnimationState==0"class="material-icons" @click.stop="playBuildingAnimation()">play_arrow</span>
    
      <div :style="playingAnimationState==0 ? 'display:none !important' : 'display:flex'" class="d-flex flex-row">
    
        <span class="material-icons me-3" @click.stop="playingAnimationState == 2 ? resumeBuildingAnimation() : pauseBuildingAnimation()">
          {{playingAnimationState == 2 ? 'play_arrow' : 'pause'}}
        </span>
        <span class="material-icons" @click.stop="stopBuildingAnimation()">stop</span>
    
      </div>
    
    </div>
        <!-- toggleButton -->
        <button type="button" id="sidebarCollapse" :style="projectName == 'Project_DEMO' ? 'display:none' : 'display:none'">
            <span id="hideSideBar"><</span>
        </button>
    
        <!-- Settings Controler  -->
        <div id="settingsControler" style="display: none !important;">
            <button type="button" class="btn btn-light shadow-none" @click.stop="props.model.resetCamera()">
                <span class="material-icons">settings_backup_restore</span>
            </button>
            <button type="button" class="btn btn-light shadow-none" @click.stop="props.model.toggleAutorotate()">
                <span class="material-icons">rotate_right</span>
            </button>
        </div>

        
        <!-- Sidebar content -->
        <div class="sidebar-header">
            
            <div class="d-flex flex-row" style=" align-items: center; gap: 15px; position: relative">
              <h3 style="margin: 0px;">
                {{projectName}}
              </h3>



            </div>
        </div>
        <!-- col-12 col-sm-6 p-0 m-0 border h-100 overflow-hidden -->
        <div v-if="model" class="p-0 m-0 h-100 overflow-hidden">
          <!-- 
          RANGE INPUT PIXEL RATIO
          <input 
          type="range" 
          step="0.2"
          min="0" 
          max="10" 
          v-model="sliderValue" 
          @input="updateRendererPixelRatio"
        />
        {{ sliderValue }} -->
          <div

            id="accordionExample"
            class="accordion accordion-flush h-100 overflow-auto"
            >
            <div 
              v-for="(items, group, index) in model.groupsName" 
              :key="group"
              class="accordion-item" 
              >
              
              <h2 
                class="accordion-header" 
                :id="'heading_'+index"
              >
                <button 
                :class="index ? 'accordion-button collapsed' : 'accordion-button'" 
                :data-bs-target="'#collapse_'+index" 
                :aria-expanded="index ? false : true" 
                :aria-controls="'collapse_'+index" 
                type="button" 
                data-bs-toggle="collapse" 
                style="font-weight: bold;
                      font-size: smaller;
                      color: white !important;"
                >
                  
                  <button 
                    
                    type="button"
                    class="btn shadow-none" 
                  >
                    <span 
                      @click.stop="toggleGroupVisibility(group, index)"
                      class="material-icons"
                      :id="'toggleGroupVisibility_'+index"
                    >visibility</span>

                  </button>
                  
                  <p class="me-3"></p>{{ group }} ({{ items.length }})
                  
                </button>
              </h2>

              <div :id="'collapse_'+index" :class="index ? 'accordion-collapse collapse' : 'accordion-collapse collapse show'" :aria-labelledby="'heading_'+index" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                  <button  v-for="(item, index) in items" :key="index" @click="showThePanel(item)" type="button" class="btn p-3 shadow-none" style="border-radius: 0px; color: white; border: white 1px solid !important;">
                    {{ item }}
                  </button>
                </div>
              </div>
              
            </div>

          </div>
        </div>

        <div v-else>
            Loading model...
            <!-- 
            <div v-else id="containerLoading">
                <div class="loader">
                    <div class = "box"> 
                        <div class = "logo">
                            <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M100 34.2c-.4-2.6-3.3-4-5.3-5.3-3.6-2.4-7.1-4.7-10.7-7.1-8.5-5.7-17.1-11.4-25.6-17.1-2-1.3-4-2.7-6-4-1.4-1-3.3-1-4.8 0-5.7 3.8-11.5 7.7-17.2 11.5L5.2 29C3 30.4.1 31.8 0 34.8c-.1 3.3 0 6.7 0 10v16c0 2.9-.6 6.3 2.1 8.1 6.4 4.4 12.9 8.6 19.4 12.9 8 5.3 16 10.7 24 16 2.2 1.5 4.4 3.1 7.1 1.3 2.3-1.5 4.5-3 6.8-4.5 8.9-5.9 17.8-11.9 26.7-17.8l9.9-6.6c.6-.4 1.3-.8 1.9-1.3 1.4-1 2-2.4 2-4.1V37.3c.1-1.1.2-2.1.1-3.1 0-.1 0 .2 0 0zM54.3 12.3 88 34.8 73 44.9 54.3 32.4V12.3zm-8.6 0v20L27.1 44.8 12 34.8l33.7-22.5zM8.6 42.8 19.3 50 8.6 57.2V42.8zm37.1 44.9L12 65.2l15-10.1 18.6 12.5v20.1zM50 60.2 34.8 50 50 39.8 65.2 50 50 60.2zm4.3 27.5v-20l18.6-12.5 15 10.1-33.6 22.4zm37.1-30.5L80.7 50l10.8-7.2-.1 14.4z"></path></svg>
                        </div>
                    </div>
                    <div class = "box"></div>
                    <div class = "box"></div>
                    <div class = "box"></div>
                    <div class = "box"></div>
                </div>
            </div> -->
        </div>


    </nav>

</template>
<style>

#player {
  display: flex;
  justify-content: center;
  padding: 10px;
  background: #d2eaff00;
  border-radius: 0px;
  width: fit-content;
  gap: 15px;
  align-items: center;
  border-bottom: solid  1px rgb(228, 228, 255);
  border-right: solid  1px rgb(228, 228, 255);
  
  color: white !important;

  transition: all .15s ease-in-out;

  z-index: 10;

}

#containerLoading{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    justify-content: center;
}

.loader {
  height: 200px;
  aspect-ratio: 1;
  position: relative;
}

.loader .box {
  position: absolute;
  background: linear-gradient(0deg, rgba(235, 233, 233, 0.092) 0%, rgba(255, 255, 255, 0.2) 100%);
  border-radius: 50%;
  border-top: .5px solid rgba(255, 255, 255, 0.676);
  backdrop-filter: blur(5px);
  animation: ripple 2s infinite ease-in-out;
}

.loader .box:nth-child(1) {
  inset: 40%;
  z-index: 99;
}

.loader .box:nth-child(2) {
  inset: 30%;
  z-index: 98;
  border-color: rgba(255, 255, 255, 0.8);
  animation-delay: 0.2s;
}

.loader .box:nth-child(3) {
  inset: 20%;
  z-index: 97;
  border-color: rgba(241, 229, 229, 0.6);
  animation-delay: 0.4s;
}

.loader .box:nth-child(4) {
  inset: 10%;
  z-index: 96;
  border-color: rgba(233, 233, 233, 0.4);
  animation-delay: 0.6s;
}

.loader .box:nth-child(5) {
  inset: 0%;
  z-index: 95;
  border-color: rgba(245, 245, 245, 0.2);
  animation-delay: 0.8s;
}

.loader .logo {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  padding: 30%;
}

.loader .logo svg {
  fill: rgb(103, 103, 255);
  width: 100%;
  animation: color-change 2s infinite ease-in-out;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    /* box-shadow: rgba(203, 204, 207, 0.3) 0px 10px 10px -0px; */
  }
  50% {
    transform: scale(1.3);
    /* box-shadow: rgba(203, 204, 207, 0.3) 0px 30px 20px -0px; */
  }
  100% {
    transform: scale(1);
    /* box-shadow: rgba(203, 204, 207, 0.3) 0px 10px 10px -0px; */
  }
}

@keyframes color-change {
  0% {
    fill: rgb(191, 193, 202);
  }
  50% {
    fill: white;
  }
  100% {
    fill: rgb(191, 184, 184);
  }
}



</style>