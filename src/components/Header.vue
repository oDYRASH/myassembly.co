<script setup>
import { RouterLink } from 'vue-router'
</script>
<template>


  <nav class="navbar navbar-expand-md navbar-light padding-header" style="z-index: 10; background-color:#ffffff;">
    <div class="d-flex flex-row">
      <p style="font-weight: bold; font-size: 25px;">MyAssembly.co</p>
    </div>
    <button class="navbar-toggler" style="
    border: none;
    outline: none;
" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-md-flex flex-row justify-between" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"
        style="justify-self: center;align-self: center;display: flex;width: -webkit-fill-available;justify-content: center;">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mt-4 mt-md-0" href="#" id="navbarDropdown" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Products
          </a>

          <div class="dropdown-menu" aria-labelledby="navbarDropdown" style="border: none;">
            <a class="dropdown-item" href="#">For Builders</a>
            <a class="dropdown-item" href="#">For Business</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">For Special Inquiries</a>
          </div>

        </li>

        <li class="nav-item active">
          <a class="nav-link" href="#">Home</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Features</a>
        </li>

        <li class="nav-item">
          <a class="nav-link" href="#">Explore</a>
        </li>


      </ul>
      <div class="col-md-3 d-flex flex-row" style="min-width: 309px;">
        <button type="button" class="btn" style="margin-right: 15px;">Contact Us</button>
        <RouterLink :to="{ name: 'demo', params: { modelName: 'project_0' } }" class="btn btn-dark d-flex flex-row"
        style="background-color: #15171a !important; width: fit-content;"><p style="font-weight: bold; margin-right: 1ch;">Get Started</p><p> — it's free</p></RouterLink>
      </div>
    </div>
  </nav>
  <!-- NOT RESPONSIVE HEADER -->
  <!-- <header
    class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between padding-header mb-4">
    <img style="height: 40px;" src="https://ghost.org/images/logos/logo-black-1.webp" alt="">
    <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
      <li><span href="#" class="header_link pointer">Home</span></li>
      <li><span href="#" class="header_link pointer">Features</span></li>
      <li><span href="#" class="header_link pointer">Pricing</span></li>
      <li><span href="#" class="header_link pointer">FAQs</span></li>
      <li><span href="#" class="header_link pointer">About</span></li>
    </ul>

    <div class="col-md-3 text-end">
      <button type="button" class="btn " style="margin-right: 30px;">Contact Us</button>

      <RouterLink :to="{ name: 'demo', params: { modelName: 'project_0' } }" class="btn btn-dark font-weight-bold"
        style="background-color: #15171a !important;">Start Demo</RouterLink>
    </div>
  </header> -->
</template>

<style>
.nav-item {
  margin-right: 20px;
}
</style>