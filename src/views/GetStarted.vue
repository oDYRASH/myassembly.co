<script setup>
import { onMounted } from 'vue'

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

  // Log user information such as email, name, and picture
  console.log('User Info:', userInfo);
  console.log('Email:', userInfo.email);
  console.log('Name:', userInfo.name);
  console.log('Picture:', userInfo.picture);
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
    ">
        <RouterLink :to="{ name: 'demo', params: { modelName: 'project_0' } }" :key="$route.fullPath" class="btn btn-dark d-flex flex-row"
        style="background-color: #15171a !important; width: fit-content; position:absolute; top: 10px; left: 10px;"><p style="font-weight: bold; margin-right: 1ch;">ByPass</p></RouterLink>

    <div class="d-flex flex-row align-items-center content-center gridstyle" style="height: 100vh;">
        <main class="form-signin">

          
            <div>
                <div id="g_id_onload"
                    data-client_id="93244253552-q2qn4t6vjerpf6mj1qgfduf69agfulas.apps.googleusercontent.com"
                    data-callback="handleCredentialResponse">
                </div>
                <div class="g_id_signin" data-type="standard"></div>
            </div>
         




            <form>
                <h1 class="h3 lg-5 fw-normal">Please sign in</h1>

                <div class="form-floating lg-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Name</label>
                </div>

                <div class="form-floating lg-3">
                    <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
                    <label for="floatingInput">Email address</label>
                </div>

                <div class="form-floating lg-3">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="checkbox lg-3">

                </div>
                <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                <p class="mt-5 lg-3 text-muted">©MyAssembly.co 2024</p>
            </form>
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

</style>
