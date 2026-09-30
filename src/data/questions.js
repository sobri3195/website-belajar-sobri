import rawQuestions from './questions.json'

const optionKeys = ['A', 'B', 'C', 'D', 'E']
const allowedCategories = new Set(['SIMAK UI', 'LPDP', 'BTKV'])

export function validateQuestions(items) {
  const errors = []
  const ids = new Set()
  items.forEach((question, index) => {
    const label = question.id || `baris ${index + 1}`
    if (!question.id || ids.has(question.id)) errors.push(`${label}: ID kosong atau duplikat`)
    ids.add(question.id)
    if (!allowedCategories.has(question.category)) errors.push(`${label}: kategori tidak valid`)
    if (JSON.stringify(Object.keys(question.options || {}).sort()) !== JSON.stringify(optionKeys)) errors.push(`${label}: opsi harus A–E`)
    if (!optionKeys.includes(question.answer)) errors.push(`${label}: jawaban tidak valid`)
    if (!question.explanation?.trim()) errors.push(`${label}: pembahasan kosong`)
    if (JSON.stringify(Object.keys(question.option_explanations || {}).sort()) !== JSON.stringify(optionKeys)) errors.push(`${label}: pembahasan opsi harus A–E`)
  })
  return errors
}

const validationErrors = validateQuestions(rawQuestions)
if (validationErrors.length) throw new Error(`Bank soal tidak valid:\n${validationErrors.join('\n')}`)

// Alias berbahasa Indonesia menjaga kompatibilitas data LocalStorage versi sebelumnya.
const questions = Object.freeze(rawQuestions.map((question) => Object.freeze({
  ...question,
  kategori: question.category,
  subkategori: question.subcategory,
  tingkat_kesulitan: question.difficulty,
  pertanyaan: question.question,
  opsi: question.options,
  jawaban_benar: question.answer,
  pembahasan: question.explanation,
})))

export default questions
