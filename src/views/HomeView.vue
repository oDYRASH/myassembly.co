<script setup>
  import Model3D from '../components/Model3D.vue'
  import { ref, onMounted, onUnmounted } from 'vue';
  import Header from '../components/Header.vue'
  import GetStartedButton from '../components/GetStartedButton.vue'

  import { demoModelPreload } from '@/stores/preLoadedModel'; // Adjust import path as needed


  const modelPreloaded = ref(false);

  demoModelPreload().loadModel().then(() => {
    console.log('HOME VIEW: Model preloaded');
    modelPreloaded.value = true;
  });

  // Define a debounce function
  function debounce(func, wait) {
      let timeout;
      return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
      };
  }

  const scrollPosition = ref(0);

  // Debounced scroll handler
  const handleScroll = debounce(() => {
      scrollPosition.value = Math.floor(window.scrollY / (window.innerHeight * 0.8));
      console.log(scrollPosition.value);
  }, 20);

  onMounted(() => {
      // Add the debounced scroll event listener
      window.addEventListener('scroll', handleScroll);

  });

  onUnmounted(() => {
      // Remove the scroll event listener
      window.removeEventListener('scroll', handleScroll);
      
  });




</script>



<template>

  <Header></Header>
  <!-- 3D-SCENE -->
  <canvas id="homePageCanvas"></canvas>
  <Model3D v-if="modelPreloaded" :scrollPosition="scrollPosition" :modelName="'0258'" :assemblyContainerId="'homePageCanvas'" :controls="false" />
  <!-- START SECTIONS -->
  <section id="section1">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
      <div class="hl_headline-w">
          <h1 class="h1 hero-title">More than a website builder</h1>
      </div>
      <div class="hl_subheadline-w is--hero">
          <p class="paragraph-l u-text-gray200">With Webflow’s visual-first platform, marketers, designers, and devs alike can create, optimize, and scale web experiences that get results — all backed by enterprise-grade hosting and security.</p>
      </div>
      <GetStartedButton :value="'Start building'"/>
    </div>
  </section>

  <section id="section2">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
        <div class="hl_headline-w">
          <h1 class="h1 hero-title">Experience the Future: Building with Light Steel Framing</h1>
        </div>
        <p class="paragraph-l u-text-gray200">
          LSF offers a multitude of advantages over traditional construction methods. Enjoy significantly faster construction times, allowing you to move into your dream space sooner. LSF buildings are incredibly strong and durable, resisting harsh weather conditions and standing the test of time. Additionally, LSF utilizes eco-friendly materials and reduces construction waste, making it a responsible choice for the planet.
        </p>
    </div>
  </section>

  <section id="section3">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Built Faster, Built Smarter: Why Choose LSF?</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200">
                LSF offers a multitude of advantages over traditional construction methods. Enjoy significantly faster construction times, allowing you to move into your dream space sooner. LSF buildings are incredibly strong and durable, resisting harsh weather conditions and standing the test of time. Additionally, LSF utilizes eco-friendly materials and reduces construction waste, making it a responsible choice for the planet.
            </p>
        </div>
    </div>
    <GetStartedButton/>

  </section>

  <section id="section4">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Strength You Can Trust, Sustainability You Can Embrace</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200">
                The lightweight nature of LSF shouldn't diminish its remarkable strength and stability. Steel frames exceed building code requirements. LSF construction also boasts superior energy efficiency, leading to lower utility bills and a reduced carbon footprint. With LSF, you get the best of both worlds: a strong, secure building for generations to come, built with a focus on environmental responsibility.
            </p>
        </div>
    </div>
  </section>

  <section id="section5">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w breakpoint-section">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Dream It. Build It. Faster with LSF</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200">
                LSF isn't just about speed and efficiency; it's about unlocking your design potential. LSF's flexibility allows for a wide range of architectural styles and layouts, making it perfect for any vision you may have. Whether you dream of a modern masterpiece or a cozy cottage, LSF can help you bring it to life, faster than ever before.
            </p>
        </div>
    </div>
    <GetStartedButton/>

  </section>

  <!-- END SECTION -->


  <!-- PRICING START -->
  <div class="container py-3 mt-5">
    <header>
      <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
        <a href="/" class="d-flex align-items-center text-dark text-decoration-none">
          <span class="fs-4">TO SET ON /subscribe PAGE</span>
        </a>

        <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
          <a class="me-3 py-2 text-dark text-decoration-none" href="#">Features</a>
          <a class="me-3 py-2 text-dark text-decoration-none" href="#">Enterprise</a>
          <a class="me-3 py-2 text-dark text-decoration-none" href="#">Support</a>
          <a class="py-2 text-dark text-decoration-none" href="#">Pricing</a>
        </nav>
      </div>

      <div class="pricing-header p-3 pb-md-4 mx-auto text-center">
        <h1 class="display-4 fw-normal">Pricing</h1>
        <p class="fs-5 text-muted">Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>
      </div>
    </header>

    <main>
      <div class="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Free</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">$0<small class="text-muted fw-light">/mo</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>10 users included</li>
                <li>2 GB of storage</li>
                <li>Email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-outline-primary">Sign up for free</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">Pro</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">$15<small class="text-muted fw-light">/mo</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>20 users included</li>
                <li>10 GB of storage</li>
                <li>Priority email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-primary">Get started</button>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card mb-4 rounded-3 shadow-sm border-primary">
            <div class="card-header py-3 text-white bg-primary border-primary">
              <h4 class="my-0 fw-normal">Enterprise</h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">$29<small class="text-muted fw-light">/mo</small></h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>30 users included</li>
                <li>15 GB of storage</li>
                <li>Phone and email support</li>
                <li>Help center access</li>
              </ul>
              <button type="button" class="w-100 btn btn-lg btn-primary">Contact us</button>
            </div>
          </div>
        </div>
      </div>

      <h2 class="display-6 text-center mb-4">Compare plans</h2>

      <div class="table-responsive">
        <table class="table text-center">
          <thead>
            <tr>
              <th style="width: 34%;"></th>
              <th style="width: 22%;">Free</th>
              <th style="width: 22%;">Pro</th>
              <th style="width: 22%;">Enterprise</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row" class="text-start">Public</th>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Private</th>
              <td></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th scope="row" class="text-start">Permissions</th>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Sharing</th>
              <td></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Unlimited members</th>
              <td></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
            <tr>
              <th scope="row" class="text-start">Extra security</th>
              <td></td>
              <td></td>
              <td><svg class="bi" width="24" height="24"><use xlink:href="#check"></use></svg></td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <footer class="pt-4 my-md-5 pt-md-5 border-top">
      <div class="row">
        <div class="col-12 col-md">
          <small class="d-block mb-3 text-muted">© 2017–2021</small>
        </div>
        <div class="col-6 col-md">
          <h5>Features</h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Cool stuff</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Random feature</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Team feature</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Stuff for developers</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Another one</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Last time</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>Resources</h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Resource</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Resource name</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Another resource</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Final resource</a></li>
          </ul>
        </div>
        <div class="col-6 col-md">
          <h5>About</h5>
          <ul class="list-unstyled text-small">
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Team</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Locations</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Privacy</a></li>
            <li class="mb-1"><a class="link-secondary text-decoration-none" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
    </footer>
  </div>
  <!-- PRICING END -->

</template>

<style>
  canvas {
    position: fixed;
    z-index: 1;
  }

  @media screen and (min-width: 1380px) {
    #homePageCanvas {
      right: calc((100vw - 1580px) / 2);
      width: 890px !important;
      height: 100vh !important;
      top: 0;
      background-color: transparent;
    }
    
  }

  @media screen and (max-width: 1380px) {
    #homePageCanvas {
      width: 100vw !important;
      height: 45vh !important;
      left: 0;
      right: 0;
      bottom: 0px;
      background-color: white;
    }
  }

</style>