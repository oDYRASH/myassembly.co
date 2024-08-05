import './assets/main.css'

import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App) 

router.beforeEach(to => {
    if (!to.matched.length) window.location = "/404"
  })


// app.use(createPinia())
app.use(router)

app.mount('#app')
