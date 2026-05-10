export const KEYS = {
  settings: 'sobri_user_settings', daily: 'sobri_daily_practice', history: 'sobri_answer_history',
  bookmarks: 'sobri_bookmarks', sessions: 'sobri_quiz_sessions', streak: 'sobri_streak_data',
  weakTopics: 'sobri_weak_topics', frequency: 'sobri_question_frequency'
}
export const defaultSettings = { dailyTarget: 50, darkMode: false, priorityCategory: 'Semua' }
export function getStorage(key, fallback = null) { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback } catch { return fallback } }
export function setStorage(key, value) { localStorage.setItem(key, JSON.stringify(value)); window.dispatchEvent(new Event('sobri-storage')); return value }
export function removeStorage(key) { localStorage.removeItem(key); window.dispatchEvent(new Event('sobri-storage')) }
export const getSettings = () => ({ ...defaultSettings, ...getStorage(KEYS.settings, {}) })
export const saveSettings = (settings) => setStorage(KEYS.settings, { ...getSettings(), ...settings })
export const getBookmarks = () => getStorage(KEYS.bookmarks, [])
export const setBookmarks = (ids) => setStorage(KEYS.bookmarks, [...new Set(ids)])
export function clearAllSobriData() { Object.values(KEYS).forEach(removeStorage) }
export function exportSobriData() { return Object.fromEntries(Object.values(KEYS).map((key) => [key, getStorage(key, null)])) }
export function importSobriData(data) { Object.entries(data || {}).filter(([key]) => Object.values(KEYS).includes(key)).forEach(([key, value]) => setStorage(key, value)) }
