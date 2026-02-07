import { defaultTheme, defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { getDirname, path } from '@vuepress/utils'
import { viteBundler } from '@vuepress/bundler-vite'

import { description } from '../../package.json'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'pt-BR',
  title: 'LAME',
  description: description,

  head: [
    [
      'link',
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
      },
    ],
    [
      'script',
      {
        src: 'https://identity.netlify.com/v1/netlify-identity-widget.js',
      },
    ],
  ],

  theme: defaultTheme({
    logo: '/imgs/header/icon_lame.svg',
    notFound: ['Página não encontrada. Acesse /admin para o painel do CMS.'],
    navbar: false,
    sidebar: false,
    contributors: false,
    lastUpdated: false,
  }),

  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/CustomFooter.vue'),
  },

  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({}),
  ],

  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['vuetify'],
      },
      optimizeDeps: {
        include: ['vuetify'],
      },
    },
  }),
})
