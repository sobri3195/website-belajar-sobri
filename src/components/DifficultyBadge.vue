<script setup>defineProps({ level: String })</script>
<template><span class="badge difficulty" :class="level?.toLowerCase()">{{ level }}</span></template>
