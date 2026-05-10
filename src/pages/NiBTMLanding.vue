<script setup>
import { computed, onMounted, ref } from 'vue'

const siteUrl = 'https://nibtm.org'
const languages = {
  en: {
    nav: ['Learning paths', 'Topics', 'Datasets', 'Mentors'],
    headline: 'Advance Biomedical Skills with AI-Ready Learning',
    subheadline: 'NiBTM 7.0 connects bioinformatics, translational AI, curated research datasets, and expert mentoring in one structured learning platform for biomedical teams.',
    start: 'Start Learning',
    explore: 'Explore Topics',
    sample: 'Prototype data for closed alpha validation',
  },
  id: {
    nav: ['Jalur belajar', 'Topik', 'Dataset', 'Mentor'],
    headline: 'Tingkatkan Skill Biomedis dengan AI-Ready Learning',
    subheadline: 'NiBTM 7.0 menghubungkan bioinformatika, translational AI, dataset riset terkurasi, dan mentoring ahli dalam satu platform pembelajaran biomedis.',
    start: 'Mulai Belajar',
    explore: 'Jelajahi Topik',
    sample: 'Data prototipe untuk validasi closed alpha',
  },
  zh: {
    nav: ['学习路径', '主题', '数据集', '导师'],
    headline: '用 AI-Ready Learning 提升生物医学技能',
    subheadline: 'NiBTM 7.0 将生物信息学、转化 AI、研究数据集和专家指导整合到结构化学习平台。',
    start: '开始学习',
    explore: '探索主题',
    sample: '闭测验证用原型数据',
  },
  ar: {
    nav: ['مسارات التعلم', 'الموضوعات', 'مجموعات البيانات', 'الموجهون'],
    headline: 'طوّر مهاراتك الطبية الحيوية بتعلم جاهز للذكاء الاصطناعي',
    subheadline: 'تجمع NiBTM 7.0 المعلوماتية الحيوية والذكاء الاصطناعي الانتقالي ومجموعات بيانات البحث والإرشاد الخبير في منصة واحدة.',
    start: 'ابدأ التعلم',
    explore: 'استكشف الموضوعات',
    sample: 'بيانات نموذجية للتحقق في الإصدار المغلق',
  },
}

const stats = [
  ['18K+', 'learners mapped', 'Sample data'],
  ['140+', 'modules drafted', 'Sample data'],
  ['32', 'research datasets', 'Prototype data'],
  ['900+', 'mentor hours', 'Sample data'],
]

const partners = ['Bioinformatics Lab Network', 'Clinical AI Guild', 'Translational Research Studio', 'Biomedical IoT Forum']

const topics = [
  { id: 'genomics', domain: 'Genomics', title: 'Variant-to-phenotype Bioinformatics', description: 'Build reproducible pipelines for sequence QC, annotation, and translational interpretation.', duration: '6 weeks', level: 'Intermediate', prerequisite: 'Molecular biology fundamentals', modules: ['NGS QC and alignment', 'Variant annotation', 'Pathway enrichment', 'Clinical reporting'], objectives: ['Interpret genomic variants responsibly', 'Document reproducible analysis decisions', 'Connect molecular signals to phenotype hypotheses'], icon: '🧬' },
  { id: 'clinical-nlp', domain: 'Clinical NLP', title: 'Clinical NLP for Biomedical Evidence', description: 'Transform notes, abstracts, and registry fields into validated evidence features.', duration: '5 weeks', level: 'Intermediate', prerequisite: 'Basic Python and statistics', modules: ['De-identification', 'Entity extraction', 'Model validation', 'Bias review'], objectives: ['Extract clinical entities from text', 'Evaluate NLP models safely', 'Create audit-ready evidence summaries'], icon: '📝' },
  { id: 'medical-imaging', domain: 'Medical Imaging', title: 'Imaging AI Quality Workflow', description: 'Assess imaging datasets, model performance, and deployment risks across modalities.', duration: '7 weeks', level: 'Advanced', prerequisite: 'Image processing basics', modules: ['DICOM readiness', 'Segmentation metrics', 'Reader studies', 'Monitoring drift'], objectives: ['Inspect imaging data health', 'Compare segmentation and classification metrics', 'Plan clinical validation workflows'], icon: '🩻' },
  { id: 'herbal', domain: 'Herbal Therapeutics', title: 'Herbal Therapeutics Evidence Map', description: 'Connect ethnomedicine, compounds, targets, and translational safety signals.', duration: '4 weeks', level: 'Foundational', prerequisite: 'Pharmacognosy orientation', modules: ['Evidence grading', 'Compound-target maps', 'Safety signals', 'Translation brief'], objectives: ['Evaluate herbal evidence quality', 'Map compounds to mechanistic hypotheses', 'Prepare safety-aware briefs'], icon: '🌿' },
  { id: 'pharmacology', domain: 'Pharmacology', title: 'AI-Assisted Pharmacology Translation', description: 'Use data-driven reasoning to prioritize mechanisms, interactions, and study designs.', duration: '6 weeks', level: 'Intermediate', prerequisite: 'Core pharmacology', modules: ['PK/PD concepts', 'Interaction screening', 'Target prioritization', 'Study design'], objectives: ['Prioritize pharmacology questions', 'Screen interaction evidence', 'Draft translational study plans'], icon: '⚗️' },
  { id: 'iot', domain: 'IoT Biomedical', title: 'Biomedical IoT Signal Readiness', description: 'Prepare wearable and device data for responsible monitoring and AI features.', duration: '5 weeks', level: 'Foundational', prerequisite: 'Signal processing basics', modules: ['Sensor QA', 'Time-series cleaning', 'Feature extraction', 'Clinical workflow fit'], objectives: ['Evaluate sensor data quality', 'Create robust time-series features', 'Assess monitoring workflow readiness'], icon: '📡' },
]

const datasets = [
  { id: 'nibtm-genome-qc', name: 'Genome QC Alpha Set', description: 'De-identified synthetic variant quality records for pipeline training.', format: 'CSV + JSON schema', health: 'Healthy', records: '12,400 sample records', useCase: 'Variant annotation practice', schema: ['sample_id', 'qc_score', 'variant_class', 'annotation_status'] },
  { id: 'clinical-note-nlp', name: 'Clinical Notes NLP Sandbox', description: 'Synthetic clinical text snippets with entity labels for NLP education.', format: 'JSONL', health: 'Review required', records: '8,200 synthetic notes', useCase: 'Entity extraction validation', schema: ['note_id', 'text', 'entities', 'label_confidence'] },
  { id: 'imaging-metadata', name: 'Imaging Metadata Readiness', description: 'DICOM-like metadata table for data health and drift exercises.', format: 'Parquet preview', health: 'Healthy', records: '3,160 imaging studies', useCase: 'Imaging data readiness audit', schema: ['study_id', 'modality', 'slice_count', 'scanner_vendor'] },
]

const mentors = [
  { id: 'maya', name: 'Dr. Maya Hartono, PhD', affiliation: 'Translational Bioinformatics Fellow, Nusantara Biomedical Institute', expertise: ['Genomics', 'Clinical translation', 'Reproducible pipelines'], bio: 'Guides learners from raw biomedical data to defensible translational hypotheses and reporting workflows.', availability: 'Tue & Thu, 09:00–12:00 UTC', rating: '4.9/5 closed-alpha mentor rating', avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"%3E%3Crect width="160" height="160" fill="%23dbeafe"/%3E%3Ccircle cx="80" cy="62" r="34" fill="%238b5e3c"/%3E%3Cpath d="M32 150c6-36 31-55 48-55s42 19 48 55" fill="%231d4ed8"/%3E%3Ccircle cx="68" cy="62" r="4"/%3E%3Ccircle cx="92" cy="62" r="4"/%3E%3Cpath d="M65 82c11 8 22 8 32 0" stroke="%23111827" stroke-width="5" fill="none" stroke-linecap="round"/%3E%3C/svg%3E' },
  { id: 'rehan', name: 'Dr. Rehan Wijaya, MSc', affiliation: 'Clinical AI Lead, Bandung Health Data Collaborative', expertise: ['Clinical NLP', 'Model evaluation', 'Bias review'], bio: 'Helps teams design auditable NLP workflows for clinical notes, abstracts, registries, and safety review.', availability: 'Mon & Wed, 13:00–16:00 UTC', rating: '4.8/5 closed-alpha mentor rating', avatar: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160"%3E%3Crect width="160" height="160" fill="%23ccfbf1"/%3E%3Ccircle cx="80" cy="60" r="35" fill="%23a16207"/%3E%3Cpath d="M28 150c8-34 33-54 52-54s44 20 52 54" fill="%230f766e"/%3E%3Crect x="52" y="24" width="56" height="24" rx="12" fill="%23111827"/%3E%3Ccircle cx="68" cy="62" r="4"/%3E%3Ccircle cx="93" cy="62" r="4"/%3E%3Cpath d="M69 82c7 6 16 6 24 0" stroke="%23111827" stroke-width="5" fill="none" stroke-linecap="round"/%3E%3C/svg%3E' },
]

const testimonials = [
  'The prototype makes biomedical AI learning easier to audit because every dataset, module, and mentor action has context.',
  'NiBTM helped our alpha reviewers see how bioinformatics skills connect with clinical translation workflows.',
]

const lang = ref(localStorage.getItem('nibtm-language') || 'en')
const dark = ref(localStorage.getItem('nibtm-theme') === 'dark')
const activeTab = ref('topics')
const query = ref('')
const selectedDomain = ref('all')
const detail = ref(null)
const liveMessage = ref('NiBTM 7.0 closed alpha prototype loaded.')
const t = computed(() => languages[lang.value])
const isRtl = computed(() => lang.value === 'ar')
const domains = computed(() => ['all', ...topics.map((topic) => topic.domain)])
const filteredTopics = computed(() => topics.filter((topic) => {
  const matchesDomain = selectedDomain.value === 'all' || topic.domain === selectedDomain.value
  const text = `${topic.title} ${topic.domain} ${topic.description}`.toLowerCase()
  return matchesDomain && text.includes(query.value.toLowerCase())
}))

function track(event, detail = {}) {
  window.dispatchEvent(new CustomEvent('nibtm:analytics', { detail: { event, ...detail } }))
  console.info('[NiBTM analytics]', event, detail)
}
function setLanguage(value) {
  lang.value = value
  localStorage.setItem('nibtm-language', value)
  track('language_switch', { language: value })
}
function toggleDark() {
  dark.value = !dark.value
  localStorage.setItem('nibtm-theme', dark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', dark.value)
  track('dark_mode_toggle', { enabled: dark.value })
}
function openDetail(type, item) {
  detail.value = { type, item }
  const eventMap = { topic: 'Start Learning detail', dataset: 'Open Dataset detail', mentor: 'Book Session detail' }
  liveMessage.value = `${type} detail opened: ${item.title || item.name}`
  track(eventMap[type] || 'open_detail', { id: item.id })
}
function cta(event, message) {
  liveMessage.value = message
  track(event)
}
onMounted(() => document.documentElement.classList.toggle('dark', dark.value))
</script>

<template>
  <div class="nibtm-site" :dir="isRtl ? 'rtl' : 'ltr'">
    <header class="site-header">
      <a class="brand-link" href="#hero" aria-label="NiBTM 7.0 home"><span class="brand-mark">N7</span><span><strong>NiBTM 7.0</strong><small>AI-ready biomedical learning</small></span></a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="#paths">{{ t.nav[0] }}</a><a href="#topics">{{ t.nav[1] }}</a><a href="#datasets">{{ t.nav[2] }}</a><a href="#mentors">{{ t.nav[3] }}</a>
      </nav>
      <div class="header-actions">
        <label class="sr-only" for="language">Language</label>
        <select id="language" :value="lang" @change="setLanguage($event.target.value)"><option value="en">English</option><option value="id">Indonesia</option><option value="zh">中文</option><option value="ar">العربية</option></select>
        <button class="btn ghost" type="button" @click="toggleDark">{{ dark ? 'Light' : 'Dark' }} mode</button>
      </div>
    </header>

    <main id="main-content" class="landing-main">
      <section id="hero" class="landing-hero" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow">Closed alpha ready · Public launch foundation</p>
          <h1 id="hero-title">{{ t.headline }}</h1>
          <p class="lead">{{ t.subheadline }}</p>
          <div class="hero-actions">
            <a class="btn xl" href="#paths" @click="cta('Start Learning', 'Start Learning selected. Choose a recommended path below.')">{{ t.start }}<small>Choose a guided path in under 2 minutes.</small></a>
            <a class="btn xl explore" href="#topics" @click="cta('Explore Topics', 'Explore Topics selected. Filters are available below.')">{{ t.explore }}<small>Compare modules, prerequisites, and outcomes.</small></a>
          </div>
          <p class="prototype-note">{{ t.sample }}. All launch metrics are labeled until validated with production analytics.</p>
        </div>
        <div class="hero-panel" aria-label="Platform readiness snapshot">
          <div class="pulse-card"><strong>AI readiness</strong><span>Data health · mentor review · clinical translation</span></div>
          <div class="signal-grid" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div>
          <p><strong>0 active paths?</strong> Start your first path to track your biomedical learning progress.</p>
        </div>
      </section>

      <section class="stats-section" aria-labelledby="stats-title">
        <div><p class="eyebrow">Evidence & transparency</p><h2 id="stats-title">Launch metrics are explicitly labeled</h2></div>
        <div class="stats-grid">
          <article v-for="stat in stats" :key="stat[1]" class="metric-card"><strong>{{ stat[0] }}</strong><span>{{ stat[1] }}</span><small>{{ stat[2] }}</small></article>
        </div>
      </section>

      <section id="paths" class="card section-card" aria-labelledby="paths-title">
        <p class="eyebrow">Learning paths</p><h2 id="paths-title">Structured paths that connect skills to translational outcomes</h2>
        <div class="path-grid">
          <article class="path-card"><h3>Bioinformatics to Clinical Translation</h3><p>Genomics, pathway evidence, reporting, and mentor review.</p><button class="btn" type="button" @click="cta('Start Learning', 'Bioinformatics path added to your alpha workspace.')">Start Learning</button></article>
          <article class="path-card"><h3>Clinical AI Validation</h3><p>NLP, imaging readiness, validation metrics, and safety review.</p><button class="btn" type="button" @click="cta('Start Learning', 'Clinical AI path added to your alpha workspace.')">Start Learning</button></article>
        </div>
      </section>

      <section id="topics" class="section-card" aria-labelledby="topics-title">
        <div class="section-heading"><div><p class="eyebrow">Topics</p><h2 id="topics-title">Explore topic depth before committing</h2></div><p>Each topic includes objectives, duration, prerequisites, modules, and a clear Start Topic action.</p></div>
        <div class="toolbar" role="search">
          <label><span class="sr-only">Search topics</span><input v-model="query" type="search" placeholder="Search genomics, NLP, imaging..." aria-describedby="topic-status"></label>
          <div class="filter-list" aria-label="Topic domain filters">
            <button v-for="domain in domains" :key="domain" type="button" class="pill filter-pill" :class="{ active: selectedDomain === domain }" :aria-pressed="selectedDomain === domain" @click="selectedDomain = domain; liveMessage = `Filter applied: ${domain}`">{{ domain === 'all' ? 'All domains' : domain }}</button>
          </div>
        </div>
        <p id="topic-status" class="sr-only" aria-live="polite">{{ filteredTopics.length }} topics available.</p>
        <div class="topic-grid">
          <article v-for="topic in filteredTopics" :key="topic.id" class="topic-card">
            <div class="topic-thumb" :class="topic.id" aria-hidden="true"><span>{{ topic.icon }}</span></div>
            <div><span class="badge contrast">{{ topic.domain }}</span><h3>{{ topic.title }}</h3><p>{{ topic.description }}</p></div>
            <button class="btn ghost" type="button" @click="openDetail('topic', topic)">View topic detail</button>
          </article>
        </div>
      </section>

      <section id="datasets" class="section-card" aria-labelledby="datasets-title">
        <div class="tabs" role="tablist" aria-label="Platform explorer tabs">
          <button type="button" role="tab" :aria-selected="activeTab === 'topics'" :tabindex="activeTab === 'topics' ? 0 : -1" @click="activeTab = 'topics'">Topics</button>
          <button type="button" role="tab" :aria-selected="activeTab === 'datasets'" :tabindex="activeTab === 'datasets' ? 0 : -1" @click="activeTab = 'datasets'">Datasets</button>
          <button type="button" role="tab" :aria-selected="activeTab === 'mentors'" :tabindex="activeTab === 'mentors' ? 0 : -1" @click="activeTab = 'mentors'">Mentors</button>
        </div>
        <div v-show="activeTab === 'topics'" role="tabpanel"><h2 id="datasets-title">Topic, dataset, and mentor explorer</h2><p>Select another tab to inspect launch-ready product depth.</p></div>
        <div v-show="activeTab === 'datasets'" role="tabpanel" class="dataset-grid">
          <article v-for="dataset in datasets" :key="dataset.id" class="dataset-card"><h3>{{ dataset.name }}</h3><p>{{ dataset.description }}</p><span class="badge healthy">{{ dataset.health }}</span><dl><dt>Format</dt><dd>{{ dataset.format }}</dd><dt>Records</dt><dd>{{ dataset.records }}</dd></dl><button class="btn" type="button" @click="openDetail('dataset', dataset); track('Open Dataset', { id: dataset.id })">Open Dataset</button></article>
        </div>
        <div v-show="activeTab === 'mentors'" role="tabpanel" class="mentor-grid">
          <article v-for="mentor in mentors" :key="mentor.id" class="mentor-card"><img :src="mentor.avatar" :alt="`Professional portrait avatar of ${mentor.name}`" width="96" height="96"><h3>{{ mentor.name }}</h3><p>{{ mentor.affiliation }}</p><span class="badge available">Available for alpha booking</span><button class="btn" type="button" @click="openDetail('mentor', mentor); track('Book Session', { id: mentor.id })">Book Session</button></article>
        </div>
      </section>

      <section id="mentors" class="section-card mentor-section" aria-labelledby="mentor-title">
        <p class="eyebrow">Mentors & credibility</p><h2 id="mentor-title">Expert profiles include affiliation, expertise, rating, and booking context</h2>
        <div class="mentor-grid"><article v-for="mentor in mentors" :key="mentor.id" class="mentor-card detailed"><img :src="mentor.avatar" :alt="`Professional portrait avatar of ${mentor.name}`" width="112" height="112"><div><h3>{{ mentor.name }}</h3><p>{{ mentor.affiliation }}</p><p>{{ mentor.bio }}</p><div class="tag-row"><span v-for="tag in mentor.expertise" :key="tag" class="pill high-contrast">{{ tag }}</span></div><p><strong>{{ mentor.rating }}</strong> · {{ mentor.availability }}</p><button class="btn" type="button" @click="openDetail('mentor', mentor); track('Book Session', { id: mentor.id })">Book Session</button></div></article></div>
      </section>

      <section class="section-card trust" aria-labelledby="trust-title"><p class="eyebrow">Trust signals</p><h2 id="trust-title">Partner and reviewer placeholders are labeled for prototype review</h2><div class="partner-row"><span v-for="partner in partners" :key="partner">{{ partner }}</span></div><blockquote v-for="quote in testimonials" :key="quote">“{{ quote }}”</blockquote></section>

      <section class="cta-panel" aria-labelledby="cta-title"><h2 id="cta-title">Ready for a safer closed alpha?</h2><p>Review topics, inspect sample datasets, and book a mentor session before public launch.</p><a class="btn xl" href="mailto:alpha@nibtm.org" @click="cta('Start Learning', 'Email alpha contact opened.')">Request closed alpha access<small>Official contact: alpha@nibtm.org</small></a></section>
      <p class="sr-only" aria-live="polite">{{ liveMessage }}</p>
    </main>

    <footer class="site-footer"><div><strong>NiBTM 7.0</strong><p>Nusantara Biomedical Learning Studio, Jakarta Biomedical Innovation District, Indonesia · alpha@nibtm.org · +62 21 5089 7000</p></div><nav aria-label="Legal links"><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Use</a><a href="/contact">Contact</a><a :href="`${siteUrl}/sitemap.xml`">Sitemap</a></nav></footer>

    <div v-if="detail" class="modal-backdrop" role="presentation" @click.self="detail = null">
      <article class="modal detail-modal" role="dialog" aria-modal="true" :aria-labelledby="`${detail.type}-detail-title`">
        <button class="modal-close" type="button" aria-label="Close detail" @click="detail = null">×</button>
        <template v-if="detail.type === 'topic'"><h2 :id="`${detail.type}-detail-title`">{{ detail.item.title }}</h2><p>{{ detail.item.description }}</p><dl><dt>Duration</dt><dd>{{ detail.item.duration }}</dd><dt>Level</dt><dd>{{ detail.item.level }}</dd><dt>Prerequisite</dt><dd>{{ detail.item.prerequisite }}</dd></dl><h3>Learning objectives</h3><ul><li v-for="objective in detail.item.objectives" :key="objective">{{ objective }}</li></ul><h3>Module list</h3><ol><li v-for="module in detail.item.modules" :key="module">{{ module }}</li></ol><button class="btn" type="button" @click="cta('Start Learning', `${detail.item.title} started.`)">Start Topic</button></template>
        <template v-else-if="detail.type === 'dataset'"><h2 :id="`${detail.type}-detail-title`">{{ detail.item.name }}</h2><p>{{ detail.item.description }}</p><dl><dt>Format</dt><dd>{{ detail.item.format }}</dd><dt>Data health</dt><dd>{{ detail.item.health }}</dd><dt>Records</dt><dd>{{ detail.item.records }}</dd><dt>Use case</dt><dd>{{ detail.item.useCase }}</dd></dl><h3>Preview schema</h3><code>{{ detail.item.schema.join(', ') }}</code><button class="btn" type="button" @click="track('Open Dataset', { id: detail.item.id })">Open Dataset</button></template>
        <template v-else><img :src="detail.item.avatar" :alt="`Professional portrait avatar of ${detail.item.name}`" width="112" height="112"><h2 :id="`${detail.type}-detail-title`">{{ detail.item.name }}</h2><p>{{ detail.item.affiliation }}</p><p>{{ detail.item.bio }}</p><div class="tag-row"><span v-for="tag in detail.item.expertise" :key="tag" class="pill high-contrast">{{ tag }}</span></div><p>{{ detail.item.availability }}</p><button class="btn" type="button" @click="track('Book Session', { id: detail.item.id })">Book Session</button></template>
      </article>
    </div>
  </div>
</template>
