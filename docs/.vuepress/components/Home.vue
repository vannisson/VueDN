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
            Alagoas (Ufal). Atuando de forma interdisciplinar junto ao Programa de Pós-Graduação em
            Educação (PPGE) e ao Programa de Pós-Graduação em Linguística e Literatura (PPGLL), o
            LAME se dedica ao estudo do manuscrito escolar como objeto pedagógico, histórico e
            linguístico.
          </p>

          <v-btn class="cta" prepend-icon="mdi-compass-outline">Conheça nossos projetos</v-btn>
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
        <v-col cols="12" sm="6" md="4" class="card-col d-flex">
          <v-card class="custom-card card-a" elevation="3">
            <div class="card-inner">
              <div class="card-content">
                <v-img src="/imgs/home/icon_green.svg" width="72" class="card-icon" alt="" />
                <p class="card-title">Pesquisadores</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>

              <div class="card-actions">
                <v-btn variant="text" class="card-link">Saiba mais</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="card-col d-flex">
          <v-card class="custom-card card-b" elevation="3">
            <div class="card-inner">
              <div class="card-content">
                <v-img src="/imgs/home/icon_orange.svg" width="72" class="card-icon" alt="" />
                <p class="card-title">O que é o LAME?</p>
                <p class="card-description">
                  Espaço de pesquisa, formação e reflexão vinculado à Universidade Federal de
                  Alagoas, dedicado ao estudo da escrita escolar como expressão pedagógica,
                  histórica e linguística. No LAME, cada manuscrito revela saberes em construção.
                </p>
              </div>

              <div class="card-actions">
                <v-btn variant="text" class="card-link">Saiba mais</v-btn>
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6" md="4" class="card-col d-flex">
          <v-card class="custom-card card-c" elevation="3">
            <div class="card-inner">
              <div class="card-content">
                <v-img src="/imgs/home/icon_blue.svg" width="72" class="card-icon" alt="" />
                <p class="card-title">Nossos projetos</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>

              <div class="card-actions">
                <v-btn variant="text" class="card-link">Saiba mais</v-btn>
              </div>
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
                Quais são as primeiras palavras escritas por uma criança? Quantas tentativas são
                necessárias para que ela formule corretamente uma frase? A interação pedagógica é
                muito distinta entre os países do globo? Essas e outras indagações são temáticas
                discutidas pelo Laboratório do Manuscrito Escolar (LAME).
              </p>
              <v-btn class="cta" prepend-icon="mdi-compass-outline">
                Conheça nossos projetos
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- NOTÍCIAS -->
      <section class="news-strip">
        <div class="strip-header">
          <h2 class="section-title">Últimos Conteúdos</h2>

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
          <v-btn class="cta" prepend-icon="mdi-library-outline">Veja mais conteúdos</v-btn>
        </div>
      </section>
    </v-container>
  </div>
</template>

<script setup lang="ts">
  import NewsCard from '../components/NewsCard.vue'

  const newsList = [
    {
      image: '/imgs/home/home_03.png',
      category: 'Notícia',
      title: 'Pesquisa internacional do LAME integrará 4ª jornada do manuscrito escolar.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et.',
      date: '22/01/2024',
      categoryColor: 'notice',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2024',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2024',
      categoryColor: 'audio',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2025',
      categoryColor: 'audio',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2025',
      categoryColor: 'audio',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2025',
      categoryColor: 'audio',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2025',
      categoryColor: 'audio',
    },
    {
      image: '/imgs/home/home_03.png',
      category: 'Aula',
      title: 'Aula LAME 2025',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/01/2025',
      categoryColor: 'audio',
    },
  ]

  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

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
    // após a animação, recalcule
    setTimeout(updateState, 400)
  }

  onMounted(async () => {
    // espera layout e imagens
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
    display: inline-flex; /* garante alinhamento do ícone com o texto */
    align-items: center;
  }

  /* alinhamento fino entre ícone e label */
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
    transition: none !important; /* remove transições */
    transform: none !important; /* impede animação de scale */
    pointer-events: none; /* evita clique ou hover */
    object-fit: cover; /* mantém o enquadramento correto */
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
      max-width: 340px; /* largura agradável pro mobile */
      min-height: 52px; /* área de toque confortável */
      height: auto;
      padding-inline: clamp(16px, 6vw, 22px);
      border-radius: 999px; /* pílula */
      font-size: clamp(0.95rem, 3.7vw, 1.05rem); /* texto responsivo */
      margin-inline: auto; /* centraliza */
      box-shadow: 0 8px 20px rgba(246, 135, 0, 0.28); /* leve upgrade na sombra */
      white-space: nowrap; /* evita quebra feia quando couber */
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

  /* telas ultra estreitas: liberar quebra quando necessário */
  @media (max-width: 360px) {
    .cta {
      white-space: normal;
    }
  }

  /* ===== Cards ===== */
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
    min-height: 400px;
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 10px 18px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    transition: transform 0.2s ease;
  }
  .custom-card:hover {
    transform: translateY(-2px);
  }

  .card-a {
    --hover-color: #56b057;
    border-radius: 12px 24px 24px 24px;
  }
  .card-b {
    --hover-color: #f68700;
    border-radius: 24px;
  }
  .card-c {
    --hover-color: #0056d2;
    border-radius: 24px 12px 24px 24px;
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

  .card-actions {
    padding: 0 20px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .card-icon {
    margin: 0.75rem auto 1rem;
    pointer-events: none;
  }

  .card-title {
    margin-top: 0.5rem;
    font-weight: 800;
    font-size: 1.35rem;
    line-height: 1.2;
    color: #0a0e1c;
    margin-bottom: 1.5rem;
  }

  .card-description {
    max-width: 36ch;
    margin: 0 auto;
    font-weight: 400;
    font-size: 0.95rem;
    line-height: 1.6;
    color: #003b52;
  }

  .card-link {
    font-weight: 700;
    font-size: 1.05rem;
    color: #0a0e1c;
    text-transform: none;
    padding: 0;
    margin: 0;
    border-radius: 8px;
    transition: all 0.25s ease;
  }

  .card-link:hover {
    background-color: var(--hover-color);
    color: #fff;
    transform: translateY(-2px);
    padding: 0.25rem 0.75rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .card-link:active {
    transform: scale(0.97);
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

  /* full-bleed wrapper */
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

  /* ====== Carrossel horizontal de notícias ====== */
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
    grid-auto-columns: clamp(280px, 32vw, 360px); /* largura de cada card */
    gap: 16px;
    padding-inline: 1rem;
  }

  /* card não deve encolher */
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
