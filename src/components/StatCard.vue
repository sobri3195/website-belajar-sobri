<script setup>defineProps({ title: String, value: [String, Number], helper: String, tone: { type: String, default: 'blue' } })</script>
<template><article class="stat-card" :class="`tone-${tone}`"><span>{{ title }}</span><strong>{{ value }}</strong><small>{{ helper }}</small></article></template>
