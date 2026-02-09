<template>
  <div class="page-wrapper pesquisas-page">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <v-container class="site-container">
        <p class="hero-title">Pesquisas em andamento</p>
        <p class="hero-subtitle">
          Conheça as iniciativas que estão
          <span class="hero-highlight">transformando todo nosso coletivo</span>
        </p>

        <!-- BUSCA (mesma da página de conteúdos) -->
        <div class="hero-search">
          <div class="search-bar">
            <v-icon size="18" class="search-icon-left">mdi-magnify</v-icon>

            <input v-model="searchQuery" type="text" class="search-input" placeholder="Pesquisar" />
          </div>
        </div>
      </v-container>
    </section>

    <!-- ============ LISTA DE PESQUISAS ============ -->
    <section class="section-pesquisas">
      <v-container class="site-container">
        <!-- Skeleton enquanto carrega -->
        <div v-if="isLoading" class="pesquisas-grid">
          <div v-for="i in 6" :key="'skel-' + i" class="pesquisa-card-link">
            <SkeletonCard variant="card" />
          </div>
        </div>

        <div v-else class="pesquisas-grid" :class="{ 'list-empty': !filteredPesquisas.length }">
          <RouterLink
            v-for="pesquisa in visiblePesquisas"
            :key="pesquisa.title"
            :to="pesquisa.link"
            class="pesquisa-card-link"
          >
            <article class="pesquisa-card">
              <div class="pesquisa-media">
                <v-img
                  v-if="pesquisa.image"
                  :src="pesquisa.image"
                  :alt="pesquisa.title"
                  cover
                  class="pesquisa-img"
                  :draggable="false"
                  loading="lazy"
                />
                <div v-else class="pesquisa-placeholder">
                  <v-icon size="52" color="#ffffff99">mdi-book-open-page-variant-outline</v-icon>
                </div>
              </div>

              <div class="pesquisa-body">
                <p class="pesquisa-title">{{ pesquisa.title }}</p>
                <p class="pesquisa-desc">
                  {{ pesquisa.description }}
                </p>

                <div class="pesquisa-meta">
                  <span class="pesquisa-year">{{ pesquisa.year }}</span>
                </div>
              </div>
            </article>
          </RouterLink>

          <div v-if="!filteredPesquisas.length" class="empty-state">
            <v-icon size="48" color="#b0bec5" class="empty-icon">mdi-folder-search-outline</v-icon>
            <p class="empty-title">Nenhuma pesquisa encontrada</p>
            <p class="empty-subtitle">Não encontramos resultados para "{{ searchQuery }}".</p>
          </div>
        </div>

        <div v-if="filteredPesquisas.length" class="pagination-wrapper">
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
            <label for="proj-page-input">Ir para</label>
            <input
              id="proj-page-input"
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
  import SkeletonCard from '../components/SkeletonCard.vue'
  import { ref, computed, watch } from 'vue'
  import { usePageCache } from '../composables/usePageCache'

  type PesquisaCard = {
    title: string
    description: string
    year: string
    image: string
    link: string
  }

  const searchQuery = ref('')
  const pesquisas = ref<PesquisaCard[]>([])
  const isLoading = ref(true)

  const PAGE_SIZE = 6
  const currentPage = ref(1)

  watch(
    pesquisas,
    list => {
      currentPage.value = 1
    },
    { immediate: true }
  )

  const filteredPesquisas = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return pesquisas.value

    return pesquisas.value.filter(p => {
      const fields = [p.title, p.description, p.year]
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredPesquisas.value.length / PAGE_SIZE))
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

  const visiblePesquisas = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredPesquisas.value.slice(start, start + PAGE_SIZE)
  })

  const { cache, loaded: cacheLoaded, getByPrefix, whenReady } = usePageCache()

  function buildPesquisas() {
    const pages = getByPrefix('/pesquisas/')
    const list: PesquisaCard[] = []
    for (const page of pages) {
      const fm = page.frontmatter || {}
      if (fm.layout === 'DetailProject' || fm.type === 'pesquisa') {
        list.push({
          title: page.title || fm.title || 'Sem título',
          description: fm.description || '',
          year: fm.year || '',
          image: fm.cover || '',
          link: page.path,
        })
      }
    }
    list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    pesquisas.value = list
    isLoading.value = false
  }

  // Carrega quando o cache estiver pronto
  whenReady().then(() => buildPesquisas())

  watch(cache, () => {
    if (cacheLoaded.value) buildPesquisas()
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

  // sempre que mudar a busca, volta para a primeira página
  watch(searchQuery, () => {
    currentPage.value = 1
  })
</script>

<style scoped>
  .pesquisas-page {
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
    color: #f68700;
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
    max-width: 720px; /* mesmo valor da barra de Contents */
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

  .search-right {
    border: none;
    background: transparent;
    padding: 0.1rem 0.25rem;
    border-radius: 999px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #818b9a;
  }

  /* LISTA DE PESQUISAS */

  .section-pesquisas {
    background: #f3f4f6;
    padding-bottom: 4rem;
    min-height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
  }

  .pesquisas-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, auto);
    gap: 1.75rem;
    min-height: 900px;
    align-content: start;
  }

  .pesquisas-grid.list-empty {
    display: flex;
    min-height: 0;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .pesquisa-card-link {
    text-decoration: none !important;
    color: inherit;
    display: flex;
    cursor: pointer;
  }

  .pesquisa-card-link:hover,
  .pesquisa-card-link:focus,
  .pesquisa-card-link:active {
    text-decoration: none !important;
  }

  .pesquisa-card-link * {
    text-decoration: none !important;
  }

  .pesquisa-card {
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    height: 100%;
    cursor: pointer;
    transition:
      box-shadow 0.2s ease,
      transform 0.2s ease;
  }

  .pesquisa-card:hover {
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  .pesquisa-media {
    position: relative;
    height: 190px;
    flex-shrink: 0;
  }

  .pesquisa-img {
    height: 100%;
    width: 100%;
    pointer-events: none;
    user-select: none;
  }

  .pesquisa-placeholder {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f68700;
  }

  .pesquisa-placeholder .v-icon {
    text-decoration: none !important;
  }

  .pesquisa-body {
    padding: 1.1rem 1.25rem 1.1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .pesquisa-title {
    font-weight: 700;
    font-size: 1rem;
    color: #111827;
    margin-bottom: 0.35rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pesquisa-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 0.85rem;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pesquisa-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-top: auto;
  }

  .pesquisa-year {
    color: #9ca3af;
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
    border: 1px solid #e5e7eb;
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
    border-color: #f68700;
    color: #c46e12;
  }

  .page-number.active {
    background: #f68700;
    border-color: #f68700;
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

  .empty-state {
    min-height: 350px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
    padding: 3rem 1rem;
    grid-column: 1 / -1;
  }

  .empty-icon {
    margin-bottom: 0.5rem;
    opacity: 0.7;
  }

  .empty-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #4a5568;
    margin: 0;
  }

  .empty-subtitle {
    font-size: 0.95rem;
    color: #9ca3af;
    margin: 0;
  }

  /* RESPONSIVO */

  @media (max-width: 1024px) {
    .pesquisas-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      min-height: 1020px;
    }
  }

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

    .pesquisas-grid {
      grid-template-columns: minmax(0, 1fr);
      min-height: auto;
    }
  }
</style>
