<!-- docs/.vuepress/layouts/DetailProject.vue -->
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

  // ===== COMPARTILHAMENTO / REDES SOCIAIS =====
  const shareUrl = computed(() => {
    if (typeof window === 'undefined') return ''
    const origin = window.location.origin ?? ''
    return origin + (page.value.path || '')
  })

  const whatsappShareUrl = computed(() =>
    shareUrl.value ? `https://wa.me/?text=${encodeURIComponent(shareUrl.value)}` : '#'
  )

  const linkedinShareUrl = computed(() =>
    shareUrl.value
      ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl.value)}`
      : '#'
  )

  const facebookShareUrl = computed(() =>
    shareUrl.value
      ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl.value)}`
      : '#'
  )

  /**
   * OUTRAS PESQUISAS - CARROSSEL
   */
  const MAX_RELATED = 6
  const VISIBLE_PER_PAGE = 3

  const relatedPesquisas = ref<{ path: string; title: string; image: string; sortKey: number }[]>(
    []
  )

  const currentSlide = ref(0)

  onMounted(async () => {
    const loaded: any[] = []
    const currentPath = page.value.path

    const allLoaders = Object.values(pagesData.value ?? {})

    await Promise.all(
      allLoaders.map(async getPageData => {
        if (typeof getPageData !== 'function') return

        let p: any
        try {
          p = await getPageData()
        } catch {
          return
        }

        if (!p || typeof p !== 'object') return
        const fm: any = p.frontmatter ?? {}

        // só páginas de pesquisa, excluindo a atual
        const isPesquisaPath = (p.path || '').startsWith('/pesquisas/')
        const isPesquisaType = fm.type === 'pesquisa'
        if (!(isPesquisaPath || isPesquisaType)) return
        if (p.path === currentPath) return

        // data só pra ordenar (não vamos mostrar aqui)
        const rawDate = fm.date ?? p.git?.createdTime
        let sortKey = 0
        if (rawDate) {
          const d = new Date(rawDate as any)
          sortKey = Number.isNaN(d.getTime()) ? 0 : d.getTime()
        }

        // skip listing pages (README.md)
        if (p.path === '/pesquisas/') return

        loaded.push({
          path: p.path,
          title: fm.title || p.title || '',
          image: fm.cover || '',
          sortKey,
        })
      })
    )

    loaded.sort((a, b) => b.sortKey - a.sortKey)
    relatedPesquisas.value = loaded.slice(0, MAX_RELATED)
    currentSlide.value = 0
  })

  const maxSlide = computed(() => {
    if (!relatedPesquisas.value.length) return 0
    return Math.max(0, Math.ceil(relatedPesquisas.value.length / VISIBLE_PER_PAGE) - 1)
  })

  const visiblePesquisas = computed(() => {
    const start = currentSlide.value * VISIBLE_PER_PAGE
    return relatedPesquisas.value.slice(start, start + VISIBLE_PER_PAGE)
  })

  function nextSlide() {
    if (!relatedPesquisas.value.length) return
    if (currentSlide.value >= maxSlide.value) {
      currentSlide.value = 0
    } else {
      currentSlide.value++
    }
  }

  function prevSlide() {
    if (!relatedPesquisas.value.length) return
    if (currentSlide.value <= 0) {
      currentSlide.value = maxSlide.value
    } else {
      currentSlide.value--
    }
  }
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="ssr-loading">
        <img src="/imgs/header/icon_lame.svg" alt="LAME" class="ssr-loading-logo" />
        <div class="ssr-loading-spinner"></div>
      </div>
    </template>

    <v-app>
      <NavBar />

      <v-main class="detail-main-root">
        <ParentLayout>
          <template #navbar></template>

          <template #page>
            <div class="detail-wrapper">
              <!-- FAIXA SUPERIOR -->
              <section class="detail-banner">
                <v-container class="site-container">
                  <h1 class="banner-title">Pesquisas</h1>
                </v-container>
              </section>

              <!-- TÍTULO, DATA, IMAGEM E TEXTO -->
              <section class="detail-main">
                <v-container class="site-container">
                  <article class="detail-article">
                    <header class="detail-header">
                      <h2 class="detail-title">{{ title }}</h2>

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

                    <!-- AUTOR + REDES SOCIAIS -->
                    <div class="detail-social">
                      <div class="social-left">
                        <!-- Se quiser nome/cargo, dá pra adicionar aqui -->
                      </div>

                      <div class="social-right">
                        <strong class="social-label">Compartilhe:</strong>

                        <a
                          class="social-btn whatsapp"
                          :href="whatsappShareUrl"
                          target="_blank"
                          rel="noopener"
                          aria-label="Compartilhar via WhatsApp"
                        >
                          <v-icon size="18">mdi-whatsapp</v-icon>
                        </a>

                        <a
                          class="social-btn linkedin"
                          :href="linkedinShareUrl"
                          target="_blank"
                          rel="noopener"
                          aria-label="Compartilhar no LinkedIn"
                        >
                          <v-icon size="18">mdi-linkedin</v-icon>
                        </a>

                        <a
                          class="social-btn facebook"
                          :href="facebookShareUrl"
                          target="_blank"
                          rel="noopener"
                          aria-label="Compartilhar no Facebook"
                        >
                          <v-icon size="18">mdi-facebook</v-icon>
                        </a>
                      </div>
                    </div>
                  </article>

                  <!-- OUTRAS PESQUISAS - CARROSSEL -->
                  <section class="detail-related" v-if="relatedPesquisas.length">
                    <div class="related-header">
                      <div class="related-title-wrapper">
                        <h3 class="related-title">Outras pesquisas</h3>
                        <span class="related-line"></span>
                      </div>

                      <div class="related-nav" v-if="relatedPesquisas.length > VISIBLE_PER_PAGE">
                        <button
                          type="button"
                          class="related-nav-btn"
                          @click="prevSlide"
                          aria-label="Pesquisas anteriores"
                        >
                          <v-icon size="18">mdi-chevron-left</v-icon>
                        </button>
                        <button
                          type="button"
                          class="related-nav-btn"
                          @click="nextSlide"
                          aria-label="Próximas pesquisas"
                        >
                          <v-icon size="18">mdi-chevron-right</v-icon>
                        </button>
                      </div>
                    </div>

                    <div class="related-grid">
                      <RouterLink
                        v-for="item in visiblePesquisas"
                        :key="item.path"
                        :to="item.path"
                        class="related-card"
                      >
                        <div class="related-media">
                          <v-img
                            v-if="item.image"
                            :src="item.image"
                            :alt="item.title"
                            cover
                            class="related-img"
                          />
                          <div v-else class="related-placeholder">
                            <v-icon size="40" color="#ffffff"
                              >mdi-book-open-page-variant-outline</v-icon
                            >
                          </div>
                        </div>

                        <div class="related-body">
                          <p class="related-type">Pesquisa</p>
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

      <CustomFooter />
    </v-app>
  </ClientOnly>
</template>

<style scoped>
  .detail-main-root {
    padding-top: 0 !important;
    background: #f3f4f6;
  }

  .detail-wrapper {
    background: #f3f4f6;
  }

  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  .detail-banner {
    background: #f68700;
    color: #ffffff;
    padding-top: 5.5rem;
    padding-bottom: 1.5rem;
    margin-top: 100px;
    margin-bottom: 2.25rem;
  }

  .banner-title {
    margin: 0;
    font-weight: 600;
    font-size: 2.6rem;
  }

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
    border-bottom: 3px solid #f68700;
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
    color: #f68700;
  }

  .detail-text-block {
    background: transparent;
    border-radius: 0;
    padding: 0 0 1.5rem;
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

  /* ===== SOCIAL / COMPARTILHAR ===== */
  .detail-social {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.25rem;
    margin-bottom: 2.2rem;
  }

  .social-left {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .social-avatar :deep(.v-avatar) {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
  }

  .social-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .social-label {
    font-size: 0.85rem;
    color: #374151;
    margin-right: 0.5rem;
  }

  .social-btn {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: #ffffff;
  }

  .social-btn:hover {
    filter: brightness(0.9);
  }

  .social-btn.whatsapp {
    background: #25d366;
  }

  .social-btn.linkedin {
    background: #0a66c2;
  }

  .social-btn.facebook {
    background: #1877f2;
  }

  /* ===== OUTRAS PESQUISAS / CARROSSEL ===== */

  .detail-related {
    margin-top: 2.5rem;
    padding-bottom: 1.6rem;
  }

  .related-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 1.2rem;
  }

  .related-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex: 1;
  }

  .related-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    white-space: nowrap;
    margin: 0;
  }

  .related-line {
    height: 3px;
    background: #f68700;
    flex: 1;
    border-radius: 999px;
  }

  .related-nav {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .related-nav-btn {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    border: 1px solid #d1d5db;
    background: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
  }

  .related-nav-btn:hover {
    background: #f3f4f6;
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
    transition:
      transform 0.16s ease,
      box-shadow 0.16s ease;
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

  .related-placeholder {
    width: 100%;
    height: 100%;
    background: #9ca3af;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .related-body {
    padding: 0.85rem 1rem 1.1rem;
  }

  .related-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #f68700;
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

    .detail-social {
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

    .related-title-wrapper {
      flex-direction: column;
      align-items: flex-start;
    }

    .related-line {
      width: 100%;
    }
  }
</style>
