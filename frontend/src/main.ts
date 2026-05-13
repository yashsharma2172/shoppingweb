import { createApp } from 'vue'
import { clerkPlugin } from '@clerk/vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''

const app = createApp(App)

if (PUBLISHABLE_KEY) {
  app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
}

app.use(router)
app.mount('#app')
