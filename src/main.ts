import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import './styles/common.scss'
import './styles/fonts.scss'
import './styles/transitions.scss'
import './styles/scrollbar.scss'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
