<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <Header />
  <div class="container mx-auto py-10">
    <RouterView />
  </div>
  <Footer />
</template>

<style>
.container {
  padding-top: 10rem;
}
</style>