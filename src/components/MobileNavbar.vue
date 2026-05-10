<script setup>defineProps({ open: Boolean }); defineEmits(['toggle'])</script>
<template><header class="mobile-nav"><button class="icon-btn" @click="$emit('toggle')">☰</button><strong>Belajar Sobri</strong><span class="pill">{{ open ? 'Menu' : 'Belajar' }}</span></header></template>
