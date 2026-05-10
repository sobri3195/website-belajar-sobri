<script setup>defineProps({ category: String })</script>
<template><span class="badge category" :class="category?.toLowerCase().replaceAll(' ', '-')">{{ category }}</span></template>
