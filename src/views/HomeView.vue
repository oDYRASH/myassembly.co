<script setup>
  import Model3D from '../components/Model3D.vue'
  import { ref, onMounted, onUnmounted } from 'vue';

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

  <!-- 3D-SCENE -->

  <Model3D :scrollPosition="scrollPosition"/>

  <!-- START SECTIONS -->
  <section id="section1">
    <!-- <h1 style=" max-width: 80vw;">The <p id="float" class="g">Lightweight</p> and <p id="fall" class="g">Quick</p> solution.</h1>
      <p style="max-width: 25vw;">Looking for a <b>faster</b>, <b>lighter</b>, and more <b>sustainable</b> way to build? Look no further than Light Steel Framing (LSF). Contact us and discover how LSF can <b>transform your next project.</b></p>
      <span class="cta" id="landingCTA">Build with LSF</span> -->
      <div data-hero-content-wrap="" pointer-auto="" class="hero_content-w snipcss-fQaCS">
    <div class="hl_headline-w">
        <h1 class="h1 hero-title">More than a website builder</h1>
    </div>
    <div class="hl_subheadline-w is--hero">
        <p class="paragraph-l u-text-gray200">With Webflow’s visual-first platform, marketers, designers, and devs alike can create, optimize, and scale web experiences that get results — all backed by enterprise-grade hosting and security.</p>
    </div>
    <div class="button_group-w">
        <div>
            <div>
                <div class="button-group"><a data-signup-cta="1" data-cta="homepage page CTA" data-cta-position="hero section" data-cta-text="start building" href="https://webflow.com/dashboard/signup" class="button w-inline-block">
                        <div class="button-inner">
                            <div>Start building</div>
                        </div>
                    </a></div>
            </div>
        </div>
    </div>
</div>
  </section>

  <section id="section2">

    <h1>Experience the Future: Building with Light Steel Framing</h1>

  </section>

  <section id="section3">
    <h1>Built Faster, Built Smarter: Why Choose LSF?</h1>
    <p>
      LSF offers a multitude of advantages over traditional construction methods. Enjoy significantly faster
      construction times, allowing you to move into your dream space sooner. LSF buildings are incredibly strong and
      durable, resisting harsh weather conditions and standing the test of time. Additionally, LSF utilizes eco-friendly
      materials and reduces construction waste, making it a responsible choice for the planet.
    </p>
  </section>

  <section id="section4">
    <h1>Strength You Can Trust, Sustainability You Can Embrace</h1>
    <p>
      The lightweight nature of LSF shouldn't diminish its remarkable strength and stability. Steel frames exceed
      building code requirements. LSF construction also boasts superior energy efficiency, leading to lower utility
      bills and a reduced carbon footprint. With LSF, you get the best of both worlds: a strong, secure building for
      generations to come, built with a focus on environmental responsibility.
    </p>
  </section>

  <section id="section5">
    <h1>Dream It. Build It. Faster with LSF</h1>
    <p style="max-width: 33vw !important;">
      LSF isn't just about speed and efficiency; it's about unlocking your design potential. LSF's flexibility allows
      for a wide range of architectural styles and layouts, making it perfect for any vision you may have. Whether you
      dream of a modern masterpiece or a cozy cottage, LSF can help you bring it to life, faster than ever before.
    </p>
  </section>
  <!-- END SECTION -->


</template>
