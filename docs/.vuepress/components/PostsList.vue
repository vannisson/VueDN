<template>
  <div class="page-wrapper posts-page" :style="accentStyle">
    <!-- ============ HERO ============ -->
    <section class="hero">
      <v-container class="site-container">
        <p class="hero-title">{{ title }}</p>
        <p v-if="subtitle || highlight" class="hero-subtitle">
          <span>{{ subtitle }}</span>
          <span v-if="highlight" class="hero-highlight">{{ highlight }}</span>
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

    <!-- ============ LISTA DE POSTS ============ -->
    <section class="section-posts">
      <v-container class="site-container">
        <!-- Skeleton enquanto carrega -->
        <div v-if="isLoading" class="posts-list">
          <div v-for="i in 4" :key="'skel-' + i" class="post-card-link">
            <SkeletonCard variant="post" />
          </div>
        </div>

        <div v-else class="posts-list" :class="{ 'list-empty': !filteredPosts.length }">
          <RouterLink
            v-for="item in visiblePosts"
            :key="item.title"
            :to="item.path"
            class="post-card-link"
          >
            <article class="post-card">
              <div class="post-main">
                <h2 class="post-title">{{ item.title }}</h2>
                <hr class="post-divider" />
                <p class="post-desc">
                  {{ item.description }}
                </p>

                <div class="post-footer">
                  <span class="post-more-btn">Ver mais</span>
                  <span v-if="item.date" class="post-date">{{ item.date }}</span>
                </div>
              </div>

              <div class="post-media">
                <v-img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.title"
                  cover
                  class="post-img"
                  :draggable="false"
                  loading="lazy"
                />
                <div v-else class="post-placeholder">
                  <v-icon size="48" color="#ffffff">{{ placeholderIcon }}</v-icon>
                </div>
              </div>
            </article>
          </RouterLink>
        </div>

        <div v-if="!filteredPosts.length" class="empty-state">
          <v-icon size="48" color="#b0bec5" class="empty-icon">mdi-text-search</v-icon>
          <p class="empty-title">Nenhum conteúdo encontrado</p>
          <p class="empty-subtitle">Não encontramos resultados para "{{ searchQuery }}".</p>
        </div>

        <div v-if="filteredPosts.length" class="pagination-wrapper">
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
            <label for="post-page-input">Ir para</label>
            <input
              id="post-page-input"
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
            Proxima
            <v-icon size="16" class="ml-1">mdi-chevron-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import SkeletonCard from '../components/SkeletonCard.vue'
  import { ref, computed, watch, onMounted } from 'vue'
  import { usePageCache } from '../composables/usePageCache'

  type PostCard = {
    title: string
    description: string
    image: string
    path: string
    sortKey: number
    date: string
  }

  const props = withDefaults(
    defineProps<{
      title: string
      subtitle?: string
      highlight?: string
      type: string
      basePath: string
      accentColor?: string
    }>(),
    {
      subtitle: '',
      highlight: '',
      accentColor: '#2563eb',
    }
  )

  const searchQuery = ref('')
  const posts = ref<PostCard[]>([])
  const isLoading = ref(true)
  const PAGE_SIZE = 6
  const currentPage = ref(1)

  const accentStyle = computed(() => ({
    '--accent-color': props.accentColor || '#2563eb',
  }))

  const placeholderIcon = computed(() => {
    const norm = normalizeType(props.type)
    if (norm === 'video') return 'mdi-filmstrip'
    if (norm === 'noticia') return 'mdi-newspaper-variant-outline'
    if (norm === 'material') return 'mdi-folder-open-outline'
    return 'mdi-book-open-page-variant-outline'
  })

  function normalizeType(value?: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

  function parseDateFromPath(path?: string) {
    if (!path) return null
    const match = path.match(/\b(\d{4}-\d{2}-\d{2})\b/)
    if (!match) return null
    const d = new Date(match[1])
    return Number.isNaN(d.getTime()) ? null : d
  }

  function formatDate(ts: number): string {
    if (!ts) return ''
    const d = new Date(ts)
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  function getSortKey(fm: any, data: any) {
    const rawDate = fm.date ?? data?.git?.updatedTime ?? data?.git?.createdTime
    if (rawDate) {
      const d = new Date(rawDate as any)
      if (!Number.isNaN(d.getTime())) return d.getTime()
    }
    const pathDate = parseDateFromPath(data?.path)
    return pathDate ? pathDate.getTime() : 0
  }

  const { cache, loaded: cacheLoaded, getByPrefix, whenReady } = usePageCache()

  function buildPosts() {
    const pages = getByPrefix(props.basePath)
    const list: PostCard[] = []
    const normalizedType = normalizeType(props.type)

    for (const page of pages) {
      const fm = page.frontmatter || {}
      const type = normalizeType(fm.type)
      if (type !== normalizedType) continue
      if (fm.layout && fm.layout !== 'DetailContent') continue

      const sortKey = getSortKey(fm, page)

      list.push({
        title: page.title || fm.title || '',
        description: fm.description || '',
        image: fm.cover || '',
        path: page.path,
        sortKey,
        date: formatDate(sortKey),
      })
    }

    list.sort((a, b) => b.sortKey - a.sortKey)
    posts.value = list
    isLoading.value = false
  }

  whenReady().then(() => buildPosts())

  watch(cache, () => {
    if (cacheLoaded.value) buildPosts()
  })

  const filteredPosts = computed(() => {
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return posts.value

    return posts.value.filter(p => {
      const fields = [p.title, p.description]
      return fields.some(f => f.toLowerCase().includes(q))
    })
  })

  const totalPages = computed(() => Math.max(1, Math.ceil(filteredPosts.value.length / PAGE_SIZE)))

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

  const visiblePosts = computed(() => {
    const start = (currentPage.value - 1) * PAGE_SIZE
    return filteredPosts.value.slice(start, start + PAGE_SIZE)
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

  watch(searchQuery, () => {
    currentPage.value = 1
  })
</script>

<style scoped>
  .posts-page {
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
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    justify-content: center;
  }

  .hero-highlight {
    color: var(--accent-color, #2563eb);
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

  /* LISTA DE CARDS */
  .section-posts {
    background: #f3f4f6;
    padding-bottom: 4rem;
    min-height: calc(100vh - 320px);
    display: flex;
    flex-direction: column;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    margin-top: 1.75rem;
    min-height: 1020px;
  }

  .posts-list.list-empty {
    min-height: 0;
  }

  .post-card-link {
    text-decoration: none !important;
    color: inherit;
    cursor: pointer;
  }

  .post-card-link:hover,
  .post-card-link:focus,
  .post-card-link:active {
    text-decoration: none !important;
  }

  .post-card-link * {
    text-decoration: none !important;
  }

  .post-card {
    display: grid;
    grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
    border-radius: 26px;
    background: #ffffff;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    cursor: pointer;
  }

  .post-main {
    padding: 1.4rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .post-title {
    font-weight: 700;
    font-size: 1.4rem;
    color: #111827;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-divider {
    border: none;
    border-top: 2px solid var(--accent-color, #2563eb);
    opacity: 0.35;
    margin: 0.25rem 0 0.35rem;
    width: 100%;
  }

  .post-desc {
    font-size: 0.92rem;
    line-height: 1.65;
    color: #4b5563;
    margin: 0 0 0.7rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .post-more-btn {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.45rem 1.4rem;
    border-radius: 999px;
    background: var(--accent-color, #2563eb);
    color: #ffffff;
    font-size: 0.85rem;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    border: none;
    transition: opacity 0.15s ease;
  }

  .post-more-btn:hover {
    opacity: 0.88;
  }

  .post-date {
    font-size: 0.82rem;
    color: #9ca3af;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .post-media {
    position: relative;
    min-height: 170px;
  }

  .post-img {
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
  }

  .post-placeholder {
    width: 100%;
    height: 100%;
    min-height: 170px;
    background: var(--accent-color, #9ca3af);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .post-placeholder .v-icon {
    text-decoration: none !important;
  }

  .empty-state {
    min-height: 350px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 0.5rem;
    padding: 3rem 1rem;
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

  /* PAGINACAO */
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
    border-color: var(--accent-color, #2563eb);
    color: var(--accent-color, #2563eb);
  }

  .page-number.active {
    background: var(--accent-color, #2563eb);
    border-color: var(--accent-color, #2563eb);
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

  /* RESPONSIVO */
  @media (max-width: 700px) {
    .hero {
      padding-top: 88px;
    }

    .hero-title,
    .hero-subtitle {
      text-align: left;
      justify-content: flex-start;
    }

    .hero-search {
      justify-content: flex-start;
    }
  }

  @media (max-width: 900px) {
    .post-card {
      grid-template-columns: 1fr;
    }
  }
</style>
