<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getBookmarkedQuestions, getWrongQuestions } from '../utils/quizEngine'
const router = useRouter()
const wrong = computed(getWrongQuestions)
const bookmarked = computed(getBookmarkedQuestions)
const items = computed(() => [...new Map([...wrong.value, ...bookmarked.value].map((q) => [q.id, q])).values()])
</script>
<template><section class="page"><h1>Review Center</h1><p class="lead">Tinjau kembali soal yang pernah salah atau sudah Anda bookmark.</p><div class="stat-grid"><div class="card"><h2>{{ wrong.length }}</h2><p>Pernah salah</p></div><div class="card"><h2>{{ bookmarked.length }}</h2><p>Bookmark</p></div><div class="card"><h2>{{ items.length }}</h2><p>Perlu ditinjau</p></div></div><div v-if="items.length" class="bank-list"><article v-for="q in items" :key="q.id" class="card mini question-list-item" role="button" tabindex="0" @click="router.push(`/bank-soal?search=${q.id}`)" @keydown.enter="router.push(`/bank-soal?search=${q.id}`)"><b>{{ q.id }}</b><span>{{ q.kategori }} • {{ q.subkategori }}</span><p>{{ q.pertanyaan }}</p></article></div><div v-else class="card empty-state">Belum ada soal untuk ditinjau. Jawab soal atau tambahkan bookmark terlebih dahulu.</div></section></template>
