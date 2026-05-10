import questions from '../data/questions.json'
import { todayKey } from './dateUtils'
import { KEYS, getStorage, setStorage, getSettings, getBookmarks } from './storage'

const byId = (id) => questions.find((q) => q.id === id)
const sortByFrequency = (items) => [...items].sort((a, b) => (getQuestionFrequency()[a.id] || 0) - (getQuestionFrequency()[b.id] || 0) || Math.random() - 0.5)
export const getQuestionFrequency = () => getStorage(KEYS.frequency, {})
export function updateQuestionFrequency(ids) { const freq = getQuestionFrequency(); ids.forEach((id) => { freq[id] = (freq[id] || 0) + 1 }); return setStorage(KEYS.frequency, freq) }
export function generateRandomQuestions(pool = questions, count = 50) { return sortByFrequency(pool).slice(0, Math.min(count, pool.length)) }
export function getWeightedQuestions(count = 50) {
  const simak = generateRandomQuestions(questions.filter((q) => q.kategori === 'SIMAK UI'), Math.round(count * 0.2))
  const lpdp = generateRandomQuestions(questions.filter((q) => q.kategori === 'LPDP'), Math.round(count * 0.2))
  const onko = generateRandomQuestions(questions.filter((q) => q.kategori === 'Onkologi Radiasi'), count - simak.length - lpdp.length)
  return [...simak, ...lpdp, ...onko].sort(() => Math.random() - 0.5)
}
export function getDailyQuestions(options = {}) {
  const settings = getSettings(); const date = todayKey(); const daily = getStorage(KEYS.daily, {})
  const category = options.category || settings.priorityCategory || 'Semua'; const target = Number(options.count || settings.dailyTarget || 50)
  const cacheKey = `${date}-${category}-${target}`
  if (daily.cacheKey === cacheKey && daily.questionIds?.length) return { ...daily, questions: daily.questionIds.map(byId).filter(Boolean), reused: true }
  const pool = category === 'Semua' ? questions : questions.filter((q) => q.kategori === category)
  const selected = category === 'Semua' ? getWeightedQuestions(target) : generateRandomQuestions(pool, target)
  const payload = { cacheKey, date, category, target, questionIds: selected.map((q) => q.id), answers: {}, doubtful: [], startedAt: new Date().toISOString(), notice: selected.length < target ? `Soal tersedia hanya ${selected.length} dari target ${target}.` : '' }
  setStorage(KEYS.daily, payload); updateQuestionFrequency(payload.questionIds)
  return { ...payload, questions: selected, reused: false }
}
export function saveAnswer(question, selectedAnswer, sessionId = 'daily') {
  const correct = selectedAnswer === question.jawaban_benar
  const item = { id: crypto.randomUUID?.() || `${Date.now()}-${question.id}`, sessionId, questionId: question.id, kategori: question.kategori, subkategori: question.subkategori, selectedAnswer, correct, answeredAt: new Date().toISOString() }
  const history = getStorage(KEYS.history, []); history.push(item); setStorage(KEYS.history, history)
  const daily = getStorage(KEYS.daily, {}); if (daily.questionIds?.includes(question.id)) { daily.answers = { ...(daily.answers || {}), [question.id]: selectedAnswer }; setStorage(KEYS.daily, daily) }
  return item
}
export function calculateScore(questionList, answers) { const total = questionList.length; const answered = questionList.filter((q) => answers[q.id]); const correct = answered.filter((q) => answers[q.id] === q.jawaban_benar).length; return { total, answered: answered.length, correct, wrong: answered.length - correct, accuracy: answered.length ? Math.round((correct / answered.length) * 100) : 0 } }
export function saveSession({ title, category, questions: qs, answers, startedAt, doubtful = [] }) {
  const score = calculateScore(qs, answers); const endedAt = new Date(); const duration = Math.max(1, Math.round((endedAt - new Date(startedAt)) / 1000))
  const session = { id: crypto.randomUUID?.() || `${Date.now()}`, title, category, date: endedAt.toISOString(), questionIds: qs.map((q) => q.id), answers, doubtful, ...score, duration }
  setStorage(KEYS.sessions, [session, ...getStorage(KEYS.sessions, [])]); updateStreak(); return session
}
export function updateStreak() { const sessions = getStorage(KEYS.sessions, []); const days = [...new Set(sessions.map((s) => todayKey(new Date(s.date))))].sort(); const today = todayKey(); let streak = 0; let cursor = today; while (days.includes(cursor)) { streak++; cursor = todayKey(new Date(new Date(cursor).getTime() - 86400000)) } return setStorage(KEYS.streak, { streak, days, lastStudyDate: days.at(-1) || null }) }
export const getWrongQuestions = () => { const h = getStorage(KEYS.history, []); const wrong = new Set(h.filter((a) => !a.correct).map((a) => a.questionId)); return questions.filter((q) => wrong.has(q.id)) }
export const getBookmarkedQuestions = () => questions.filter((q) => getBookmarks().includes(q.id))
function topicStats(category) { const h = getStorage(KEYS.history, []).filter((a) => !category || a.kategori === category); const map = {}; h.forEach((a) => { const key = a.subkategori; map[key] ||= { topic: key, total: 0, correct: 0 }; map[key].total++; if (a.correct) map[key].correct++ }); return Object.values(map).map((x) => ({ ...x, accuracy: Math.round((x.correct / x.total) * 100) })) }
export const getWeakTopics = (category) => topicStats(category).filter((x) => x.total > 0).sort((a, b) => a.accuracy - b.accuracy || b.total - a.total)
export const getStrongTopics = (category) => topicStats(category).filter((x) => x.total > 0).sort((a, b) => b.accuracy - a.accuracy || b.total - a.total)
export default questions
