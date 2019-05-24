import VueI18n from 'vue-i18n'
import Vue from 'vue'

Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || "zh",    // language
    messages: {
        'zh': require('./lang/zh.js'),   // zh
        'en': require('./lang/en.js')    // en
    }
   
})

export default  i18n