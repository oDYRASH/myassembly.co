<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'; // Adjust the path as necessary
// Particles

// import { particlesConfig } from '@/model3d/particlesConfig.js'; // Update the path accordingly

onMounted(() => {
  particlesJS('particles-js', {
    fps_limit: 60,
    interactivity: {
      detect_on: "canvas",
      events: {
        onclick: { enable: true, mode: "pause" },
        onhover: {
          enable: true,
          mode: "repulse",
          parallax: { enable: false, force: 60, smooth: 10 }
        },
        resize: true
      },
      modes: {
        bubble: { distance: 400, duration: 2, opacity: 0.8, size: 40, speed: 3 },
        grab: { distance: 400, line_linked: { opacity: 1 } },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
        repulse: { distance: 200, duration: 0.4 }
      }
    },
    particles: {
      color: { value: "#ffffff" },
      line_linked: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.4,
        width: 1
      },
      move: {
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
        bounce: false,
        direction: "none",
        enable: true,
        out_mode: "out",
        random: false,
        speed: 2,
        straight: false
      },
      number: { density: { enable: true, value_area: 800 }, value: 80 },
      opacity: {
        anim: { enable: false, opacity_min: 0.1, speed: 1, sync: false },
        random: false,
        value: 0.5
      },
      shape: {
        character: {
          fill: false,
          font: "Verdana",
          style: "",
          value: "*",
          weight: "400"
        },
        image: {
          height: 100,
          replace_color: true,
          src: "images/github.svg",
          width: 100
        },
        polygon: { nb_sides: 5 },
        stroke: { color: "#000000", width: 0 },
        type: "circle"
      },
      size: {
        anim: { enable: false, size_min: 0.1, speed: 40, sync: false },
        random: true,
        value: 5
      }
    },
    polygon: {
      draw: { enable: false, lineColor: "#ffffff", lineWidth: 0.5 },
      move: { radius: 10 },
      scale: 1,
      type: "none",
      url: ""
    },
    retina_detect: true
  }, function() {
  console.log('callback - particles.js config loaded');
});
});

onBeforeUnmount(() => {
  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
});

// Fin Particles
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
  storeUserInfo(userInfo);

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
  storeUserInfo(userInfo);
  // For now, we will just redirect the user to the /dashboard route
  router.push('/demo');
}

// localstore user info
function storeUserInfo(userInfo) {
  localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

function getUserInfo() {
  const userInfo = localStorage.getItem('userInfo');
  return userInfo ? JSON.parse(userInfo) : null;
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
        style="background-color: transparent !important; width: fit-content; position:absolute; top: 10px; left: 10px;"><p style="font-weight: bold; margin-right: 1ch; color: #0d0d1c;">ByPass</p></RouterLink>
    <div id="particles-js"></div>
    <div class="d-flex flex-row align-items-center content-center"  style="height: 100vh;">
        <main class="form-signin d-flex flex-column align-items-center">
          <h2 class="mb-4">
            Let's dive in !
          </h2>
            <form @submit.prevent="handleFormSubmit">
              <div class="row gy-3 overflow-hidden">
                <div class="col-12" style="display: none;">
                  <div class="form-floating mb-3">
                    <input type="text" disabled class="form-control" name="name" id="name" placeholder="Name" required style="background-color: #0d0d1c;">
                    <label for="name" class="form-label">Name</label>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-floating mb-3">
                    <input type="email" class="form-control" v-model="form.email" name="email" id="email" placeholder="name@example.com" required style="background-color: #0d0d1c;">
                    <label for="email" class="form-label">Email</label>
                  </div>
                </div>
                <div class="col-12" style="    margin-top: 0px;">
                  <div class="form-floating mb-3">
                    <input type="password" class="form-control" v-model="form.password" name="password" id="password" value="" placeholder="Password" required style="background-color: #0d0d1c;">
                    <label for="password" class="form-label">Password</label>
                  </div>
                </div>

                  <div class="d-flex flex-row justify-content-evenly">
                    <button class="btn btn-outline-secondary" style="width: 45%; border: solid #cfcbcb 1px !important; color: #cfcbcb;" type="submit">Sign In</button>
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
    background-image: radial-gradient(circle, rgb(203 213 225) 2px, #0d0d1c 2px);
    background-size: 2.5rem 2.5rem;
    background-position: center center;
}

.form-signin{
  max-width: 390px !important;
  padding: 35px !important;
  background: rgba( 255, 255, 255, 0.1 );
backdrop-filter: blur( 8px );
-webkit-backdrop-filter: blur( 8px );
border: 1px solid rgba( 255, 255, 255, 0.18 );
}

#particles-js {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: -1;
}

</style>
