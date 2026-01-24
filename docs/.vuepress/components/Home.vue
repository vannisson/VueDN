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
      <v-row class="cards-row" align="stretch" justify="space-between">
        <!-- CONTEÚDOS (AZUL) -->

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
                <v-btn variant="text" class="card-link orange" to="/projetos/"> Saiba mais </v-btn>
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
                  Artigos, livros e capítulos que divulgam resultados das pesquisas do LAME e apoiam
                  o ensino e a aprendizagem de Língua Portuguesa.
                </p>
              </div>

              <div class="card-actions">
                <v-btn variant="text" class="card-link green" to="/publicacoes/">
                  Saiba mais
                </v-btn>
              </div>

              <div class="card-bottom-bar bar-green" />
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="card-col d-flex">
          <v-card class="custom-card card-conteudos" elevation="3">
            <div class="card-inner">
              <div class="card-content">
                <div class="card-icon-wrapper icon-blue">
                  <v-icon size="32" color="white">mdi-library-outline</v-icon>
                </div>

                <p class="card-title">Vídeos e Notícias</p>
                <p class="card-description">
                  Vídeos e notícias produzidos pelo LAME para apoiar pesquisas, formações e práticas
                  em sala de aula.
                </p>
              </div>

              <div class="card-actions">
                <v-btn variant="text" class="card-link blue" to="/conteudos/"> Saiba mais </v-btn>
              </div>

              <div class="card-bottom-bar bar-blue" />
            </div>
          </v-card>
        </v-col>
      </v-row>

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
          <h2 class="section-title">Últimos Vídeos e Notícias</h2>

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

        <div class="strip-footer">
          <v-btn class="cta" prepend-icon="mdi-library-outline" @click="router.push('/conteudos/')">
            Veja mais conteúdos
          </v-btn>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import NewsCard from '../components/NewsCard.vue'
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
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
  function normalizeBadge(value?: string) {
    return (value || '')
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
  }

  function getCategoryAndColor(rawBadge?: string) {
    const norm = normalizeBadge(rawBadge)

    if (norm === 'noticia') {
      return { category: 'Notícia', categoryColor: 'notice' }
    }
    if (norm === 'video') {
      return { category: 'Vídeo', categoryColor: 'audio' }
    }
    if (norm === 'material') {
      return { category: 'Material', categoryColor: 'material' }
    }

    return { category: 'Conteúdo', categoryColor: 'default' }
  }

  async function loadNewsFromPages() {
    const entries: (NewsItem & { sortKey: number })[] = []
    const today = new Date()

    const formatDate = (d: Date) =>
      d.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })

    const pushItem = (item: any) => {
      const rawBadge = item.badge || item.category
      const { category, categoryColor } = getCategoryAndColor(rawBadge)
      const rawDate = item.date
      let sortKey = today.getTime()
      let formattedDate = formatDate(today)

      if (rawDate) {
        const d = new Date(rawDate as any)
        if (!Number.isNaN(d.getTime())) {
          sortKey = d.getTime()
          formattedDate = formatDate(d)
        } else {
          formattedDate = String(rawDate)
        }
      }

      entries.push({
        image: item.image || '/imgs/contents/default.png',
        category,
        categoryColor,
        title: item.title || 'Conteúdo',
        description: item.description || 'Conteúdo produzido pelo LAME.',
        date: formattedDate,
        to: item.path || '',
        sortKey,
      })
    }

    const pagesData = usePagesData()
    const loaders = Object.values(pagesData)
    for (const load of loaders) {
      try {
        const data: any = await load()
        if (
          typeof data?.path === 'string' &&
          data.path.startsWith('/conteudos/') &&
          (data.frontmatter?.layout === 'DetailContent' || data.frontmatter?.type === 'conteudo')
        ) {
          pushItem({
            title: data.title || data.frontmatter?.title,
            description: data.frontmatter?.description,
            image: data.frontmatter?.cover,
            badge: data.frontmatter?.badge,
            date: data.frontmatter?.date,
            path: data.path,
          })
        }
      } catch (e) {
        // ignore broken loader
      }
    }

    entries.sort((a, b) => b.sortKey - a.sortKey)
    newsList.value = entries.slice(0, 10)
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
    loadNewsFromPages() // carrega conteúdos em ordem decrescente de data

    // espera layout e imagens para medir o overflow corretamente
    await nextTick()
    requestAnimationFrame(updateState)
    window.addEventListener('resize', updateState)
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
    bottom: 48%;
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

  /* ============================= CARDS (CONTEÚDOS / PROJETOS / PUBLICAÇÕES) ============================= */
  /* ============================= CARDS (CONTEÚDOS / PROJETOS / PUBLICAÇÕES) ============================= */
  .cards-row {
    padding: clamp(1.5rem, 4vw, 2.5rem) 0 clamp(3.5rem, 7vw, 6rem);
  }

  .card-col {
    display: flex;
    justify-content: center;
  }

  .custom-card {
    width: 100%;
    max-width: 360px;
    min-height: 420px;
    background: #fff;
    border-radius: 24px;
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

  /* Ícones circulares */
  .card-icon-wrapper {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.75rem auto 1rem;
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

  /* Títulos */
  .card-title {
    margin-top: 0.5rem;
    font-weight: 800;
    font-size: 1.35rem;
    line-height: 1.2;
    color: #0a0e1c;
    margin-bottom: 1.5rem;
  }

  .card-description {
    max-width: 34ch;
    margin: 0 auto;
    font-weight: 400;
    font-size: 0.97rem;
    line-height: 1.55;
    color: #003b52;

    /* garante altura parecida entre os três textos */
    min-height: 96px;
  }

  /* Ações (Saiba mais) */
  .card-actions {
    padding: 0 20px 22px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  /* BOTÃO TRANSPARENTE — apenas texto colorido */
  .card-link {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;

    font-weight: 700;
    font-size: 1.05rem;
    text-transform: none;
    padding: 0;
    cursor: pointer;
    transition:
      color 0.2s ease,
      transform 0.2s ease;

    /* sobe o texto */
    margin-bottom: 4px;
  }

  /* CORES DO TEXTO */
  .card-link.blue {
    color: #2563eb !important;
  }
  .card-link.orange {
    color: #f68700 !important;
  }
  .card-link.green {
    color: #56b057 !important;
  }

  /* ===== HOVER (texto mais escuro, leve lift) ===== */
  .card-link.blue:hover {
    color: #1d4fc4 !important;
    transform: translateY(-2px);
  }

  .card-link.orange:hover {
    color: #d96f00 !important;
    transform: translateY(-2px);
  }

  .card-link.green:hover {
    color: #449b45 !important;
    transform: translateY(-2px);
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

  /* ============================= CARROSSEL DE CONTEÚDOS ============================= */
  .news-strip {
    position: relative;
    margin: 4rem 0;
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

  .strip-footer {
    display: flex;
    justify-content: center;
  }

  .strip-footer .cta {
    background-color: #2563eb !important;
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
