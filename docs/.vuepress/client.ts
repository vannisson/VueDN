import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import DetailProject from './layouts/DetailProject.vue'

export default defineClientConfig({
  enhance({ app }) {
    const vuetify = createVuetify({
      components,
      directives,
      icons: {
        defaultSet: 'mdi',
        aliases,
        sets: { mdi },
      },
      defaults: {
        global: {
          style: {
            fontFamily: 'Poppins, sans-serif',
          },
        },
      },
    })
    app.use(vuetify)
  },
  layouts: { Layout, DetailProject },
})
