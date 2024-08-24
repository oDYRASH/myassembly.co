<script setup>
import { RouterLink } from 'vue-router'
import GetStartedButton from './GetStartedButton.vue'
</script>
<template>


  <nav class="navbar navbar-expand-lg padding-header z-3">
    <div class="d-flex flex-row">
      <p class="brand-name">MyAssembly.co</p>
    </div>
    <button class="navbar-toggler navbar-dark" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse d-lg-flex flex-row justify-between" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto d-flex align-self-center justify-content-center text-light-tertiary">

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle mt-4 mt-lg-0" href="#" id="navbarDropdown" role="button"
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
      <hr class="d-lg-none" style="width: 90%; margin: 10px 5%;">
      <div class="col-lg-3 d-flex flex-row align-items-center justify-content-center" style="min-width: 309px;">
        <RouterLink :to="'/contact'" type="button" class="btn btn-outline-light" style="margin-right: 15px;">Contact Us</RouterLink>

        <GetStartedButton />
      </div>
    </div>
  </nav>
  
</template>