<script setup>
defineProps({ open: Boolean })
defineEmits(['toggle'])
</script>

<template>
  <header class="mobile-nav">
    <button class="icon-btn" type="button" :aria-expanded="open" aria-controls="mobile-drawer" @click="$emit('toggle')">
      ☰
    </button>
    <RouterLink class="mobile-brand" to="/" aria-label="Belajar Sobri Dashboard">
      <img src="/favicon.svg" alt="" aria-hidden="true" />
      <strong>Belajar Sobri</strong>
    </RouterLink>
    <span class="pill">{{ open ? 'Menu' : 'Belajar' }}</span>
  </header>
</template>
