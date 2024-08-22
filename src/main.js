import { createApp } from 'vue'
import App from './App.vue'

import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader

import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'animate.css';

import { createPinia } from 'pinia'

const pinia = createPinia();




//Router
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
        defaults: {
            VBtn: {
                class: 'rounded-xl',
                style: [{ textTransform: 'none' }],
            },
        },
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#FFFFFF', // #E53935
                    secondary: '#E5E5E5', // #FFCDD2
                    accent:'#2c4274',
                    background:'#F4F4F4'
                }
            },
        },
    }
})

createApp(App).use(vuetify).use(router).use(pinia).mount('#app')
