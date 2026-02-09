import { defineClientConfig } from '@vuepress/client'
import Layout from './layouts/Layout.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// ─── Importações seletivas (tree-shaking manual) ───
// Só inclui os componentes realmente usados no site (~15 vs ~80+)
import {
  VApp,
  VAppBar,
  VAvatar,
  VBtn,
  VCard,
  VCarousel,
  VCarouselItem,
  VCol,
  VContainer,
  VDialog,
  VFooter,
  VIcon,
  VImg,
  VMain,
  VRow,
} from 'vuetify/components'

import DetailProject from './layouts/DetailProject.vue'
import DetailContent from './layouts/DetailContent.vue'
import DetailPublication from './layouts/DetailPublication.vue'
import NotFound from './layouts/NotFound.vue'

export default defineClientConfig({
  enhance({ app }) {
    const vuetify = createVuetify({
      components: {
        VApp,
        VAppBar,
        VAvatar,
        VBtn,
        VCard,
        VCarousel,
        VCarouselItem,
        VCol,
        VContainer,
        VDialog,
        VFooter,
        VIcon,
        VImg,
        VMain,
        VRow,
      },
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
  layouts: { Layout, DetailProject, DetailContent, DetailPublication, NotFound },
})
