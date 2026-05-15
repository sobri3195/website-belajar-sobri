import { createRouter, createWebHistory } from 'vue-router'

const Dashboard = () => import('../pages/Dashboard.vue')
const DailyPractice = () => import('../pages/DailyPractice.vue')
const SimakUI = () => import('../pages/SimakUI.vue')
const LPDP = () => import('../pages/LPDP.vue')
const OncologyRadiation = () => import('../pages/OncologyRadiation.vue')
const QuestionBank = () => import('../pages/QuestionBank.vue')
const Bookmarks = () => import('../pages/Bookmarks.vue')
const History = () => import('../pages/History.vue')
const Statistics = () => import('../pages/Statistics.vue')
const Settings = () => import('../pages/Settings.vue')

const LegalPage = (title, body) => ({
  template: `<section class="page"><div class="card"><p class="eyebrow">Belajar Sobri</p><h1>${title}</h1><p>${body}</p><p>Belajar Sobri adalah aplikasi frontend-only; data latihan disimpan di LocalStorage browser pengguna.</p><p><a class="btn" href="/">Kembali ke Dashboard</a></p></div></section>`,
})

const routes = [
  { path: '/', component: Dashboard },
  { path: '/privacy', component: LegalPage('Kebijakan Privasi', 'Belajar Sobri hanya memakai data interaksi latihan yang tersimpan lokal di browser untuk menampilkan progres, riwayat, bookmark, statistik, dan pengaturan belajar.') },
  { path: '/terms', component: LegalPage('Syarat Penggunaan', 'Materi latihan Belajar Sobri ditujukan untuk pendamping belajar SIMAK UI, LPDP, dan Onkologi Radiasi. Konten tidak menggantikan arahan akademik, klinis, atau profesional resmi.') },
  { path: '/contact', component: LegalPage('Kontak', 'Gunakan menu pengaturan untuk ekspor dan impor data belajar. Untuk publikasi mandiri, sesuaikan kanal kontak sesuai domain Belajar Sobri yang digunakan.') },
  { path: '/dashboard', redirect: '/' },
  { path: '/daily', component: DailyPractice },
  { path: '/simak-ui', component: SimakUI },
  { path: '/lpdp', component: LPDP },
  { path: '/onkologi-radiasi', component: OncologyRadiation },
  { path: '/bank-soal', component: QuestionBank },
  { path: '/bookmark', component: Bookmarks },
  { path: '/riwayat', component: History },
  { path: '/statistik', component: Statistics },
  { path: '/pengaturan', component: Settings },
]

export default createRouter({ history: createWebHistory(), routes, scrollBehavior: () => ({ top: 0 }) })
