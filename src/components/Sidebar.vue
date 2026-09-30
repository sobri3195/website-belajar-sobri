<script setup>
import questions from '../data/questions.json'
defineProps({ mobile: Boolean })
defineEmits(['navigate'])
const items=[['/','Dashboard','⌂'],['/daily','Latihan Harian','▶'],['/simak-ui','SIMAK UI','Σ'],['/lpdp','LPDP','◆'],['/btkv','BTKV','Aa'],['/bank-soal','Bank Soal','▤'],['/bookmark','Bookmark','★'],['/riwayat','Riwayat','◷'],['/statistik','Statistik','↗'],['/pengaturan','Pengaturan','⚙']]
</script>
<template><aside class="sidebar" :class="{'sidebar-mobile':mobile}"><RouterLink class="brand" to="/" @click="$emit('navigate')"><img class="brand-logo" src="/favicon.svg" alt=""/><div><strong>Belajar Sobri</strong><span>Dashboard akademik</span></div></RouterLink><nav aria-label="Navigasi utama"><RouterLink v-for="item in items" :key="item[0]" :to="item[0]" @click="$emit('navigate')"><span class="nav-icon">{{item[2]}}</span>{{item[1]}}</RouterLink></nav><div class="sidebar-note"><strong>{{questions.length}} soal lokal</strong><span>Frontend-only • tersimpan aman di perangkat</span></div></aside></template>
