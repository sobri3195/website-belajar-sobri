<script setup>
defineProps({ mobile: Boolean })
defineEmits(['navigate'])
const items = [
  ['/', 'Dashboard', '⌂'], ['/daily', 'Latihan Harian', '▶'], ['/simak-ui', 'SIMAK UI', 'Σ'], ['/lpdp', 'LPDP', '◆'], ['/onkologi-radiasi', 'Onkologi Radiasi', '✚'], ['/bank-soal', 'Bank Soal', '▤'], ['/bookmark', 'Bookmark', '★'], ['/riwayat', 'Riwayat', '◷'], ['/statistik', 'Statistik', '↗'], ['/pengaturan', 'Pengaturan', '⚙']
]
</script>
<template>
  <aside class="sidebar" :class="{ 'sidebar-mobile': mobile }">
    <div class="brand"><div class="brand-mark">BS</div><div><strong>Belajar Sobri</strong><span>Dashboard akademik</span></div></div>
    <nav><RouterLink v-for="item in items" :key="item[0]" :to="item[0]" @click="$emit('navigate')"><span>{{ item[2] }}</span>{{ item[1] }}</RouterLink></nav>
    <div class="sidebar-note">Frontend-only • LocalStorage • 150 soal lokal</div>
  </aside>
</template>
