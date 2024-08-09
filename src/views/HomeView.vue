<script setup>
  import Model3D from '../components/Model3D.vue'
  import { ref, onMounted, onUnmounted } from 'vue';
  import Header from '../components/Header.vue'

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


</script>



<template>

  <Header></Header>
  <!-- 3D-SCENE -->
  <canvas id="homePageCanvas"></canvas>
  <Model3D :scrollPosition="scrollPosition" :modelName="'0258'" :assemblyContainerId="'homePageCanvas'" :controls="true"/>
  <!-- START SECTIONS -->
  <section id="section1">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">More than a website builder</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200">With Webflow’s visual-first platform, marketers, designers, and devs alike can create, optimize, and scale web experiences that get results — all backed by enterprise-grade hosting and security.</p>
        </div>
        <div class="button_group-w">
            <div>
                <div class="button-group">
                    <a data-signup-cta="1" data-cta="homepage page CTA" data-cta-position="hero section" data-cta-text="start building" href="https://webflow.com/dashboard/signup" class="button w-inline-block">
                        <div class="button-inner">
                            <div>Start building</div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>

<section id="section2">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Experience the Future: Building with Light Steel Framing</h1>
        </div>
    </div>
</section>

<section id="section3">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Built Faster, Built Smarter: Why Choose LSF?</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200">
                LSF offers a multitude of advantages over traditional construction methods. Enjoy significantly faster construction times, allowing you to move into your dream space sooner. LSF buildings are incredibly strong and durable, resisting harsh weather conditions and standing the test of time. Additionally, LSF utilizes eco-friendly materials and reduces construction waste, making it a responsible choice for the planet.
            </p>
        </div>
    </div>
</section>

<section id="section4">
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
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
    <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
        <div class="hl_headline-w">
            <h1 class="h1 hero-title">Dream It. Build It. Faster with LSF</h1>
        </div>
        <div class="hl_subheadline-w is--hero">
            <p class="paragraph-l u-text-gray200" style="max-width: 33vw !important;">
                LSF isn't just about speed and efficiency; it's about unlocking your design potential. LSF's flexibility allows for a wide range of architectural styles and layouts, making it perfect for any vision you may have. Whether you dream of a modern masterpiece or a cozy cottage, LSF can help you bring it to life, faster than ever before.
            </p>
        </div>
    </div>
</section>

  <!-- END SECTION -->


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