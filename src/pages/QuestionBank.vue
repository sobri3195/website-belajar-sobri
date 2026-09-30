<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import QuestionCard from '../components/QuestionCard.vue'
import questions from '../data/questions.js'
import { saveAnswer } from '../utils/quizEngine'
import { getStorage, KEYS, getBookmarks, setBookmarks } from '../utils/storage'

const route = useRoute()
const search = ref(route.query.search || '')
const cat = ref(route.query.category || 'Semua')
const sub = ref('Semua')
const diff = ref('Semua')
const status = ref('Semua')
const selectedQuestionId = ref(null)
const selectedAnswer = ref(null)
const bookmarks = ref(getBookmarks())
const cats = ['Semua', ...new Set(questions.map((q) => q.kategori))]
const subs = computed(() => ['Semua', ...new Set(questions.filter((q) => cat.value === 'Semua' || q.kategori === cat.value).map((q) => q.subkategori))])
const filtered = computed(() => questions.filter((q) => {
  const history = getStorage(KEYS.history, []).filter((answer) => answer.questionId === q.id)
  const haystack = `${q.id} ${q.pertanyaan} ${q.pembahasan} ${q.subkategori} ${q.tags.join(' ')}`.toLowerCase()
  return (!search.value || haystack.includes(search.value.toLowerCase()))
    && (cat.value === 'Semua' || q.kategori === cat.value)
    && (sub.value === 'Semua' || q.subkategori === sub.value)
    && (diff.value === 'Semua' || q.tingkat_kesulitan === diff.value)
    && (status.value === 'Semua' || (status.value === 'Belum dijawab' && !history.length) || (status.value === 'Pernah benar' && history.some((a) => a.correct)) || (status.value === 'Pernah salah' && history.some((a) => !a.correct)) || (status.value === 'Bookmark' && bookmarks.value.includes(q.id)))
}))
const selectedQuestion = computed(() => questions.find((q) => q.id === selectedQuestionId.value) || null)

function selectQuestion(id) { selectedQuestionId.value = id; selectedAnswer.value = null }
function answer(key) { selectedAnswer.value = key; saveAnswer(selectedQuestion.value, key, 'bank-soal') }
function bookmark() { const id = selectedQuestionId.value; bookmarks.value = bookmarks.value.includes(id) ? bookmarks.value.filter((x) => x !== id) : [...bookmarks.value, id]; setBookmarks(bookmarks.value) }
watch(cat, () => { if (!subs.value.includes(sub.value)) sub.value = 'Semua' })
watch(filtered, (items) => { if (selectedQuestionId.value && !items.some((q) => q.id === selectedQuestionId.value)) selectedQuestionId.value = null })
</script>

<template>
  <section class="page"><h1>Bank Soal</h1>
    <div class="toolbar card"><input v-model="search" placeholder="Cari ID, soal, tag, atau pembahasan..."/><select v-model="cat"><option v-for="x in cats" :key="x">{{ x }}</option></select><select v-model="sub"><option v-for="x in subs" :key="x">{{ x }}</option></select><select v-model="diff"><option>Semua</option><option>Mudah</option><option>Sedang</option><option>Sulit</option></select><select v-model="status"><option>Semua</option><option>Belum dijawab</option><option>Pernah benar</option><option>Pernah salah</option><option>Bookmark</option></select></div>
    <p class="subtle">{{ filtered.length }} soal ditemukan. Pilih kartu untuk membuka, menjawab, dan membaca pembahasannya.</p>
    <div v-if="filtered.length" class="bank-list"><article v-for="q in filtered" :key="q.id" class="card mini question-list-item" :class="{ active: selectedQuestionId === q.id }" role="button" tabindex="0" @click="selectQuestion(q.id)" @keydown.enter="selectQuestion(q.id)"><b>{{ q.id }}</b><span>{{ q.kategori }} • {{ q.subkategori }} • {{ q.tingkat_kesulitan }}</span><p>{{ q.pertanyaan }}</p></article></div>
    <div v-else class="card empty-state">Tidak ada soal yang sesuai dengan filter. Coba ubah kategori, subkategori, atau kata kunci pencarian.</div>
    <QuestionCard v-if="selectedQuestion" :key="selectedQuestion.id" :question="selectedQuestion" :number="1" :total="1" :selected="selectedAnswer" :show-answer="!!selectedAnswer" :bookmarked="bookmarks.includes(selectedQuestion.id)" @answer="answer" @bookmark="bookmark" @finish="selectedQuestionId=null" @next="selectedQuestionId=null" @prev="selectedQuestionId=null"/>
    <div v-else-if="selectedQuestionId" class="card empty-state">Soal yang dipilih tidak ditemukan.</div>
  </section>
</template>
