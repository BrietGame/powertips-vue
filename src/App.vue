<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <notifications class="p-3" position="top right" />
  <Header />
  <div class="container mx-auto py-10 px-4">
    <RouterView />
  </div>
  <Footer />
</template>

<style>
.container {
  padding-top: 10rem;
}
</style>