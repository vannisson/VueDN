import { defaultTheme, defineUserConfig } from 'vuepress'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'
import { getDirname, path } from '@vuepress/utils'
import { glob } from 'glob'
import { viteBundler } from '@vuepress/bundler-vite'

let songFiles = glob
  .sync('docs/songs/**/*.md')
  .map(f => f.replace('docs', '').replace('index.md', ''))

let contentFiles = glob
  .sync('docs/contents/**/*.md')
  .map(f => f.replace('docs', '').replace('index.md', ''))

import { description } from '../../package.json'

const __dirname = getDirname(import.meta.url)

export default defineUserConfig({
  lang: 'pt-BR',
  // Global title in HTML <head>.
  // If page has title (in frontmatter) or h1 then: <page title/h1> | <global title>
  // e.g <title>Vuepress-DecapCMS-Netlify | VueDN</title>
  title: 'Lame',
  // Global description in in HTML <head>.
  // If page has description (in frontmatter) then: <global description is replaced by <page description>
  // <meta name="description" content="...">
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
    notFound: [
      "There's nothing here. If you're looking for DecapCMS, manually enter `/admin` to the root site path to navigate directly to it.",
    ],
    navbar: false,
    sidebar: false,
    contributors: false,
    lastUpdated: false,
  }),

  // Replace footer
  alias: {
    '@theme/HomeFooter.vue': path.resolve(__dirname, './components/CustomFooter.vue'),
  },

  // plugin
  plugins: [
    registerComponentsPlugin({
      // options
      // Absolute path to the components directory
      componentsDir: path.resolve(__dirname, './components'),
    }),
    searchPlugin({
      // options
      // Default shortcut is key '/'
    }),
  ],
  bundler: viteBundler({
    viteOptions: {
      ssr: {
        noExternal: ['vuetify'], // 👈 essencial p/ SSR
      },
      optimizeDeps: {
        include: ['vuetify'], // ajuda no dev/build
      },
    },
  }),
})
