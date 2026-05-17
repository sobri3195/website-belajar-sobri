<script setup>
defineProps({ mobile: Boolean })
defineEmits(['navigate'])
const items = [
  ['/', 'Dashboard', '⌂'],
  ['/daily', 'Latihan Harian', '▶'],
  ['/simak-ui', 'SIMAK UI', 'Σ'],
  ['/lpdp', 'LPDP', '◆'],
  ['/onkologi-radiasi', 'Onkologi Radiasi', '✚'],
  ['/bank-soal', 'Bank Soal', '▤'],
  ['/bookmark', 'Bookmark', '★'],
  ['/riwayat', 'Riwayat', '◷'],
  ['/statistik', 'Statistik', '↗'],
  ['/pengaturan', 'Pengaturan', '⚙'],
]
</script>

<template>
  <aside class="sidebar" :class="{ 'sidebar-mobile': mobile }">
    <RouterLink class="brand" to="/" aria-label="Ke Dashboard Belajar Sobri" @click="$emit('navigate')">
      <img class="brand-logo" src="/favicon.svg" alt="" aria-hidden="true" />
      <div>
        <strong>Belajar Sobri</strong>
        <span>Dashboard akademik</span>
      </div>
    </RouterLink>

    <nav aria-label="Navigasi utama">
      <RouterLink v-for="item in items" :key="item[0]" :to="item[0]" @click="$emit('navigate')">
        <span class="nav-icon">{{ item[2] }}</span>{{ item[1] }}
      </RouterLink>
    </nav>

    <div class="sidebar-note">
      <strong>Mode fokus:</strong>
      <span>Frontend-only • LocalStorage • 150 soal lokal</span>
    </div>
  </aside>
</template>
