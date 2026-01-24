<template>
  <div class="page-wrapper projects-page">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <v-container class="site-container">
        <p class="hero-title">Nossos projetos</p>
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
        <div class="projects-grid">
          <RouterLink
            v-for="project in visibleProjects"
            :key="project.title"
            :to="`/projetos/${slugify(project.title)}/`"
            class="project-card-link"
          >
            <article class="project-card">
              <div class="project-media">
                <v-img
                  :src="project.image"
                  :alt="project.title"
                  cover
                  class="project-img"
                  :draggable="false"
                />
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
        </div>

        <div v-if="!filteredProjects.length" class="empty-state">
          Nenhum projeto encontrado para “{{ searchQuery }}”.
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
  import { ref, computed, watch, onMounted } from 'vue'
  import { usePagesData } from '@vuepress/client'

  type ProjectCard = {
    title: string
    description: string
    year: string
    image: string
    link?: string
  }

  const searchQuery = ref('')
  const projects = ref<ProjectCard[]>([])

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

  function slugify(title: string): string {
    return title
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
  }

  async function buildProjects() {
    const pagesData = usePagesData()
    const loaders = Object.values(pagesData)
    const list: ProjectCard[] = []
    for (const load of loaders) {
      try {
        const data: any = await load()
        if (
          typeof data?.path === 'string' &&
          data.path.startsWith('/projetos/') &&
          (data.frontmatter?.layout === 'DetailProject' || data.frontmatter?.type === 'projeto')
        ) {
          list.push({
            title: data.title || data.frontmatter?.title || 'Sem título',
            description: data.frontmatter?.description || '',
            year: data.frontmatter?.year || '',
            image: data.frontmatter?.cover || '/imgs/projects/default.png',
          })
        }
      } catch (e) {
        // ignore broken loader
      }
    }
    // sort by title for stable order
    list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    
    // Mock data if no projects found
    if (list.length === 0) {
      list.push(
        {
          title: 'PROJETO PRODUÇÃO TEXTUAL E ATIVIDADES METALINGUÍSTICAS (METAWRITING II)',
          description: 'Estudo de atividades metalinguísticas em produção textual nos anos iniciais, articulando práticas docentes e comentários de alunos com dados coletados no Brasil, França e Portugal.',
          year: '2024-2028',
          image: '/imgs/projects/default.png',
        }
      )
    }
    
    projects.value = list
  }

  onMounted(() => {
    buildProjects()
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
    color: #f29226;
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
    padding-bottom: 4rem; /* espaço antes do footer */
    min-height: calc(100vh - 320px);
    display: flex;
    flex-direction: column;
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.75rem;
  }

  .project-card-link {
    text-decoration: none;
    color: inherit;
  }

  .project-card {
    display: flex;
    flex-direction: column;
    border-radius: 32px;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    transition:
      transform 0.15s ease,
      box-shadow 0.15s ease;
  }

  .project-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 22px 50px rgba(0, 0, 0, 0.16);
  }

  .project-media {
    position: relative;
    height: 190px;
  }

  .project-img {
    height: 100%;
    width: 100%;
    pointer-events: none; /* não recebe clique/hover */
    user-select: none; /* impede seleção/drag */
  }

  .project-body {
    padding: 1.1rem 1.25rem 1.1rem;
  }

  .project-title {
    font-weight: 700;
    font-size: 1rem;
    color: #111827;
    margin-bottom: 0.35rem;
  }

  .project-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #4b5563;
    margin-bottom: 0.85rem;
  }

  .project-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
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
    border-color: #f29226;
    color: #c46e12;
  }

  .page-number.active {
    background: #f29226;
    border-color: #f29226;
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
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: #7b8a99;
  }

  /* RESPONSIVO */

  @media (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
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
    }
  }
</style>
