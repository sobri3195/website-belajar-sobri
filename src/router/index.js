import { createRouter, createWebHistory } from 'vue-router'
import NiBTMLanding from '../pages/NiBTMLanding.vue'

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
  template: `<main id="main-content" class="legal-page"><section class="card"><p class="eyebrow">NiBTM 7.0 legal</p><h1>${title}</h1><p>${body}</p><p>Official contact: <a href="mailto:alpha@nibtm.org">alpha@nibtm.org</a>. Postal address: Nusantara Biomedical Learning Studio, Jakarta Biomedical Innovation District, Indonesia.</p><p><a class="btn" href="/">Back to NiBTM 7.0</a></p></section></main>`,
})

const routes = [
  { path: '/', component: NiBTMLanding, meta: { public: true } },
  { path: '/privacy', component: LegalPage('Privacy Policy', 'This closed-alpha prototype collects only learner-provided interactions needed to operate product analytics, accessibility review, and mentor booking workflows. Production data processing agreements will be finalized before public launch.'), meta: { public: true } },
  { path: '/terms', component: LegalPage('Terms of Use', 'NiBTM 7.0 is provided as a biomedical learning prototype and does not provide medical advice, diagnosis, treatment, or clinical decision support. Sample datasets are synthetic or de-identified training materials.'), meta: { public: true } },
  { path: '/contact', component: LegalPage('Contact', 'For closed alpha access, partnership review, security questions, or accessibility feedback, contact the NiBTM 7.0 launch team using the official email below.'), meta: { public: true } },
  { path: '/dashboard', component: Dashboard },
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
