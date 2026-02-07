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
      <div class="cards-block">
        <v-row class="cards-row cards-row-primary" align="stretch" justify="center">
          <!-- PROJETOS (LARANJA) -->
          <v-col cols="12" sm="6" md="4" class="card-col d-flex">
            <v-card class="custom-card card-projetos" elevation="3">
              <div class="card-inner">
                <div class="card-content">
                  <div class="card-icon-wrapper icon-orange">
                    <v-icon size="32" color="white">mdi-file-tree-outline</v-icon>
                  </div>

                  <p class="card-title">Projetos</p>
                  <p class="card-description">
                    Projetos de pesquisa e extensão coordenados pelo LAME, em parceria com escolas e
                    instituições no Brasil e no exterior.
                  </p>
                </div>

                <div class="card-actions">
                  <v-btn variant="flat" class="card-link pill orange" to="/projetos/">
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
              />
            </v-col>

            <!-- Texto -->
            <v-col cols="12" md="6" lg="5" order="2" order-md="2" class="px-4">
              <h2 class="section-title">Realizando estudos para...</h2>
              <p class="section-text">
                Os integrantes do LAME realizam pesquisas para aprofundar conhecimento sobre a
                gênese e a construção do manuscrito escolar, de modo a colaborar com formação
                docente e aprendizagem discente. As pesquisas são realizadas a partir da análise
                multimodal do manuscrito escolar e das falas docentes em situações de produção
                textual. No LAME, também são analisados documentos didático-curriculares, como
                livros didáticos.
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

      <!-- NOTÍCIAS -->
      <section class="news-strip">
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
            <v-btn icon class="ctrl-btn" :disabled="atEnd" @click="scroll(1)" aria-label="Próximo">
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
          <div class="strip-track">
            <NewsCard v-for="(item, i) in newsList" :key="i" v-bind="item" class="strip-card" />
          </div>
        </div>

        <div class="strip-fade left" :class="{ show: !atStart }"></div>
        <div class="strip-fade right" :class="{ show: !atEnd }"></div>

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
      </section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import NewsCard from '../components/NewsCard.vue'
  import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
  import { useRouter } from 'vue-router'
  import { usePagesData } from '@vuepress/client'

  const router = useRouter()

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

  const pagesData = usePagesData()

  async function loadNewsFromPages() {
    const entries: (NewsItem & { sortKey: number })[] = []

    const formatDate = (d: Date) =>
      d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

    // pagesData keys are internal VuePress keys (e.g. "v-5d45ffb4"),
    // NOT page paths. We must load each page and check data.path.
    const allLoaders = Object.values(pagesData.value || {})
    for (const load of allLoaders) {
      if (typeof load !== 'function') continue

      try {
        const data: any = await load()
        if (!data || typeof data.path !== 'string') continue

        const pagePath = data.path

        // Only include posts from videos, noticias, materiais
        if (
          !pagePath.startsWith('/videos/') &&
          !pagePath.startsWith('/noticias/') &&
          !pagePath.startsWith('/materiais/')
        ) {
          continue
        }

        // Skip listing pages (the README.md that renders PostsList)
        if (pagePath === '/videos/' || pagePath === '/noticias/' || pagePath === '/materiais/') {
          continue
        }

        const fm = data.frontmatter || {}
        if (fm.layout && fm.layout !== 'DetailContent') continue

        const type = normalizeType(fm.type)
        const { sortKey, date } = getSortKeyAndDate(fm, data)
        const { category, categoryColor } = getCategoryAndColor(type)

        entries.push({
          image: fm.cover || '',
          category,
          categoryColor,
          title: data.title || fm.title || '',
          description: fm.description || '',
          date: formatDate(date),
          to: data.path || '',
          sortKey,
        })
      } catch (e) {
        // ignore broken loader
      }
    }

    entries.sort((a, b) => b.sortKey - a.sortKey)
    newsList.value = entries.slice(0, 9)
  }

  // ==== lógica de scroll do carrossel ====
  const strip = ref<HTMLElement | null>(null)
  const atStart = ref(true)
  const atEnd = ref(false)
  const hasOverflow = ref(false)

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
    const amount = Math.round(el.clientWidth * 0.85)
    el.scrollBy({ left: dir * amount, behavior: 'smooth' })
    setTimeout(updateState, 400)
  }

  onMounted(async () => {
    // espera layout e imagens para medir o overflow corretamente
    await nextTick()
    requestAnimationFrame(updateState)
    window.addEventListener('resize', updateState)
  })

  watch(
    pagesData,
    () => {
      loadNewsFromPages() // carrega conteúdos em ordem decrescente de data
    },
    { immediate: true }
  )

  // Re-check scroll state whenever newsList changes (after async data loads)
  watch(newsList, async () => {
    await nextTick()
    requestAnimationFrame(() => {
      updateState()
      // Double-check after images may have loaded
      setTimeout(updateState, 500)
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateState)
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
    transition: transform 0.2s ease, box-shadow 0.2s ease;
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

  /* ============================= CARDS (PROJETOS / PUBLICACOES / VIDEOS / NOTICIAS / MATERIAIS) ============================= */
  .cards-block {
    padding: clamp(1.5rem, 4vw, 2.5rem) 0 clamp(3.5rem, 7vw, 6rem);
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
    margin: 4rem 0 6rem;
    background: #f6f6f6;
  }

  .strip-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-inline: 1rem;
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
    padding-left: 1rem;
    padding-right: 1rem;
  }
  .strip-viewport::-webkit-scrollbar {
    display: none;
  }

  .strip-track {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: clamp(280px, 32vw, 360px);
    gap: 16px;
    padding-inline: 1rem;
  }

  .strip-card {
    width: 100%;
  }

  .strip-fade {
    pointer-events: none;
    position: absolute;
    top: 64px;
    bottom: 56px;
    width: 48px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }
  .strip-fade.show {
    opacity: 1;
  }

  .strip-fade.left {
    left: 0;
    background: linear-gradient(to right, rgba(246, 246, 246, 1), rgba(246, 246, 246, 0));
  }
  .strip-fade.right {
    right: 0;
    background: linear-gradient(to left, rgba(246, 246, 246, 1), rgba(246, 246, 246, 0));
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
      grid-auto-columns: clamp(260px, 88vw, 340px);
      gap: 10px;
    }

    .strip-fade {
      width: 32px;
      top: 4.25rem;
      bottom: 64px;
    }
  }

  @media (min-width: 601px) and (max-width: 960px) {
    .strip-track {
      grid-auto-columns: clamp(300px, 45vw, 360px);
      gap: 14px;
    }
    .strip-fade {
      width: 44px;
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
