<!-- docs/.vuepress/layouts/DetailContent.vue -->
<script setup lang="ts">
  // @ts-nocheck

  import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
  import NavBar from '../components/NavBar.vue'
  import CustomFooter from '../components/CustomFooter.vue'
  import { Content, usePageData, usePagesData } from '@vuepress/client'
  import { computed, ref, onMounted } from 'vue'

  const page = usePageData()
  const pagesData = usePagesData()

  const frontmatter = computed<any>(() => page.value.frontmatter ?? {})

  const title = computed(() => frontmatter.value.title || page.value.title || '')

  const formattedDate = computed(() => {
    const fmDate = frontmatter.value.date
    const gitCreated = (page.value as any)?.git?.createdTime as number | string | undefined

    const raw = fmDate ?? gitCreated
    if (!raw) return ''

    const d = new Date(raw as any)
    if (Number.isNaN(d.getTime())) return String(raw)

    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  })

  const cover = computed<string | null>(() => frontmatter.value.cover ?? null)

  // ========== TIPO / BADGE (Material, Vídeo, Notícia) ==========
  const rawBadge = computed(() => frontmatter.value.badge || frontmatter.value.tipo)

  function normalizeBadge(value?: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

  function getBadgeLabel(badge?: string) {
    const norm = normalizeBadge(badge)
    if (norm === 'material') return 'Material'
    if (norm === 'video') return 'Vídeo'
    if (norm === 'noticia') return 'Notícia'
    return 'Conteúdo'
  }

  function getBadgeIcon(badge?: string) {
    const norm = normalizeBadge(badge)
    if (norm === 'material') return 'mdi-book-open-variant'
    if (norm === 'video') return 'mdi-play-circle'
    if (norm === 'noticia') return 'mdi-newspaper-variant-outline'
    return 'mdi-file-document-outline'
  }

  const badgeLabel = computed(() => getBadgeLabel(rawBadge.value))
  const badgeIcon = computed(() => getBadgeIcon(rawBadge.value))

  /**
   * OUTROS CONTEÚDOS
   * Carrega outros arquivos de /conteudos/ (ou type: 'conteudo'),
   * excluindo a página atual, ordenados por data.
   */
  const relatedContents = ref<
    { path: string; title: string; image: string; badge?: string; sortKey: number }[]
  >([])

  onMounted(async () => {
    const loaded: any[] = []
    const currentPath = page.value.path

    const entries = Object.entries(pagesData.value ?? {})

    await Promise.all(
      entries.map(async ([path, getPageData]) => {
        if (typeof getPageData !== 'function') return

        let p: any
        try {
          p = await getPageData()
        } catch {
          return
        }

        if (!p || typeof p !== 'object') return
        const fm: any = p.frontmatter ?? {}

        // só páginas de conteúdo, excluindo a atual
        const isContentPath = path.startsWith('/conteudos/')
        const isContentType = fm.type === 'conteudo'
        if (!(isContentPath || isContentType)) return
        if (p.path === currentPath) return

        const rawDate = fm.date ?? p.git?.createdTime
        let sortKey = 0
        if (rawDate) {
          const d = new Date(rawDate as any)
          sortKey = Number.isNaN(d.getTime()) ? 0 : d.getTime()
        }

        loaded.push({
          path: p.path,
          title: fm.title || p.title || 'Conteúdo',
          image: fm.cover || '/imgs/contents/default.png',
          badge: fm.badge || fm.tipo || undefined,
          sortKey,
        })
      })
    )

    loaded.sort((a, b) => b.sortKey - a.sortKey)
    relatedContents.value = loaded.slice(0, 3)
  })
</script>

<template>
  <v-app>
    <NavBar />

    <!-- sem padding-top: o banner azul ocupa o fundo atrás da navbar -->
    <v-main class="detail-main-root">
      <ParentLayout>
        <!-- esconde a navbar padrão do tema -->
        <template #navbar></template>

        <!-- CONTEÚDO DA PÁGINA DE CONTEÚDO -->
        <template #page>
          <div class="detail-wrapper">
            <!-- FAIXA AZUL "CONTEÚDOS" -->
            <section class="detail-banner">
              <v-container class="site-container">
                <h1 class="banner-title">Conteúdos</h1>
              </v-container>
            </section>

            <!-- TÍTULO, TIPO, DATA, IMAGEM E TEXTO -->
            <section class="detail-main">
              <v-container class="site-container">
                <article class="detail-article">
                  <header class="detail-header">
                    <div class="header-left">
                      <div v-if="badgeLabel" class="content-badge-pill">
                        <v-icon size="16" class="pill-icon">
                          {{ badgeIcon }}
                        </v-icon>
                        <span>{{ badgeLabel }}</span>
                      </div>

                      <h2 class="detail-title">{{ title }}</h2>
                    </div>

                    <div v-if="formattedDate" class="detail-date-wrapper">
                      <v-icon size="16" class="detail-date-icon">
                        mdi-calendar-blank-outline
                      </v-icon>
                      <span class="detail-date-text">{{ formattedDate }}</span>
                    </div>
                  </header>

                  <div class="detail-text-block">
                    <div v-if="cover" class="detail-cover">
                      <v-img :src="cover" :alt="title" cover class="detail-cover-img" />
                    </div>

                    <article class="detail-content markdown-body">
                      <Content />
                    </article>
                  </div>
                </article>

                <!-- OUTROS CONTEÚDOS -->
                <section class="detail-related" v-if="relatedContents.length">
                  <h3 class="related-title">
                    Conteúdo relacionado
                    <span class="related-underline" />
                  </h3>

                  <div class="related-grid">
                    <RouterLink
                      v-for="item in relatedContents"
                      :key="item.path"
                      :to="item.path"
                      class="related-card"
                    >
                      <div class="related-media">
                        <v-img :src="item.image" :alt="item.title" cover class="related-img" />
                      </div>

                      <div class="related-body">
                        <p class="related-type">{{ getBadgeLabel(item.badge) }}</p>
                        <p class="related-text">{{ item.title }}</p>
                      </div>
                    </RouterLink>
                  </div>
                </section>
              </v-container>
            </section>
          </div>
        </template>
      </ParentLayout>
    </v-main>

    <!-- footer sempre visível -->
    <CustomFooter />
  </v-app>
</template>

<style scoped>
  .header-left {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .content-badge-pill {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    background: #aec8ff;
    color: #2563eb;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .pill-icon {
    margin-right: 2px;
  }

  .detail-main-root {
    padding-top: 0 !important;
    background: #f3f4f6;
  }

  .detail-wrapper {
    background: #f3f4f6;
  }

  /* CONTAINER BASE */
  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  /* FAIXA AZUL SUPERIOR */
  .detail-banner {
    background: linear-gradient(90deg, #12358f, #2563eb);
    color: #ffffff;
    padding-top: 10rem;
    padding-bottom: 1.8rem;
    margin-bottom: 2.25rem;
  }

  .banner-title {
    margin: 0;
    font-weight: 700;
    font-size: 2.4rem;
  }

  /* BLOCO PRINCIPAL */
  .detail-main {
    padding-bottom: 3rem;
  }

  .detail-article {
    background: transparent;
  }

  .detail-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #2563eb;
  }

  .detail-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
    color: #0a0e1c;
    border-bottom: none !important;
    padding-bottom: 0;
  }

  .detail-date-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .detail-date-icon {
    color: #2563eb;
  }

  .detail-text-block {
    background: transparent;
    border-radius: 0;
    padding: 0 0 2.5rem;
    box-shadow: none;
  }

  .detail-cover {
    margin-bottom: 1.75rem;
    border-radius: 6px;
    overflow: hidden;
  }

  .detail-cover-img {
    width: 100%;
    max-height: 420px;
  }

  .detail-content {
    color: #111827;
  }

  /* markdown básica */
  .markdown-body :deep(p) {
    margin-bottom: 0.9rem;
    line-height: 1.7;
    font-size: 0.95rem;
  }

  .markdown-body :deep(h2),
  .markdown-body :deep(h3) {
    margin-top: 1.8rem;
    margin-bottom: 0.7rem;
    font-weight: 700;
    color: #111827;
    border-bottom: none !important;
  }

  .markdown-body :deep(img) {
    max-width: 100%;
    border-radius: 8px;
    margin-block: 1.5rem;
  }

  /* OUTROS CONTEÚDOS */
  .detail-related {
    margin-top: 2.5rem;
    padding-bottom: 1.6rem;
  }

  .related-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
    position: relative;
    display: inline-flex;
    flex-direction: column;
    gap: 0.3rem;
  }

  .related-underline {
    width: 60px;
    height: 3px;
    background-color: #2563eb;
    border-radius: 999px;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .related-card {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
  }

  .related-media {
    height: 155px;
  }

  .related-img {
    width: 100%;
    height: 100%;
  }

  .related-body {
    padding: 0.85rem 1rem 1.1rem;
  }

  .related-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #2563eb;
    margin: 0 0 0.25rem;
  }

  .related-text {
    margin: 0;
    font-size: 0.9rem;
    color: #111827;
    font-weight: 500;
  }

  /* RESPONSIVO */
  @media (max-width: 900px) {
    .detail-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .related-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .related-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
