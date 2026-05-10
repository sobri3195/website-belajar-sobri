<script setup>
import { computed } from 'vue'; import { KEYS, getStorage } from '../utils/storage'; import { formatDateTime, formatDuration } from '../utils/dateUtils'
const sessions=computed(()=>getStorage(KEYS.sessions,[]))
</script>
<template><section class="page"><h1>Riwayat</h1><div class="table-card card"><table><thead><tr><th>Tanggal</th><th>Kategori</th><th>Soal</th><th>Benar</th><th>Salah</th><th>Akurasi</th><th>Durasi</th></tr></thead><tbody><tr v-for="s in sessions" :key="s.id"><td>{{ formatDateTime(s.date) }}</td><td>{{ s.category }}</td><td>{{ s.total }}</td><td>{{ s.correct }}</td><td>{{ s.wrong }}</td><td>{{ s.accuracy }}%</td><td>{{ formatDuration(s.duration) }}</td></tr></tbody></table></div><div v-if="!sessions.length" class="card empty">Selesaikan latihan untuk membuat riwayat sesi.</div></section></template>
