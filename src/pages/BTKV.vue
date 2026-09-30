<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import StatCard from '../components/StatCard.vue'
import { getCategoryStats, getSubcategoryStats } from '../utils/statistics'
const router = useRouter()
const stats = computed(() => getCategoryStats('BTKV'))
const weak = computed(() => getSubcategoryStats('BTKV').sort((a,b) => a.accuracy-b.accuracy)[0]?.subcategory || 'Belum ada data')
</script>
<template><section class="page"><div class="hero"><div><span class="eyebrow">180 soal baru</span><h1>BTKV</h1><p>Latih sinonim, antonim, analogi, padanan kata, konteks, bacaan, silogisme, dan penalaran verbal.</p></div><button class="btn xl" @click="router.push('/daily?category=BTKV')">Mulai Simulasi BTKV</button></div><div class="stat-grid"><StatCard title="Soal dikerjakan" :value="stats.answered"/><StatCard title="Akurasi BTKV" :value="`${stats.accuracy}%`"/><StatCard title="Subkategori terlemah" :value="weak" tone="amber"/></div><div class="card"><h2>Latihan dan simulasi</h2><p>Mode latihan mengambil soal secara merata berdasarkan frekuensi kemunculan. Jawaban, bookmark, riwayat, dan statistik tersimpan otomatis di perangkat ini.</p><button class="btn" @click="router.push('/bank-soal?category=BTKV')">Jelajahi Bank BTKV</button></div></section></template>
