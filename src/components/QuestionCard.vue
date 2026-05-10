<script setup>
import { computed } from 'vue'
import CategoryBadge from './CategoryBadge.vue'
import DifficultyBadge from './DifficultyBadge.vue'
const props = defineProps({ question: Object, number: Number, total: Number, selected: String, showAnswer: Boolean, bookmarked: Boolean, doubtful: Boolean })
const emit = defineEmits(['answer','bookmark','doubtful','next','prev','finish'])
const optionClass = (key) => ({ selected: props.selected === key, correct: props.showAnswer && props.question.jawaban_benar === key, wrong: props.showAnswer && props.selected === key && props.selected !== props.question.jawaban_benar })
const isOncology = computed(() => props.question?.kategori === 'Onkologi Radiasi')
</script>
<template>
  <article v-if="question" class="question-card card">
    <div class="question-top"><span>Soal {{ number }} / {{ total }}</span><div><CategoryBadge :category="question.kategori" /> <DifficultyBadge :level="question.tingkat_kesulitan" /> <span v-if="isOncology" class="badge oncology">Prioritas spesialis</span></div></div>
    <p class="subtle">{{ question.subkategori }} • {{ question.id }}</p>
    <h2>{{ question.pertanyaan }}</h2>
    <div class="options"><button v-for="(text, key) in question.opsi" :key="key" class="option" :class="optionClass(key)" @click="$emit('answer', key)"><b>{{ key }}</b><span>{{ text }}</span></button></div>
    <section v-if="showAnswer && selected" class="explanation" :class="selected === question.jawaban_benar ? 'ok' : 'bad'">
      <h3>{{ selected === question.jawaban_benar ? 'Jawaban benar' : 'Jawaban salah' }}</h3>
      <p>Jawaban benar: <strong>{{ question.jawaban_benar }}</strong></p><p>{{ question.pembahasan }}</p>
    </section>
    <div class="quiz-actions"><button class="btn ghost" @click="$emit('prev')">Sebelumnya</button><button class="btn ghost" :class="{ active: doubtful }" @click="$emit('doubtful')">Tandai Ragu-ragu</button><button class="btn ghost" :class="{ active: bookmarked }" @click="$emit('bookmark')">{{ bookmarked ? '★ Bookmark' : '☆ Bookmark' }}</button><button class="btn" @click="$emit('next')">Selanjutnya</button><button class="btn success" @click="$emit('finish')">Selesai</button></div>
  </article>
</template>
