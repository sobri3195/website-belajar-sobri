import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../pages/Dashboard.vue'
import DailyPractice from '../pages/DailyPractice.vue'
import SimakUI from '../pages/SimakUI.vue'
import LPDP from '../pages/LPDP.vue'
import OncologyRadiation from '../pages/OncologyRadiation.vue'
import QuestionBank from '../pages/QuestionBank.vue'
import Bookmarks from '../pages/Bookmarks.vue'
import History from '../pages/History.vue'
import Statistics from '../pages/Statistics.vue'
import Settings from '../pages/Settings.vue'

const routes = [
  { path: '/', component: Dashboard },
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
