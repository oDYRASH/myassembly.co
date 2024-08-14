<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'; // Adjust the path as necessary

const router = useRouter()
const userStore = useUserStore();

const form = ref({
  email: '',
  password: ''
});


function parseJwt(token) {
  // Decode the JWT token to extract user information
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

function handleCredentialResponse(response) {
  const idToken = response.credential;
  const userInfo = parseJwt(idToken);

  // Store userInfo in Pinia store
  userStore.setUserInfo(userInfo);

  // Redirect the user to the /dashboard route
  router.push('/demo');
}

function handleFormSubmit(){
  // Handle the form submission
  const userInfo = {
    email: form.value.email,
    password: form.value.password
  };

  userStore.setUserInfo(userInfo);

  // For now, we will just redirect the user to the /dashboard route
  router.push('/demo');
}

// localstore user info
function storeUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

onMounted(() => {

  // Initialize the Google sign-in button
  window.google.accounts.id.initialize({
    client_id: '93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com',
    callback: handleCredentialResponse,
  });

  window.google.accounts.id.renderButton(
    document.querySelector('.g_id_signin'),
    { theme: 'outline', size: 'large' } // Custom button options
  );
});
</script>

<template>

    <div style="
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden !important;
    ">
        <RouterLink :to="{ name: 'demo', params: { modelName: 'project_0' } }" :key="$route.fullPath" class="btn btn-dark d-flex flex-row"
        style="background-color: transparent !important; width: fit-content; position:absolute; top: 10px; left: 10px;"><p style="font-weight: bold; margin-right: 1ch;">ByPass</p></RouterLink>

    <div class="d-flex flex-row align-items-center content-center gridstyle" style="height: 100vh;">
        <main class="form-signin d-flex flex-column align-items-center">
          <h2 class="mb-4">
            Let's dive in !
          </h2>
            <form @submit.prevent="handleFormSubmit">
              <div class="row gy-3 overflow-hidden">
                <div class="col-12" style="display: none;">
                  <div class="form-floating mb-3">
                    <input type="text" disabled class="form-control" name="name" id="name" placeholder="Name" required>
                    <label for="name" class="form-label">Name</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" v-model="form.email" name="email" id="email" placeholder="name@example.com" required>
                    <label for="email" class="form-label">Email</label>
                  </div>
                </div>
                <div class="col-12" style="    margin-top: 0px;">
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" v-model="form.password" name="password" id="password" value="" placeholder="Password" required>
                    <label for="password" class="form-label">Password</label>
                  </div>
                </div>

                  <div class="d-flex flex-row justify-content-evenly">
                    <button class="btn btn-outline-secondary" style="width: 45%; border: solid #cfcbcb 1px !important;" type="submit">Sign In</button>
                    <button class="btn btn-primary btn-lg" style="width: 45%;" type="submit">Sign up</button>
                </div>

              </div>
            </form>
            <hr style="width: 90%; margin: 20px 0px">
            <div>
                <div id="g_id_onload"
                    data-client_id="93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com"
                    data-callback="handleCredentialResponse">
                </div>
                <div class="g_id_signin" data-type="standard"></div>
            </div>

            </main>
    </div>
</div>






</template>

<style>

.form-signin{
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.gridstyle {
    height: 16rem;
    background-image: radial-gradient(circle, rgb(203 213 225) 2px, #fff 2px);
    background-size: 2.5rem 2.5rem;
    background-position: center center;
}

.form-signin{
  max-width: 390px !important;
  padding: 35px !important;
  background-color: #fff;
  border: 1px rgb(50, 54, 88) solid;
}

</style>
