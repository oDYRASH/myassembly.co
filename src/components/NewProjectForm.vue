<script setup>
  import { useModelPreloadStore } from '@/stores/preLoadedModel'; // Adjust import path as needed
  import { useRouter } from 'vue-router';
  import { ref } from 'vue';

  const loading = ref(false);
  const loadedFile = ref(null);


  const modelStore = useModelPreloadStore();

  function handleFileUpload(event) {
    const file = event.target.files[0];
    loadedFile.value = file.name;
    if (file) {
          const modelUrl = URL.createObjectURL(file);
          modelStore.loadModel(modelUrl);
      }
  }


  const router = useRouter();
  const projectName = ref('');
  function goToDashBoard() {
    loading.value = true;
    // Redirect to the dashboard
    router.push({ name: 'assembly-editor', params: { projectName: projectName.value } });
  }

</script>


<template>

  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel" style="color: #0D0D1C;">Create New Project</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
            <div class="input-group flex-nowrap mb-3">
                <span class="input-group-text" id="addon-wrapping">#</span>
                <input type="text" v-model="projectName" class="form-control" required placeholder="My Anwsome Project" aria-label="ProjectName" aria-describedby="addon-wrapping">
            </div>            

            <div class="dropzone-area">
                <div class="file-upload-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                </svg>
                </div>
                <p class="m-3" :style="loadedFile ? 'font-size:25px; font-weight:bold;' : ''">{{ loadedFile ? loadedFile : "Select the 3D model for this project"}}</p>
                <input type="file" id="3dModelFileInput" name="uploaded-file" required @change="handleFileUpload">
                <p v-if="!loadedFile" class="message">file format .glb .gltf</p>
            </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>


        <a type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="goToDashBoard">
          <span v-if="!loading">Create</span>
          <span v-else>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Loading...
          </span>
        </a>

      </div>
    </div>
  </div>

</template>
<style>

.message{
    font-size: 0.8rem;
    color: var(gray);
}

.dropzone-area {
    padding: 1rem;
    position: relative;
    margin-top: 1rem;
    min-height: 16rem;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 2px dashed black;
    border-radius: 1rem;
    color: black;
    cursor: pointer;
}


.dropzone-area [type="file"] {
    cursor: pointer;
    position: absolute;
    opacity: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
}

.dropzone-actions {
    display: flex;
    justify-content: space-between;
    padding-top: 1.5rem;
    margin-top: 1.5rem;
    border-top: 1px solid var(--gray);
    gap: 1rem;
    flex-wrap: wrap;
}

</style>