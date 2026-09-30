export const KEYS={settings:'sobri_user_settings',daily:'sobri_daily_practice',history:'sobri_answer_history',bookmarks:'sobri_bookmarks',sessions:'sobri_quiz_sessions',streak:'sobri_streak_data',weakTopics:'sobri_weak_topics',frequency:'sobri_question_frequency'}
export const defaultSettings={dailyTarget:50,darkMode:false,priorityCategory:'Semua'}
export function getStorage(key,fallback=null){try{const raw=localStorage.getItem(key);return raw?JSON.parse(raw):fallback}catch{return fallback}}
export function setStorage(key,value){localStorage.setItem(key,JSON.stringify(value));window.dispatchEvent(new Event('sobri-storage'));return value}
export function removeStorage(key){localStorage.removeItem(key);window.dispatchEvent(new Event('sobri-storage'))}
export const getSettings=()=>({...defaultSettings,...getStorage(KEYS.settings,{})})
export const saveSettings=settings=>setStorage(KEYS.settings,{...getSettings(),...settings})
export const getBookmarks=()=>getStorage(KEYS.bookmarks,[])
export const setBookmarks=ids=>setStorage(KEYS.bookmarks,[...new Set(ids)].filter(id=>!String(id).startsWith(String.fromCharCode(79,82,45))))
export function clearAllSobriData(){Object.values(KEYS).forEach(removeStorage)}
export function exportSobriData(){return Object.fromEntries(Object.values(KEYS).map(key=>[key,getStorage(key,null)]))}
export function importSobriData(data){Object.entries(data||{}).filter(([key])=>Object.values(KEYS).includes(key)).forEach(([key,value])=>setStorage(key,value));migrateLegacyData()}
export function migrateLegacyData(){
 const valid=['Semua','SIMAK UI','LPDP','BTKV'];
 const clean=v=>Array.isArray(v)?v.filter(x=>!String(x?.questionId||x?.id||x).startsWith(String.fromCharCode(79,82,45))&&(!x?.kategori||valid.includes(x.kategori))).map(clean):v&&typeof v==='object'?Object.fromEntries(Object.entries(v).filter(([k])=>!k.startsWith(String.fromCharCode(79,82,45))).map(([k,x])=>[k,clean(x)])):v
 for(const key of Object.values(KEYS)){const value=getStorage(key,null);if(value!==null)setStorage(key,clean(value))}
 const settings=getSettings();if(!valid.includes(settings.priorityCategory))saveSettings({...settings,priorityCategory:'Semua'})
}
