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
              v-for="item in filteredContents"
              :key="item.path"
              :to="item.path"
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
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, watch } from 'vue'
  import { usePagesData } from '@vuepress/client'

  type ContentCard = {
    path: string
    title: string
    description: string
    image: string
    badge?: string // "Material" | "Vídeo" | "Notícia"
  }

  const searchQuery = ref('')
  const contents = ref<ContentCard[]>([])

  const pagesData = usePagesData()

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

  onMounted(async () => {
    const loaded: ContentCard[] = []

    const entries = Object.entries(pagesData.value ?? {})

    await Promise.all(
      entries.map(async ([path, getPageData]) => {
        if (typeof getPageData !== 'function') return

        let page: any
        try {
          page = await getPageData()
        } catch (err) {
          console.error('[Contents] erro ao carregar página', path, err)
          return
        }

        if (!page || typeof page !== 'object') return

        const fm: any = page.frontmatter ?? {}

        // Só pega páginas de conteúdo
        // ajuste se você usar outro path ou outro campo no frontmatter
        if (!path.startsWith('/conteudos/') && fm.type !== 'conteudo') return

        const descSource: string = fm.description ?? (page.excerpt as string | undefined) ?? ''
        const description =
          descSource.trim() ||
          'Conteúdo produzido pelo LAME em parceria com diferentes iniciativas.'

        loaded.push({
          path: page.path,
          title: fm.title || page.title || 'Conteúdo',
          description,
          image: fm.cover || '/imgs/contents/default.png',
          badge: fm.badge || fm.tipo || undefined, // deixe assim pra aceitar "badge" ou "tipo" no MD
        })
      })
    )

    // opcional: ordenar por título ou outra coisa
    loaded.sort((a, b) => a.title.localeCompare(b.title, 'pt-BR'))
    contents.value = loaded
  })

  const filteredContents = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()

    return contents.value.filter(c => {
      // filtro por texto
      const txtFields = [c.title, c.description]
      const matchText = !q || txtFields.some(f => f.toLowerCase().includes(q))

      // filtro por badge
      let matchBadge = true
      if (badgeFilter.value !== 'all') {
        matchBadge = normalizeBadge(c.badge) === normalizeBadge(badgeFilter.value as string)
      }

      return matchText && matchBadge
    })
  })

  // sempre que mudar a busca, reseta badge? (opcional — aqui não)
  watch(searchQuery, () => {
    // se quiser resetar o filtro, descomente:
    // badgeFilter.value = 'all'
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
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease,
      border-color 0.15s ease, transform 0.1s ease;
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
