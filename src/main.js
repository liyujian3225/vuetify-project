import { createApp } from 'vue'
import { registerPlugins } from '@/plugins'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App);
const pinia = createPinia();
app.use(pinia)

registerPlugins(app)
app.mount('#app')
