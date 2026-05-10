<script setup>
defineProps({ result: Object })
defineEmits(['restart','review'])
</script>
<template><section v-if="result" class="card result"><span class="eyebrow">Hasil latihan</span><h2>{{ result.title || 'Sesi selesai' }}</h2><div class="result-grid"><strong>{{ result.correct }}/{{ result.answered }}</strong><span>Akurasi {{ result.accuracy }}%</span><span>Salah {{ result.wrong }}</span><span>Durasi {{ result.duration }} detik</span></div><div class="actions"><button class="btn" @click="$emit('restart')">Latihan lagi</button><button class="btn ghost" @click="$emit('review')">Kembali tinjau</button></div></section></template>
