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
          <article v-for="pub in visiblePublications" :key="pub.title" class="publication-card">
            <!-- ÍCONE / STATUS -->
            <div class="publication-icon-wrapper">
              <div class="publication-icon-circle">
                <v-icon size="26" class="publication-icon">mdi-file-document-outline</v-icon>
              </div>
            </div>

            <!-- CONTEÚDO -->
            <div class="publication-body">
              <!-- TÍTULO (link externo se disponível) -->
              <template v-if="pub.sourceUrl">
                <a
                  :href="pub.sourceUrl"
                  class="publication-title-link"
                  target="_blank"
                  rel="noopener"
                >
                  <p class="publication-title">
                    {{ pub.title }}
                  </p>
                </a>
              </template>
              <template v-else>
                <p class="publication-title">
                  {{ pub.title }}
                </p>
              </template>

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
                  class="publication-btn"
                  color="green"
                  variant="flat"
                  rounded
                  size="small"
                  disabled
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
                  disabled
                >
                  <v-icon size="16" class="mr-1">mdi-open-in-new</v-icon>
                  Fonte
                </v-btn>
              </div>
            </div>
          </article>
        </div>

        <div v-if="!filteredPublications.length" class="empty-state">
          Nenhuma publicação encontrada para “{{ searchQuery }}”.
        </div>

        <div v-else class="pagination-wrapper">
          <v-btn
            class="page-btn"
            variant="outlined"
            rounded
            size="small"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            <v-icon size="16" class="mr-1">mdi-chevron-left</v-icon>
            Anterior
          </v-btn>

          <div class="page-numbers">
            <button
              v-for="n in pageNumbers"
              :key="n"
              type="button"
              class="page-number"
              :class="{ active: n === currentPage }"
              @click="goToPage(n)"
            >
              {{ n }}
            </button>
          </div>

          <div class="page-input">
            <label for="pub-page-input">Ir para</label>
            <input
              id="pub-page-input"
              type="number"
              :min="1"
              :max="totalPages"
              :value="currentPage"
              @change="onPageInput($event)"
            />
            <span>/ {{ totalPages }}</span>
          </div>

          <v-btn
            class="page-btn"
            variant="outlined"
            rounded
            size="small"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Próxima
            <v-icon size="16" class="ml-1">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue'
  import { usePagesData } from '@vuepress/client'

  type PublicationCard = {
    title: string
    authors: string
    conference?: string
    year?: string
    download?: string
    sourceUrl?: string
  }

  const searchQuery = ref('')
  const publications = ref<PublicationCard[]>([])
  async function buildPublications() {
    const pagesData = usePagesData()
    const loaders = Object.values(pagesData)
    const list: PublicationCard[] = []
    for (const load of loaders) {
      try {
        const data: any = await load()
        if (
          typeof data?.path === 'string' &&
          data.path.startsWith('/publicacoes/') &&
          (data.frontmatter?.layout === 'DetailPublication' ||
            data.frontmatter?.type === 'publicacao')
        ) {
          list.push({
            title: data.title || data.frontmatter?.title || 'Sem título',
            authors: data.frontmatter?.authors || '',
            conference: data.frontmatter?.conference || '',
            year: data.frontmatter?.year || '',
            download: data.frontmatter?.download || '',
            sourceUrl: data.frontmatter?.sourceUrl || '',
          })
        }
      } catch (e) {
        // ignore broken loader
      }
    }
    // sort by year desc then title
    list.sort((a, b) => {
      const ay = Number(a.year) || 0
      const by = Number(b.year) || 0
      if (by !== ay) return by - ay
      return (a.title || '').localeCompare(b.title || '', 'pt-BR')
    })
    
    // Mock data if no publications found
    if (list.length === 0) {
      list.push(
        {
          title: 'Multimodal feedback to support digital note-taking in higher education',
          authors: 'Marcos Vinícius Prado Albuquerque, Geovane Carvalho Filho, Eduardo Henrique Tavares Moura, Felipe César Gonçalves de Andrade',
          conference: 'Brazilian Symposium on Computers in Education (SBIE)',
          year: '2023',
          sourceUrl: 'https://ieeeaccess.ieee.org/',
        },
        {
          title: 'Analyzing learners\' digital note-taking strategies: A systematic review',
          authors: 'Marcos Vinícius Prado Albuquerque, Eduardo Henrique Tavares Moura, Felipe César Gonçalves de Andrade',
          conference: 'International Conference on Awesome Learning',
          year: '2024',
          sourceUrl: 'https://ieeeaccess.ieee.org/',
        }
      )
    }
    
    publications.value = list
  }

  onMounted(() => {
    buildPublications()
  })

  // ✅ Agora 10 artigos por página com paginação
  const PAGE_SIZE = 10
  const currentPage = ref(1)

  watch(
    publications,
    list => {
      list.sort((a, b) => {
        const ay = Number(a.year) || 0
        const by = Number(b.year) || 0
        return by - ay
      })

      currentPage.value = 1
    },
    { immediate: true }
  )

  const filteredPublications = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return publications.value

    return publications.value.filter(p => {
      const fields = [p.title, p.authors, p.conference ?? '', p.year ?? '']
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredPublications.value.length / PAGE_SIZE))
  )

  const pageNumbers = computed(() => {
    const total = totalPages.value
    const current = currentPage.value
    const span = 2
    const start = Math.max(1, current - span)
    const end = Math.min(total, start + span * 2)
    const adjustedStart = Math.max(1, end - span * 2)
    const nums: number[] = []
    for (let i = adjustedStart; i <= end; i++) nums.push(i)
    return nums
  })

  const visiblePublications = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredPublications.value.slice(start, start + PAGE_SIZE)
  })

  function goToPage(page: number) {
    const clamped = Math.min(Math.max(1, page), totalPages.value)
    currentPage.value = clamped
  }

  function onPageInput(event: Event) {
    const target = event.target as HTMLInputElement
    const value = Number(target.value)
    if (Number.isNaN(value)) return
    goToPage(value)
  }

  // ao mudar a busca, volta para a primeira página
  watch(searchQuery, () => {
    currentPage.value = 1
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
    min-height: calc(100vh - 320px);
    display: flex;
    flex-direction: column;
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

  /* PAGINAÇÃO */
  .pagination-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .page-btn {
    text-transform: none;
    font-weight: 600;
  }

  .page-numbers {
    display: flex;
    gap: 0.4rem;
    flex-wrap: wrap;
  }

  .page-number {
    border: 1px solid #d1d5db;
    background: #ffffff;
    color: #111827;
    border-radius: 10px;
    padding: 0.35rem 0.7rem;
    font-weight: 600;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }

  .page-number:hover {
    border-color: #21a946;
    color: #0f7b31;
  }

  .page-number.active {
    background: #21a946;
    border-color: #21a946;
    color: #ffffff;
  }

  .page-input {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.9rem;
    color: #4b5563;
  }

  .page-input input {
    width: 64px;
    padding: 0.3rem 0.45rem;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 0.9rem;
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
