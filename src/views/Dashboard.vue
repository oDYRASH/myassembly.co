<script setup>
  import { useRouter } from 'vue-router'
  import NewProjectForm from '../components/NewProjectForm.vue'
  import { useUserStore } from '@/stores/user'; // Adjust the path as necessary

  function getUserInfo() {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }

  const userStore = useUserStore();
  const userInfo = userStore.getUserInfo || getUserInfo();

  if(!userInfo) {
    const router = useRouter()
    router.push('/get-started');
  }

</script>

<template>

    
    <body>
    
    <header class="navbar navbar-dark sticky-top flex-md-nowrap p-0 shadow" style="background-color: #131329; border-bottom: solid .5px #584f7b;">
      <a class="navbar-brand d-flex flex-row align-items-center ms-5 ms-md-0 p-2 ps-4" style="line-height: normal;" href="#">
        <img v-if="userInfo.picture" style="width: 50px; height: 50px; filter: drop-shadow(rgb(195, 195, 195) 0px 0px 1px);" :src="userInfo.picture" alt=""/>
        <p v-else class="text-capitalize"> {{ userInfo.email.charAt(0) }} </p>
        <div>
          <p class="d-flex flex-column align-items-start ms-3 font-weight-bold fs-5">{{ userInfo.given_name }} {{ userInfo.family_name }}</p>
          <p class="d-flex flex-row align-items-center justify-content-start ms-3 font-weight-bold fs-6 c-s"> {{ userInfo.email }} </p>

        </div>
      </a>
      <button class="navbar-toggler position-absolute d-md-none collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"> -->
      <!-- <div class="navbar-nav">
        <div class="nav-item text-nowrap">
          <a class="nav-link px-3" href="#">Sign out</a>
        </div>
      </div> -->
    </header>
    
    <div class="container-fluid">
      <div class="row">
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block h-100  sidebar collapse" style="    border-right: 1px solid; /* Set the border width */
    border-image: linear-gradient(to bottom, white, #0D0D1C) 1;">
          <div class="position-sticky pt-3">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-home" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  Dashboard
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file" aria-hidden="true"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                  Projects
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-users" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Customers
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bar-chart-2" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                  Reports
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-layers" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  Integrations
                </a>
              </li>
            </ul>
    

          </div>
        </nav>
    
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Dashboard</h1>
            <div class="btn-toolbar mb-2 mb-md-0">
              <div class="btn-group me-2">
                <button type="button" class="btn btn-sm btn-outline-secondary">Share</button>
                <button type="button" class="btn btn-sm btn-outline-secondary">Export</button>
              </div>
              <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                This week
              </button>
            </div>
            
          </div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary d-flex flex-row" data-bs-toggle="modal" data-bs-target="#new-project-modal">
        <span class="material-icons" style="margin-right: 5px;">add</span>
        New Project
      </button>

      <div class="modal fade new-project-modal" id="new-project-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
          <NewProjectForm></NewProjectForm>
      </div>
      </div>
        </main>
      </div>
    </div>
    
    
      
    
    </body>
</template>

<style>

#app {
  max-width: 100% !important;
  width: 100vw !important;
}


.navbar-dark .navbar-toggler {
    color: rgba(255, 255, 255, .55);
    border-color: none !important;
}
.navbar-toggler:focus {
    text-decoration: none;
    outline: 0;
    box-shadow: none !important;
}

.nav-link {
    display: flex;
    gap: 5px;
}

</style>