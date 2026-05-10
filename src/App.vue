<script setup>
import { onMounted, ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import MobileNavbar from './components/MobileNavbar.vue'
import { getSettings } from './utils/storage'

const drawerOpen = ref(false)
onMounted(() => document.documentElement.classList.toggle('dark', getSettings().darkMode))
</script>

<template>
  <div class="app-shell">
    <Sidebar />
    <MobileNavbar :open="drawerOpen" @toggle="drawerOpen = !drawerOpen" />
    <div class="mobile-drawer" :class="{ open: drawerOpen }"><Sidebar mobile @navigate="drawerOpen = false" /></div>
    <div v-if="drawerOpen" class="scrim" @click="drawerOpen = false" />
    <main class="main-content"><RouterView /></main>
  </div>
</template>
