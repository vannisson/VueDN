<template>
  <div class="page-wrapper projects-page">
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

    <!-- ============ LISTA DE PROJETOS ============ -->
    <section class="section-projects">
      <v-container class="site-container">
        <!-- Skeleton enquanto carrega -->
        <div v-if="isLoading" class="projects-grid">
          <div v-for="i in 6" :key="'skel-' + i" class="project-card-link">
            <SkeletonCard variant="card" />
          </div>
        </div>

        <div v-else class="projects-grid" :class="{ 'list-empty': !filteredProjects.length }">
          <RouterLink
            v-for="project in visibleProjects"
            :key="project.title"
            :to="project.link"
            class="project-card-link"
          >
            <article class="project-card">
              <div class="project-media">
                <v-img
                  v-if="project.image"
                  :src="project.image"
                  :alt="project.title"
                  cover
                  class="project-img"
                  :draggable="false"
                  loading="lazy"
                />
                <div v-else class="project-placeholder">
                  <v-icon size="52" color="#ffffff99">mdi-book-open-page-variant-outline</v-icon>
                </div>
              </div>

              <div class="project-body">
                <p class="project-title">{{ project.title }}</p>
                <p class="project-desc">
                  {{ project.description }}
                </p>

                <div class="project-meta">
                  <span class="project-year">{{ project.year }}</span>
                </div>
              </div>
            </article>
          </RouterLink>

          <div v-if="!filteredProjects.length" class="empty-state">
            <v-icon size="48" color="#b0bec5" class="empty-icon">mdi-folder-search-outline</v-icon>
            <p class="empty-title">Nenhum projeto encontrado</p>
            <p class="empty-subtitle">Não encontramos resultados para "{{ searchQuery }}".</p>
          </div>
        </div>

        <div v-if="filteredProjects.length" class="pagination-wrapper">
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

  type ProjectCard = {
    title: string
    description: string
    year: string
    image: string
    link: string
  }

  const searchQuery = ref('')
  const projects = ref<ProjectCard[]>([])
  const isLoading = ref(true)

  const PAGE_SIZE = 6
  const currentPage = ref(1)

  watch(
    projects,
    list => {
      currentPage.value = 1
    },
    { immediate: true }
  )

  const filteredProjects = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return projects.value

    return projects.value.filter(p => {
      const fields = [p.title, p.description, p.year]
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredProjects.value.length / PAGE_SIZE))
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

  const visibleProjects = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredProjects.value.slice(start, start + PAGE_SIZE)
  })

  const { cache, loaded: cacheLoaded, getByPrefix, whenReady } = usePageCache()

  function buildProjects() {
    const pages = getByPrefix('/projetos/')
    const list: ProjectCard[] = []
    for (const page of pages) {
      const fm = page.frontmatter || {}
      if (fm.layout === 'DetailProject' || fm.type === 'projeto') {
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
    projects.value = list
    isLoading.value = false
  }

  // Carrega quando o cache estiver pronto
  whenReady().then(() => buildProjects())

  watch(cache, () => {
    if (cacheLoaded.value) buildProjects()
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
  .projects-page {
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

  /* LISTA DE PROJETOS */

  .section-projects {
    background: #f3f4f6;
    padding-bottom: 4rem;
    min-height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-rows: repeat(2, auto);
    gap: 1.75rem;
    min-height: 900px;
    align-content: start;
  }

  .projects-grid.list-empty {
    display: flex;
    min-height: 0;
    flex: 1;
    align-items: center;
    justify-content: center;
  }

  .project-card-link {
    text-decoration: none !important;
    color: inherit;
    display: flex;
    cursor: pointer;
  }

  .project-card-link:hover,
  .project-card-link:focus,
  .project-card-link:active {
    text-decoration: none !important;
  }

  .project-card-link * {
    text-decoration: none !important;
  }

  .project-card {
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

  .project-card:hover {
    box-shadow: 0 20px 48px rgba(0, 0, 0, 0.15);
    transform: translateY(-3px);
  }

  .project-media {
    position: relative;
    height: 190px;
    flex-shrink: 0;
  }

  .project-img {
    height: 100%;
    width: 100%;
    pointer-events: none;
    user-select: none;
  }

  .project-placeholder {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f68700;
  }

  .project-placeholder .v-icon {
    text-decoration: none !important;
  }

  .project-body {
    padding: 1.1rem 1.25rem 1.1rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }

  .project-title {
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

  .project-desc {
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

  .project-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-top: auto;
  }

  .project-year {
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
    .projects-grid {
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

    .projects-grid {
      grid-template-columns: minmax(0, 1fr);
      min-height: auto;
    }
  }
</style>
