<template>
  <div class="page-wrapper publications-page">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <v-container class="site-container">
        <p class="hero-title">Publicações Acadêmicas</p>
        <p class="hero-subtitle">
          Conheça os trabalhos científicos produzidos pelo
          <span class="hero-highlight">coletivo LAME</span>
        </p>

        <!-- BUSCA -->
        <div class="hero-search">
          <div class="search-bar">
            <v-icon size="18" class="search-icon-left">mdi-magnify</v-icon>

            <input
              v-model="searchQuery"
              type="text"
              class="search-input"
              placeholder="Pesquisar por título, autores, ano ou conferência"
            />
          </div>
        </div>
      </v-container>
    </section>

    <!-- ============ LISTA DE PUBLICAÇÕES ============ -->
    <section class="section-publications">
      <v-container class="site-container">
        <div class="publications-list">
          <article v-for="pub in visiblePublications" :key="pub.path" class="publication-card">
            <!-- ÍCONE / STATUS -->
            <div class="publication-icon-wrapper">
              <div class="publication-icon-circle">
                <v-icon size="26" class="publication-icon">mdi-file-document-outline</v-icon>
              </div>
            </div>

            <!-- CONTEÚDO -->
            <div class="publication-body">
              <!-- TÍTULO (link para o MD da publicação) -->
              <RouterLink :to="pub.path" class="publication-title-link">
                <p class="publication-title">
                  {{ pub.title }}
                </p>
              </RouterLink>

              <!-- AUTORES -->
              <p v-if="pub.authors" class="publication-authors">
                {{ pub.authors }}
              </p>

              <!-- CONFERÊNCIA / LOCAL -->
              <p v-if="pub.conference || pub.year" class="publication-meta">
                <span v-if="pub.conference">{{ pub.conference }}</span>
                <span v-if="pub.conference && pub.year" class="dot">•</span>
                <span v-if="pub.year">{{ pub.year }}</span>
              </p>

              <!-- AÇÕES -->
              <div class="publication-actions">
                <v-btn
                  v-if="pub.download"
                  class="publication-btn"
                  color="green"
                  variant="flat"
                  rounded
                  size="small"
                  :href="pub.download"
                  download
                >
                  <v-icon size="16" class="mr-1">mdi-download</v-icon>
                  Baixar
                </v-btn>

                <v-btn
                  class="publication-btn"
                  color="green"
                  variant="outlined"
                  rounded
                  size="small"
                  :href="pub.sourceUrl || undefined"
                  target="_blank"
                  rel="noopener"
                  :disabled="!pub.sourceUrl"
                >
                  <v-icon size="16" class="mr-1">mdi-open-in-new</v-icon>
                  Fonte
                </v-btn>
              </div>
            </div>
          </article>
        </div>

        <div v-if="showLoadMore" class="load-more-wrapper">
          <v-btn class="load-more-btn" color="green" variant="flat" rounded @click="loadMore">
            <v-icon size="18" class="mr-1">mdi-plus</v-icon>
            Ver mais
          </v-btn>
        </div>

        <div v-if="!filteredPublications.length" class="empty-state">
          Nenhuma publicação encontrada para “{{ searchQuery }}”.
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { usePagesData } from '@vuepress/client'

  type PublicationCard = {
    path: string
    title: string
    authors: string
    conference?: string
    year?: string
    download?: string
    sourceUrl?: string
  }

  const searchQuery = ref('')
  const publications = ref<PublicationCard[]>([])

  // ✅ Agora 10 artigos por “página”
  const PAGE_SIZE = 10
  const visibleCount = ref(PAGE_SIZE)

  const pagesData = usePagesData()

  onMounted(async () => {
    const loaded: PublicationCard[] = []
    const entries = Object.entries(pagesData.value ?? {})
    console.log('[Publications] páginas encontradas:', entries.length)

    await Promise.all(
      entries.map(async ([path, getPageData]) => {
        if (typeof getPageData !== 'function') return

        let page: any
        try {
          page = await getPageData()
        } catch (err) {
          console.error('[Publications] erro ao carregar página', path, err)
          return
        }

        if (!page || typeof page !== 'object') return

        const fm: any = page.frontmatter ?? {}

        // Apenas páginas de PUBLICAÇÃO
        if (!path.startsWith('/publicacoes/') && fm.type !== 'publicacao') return

        const rawDate = fm.date ?? page.git?.createdTime
        let year = fm.year || ''
        if (!year && rawDate) {
          const d = new Date(rawDate as any)
          year = Number.isNaN(d.getTime()) ? String(rawDate) : String(d.getFullYear())
        }

        loaded.push({
          path: page.path,
          title: fm.title || page.title || 'Publicação acadêmica',
          authors: fm.authors || '',
          conference: fm.conference || '',
          year,
          download: fm.download || '',
          sourceUrl: fm.sourceUrl || '',
        })
      })
    )

    // Ordena por ano desc, se existir
    loaded.sort((a, b) => {
      const ay = Number(a.year) || 0
      const by = Number(b.year) || 0
      return by - ay
    })

    publications.value = loaded
    visibleCount.value = PAGE_SIZE

    console.log('[Publications] cards montados:', publications.value)
  })

  const filteredPublications = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return publications.value

    return publications.value.filter(p => {
      const fields = [p.title, p.authors, p.conference ?? '', p.year ?? '']
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const visiblePublications = computed(() => {
    const total = filteredPublications.value.length
    const limit = Math.min(visibleCount.value, total)
    return filteredPublications.value.slice(0, limit)
  })

  // ✅ “Carregar mais” só aparece quando tiver mais do que o visível
  const showLoadMore = computed(
    () => filteredPublications.value.length > visiblePublications.value.length
  )

  function loadMore() {
    visibleCount.value += PAGE_SIZE
  }

  // ao mudar a busca, volta para os primeiros 10
  watch(searchQuery, () => {
    visibleCount.value = PAGE_SIZE
  })
</script>

<style scoped>
  .publications-page {
    background: #f3f4f6;
  }

  /* CONTAINER BASE */
  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  /* HERO */

  .hero {
    padding-top: 96px;
    padding-bottom: 32px;
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2.4rem, 3vw + 1rem, 3.1rem);
    line-height: 1.1;
    color: #0a0e1c;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .hero-subtitle {
    text-align: center;
    font-size: 0.98rem;
    color: #5b6b7a;
    margin: 0;
  }

  .hero-highlight {
    color: #2fbf4c;
    font-weight: 600;
  }

  /* SEARCH BAR */

  .hero-search {
    margin-top: 2.25rem;
    display: flex;
    justify-content: center;
  }

  .search-bar {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 720px;
    padding: 0.55rem 0.9rem;
    border-radius: 999px;
    background: #ffffff;
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.12);
    gap: 0.5rem;
  }

  .search-icon-left {
    color: #818b9a;
  }

  .search-input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 0.95rem;
    color: #111827;
    background: transparent;
  }

  .search-input::placeholder {
    color: #a0aec0;
  }

  /* LISTA DE PUBLICAÇÕES */

  .section-publications {
    background: #f3f4f6;
    padding-bottom: 4rem;
  }

  .publications-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  .publication-card {
    display: flex;
    align-items: flex-start;
    border-radius: 24px;
    background: #ffffff;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    padding: 1.4rem 1.6rem;
    gap: 1.2rem;
  }

  .publication-icon-wrapper {
    flex-shrink: 0;
    margin-top: 0.1rem;
  }

  .publication-icon-circle {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: #e3f8e9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .publication-icon {
    color: #21a946;
  }

  .publication-body {
    flex: 1;
  }

  .publication-title-link {
    text-decoration: none;
    color: inherit;
  }

  .publication-title {
    font-weight: 700;
    font-size: 1rem;
    color: #111827;
    margin-bottom: 0.25rem;
  }

  .publication-authors {
    font-size: 0.85rem;
    line-height: 1.5;
    color: #4b5563;
    margin-bottom: 0.35rem;
  }

  .publication-meta {
    font-size: 0.8rem;
    color: #6b7280;
    margin-bottom: 0.8rem;
  }

  .publication-meta .dot {
    margin-inline: 0.35rem;
  }

  .publication-actions {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .publication-btn {
    text-transform: none;
    font-weight: 600;
  }

  /* VER MAIS */

  .load-more-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 2.5rem;
  }

  .load-more-btn {
    text-transform: none;
    font-weight: 600;
    border-radius: 999px;
    padding-inline: 1.75rem !important;
  }

  /* EMPTY */

  .empty-state {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: #7b8a99;
  }

  /* RESPONSIVO */

  @media (max-width: 700px) {
    .hero {
      padding-top: 88px;
    }

    .hero-title,
    .hero-subtitle {
      text-align: left;
    }

    .hero-search {
      justify-content: flex-start;
    }

    .publication-card {
      padding: 1.2rem 1.2rem;
    }
  }
</style>
