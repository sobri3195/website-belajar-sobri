import questions from '../data/questions.json'
import { todayKey } from './dateUtils'
import { KEYS, getStorage } from './storage'
import { getStrongTopics, getWeakTopics } from './quizEngine'

const history = () => getStorage(KEYS.history, [])
const sessions = () => getStorage(KEYS.sessions, [])
const pct = (a, b) => b ? Math.round((a / b) * 100) : 0
export function getTodayStats() { const t = todayKey(); const h = history().filter((a) => todayKey(new Date(a.answeredAt)) === t); const c = h.filter((a) => a.correct).length; return { answered: new Set(h.map((a) => a.questionId)).size, totalAnswers: h.length, correct: c, wrong: h.length - c, accuracy: pct(c, h.length) } }
export function getOverallStats() { const h = history(); const c = h.filter((a) => a.correct).length; const days = new Set([...h.map((a) => todayKey(new Date(a.answeredAt))), ...sessions().map((s) => todayKey(new Date(s.date)))]).size; return { totalAnswered: h.length, uniqueAnswered: new Set(h.map((a) => a.questionId)).size, correct: c, wrong: h.length - c, accuracy: pct(c, h.length), totalSessions: sessions().length, totalDays: days, totalQuestions: questions.length, streak: getStreak().streak } }
export function getCategoryStats(category) { const h = history().filter((a) => !category || a.kategori === category); const c = h.filter((a) => a.correct).length; return { category: category || 'Semua', answered: h.length, correct: c, wrong: h.length - c, accuracy: pct(c, h.length), totalBank: category ? questions.filter((q) => q.kategori === category).length : questions.length } }
export function getSubcategoryStats(category) { const map = {}; history().filter((a) => !category || a.kategori === category).forEach((a) => { map[a.subkategori] ||= { subcategory: a.subkategori, total: 0, correct: 0 }; map[a.subkategori].total++; if (a.correct) map[a.subkategori].correct++ }); return Object.values(map).map((x) => ({ ...x, accuracy: pct(x.correct, x.total) })) }
export function getStreak() { return getStorage(KEYS.streak, { streak: 0, days: [], lastStudyDate: null }) }
export function getAccuracyTrend() { const map = {}; history().forEach((a) => { const d = todayKey(new Date(a.answeredAt)); map[d] ||= { date: d, total: 0, correct: 0 }; map[d].total++; if (a.correct) map[d].correct++ }); return Object.values(map).sort((a, b) => a.date.localeCompare(b.date)).map((x) => ({ ...x, accuracy: pct(x.correct, x.total) })) }
export const getWeakestOncologyTopics = () => getWeakTopics('Onkologi Radiasi').slice(0, 5)
export const getStrongestOncologyTopics = () => getStrongTopics('Onkologi Radiasi').slice(0, 5)
export function getBestWorstCategory() { const rows = ['SIMAK UI', 'LPDP', 'Onkologi Radiasi'].map(getCategoryStats).filter((x) => x.answered > 0); return { strongest: [...rows].sort((a, b) => b.accuracy - a.accuracy)[0]?.category || 'Belum ada data', weakest: [...rows].sort((a, b) => a.accuracy - b.accuracy)[0]?.category || 'Belum ada data' } }
