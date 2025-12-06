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

        <!-- BUSCA -->
        <div class="hero-search">
          <div class="search-bar">
            <v-icon size="18" class="search-icon-left">mdi-magnify</v-icon>

            <input v-model="searchQuery" type="text" class="search-input" placeholder="Pesquisar" />

            <!-- ícone só visual por enquanto (pode virar select/filtro depois) -->
            <button type="button" class="search-right">
              <v-icon size="18">mdi-chevron-down</v-icon>
            </button>
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
            :key="project.path"
            :to="project.path"
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

        <div v-if="showLoadMore" class="load-more-wrapper">
          <v-btn class="load-more-btn" color="orange" variant="flat" rounded @click="loadMore">
            <v-icon size="18" class="mr-1">mdi-plus</v-icon>
            Ver mais
          </v-btn>
        </div>

        <div v-if="!filteredProjects.length" class="empty-state">
          Nenhum projeto encontrado para “{{ searchQuery }}”.
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { usePagesData } from '@vuepress/client'

  type ProjectCard = {
    path: string
    title: string
    description: string
    year: string
    image: string
    category?: string
  }

  const searchQuery = ref('')
  const projects = ref<ProjectCard[]>([])

  const PAGE_SIZE = 6
  const visibleCount = ref(PAGE_SIZE)

  const pagesData = usePagesData()

  onMounted(async () => {
    const loaded: ProjectCard[] = []
    const entries = Object.entries(pagesData.value ?? {})
    console.log('[Projects] páginas encontradas:', entries.length)

    await Promise.all(
      entries.map(async ([path, getPageData]) => {
        if (typeof getPageData !== 'function') return

        let page: any
        try {
          page = await getPageData()
        } catch (err) {
          console.error('[Projects] erro ao carregar página', path, err)
          return
        }

        if (!page || typeof page !== 'object') return

        const fm: any = page.frontmatter ?? {}

        // Só pega páginas de projeto
        if (!path.startsWith('/projetos/') && fm.type !== 'projeto') return

        const rawDate = fm.date ?? page.git?.createdTime
        let year = ''
        if (rawDate) {
          const d = new Date(rawDate as any)
          year = Number.isNaN(d.getTime()) ? String(rawDate) : String(d.getFullYear())
        }

        const descSource: string = fm.description ?? (page.excerpt as string | undefined) ?? ''

        const description =
          descSource.trim() ||
          'Projeto desenvolvido pelo LAME em parceria com diferentes instituições.'

        const category: string | undefined =
          fm.category ?? (Array.isArray(fm.tags) && fm.tags.length ? String(fm.tags[0]) : undefined)

        loaded.push({
          path: page.path,
          title: fm.title || page.title || 'Projeto',
          description,
          year,
          image: fm.cover || '/imgs/projects/default.png',
          category,
        })
      })
    )

    loaded.sort((a, b) => Number(b.year) - Number(a.year))
    projects.value = loaded
    visibleCount.value = PAGE_SIZE

    console.log('[Projects] cards montados:', projects.value)
  })

  const filteredProjects = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return projects.value

    return projects.value.filter(p => {
      const fields = [p.title, p.description, p.year, p.category ?? '']
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const visibleProjects = computed(() => {
    // garante que o visibleCount nunca ultrapasse o total filtrado
    const total = filteredProjects.value.length
    const limit = Math.min(visibleCount.value, total)
    return filteredProjects.value.slice(0, limit)
  })

  const showLoadMore = computed(() => filteredProjects.value.length > visibleProjects.value.length)

  function loadMore() {
    visibleCount.value += PAGE_SIZE
  }

  // sempre que mudar a busca, volta a mostrar só os 6 primeiros
  watch(searchQuery, () => {
    visibleCount.value = PAGE_SIZE
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
    color: #ff8800;
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
    max-width: 520px;
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
    transition: transform 0.15s ease, box-shadow 0.15s ease;
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
