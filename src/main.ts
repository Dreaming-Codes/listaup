import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { ResizeObserver } from "resize-observer";

import './styles/common.scss'
import './styles/fonts.scss'
import './styles/transitions.scss'
import './styles/scrollbar.scss'

if(window.ResizeObserver === undefined) {
    // @ts-ignore
    window.ResizeObserver = ResizeObserver;
}

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
