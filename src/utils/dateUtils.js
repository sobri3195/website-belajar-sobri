export const todayKey = (date = new Date()) => date.toISOString().slice(0, 10)
export const formatDateTime = (value) => new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
export const formatDuration = (seconds = 0) => {
  const h = Math.floor(seconds / 3600); const m = Math.floor((seconds % 3600) / 60); const s = seconds % 60
  return [h && `${h}j`, m && `${m}m`, `${s}d`].filter(Boolean).join(' ')
}
export const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000)
