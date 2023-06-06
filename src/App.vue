<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
</script>

<template>
  <Header />
  <div class="container mx-auto max-w-7xl py-10">
    <RouterView />
  </div>
</template>
