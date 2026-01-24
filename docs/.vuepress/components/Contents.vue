<template>
  <div class="page-wrapper contents-page">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <v-container class="site-container">
        <p class="hero-title">Conteúdos</p>
        <p class="hero-subtitle">
          Conheça as iniciativas que estão
          <span class="hero-highlight">transformando todo nosso coletivo</span>
        </p>
        <!-- BUSCA -->
        <div class="hero-search">
          <div class="search-bar">
            <v-icon size="18" class="search-icon-left">mdi-magnify</v-icon>

            <input v-model="searchQuery" type="text" class="search-input" placeholder="Pesquisar" />
          </div>
        </div>
      </v-container>
    </section>

    <!-- ============ LISTA DE CONTEÚDOS ============ -->
    <section class="section-contents">
      <v-container class="site-container">
        <div class="contents-layout">
          <!-- BADGES LATERAIS (FILTRO) -->
          <aside class="filters-desktop">
            <p class="filters-title">Tipo</p>
            <button
              v-for="type in badgeTypes"
              :key="type.value"
              type="button"
              class="badge-filter"
              :class="{ active: badgeFilter === type.value }"
              @click="toggleBadgeFilter(type.value)"
            >
              <v-icon size="16" class="badge-icon">
                {{ type.icon }}
              </v-icon>
              <span>{{ type.label }}</span>
            </button>
          </aside>

          <!-- LISTA -->
          <div class="contents-list">
            <RouterLink
              v-for="item in visibleContents"
              :key="item.title"
              :to="`/conteudos/${slugify(item.title)}/`"
              class="content-card-link"
            >
              <article class="content-card">
                <div class="content-main">
                  <!-- badge do item vinda do MD -->
                  <div v-if="item.badge" class="content-badge-pill">
                    <v-icon size="16" class="pill-icon">
                      {{ getBadgeIcon(item.badge) }}
                    </v-icon>
                    <span>{{ item.badge }}</span>
                  </div>

                  <h2 class="content-title">{{ item.title }}</h2>

                  <p class="content-desc">
                    {{ item.description }}
                  </p>

                  <button type="button" class="content-more">Saiba mais</button>
                </div>

                <div class="content-media">
                  <v-img
                    :src="item.image"
                    :alt="item.title"
                    cover
                    class="content-img"
                    :draggable="false"
                  />
                </div>
              </article>
            </RouterLink>

            <div v-if="!filteredContents.length" class="empty-state">
              Nenhum conteúdo encontrado para “{{ searchQuery }}”.
            </div>
          </div>
        </div>

        <!-- BADGES MOBILE -->
        <div class="filters-mobile">
          <button
            v-for="type in badgeTypes"
            :key="'m-' + type.value"
            type="button"
            class="badge-filter-mobile"
            :class="{ active: badgeFilter === type.value }"
            @click="toggleBadgeFilter(type.value)"
          >
            <v-icon size="16" class="badge-icon">
              {{ type.icon }}
            </v-icon>
            <span>{{ type.label }}</span>
          </button>
        </div>

        <div v-if="filteredContents.length" class="pagination-wrapper">
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
            <label for="content-page-input">Ir para</label>
            <input
              id="content-page-input"
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

  type ContentCard = {
    title: string
    description: string
    image: string
    badge?: string // "Material" | "Vídeo" | "Notícia"
    link?: string
    external?: boolean
  }

  const searchQuery = ref('')
  const contents = ref<ContentCard[]>([])
  const PAGE_SIZE = 6
  const currentPage = ref(1)

  // Tipos de badge / filtro lateral
  const badgeTypes = [
    { label: 'Material', value: 'Material', icon: 'mdi-book-open-variant' },
    { label: 'Vídeo', value: 'Vídeo', icon: 'mdi-play-circle' },
    { label: 'Notícia', value: 'Notícia', icon: 'mdi-newspaper-variant-outline' },
  ] as const

  type BadgeFilterValue = (typeof badgeTypes)[number]['value'] | 'all'
  const badgeFilter = ref<BadgeFilterValue>('all')

  function normalizeBadge(value?: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

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

  function getBadgeIcon(badge?: string) {
    const norm = normalizeBadge(badge)
    if (norm === 'material') return 'mdi-book-open-variant'
    if (norm === 'video') return 'mdi-play-circle'
    if (norm === 'noticia') return 'mdi-newspaper-variant-outline'
    return 'mdi-file-document-outline'
  }

  function toggleBadgeFilter(value: (typeof badgeTypes)[number]['value']) {
    // clica de novo para voltar para "todos"
    badgeFilter.value = badgeFilter.value === value ? 'all' : value
  }

  async function buildContents() {
    const pagesData = usePagesData()
    const loaders = Object.values(pagesData)
    const list: ContentCard[] = []
    for (const load of loaders) {
      try {
        const data: any = await load()
        if (
          typeof data?.path === 'string' &&
          data.path.startsWith('/conteudos/') &&
          (data.frontmatter?.layout === 'DetailContent' || data.frontmatter?.type === 'conteudo')
        ) {
          list.push({
            title: data.title || data.frontmatter?.title || 'Sem título',
            description: data.frontmatter?.description || '',
            image: data.frontmatter?.cover || '/imgs/contents/default.png',
            badge: data.frontmatter?.badge || undefined,
            link: '',
            external: false,
          })
        }
      } catch (e) {
        // ignore broken loader
      }
    }
    list.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    
    // Mock data if no contents found
    if (list.length === 0) {
      list.push(
        {
          title: 'Solitária',
          description: 'Interação entre alunas discutindo escolha lexical (triste x solitária) no manuscrito "Os três Todinhos" (1º ano, 1991), evidenciando rasura oral e negociação de sentido.',
          image: '/imgs/contents/default.png',
          badge: 'Vídeo',
          link: '',
          external: false,
        },
        {
          title: 'Sistema Ramos',
          description: 'Sistema de categorização e análise de dados coletados em sala de aula. Metodologia de pesquisa colaborativa entre Brasil, França e Portugal.',
          image: '/imgs/contents/default.png',
          badge: 'Material',
          link: '',
          external: false,
        },
        {
          title: 'Ordem Alfabética',
          description: 'Análise de atividades metalinguísticas em sequências de escrita. Abordagem enunciativa da produção textual infantil.',
          image: '/imgs/contents/default.png',
          badge: 'Material',
          link: '',
          external: false,
        }
      )
    }
    
    contents.value = list
  }

  onMounted(() => {
    buildContents()
  })

  const filteredContents = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()

    return contents.value.filter(c => {
      const txtFields = [c.title, c.description]
      const matchText = !q || txtFields.some(f => f.toLowerCase().includes(q))

      let matchBadge = true
      if (badgeFilter.value !== 'all') {
        matchBadge = normalizeBadge(c.badge) === normalizeBadge(badgeFilter.value as string)
      }

      return matchText && matchBadge
    })
  })

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(filteredContents.value.length / PAGE_SIZE))
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

  const visibleContents = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredContents.value.slice(start, start + PAGE_SIZE)
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

  // sempre que mudar a busca, reseta badge? (opcional — aqui não)
  watch(searchQuery, () => {
    currentPage.value = 1
  })

  watch(badgeFilter, () => {
    currentPage.value = 1
  })
</script>

<style scoped>
  .contents-page {
    background: #f3f4f6;
  }

  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  /* HERO */
  .hero {
    padding-top: 96px;
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
    color: #2563eb;
    font-weight: 600;
  }

  .hero-search {
    margin-top: 2rem;
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
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.08);
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

  .search-select {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    border: none;
    background: #f3f4f6;
    border-radius: 999px;
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
    color: #4b5563;
  }

  .results-text {
    font-size: 0.85rem;
    color: #6b7280;
    margin: 0.4rem 0 0;
  }

  /* LAYOUT PRINCIPAL */
  .section-contents {
    background: #f3f4f6;
    padding-bottom: 4rem; /* espaço antes do footer */
    min-height: calc(100vh - 320px);
    display: flex;
    flex-direction: column;
  }

  .contents-layout {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 2rem;
    margin-top: 1.75rem;
  }

  /* BADGES LATERAIS */
  .filters-desktop {
    min-width: 120px;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .filters-title {
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #6b7280;
    margin-bottom: 0.4rem;
  }

  .badge-filter {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    background: #ffffff;
    color: #4b5563;
    cursor: pointer;
    transition:
      background 0.15s ease,
      color 0.15s ease,
      box-shadow 0.15s ease,
      border-color 0.15s ease,
      transform 0.1s ease;
  }

  .badge-filter:hover {
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
    transform: translateY(-1px);
  }

  .badge-filter.active {
    background: #aec8ff;
    color: #2563eb;
  }

  .badge-icon {
    margin-right: 2px;
  }

  /* LISTA DE CARDS */
  .contents-list {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
  }

  .content-card-link {
    text-decoration: none;
    color: inherit;
  }

  .content-card {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    border-radius: 26px;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .content-main {
    padding: 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .content-badge-pill {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    padding: 0.2rem 0.7rem;
    border-radius: 999px;
    background: #2563eb;
    color: #ffffff;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .pill-icon {
    margin-right: 2px;
    color: #ffffff;
  }

  .content-title {
    font-weight: 700;
    font-size: 1.05rem;
    color: #111827;
    margin: 0.1rem 0 0.25rem;
  }

  .content-desc {
    font-size: 0.9rem;
    line-height: 1.6;
    color: #4b5563;
    margin: 0 0 0.7rem;
  }

  .content-more {
    margin-top: auto;
    align-self: flex-start;
    border: none;
    background: transparent;
    padding: 0;
    font-size: 0.85rem;
    font-weight: 600;
    color: #2563eb;
    cursor: pointer;
  }

  .content-media {
    position: relative;
    min-height: 170px;
  }

  .content-img {
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
  }

  .empty-state {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 0.95rem;
    color: #7b8a99;
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
    border-color: #2563eb;
    color: #1e4fb8;
  }

  .page-number.active {
    background: #2563eb;
    border-color: #2563eb;
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

  /* BADGES MOBILE */
  .filters-mobile {
    display: none;
    margin-top: 1.5rem;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .badge-filter-mobile {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    padding: 0.25rem 0.75rem;
    font-size: 0.8rem;
    background: #ffffff;
    color: #4b5563;
    cursor: pointer;
  }

  .badge-filter-mobile.active {
    background: #ffedd5;
    background: #aec8ff;
    color: #2563eb;
  }

  /* RESPONSIVO */
  @media (max-width: 1024px) {
    .contents-layout {
      grid-template-columns: minmax(0, 1fr);
    }

    .filters-desktop {
      display: none;
    }

    .filters-mobile {
      display: flex;
    }
  }

  @media (max-width: 700px) {
    .hero {
      padding-top: 88px;
    }

    .hero-title {
      text-align: left;
    }

    .hero-search {
      align-items: flex-start;
    }

    .content-card {
      grid-template-columns: minmax(0, 1fr);
    }

    .content-media {
      min-height: 160px;
    }
  }
</style>
