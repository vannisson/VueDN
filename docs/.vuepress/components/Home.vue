<template>
  <div class="page-wrapper">
    <img src="/imgs/home/background_sphere.svg" alt="" class="background-decor" />

    <!-- Alinhado ao header -->
    <v-container fluid class="general-container site-container">
      <!-- HERO: título + texto + imagem -->
      <v-row class="hero" align="center">
        <!-- Texto -->
        <v-col cols="12" md="6" lg="5">
          <h1 class="hero-title">
            Laboratório do<br />
            Manuscrito Escolar
          </h1>

          <p class="hero-text">
            O Laboratório do Manuscrito Escolar (LAME) é um espaço de pesquisa, formação e reflexão
            vinculado ao Centro de Pesquisa em Educação e Linguagem (CEPEL), Universidade Federal de
            Alagoas. Atuando de forma interdisciplinar junto ao Programa de Pós-Graduação em
            Educação (PPGE) e ao Programa de Pós-Graduação em Linguística e Literatura (PPGLL), o
            LAME se dedica ao estudo do manuscrito escolar como objeto pedagógico, histórico e
            linguístico.
          </p>

          <v-btn class="cta" prepend-icon="mdi-compass-outline" @click="router.push('/about/')">
            Conheça nossa história
          </v-btn>
        </v-col>

        <!-- Imagem -->
        <v-col cols="12" md="6" lg="6" class="d-flex justify-center">
          <v-img
            src="/imgs/home/home_01.png"
            class="hero-image"
            alt="Crianças estudando"
            width="100%"
            max-width="640"
            cover
          />
        </v-col>
      </v-row>

      <!-- CARDS -->

      <!-- BLOCO MEIO -->
      <div class="mid-bleed">
        <v-container class="site-container">
          <v-row class="mid-row" align="center">
            <!-- Imagem -->
            <v-col
              cols="12"
              md="6"
              lg="6"
              order="1"
              order-md="1"
              class="d-flex justify-center px-4"
            >
              <v-img
                src="/imgs/home/home_02.png"
                class="mid-image"
                alt="Crianças estudando"
                width="100%"
                max-width="640"
                cover
                loading="lazy"
              />
            </v-col>

            <!-- Texto -->
            <v-col cols="12" md="6" lg="5" order="2" order-md="2" class="px-4">
              <h2 class="section-title">O que estudamos?</h2>
              <p class="section-text">
                Os integrantes do LAME realizam pesquisas para aprofundar conhecimento sobre a
                gênese e a construção do manuscrito escolar, de modo a colaborar com a formação
                docente e com a aprendizagem discente. As pesquisas são realizadas a partir da
                análise multimodal do manuscrito escolar e das falas do professor em situações de
                produção textual. No LAME, também são analisados documentos curriculares e livros
                didáticos.
              </p>
              <v-btn
                class="cta"
                prepend-icon="mdi-account-group-outline"
                @click="router.push('/pesquisadores/')"
              >
                Conheça nossos pesquisadores
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <div class="cards-block">
        <v-row class="cards-row cards-row-primary" align="stretch" justify="center">
          <!-- PESQUISAS (LARANJA) -->
          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-pesquisas" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-orange">
                    <v-icon size="32" color="white">mdi-file-tree-outline</v-icon>
                  </div>

                  <p class="card-title">Pesquisas</p>
                  <p class="card-description">
                    Pesquisas e projetos de extensão coordenados pelo LAME, em parceria com escolas
                    e instituições no Brasil e no exterior.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill orange" to="/pesquisas/">
                    Saiba mais
                  </v-btn>
                </div>

                <div class="card-bottom-bar bar-orange" />
              </div>
            </v-card>
          </v-col>

          <!-- PUBLICAÇÕES (VERDE) -->
          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-publicacoes" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-green">
                    <v-icon size="32" color="white">mdi-book-open-variant</v-icon>
                  </div>

                  <p class="card-title">Publicações</p>
                  <p class="card-description">
                    Artigos, livros e capítulos que divulgam resultados das pesquisas do LAME e
                    apoiam o ensino e a aprendizagem de Língua Portuguesa.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill green" to="/publicacoes/">
                    Saiba mais
                  </v-btn>
                </div>

                <div class="card-bottom-bar bar-green" />
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-videos" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-blue">
                    <v-icon size="32" color="white">mdi-play-circle</v-icon>
                  </div>

                  <p class="card-title">Vídeos</p>
                  <p class="card-description">
                    Registros audiovisuais do LAME para apoiar pesquisas, formações e práticas em
                    sala de aula.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill blue" to="/videos/">
                    Saiba mais
                  </v-btn>
                </div>

                <div class="card-bottom-bar bar-blue" />
              </div>
            </v-card>
          </v-col>
        </v-row>

        <v-row class="cards-row cards-row-secondary" align="stretch" justify="center">
          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-noticias" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-gold">
                    <v-icon size="32" color="white">mdi-newspaper-variant-outline</v-icon>
                  </div>

                  <p class="card-title">Notícias</p>
                  <p class="card-description">
                    Comunicados e atualizações do LAME, com informações sobre eventos e atividades.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill gold" to="/noticias/">
                    Saiba mais
                  </v-btn>
                </div>

                <div class="card-bottom-bar bar-gold" />
              </div>
            </v-card>
          </v-col>

          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-materiais" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-cyan">
                    <v-icon size="32" color="white">mdi-file-document-multiple-outline</v-icon>
                  </div>

                  <p class="card-title">Materiais</p>
                  <p class="card-description">
                    Materiais de apoio, referências e recursos para formação e pesquisa no LAME.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill cyan" to="/materiais/">
                    Saiba mais
                  </v-btn>
                </div>

                <div class="card-bottom-bar bar-cyan" />
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- NOTÍCIAS -->
      <section class="news-strip">
        <div class="strip-inner">
          <div class="strip-header">
            <h2 class="section-title">Novidades do LAME</h2>

            <div class="strip-ctrls">
              <v-btn
                icon
                class="ctrl-btn"
                :disabled="atStart"
                @click="scroll(-1)"
                aria-label="Anterior"
              >
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>
              <v-btn
                icon
                class="ctrl-btn"
                :disabled="atEnd"
                @click="scroll(1)"
                aria-label="Próximo"
              >
                <v-icon>mdi-chevron-right</v-icon>
              </v-btn>
            </div>
          </div>

          <div class="float-nav">
            <v-btn icon class="ctrl-btn" :disabled="!hasOverflow || atStart" @click="scroll(-1)">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-btn icon class="ctrl-btn" :disabled="!hasOverflow || atEnd" @click="scroll(1)">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <div class="strip-viewport" ref="strip" @scroll="onScroll">
            <!-- Skeleton enquanto carrega -->
            <div
              v-if="newsLoading"
              class="strip-track"
              :style="{ '--cards-per-page': cardsPerPage }"
            >
              <SkeletonNewsCard v-for="i in cardsPerPage" :key="'skel-' + i" class="strip-card" />
            </div>

            <div v-else class="strip-track" :style="{ '--cards-per-page': cardsPerPage }">
              <template v-for="item in carouselItems" :key="item.key">
                <NewsCard v-if="item.type === 'item'" v-bind="item.data" class="strip-card" />
                <div v-else class="strip-filler" aria-hidden="true"></div>
              </template>
            </div>
          </div>

          <p class="strip-subtitle">Veja mais em:</p>
          <div class="strip-footer">
            <v-btn
              class="cta cta-blue"
              prepend-icon="mdi-play-circle"
              @click="router.push('/videos/')"
            >
              Vídeos
            </v-btn>
            <v-btn
              class="cta cta-gold"
              prepend-icon="mdi-newspaper-variant-outline"
              @click="router.push('/noticias/')"
            >
              Notícias
            </v-btn>
            <v-btn
              class="cta cta-cyan"
              prepend-icon="mdi-file-document-multiple-outline"
              @click="router.push('/materiais/')"
            >
              Materiais
            </v-btn>
          </div>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import NewsCard from '../components/NewsCard.vue'
  import SkeletonNewsCard from '../components/SkeletonNewsCard.vue'
  import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePageCache } from '../composables/usePageCache'

  const router = useRouter()
  const {
    cache,
    loading: cacheLoading,
    loaded: cacheLoaded,
    getByPrefix,
    whenReady,
  } = usePageCache()
  const newsLoading = ref(true)

  // ==== TIPAGEM DOS CARDS DO CARROSSEL ====
  type NewsItem = {
    image: string
    category: string
    title: string
    description: string
    date?: string
    categoryColor: string
    to?: string
  }

  // lista final usada no v-for
  const newsList = ref<NewsItem[]>([])

  // ==== helpers para montar os itens a partir dos MDs ====
  function normalizeType(value?: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

  function getCategoryAndColor(rawType?: string) {
    const norm = normalizeType(rawType)

    if (norm === 'noticia') {
      return { category: 'Notícia', categoryColor: 'notice' }
    }
    if (norm === 'video') {
      return { category: 'Vídeo', categoryColor: 'video' }
    }
    if (norm === 'material') {
      return { category: 'Material', categoryColor: 'material' }
    }

    return { category: 'Conteúdo', categoryColor: 'default' }
  }

  function parseDateFromPath(path?: string) {
    if (!path) return null
    const match = path.match(/\b(\d{4}-\d{2}-\d{2})\b/)
    if (!match) return null
    const d = new Date(match[1])
    return Number.isNaN(d.getTime()) ? null : d
  }

  function getSortKeyAndDate(fm: any, data: any) {
    const rawDate = fm.date ?? data?.git?.updatedTime ?? data?.git?.createdTime
    if (rawDate) {
      const d = new Date(rawDate as any)
      if (!Number.isNaN(d.getTime())) return { sortKey: d.getTime(), date: d }
    }

    const pathDate = parseDateFromPath(data?.path)
    if (pathDate) return { sortKey: pathDate.getTime(), date: pathDate }

    const now = new Date()
    return { sortKey: now.getTime(), date: now }
  }

  function loadNewsFromCache() {
    const formatDate = (d: Date) =>
      d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

    const entries: (NewsItem & { sortKey: number })[] = []
    const prefixes = ['/videos/', '/noticias/', '/materiais/']

    for (const prefix of prefixes) {
      const pages = getByPrefix(prefix)
      for (const page of pages) {
        const fm = page.frontmatter || {}
        if (fm.layout && fm.layout !== 'DetailContent') continue

        const type = normalizeType(fm.type)
        const { sortKey, date } = getSortKeyAndDate(fm, page)
        const { category, categoryColor } = getCategoryAndColor(type)

        entries.push({
          image: fm.cover || '',
          category,
          categoryColor,
          title: page.title || fm.title || '',
          description: fm.description || '',
          date: formatDate(date),
          to: page.path || '',
          sortKey,
        })
      }
    }

    entries.sort((a, b) => b.sortKey - a.sortKey)
    newsList.value = entries.slice(0, 9)
    newsLoading.value = false
  }

  // ==== carrossel (3 por vez com rolagem suave) ====
  const cardsPerPage = ref(3)
  const strip = ref<HTMLElement | null>(null)
  const atStart = ref(true)
  const atEnd = ref(false)
  const hasOverflow = ref(false)

  function resolveCardsPerPage(width: number) {
    if (width <= 600) return 1
    if (width <= 960) return 2
    return 3
  }

  function updateCardsPerPage() {
    const next = resolveCardsPerPage(window.innerWidth)
    if (cardsPerPage.value !== next) {
      cardsPerPage.value = next
      if (strip.value) strip.value.scrollLeft = 0
    }
    requestAnimationFrame(updateState)
  }

  const carouselItems = computed(() => {
    const total = newsList.value.length
    if (!total) return []
    const remainder = total % cardsPerPage.value
    const fillers = remainder === 0 ? 0 : cardsPerPage.value - remainder

    return [
      ...newsList.value.map((data, idx) => ({
        type: 'item',
        data,
        key: `item-${idx}`,
      })),
      ...Array.from({ length: fillers }, (_, idx) => ({
        type: 'filler',
        key: `filler-${idx}`,
      })),
    ]
  })

  function updateState() {
    const el = strip.value
    if (!el) return
    const eps = 2
    hasOverflow.value = el.scrollWidth - el.clientWidth > eps
    atStart.value = hasOverflow.value ? el.scrollLeft <= eps : true
    atEnd.value = hasOverflow.value ? el.scrollLeft + el.clientWidth >= el.scrollWidth - eps : true
  }

  function onScroll() {
    updateState()
  }

  function scroll(dir: -1 | 1) {
    const el = strip.value
    if (!el) return
    const amount = Math.round(el.clientWidth)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    setTimeout(updateState, 400)
  }

  onMounted(async () => {
    await nextTick()
    updateCardsPerPage()
    window.addEventListener('resize', updateCardsPerPage)

    // Espera o cache ficar pronto e carrega as notícias
    await whenReady()
    loadNewsFromCache()
  })

  // Recarrega quando o cache atualiza (ex: hot-reload)
  watch(cache, () => {
    if (cacheLoaded.value) loadNewsFromCache()
  })

  // Re-check scroll state whenever newsList changes (after async data loads)
  watch(newsList, async () => {
    await nextTick()
    if (strip.value) strip.value.scrollLeft = 0
    requestAnimationFrame(updateState)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateCardsPerPage)
  })
</script>

<style scoped>
  .site-container {
    max-width: 1280px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem) !important;
  }

  .page-wrapper {
    position: relative;
    overflow: hidden;
    background: #f6f6f6;
  }

  .background-decor {
    position: absolute;
    top: 5%;
    left: 60%;
    width: 50%;
    pointer-events: none;
    user-select: none;
    opacity: 0.9;
  }

  /* ============================= HERO ============================= */
  .hero {
    gap: clamp(1.25rem, 3vw, 3rem);
    padding: clamp(3rem, 6vw, 6rem) 0 clamp(4rem, 8vw, 8rem);
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2.625rem, 3.5vw + 1rem, 4rem);
    line-height: 1.08;
    color: #0a0e1c;
    margin: 0 0 1.25rem;
  }

  .hero-text {
    max-width: 58ch;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.75;
    color: #003b52;
    margin: 0 0 1.5rem;
  }

  .cta {
    background-color: #f68700 !important;
    color: #fff !important;
    height: 3rem;
    padding-inline: 2rem;
    border-radius: 30px;
    font-weight: 700;
    text-transform: none;
    box-shadow: 0 6px 16px rgba(246, 135, 0, 0.25);
    display: inline-flex;
    align-items: center;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 24px rgba(246, 135, 0, 0.35);
  }

  .cta .v-btn__content {
    gap: 0.5rem;
    align-items: center;
  }
  .cta .v-icon,
  .cta .material-symbols-rounded {
    font-size: 22px;
    line-height: 1;
    transform: translateY(1px);
  }

  .hero-image {
    border-radius: 40px 40px 10px 40px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
    overflow: hidden;
  }

  .hero-image,
  .mid-image {
    border-radius: 40px 40px 10px 40px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.14);
    overflow: hidden;
    transition: none !important;
    transform: none !important;
    pointer-events: none;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    .hero-image,
    .mid-image {
      border-width: 4px;
    }
  }

  @media (max-width: 960px) {
    .hero {
      text-align: center;
      justify-content: center;
    }

    .hero-title,
    .hero-text {
      margin-inline: auto;
    }

    .hero-image {
      margin-top: 2.5rem;
    }
  }

  /* ===== MOBILE (<=600px) ===== */
  @media (max-width: 600px) {
    .cta {
      width: 100%;
      max-width: 340px;
      min-height: 52px;
      height: auto;
      padding-inline: clamp(16px, 6vw, 22px);
      border-radius: 999px;
      font-size: clamp(0.95rem, 3.7vw, 1.05rem);
      margin-inline: auto;
      box-shadow: 0 8px 20px rgba(246, 135, 0, 0.28);
      white-space: nowrap;
    }
    .cta .v-btn__content {
      gap: 0.4rem;
    }
    .cta .v-icon,
    .cta .material-symbols-rounded {
      font-size: 20px;
      transform: translateY(0.5px);
    }
  }

  @media (max-width: 360px) {
    .cta {
      white-space: normal;
    }
  }

  /* ============================= CARDS (PESQUISAS / PUBLICACOES / VIDEOS / NOTICIAS / MATERIAIS) ============================= */
  .cards-block {
    padding: clamp(3.5rem, 6vw, 5.5rem) 0;
  }

  .cards-row {
    row-gap: 1.5rem;
  }

  .cards-row-primary {
    margin-bottom: 1.5rem;
  }

  .card-col {
    display: flex;
    justify-content: center;
  }

  .custom-card {
    width: 100%;
    max-width: 310px;
    min-height: 370px;
    background: #fff;
    border-radius: 22px;
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.2s ease;
  }

  .custom-card:hover {
    transform: translateY(-3px);
  }

  .card-inner {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-content {
    flex: 1 1 auto;
    padding: 20px 20px 0;
    text-align: center;
  }

  /* Icones circulares */
  .card-icon-wrapper {
    width: 62px;
    height: 62px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.6rem auto 0.75rem;
  }

  .icon-blue {
    background: #2563eb;
  }

  .icon-orange {
    background: #f68700;
  }

  .icon-green {
    background: #56b057;
  }

  .icon-gold {
    background: #ca8a04;
  }

  .icon-cyan {
    background: #0891b2;
  }

  /* Titulos */
  .card-title {
    margin-top: 0.4rem;
    font-weight: 800;
    font-size: 1.2rem;
    line-height: 1.2;
    color: #0a0e1c;
    margin-bottom: 1.25rem;
  }

  .card-description {
    max-width: 32ch;
    margin: 0 auto;
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.5;
    color: #003b52;
    min-height: 84px;
  }

  /* Acoes (Saiba mais) */
  .card-actions {
    padding: 0 20px 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* BOTAO PILL */
  .card-link.pill {
    border-radius: 999px;
    font-weight: 700;
    font-size: 0.95rem;
    text-transform: none;
    text-decoration: none !important;
    padding: 0.45rem 1.4rem;
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease,
      filter 0.2s ease;
  }

  .card-link.pill:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.16);
    text-decoration: none !important;
  }

  .card-link.pill * {
    text-decoration: none !important;
  }

  /* CORES DOS BOTOES */
  .card-link.pill.blue {
    background: #2563eb !important;
    color: #ffffff !important;
  }
  .card-link.pill.orange {
    background: #f68700 !important;
    color: #ffffff !important;
  }
  .card-link.pill.green {
    background: #56b057 !important;
    color: #ffffff !important;
  }
  .card-link.pill.gold {
    background: #ca8a04 !important;
    color: #ffffff !important;
  }
  .card-link.pill.cyan {
    background: #0891b2 !important;
    color: #ffffff !important;
  }

  /* Barrinha inferior colorida */
  .card-bottom-bar {
    height: 6px;
    width: 100%;
  }

  .bar-blue {
    background: #2563eb;
  }
  .bar-orange {
    background: #f68700;
  }
  .bar-green {
    background: #56b057;
  }
  .bar-gold {
    background: #ca8a04;
  }
  .bar-cyan {
    background: #0891b2;
  }

  @media (max-width: 960px) {
    .custom-card {
      max-width: 100%;
      min-height: 440px;
    }
  }

  /* ============================= BLOCO MEIO ============================= */
  .mid-row {
    position: relative;
    z-index: 1;
    background: transparent;
    gap: clamp(3rem, 6vw, 6rem);
  }

  .mid-image {
    border-radius: 40px 10px 40px 40px;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
  }

  .section-title {
    font-weight: 700;
    font-size: clamp(2rem, 2.5vw + 1rem, 3rem);
    line-height: 1.12;
    color: #0a0e1c;
    margin: 0 0 1rem;
  }

  .section-text {
    max-width: 60ch;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.75;
    color: #003b52;
    margin: 0 0 1.5rem;
  }

  .mid-bleed {
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;

    background: #fff;
    padding-block: clamp(2rem, 6vw, 4rem);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  }

  /* ============================= CARROSSEL DE CONTEUDOS ============================= */
  .news-strip {
    position: relative;
    margin: 0;
    background: #ffffff;
    padding: 3.5rem 0 4.5rem;

    /* full-bleed background to reach footer */
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    width: 100vw;
  }

  .strip-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  .strip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 0;
    margin-bottom: 0.5rem;
  }

  .strip-ctrls .ctrl-btn {
    background: #fff;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.12);
    margin-left: 0.25rem;
  }

  .strip-viewport {
    overflow-x: auto;
    overflow-y: visible;
    scroll-behavior: smooth;
    padding-block: 0.25rem 1rem;
    scrollbar-width: none;
    margin: 2rem 0 3rem 0;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
  .strip-viewport::-webkit-scrollbar {
    display: none;
  }

  .strip-track {
    display: grid;
    grid-auto-flow: column;
    --strip-gap: 16px;
    gap: var(--strip-gap);
    grid-auto-columns: calc(
      (100% - (var(--strip-gap) * (var(--cards-per-page, 3) - 1))) / var(--cards-per-page, 3)
    );
    padding-inline: 0;
  }

  .strip-card {
    width: 100%;
  }

  .strip-filler {
    width: 100%;
    min-height: 1px;
    visibility: hidden;
    pointer-events: none;
  }

  .strip-subtitle {
    text-align: center;
    font-weight: 600;
    font-size: 1.1rem;
    color: #003b52;
    margin-bottom: 2rem;
  }

  .strip-footer {
    display: flex;
    justify-content: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .strip-footer .cta {
    height: 2.75rem;
  }

  .cta-blue {
    background-color: #2563eb !important;
    box-shadow: 0 6px 16px rgba(37, 99, 235, 0.25);
  }

  .cta-blue:hover {
    box-shadow: 0 10px 24px rgba(37, 99, 235, 0.35);
  }

  .cta-gold {
    background-color: #ca8a04 !important;
    box-shadow: 0 6px 16px rgba(202, 138, 4, 0.25);
  }

  .cta-gold:hover {
    box-shadow: 0 10px 24px rgba(202, 138, 4, 0.35);
  }

  .cta-cyan {
    background-color: #0891b2 !important;
    box-shadow: 0 6px 16px rgba(8, 145, 178, 0.25);
  }

  .cta-cyan:hover {
    box-shadow: 0 10px 24px rgba(8, 145, 178, 0.35);
  }

  .float-nav {
    display: none;
  }

  @media (max-width: 600px) {
    .strip-header .strip-ctrls {
      display: none;
    }

    .float-nav {
      position: absolute;
      top: 4.5rem;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: 0.25rem;
      pointer-events: none;
      z-index: 3;
    }
    .float-nav .ctrl-btn {
      pointer-events: auto;
      width: 36px;
      height: 36px;
      min-width: 36px;
      border-radius: 999px;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.18);
      background: #fff;
    }

    .strip-track {
      --strip-gap: 10px;
      gap: var(--strip-gap);
    }
  }

  @media (min-width: 601px) and (max-width: 960px) {
    .strip-track {
      --strip-gap: 14px;
      gap: var(--strip-gap);
    }
  }

  /* ============================= OUTROS ============================= */
  .content-row {
    padding: 2rem 0 6rem;
  }

  @media (max-width: 960px) {
    .hero {
      padding-top: 3.5rem;
    }
    .hero-image,
    .mid-image {
      max-width: 520px;
    }
  }

  @media (max-width: 600px) {
    .hero-title {
      line-height: 1.05;
    }
    .hero-text,
    .section-text {
      max-width: 100%;
    }
  }
</style>
