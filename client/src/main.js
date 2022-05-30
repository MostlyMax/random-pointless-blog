import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueReCaptcha } from 'vue-recaptcha-v3'


const app = createApp(App)
app.use(router)
app.use(VueReCaptcha, { siteKey: '6LcML80fAAAAAKJHux0wpHVT6U_5d6HQXSplkxOy' })
app.mount('#app')
