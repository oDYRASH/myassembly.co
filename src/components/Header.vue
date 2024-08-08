<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between padding-header mb-4">
    <!-- LOGO -->
    <img style="height: 40px;" src="https://ghost.org/images/logos/logo-black-1.webp" alt="">
    <!-- MENU -->
      <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li><span href="#" class="header_link pointer">Home</span></li>
        <li><span href="#" class="header_link pointer">Features</span></li>
        <li><span href="#" class="header_link pointer">Pricing</span></li>
        <li><span href="#" class="header_link pointer">FAQs</span></li>
        <li><span href="#" class="header_link pointer">About</span></li>
      </ul>

      <div class="col-md-3 text-end">
          <button type="button" class="btn " style="margin-right: 30px;">Contact Us</button>
          <RouterLink to="/demo" class="btn btn-dark font-weight-bold" style="background-color: #15171a !important;">Start Demo</RouterLink>
      </div>
    </header>
</template>