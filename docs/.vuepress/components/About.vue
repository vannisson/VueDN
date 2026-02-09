<template>
  <div class="page-wrapper about-page">
    <!-- ============ HERO / NOSSA HISTÓRIA ============ -->
    <section class="hero">
      <v-row class="hero-row" no-gutters align="center" justify="space-between">
        <!-- Imagem (esquerda) -->
        <v-col cols="12" md="6" class="hero-image-col">
          <div class="hero-slider">
            <v-carousel
              v-model="historyIndex"
              :height="carouselHeight"
              show-arrows="hover"
              hide-delimiter-background
              cycle
              delimiter-icon="mdi-circle"
              class="hero-carousel"
            >
              <v-carousel-item v-for="(slide, i) in historySlides" :key="slide.src" :value="i">
                <v-img
                  :src="slide.src"
                  :lazy-src="slide.src"
                  :alt="slide.alt"
                  :aspect-ratio="16 / 9"
                  cover
                  class="hero-figure"
                />
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>

        <!-- Card de texto (direita) -->
        <v-col cols="12" md="6" class="hero-text-col m-0">
          <div class="hero-card">
            <h1 class="hero-title">Nossa História</h1>

            <p class="hero-text">
              O Laboratório do Manuscrito Escolar (LAME), criado em 2010 pelo professor Dr. Eduardo
              Calil (Ufal), é dedicado a observar a escrita em processo, dentro da sala de aula. O
              Sistema Ramos registra, em tempo real, as ações do escrevente — rasuras, gestos e
              verbalizações — enquanto o texto nasce. Nosso acervo reúne manuscritos e registros
              coletados desde 1989, permitindo compreender e valorizar a gênese do manuscrito
              escolar ao longo de mais de três décadas.
            </p>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- ============ O QUE FAZEMOS ============ -->
    <section class="section section-what">
      <v-container class="">
        <div class="card card-center">
          <h2 class="section-title center">O que fazemos?</h2>
          <p class="section-text center">
            Investigamos práticas de escrita desenvolvidas no ambiente escolar, valorizando o
            processo de produção textual e o manuscrito escolar como testemunho da formação
            intelectual, social e cultural estudantil. No LAME, cada linha escrita por uma criança
            ou jovem é vista como expressão viva de conhecimento em construção.
          </p>
        </div>
      </v-container>
    </section>

    <!-- ============ ONDE ESTAMOS ============ -->
    <section class="section section-where">
      <v-row class="hero-row" no-gutters align="center" justify="space-between">
        <!-- Imagem (esquerda ) -->

        <v-col cols="12" md="6" class="hero-image-col">
          <div class="hero-slider">
            <v-carousel
              v-model="buildingIndex"
              :height="carouselHeight"
              show-arrows="hover"
              hide-delimiter-background
              delimiter-icon="mdi-circle"
              cycle
              class="hero-carousel"
            >
              <v-carousel-item v-for="(slide, i) in buildingSlides" :key="slide.src" :value="i">
                <v-img
                  :src="slide.src"
                  :lazy-src="slide.src"
                  :alt="slide.alt"
                  :aspect-ratio="16 / 9"
                  cover
                  class="hero-figure"
                />
              </v-carousel-item>
            </v-carousel>
          </div>
        </v-col>
        <!-- Card de texto (direita) -->

        <v-col cols="12" md="6" class="hero-text-col">
          <div class="hero-card">
            <h1 class="hero-title">Onde estamos?</h1>

            <p class="hero-text">
              Estamos no campus da Universidade Federal de Alagoas (FALE/CEPEL), onde acolhemos
              pesquisadores, estudantes e professores que desejam conhecer o acervo e os métodos que
              utilizamos para registrar a escrita em movimento. Nosso espaço integra salas de
              coleta, observação e formação continuada, conectando ensino, pesquisa e extensão.
            </p>
          </div>
        </v-col>
      </v-row>
    </section>

    <!-- ============ COMO CHEGAR ============ -->
    <section class="section section-how">
      <v-container class="">
        <div class="card card-how">
          <h2 class="section-title center">Como chegar?</h2>

          <div class="map-shell">
            <div class="map-card">
              <iframe
                class="map-frame"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.4629363887884!2d-35.77555282422561!3d-9.555301800530039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7014830d0d086a9%3A0xfc0c8c19056a9619!2sFALE%2FUFAL%20-%20Faculdade%20de%20Letras!5e0!3m2!1spt-BR!2sbr!4v1764984590488!5m2!1spt-BR!2sbr"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <p class="map-address">
              Av. Lourival Melo Mota, s/n - Tabuleiro do Martins, Maceió - AL, CEP 57072-900.
              Universidade Federal de Alagoas, Faculdade de Letras (FALE) · Centro de Pesquisa em
              Educação e Linguagem (CEPEL).
            </p>
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  const historySlides = [
    { src: '/imgs/about/about_07.jpeg', alt: 'Estudantes em observação no laboratório' },
    { src: '/imgs/about/about_06.jpeg', alt: 'Estudantes em observação no laboratório' },
    { src: '/imgs/about/about_00.png', alt: 'Registro de campo do LAME' },
    { src: '/imgs/about/about_02.jpg', alt: 'Acervo de manuscritos em análise' },
    { src: '/imgs/about/about_04.jpeg', alt: 'Estudantes em observação no laboratório' },
    { src: '/imgs/about/about_05.jpeg', alt: 'Estudantes em observação no laboratório' },
    { src: '/imgs/about/about_01.png', alt: 'Equipe em atividade formativa' },
  ]

  const historyIndex = ref(0)
  const buildingSlides = [
    { src: '/imgs/about/fale01.jpg', alt: 'FALE - Vista 1' },
    { src: '/imgs/about/fale02.jpg', alt: 'FALE - Vista 2' },
    // { src: '/imgs/about/fale03.png', alt: 'FALE - Vista 3' },
  ]
  const buildingIndex = ref(0)
  const carouselHeight = 440
</script>

<style scoped>
  /* ========== PARALLAX NO FUNDO DA PÁGINA TODA ========== */

  .about-page {
    position: relative;
    min-height: 100vh;
    z-index: 0;
    background-color: #f6f6f6;
  }

  .about-page::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background: url('/imgs/about/background.webp') center center / cover no-repeat;
    filter: blur(2px);
  }

  /* ========== HERO / NOSSA HISTÓRIA ========== */

  .hero {
    position: relative;
    padding-top: 96px;
    padding-bottom: 80px;
  }

  .hero-container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .hero-row {
    width: 100%;
    align-items: center !important;
  }

  .hero-gradient-top {
    position: absolute;
    inset: 0 0 auto 0;
    height: 120px;
    background: linear-gradient(to bottom, #ffffff, rgba(255, 255, 255, 0));
    pointer-events: none;
  }

  .hero-gradient-bottom {
    position: absolute;
    inset: auto 0 0 0;
    height: 140px;
    background: linear-gradient(to top, #f5f7fa, rgba(245, 247, 250, 0));
    pointer-events: none;
  }

  .hero-image-col {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }

  .hero-slider {
    width: 100%;
    max-width: 760px;
    display: flex;
    flex-direction: column;
  }

  .hero-carousel {
    border-radius: 32px;
    overflow: hidden;
    box-shadow: 0 22px 48px rgba(0, 0, 0, 0.18);
    min-height: 340px;
    height: auto;
    max-height: 460px;
    aspect-ratio: 16 / 9;
  }

  .hero-figure {
    border-radius: 32px;
    max-height: 520px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    background: #f2f4f7;
  }

  :deep(.v-carousel__controls) {
    bottom: 10px;
  }

  :deep(.v-carousel__controls .v-btn) {
    color: #ffffff !important;
    opacity: 0.9;
  }

  :deep(.v-carousel__controls .v-btn.v-btn--active) {
    opacity: 1;
  }

  .section-where .hero-figure {
    max-width: 720px;
    max-height: 440px;
  }

  .hero-thumbs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(96px, 1fr));
    gap: 10px;
  }

  .hero-thumb {
    border: 2px solid transparent;
    padding: 0;
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    aspect-ratio: 16 / 9;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
    transition:
      box-shadow 0.2s ease,
      border-color 0.2s ease,
      opacity 0.2s ease;
    display: block;
    width: 100%;
  }

  .hero-thumb:hover {
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  }

  .hero-thumb.active {
    border-color: #2563eb;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.16);
  }

  .hero-thumb :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-text-col {
    display: flex;
    align-items: flex-start;
    background-color: white;
    border-radius: 48px 0 0 48px;
  }

  .hero-card {
    background-color: #ffffff;
    border-radius: 48px 0 0 48px;
    padding: clamp(2rem, 3vw, 2.75rem);
    width: 100%;
    max-width: 720px;
    margin-left: auto;
    margin-right: auto;
  }

  .section-where .hero-card {
    max-width: 720px;
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2.4rem, 3vw + 1rem, 3.1rem);
    line-height: 1.1;
    color: #0a0e1c;
    margin: 0 0 1rem;
    max-width: 100%;
    text-align: center;
  }

  .hero-text {
    color: #003b52;
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 1.8;
    margin: 0 0 0.75rem;
    max-width: 100%;
    text-align: center;
  }

  .section .hero-text {
    font-size: 1.1rem;
  }

  /* ========== SEÇÕES GENÉRICAS ========== */

  .section {
    padding-block: clamp(3rem, 6vw, 4.25rem);
  }

  .card {
    padding: clamp(2.5rem, 4vw, 3.25rem);
  }

  .card-center {
    max-width: 960px;
    margin-inline: auto;
    text-align: center;
  }

  .section-title {
    font-weight: 800;
    font-size: clamp(2.4rem, 3vw + 1rem, 3.1rem);
    line-height: 1.2;
    color: #0a0e1c;
    margin: 0 0 1.25rem;
  }

  .section-subtitle {
    font-weight: 800;
    font-size: clamp(1.8rem, 2vw + 0.6rem, 2.1rem);
    line-height: 1.2;
    color: #0a0e1c;
    margin: 0 0 1rem;
  }

  .section-text {
    color: #003b52;
    font-weight: 300;
    font-size: 1.1rem;
    line-height: 1.8;
    margin: 0 0 0.75rem;
  }

  .center {
    text-align: center;
  }

  /* ========== O QUE FAZEMOS (faixa branca 100%) ========== */

  .section-what {
    background: #ffffff; /* faixa branca de fora a fora */
  }

  /* deixa o card um pouco mais largo visualmente */
  .section-what .card-center {
    max-width: 1100px;
  }

  /* ========== ONDE ESTAMOS (card tipo hero, invertido) ========== */

  .section-where {
    background: transparent; /* deixa o parallax aparecer nas laterais */
  }

  .card-where {
    max-width: 1200px;
    margin-inline: auto;
    background: #ffffff;
    border-radius: 48px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.18);
    padding: clamp(2.5rem, 4vw, 3rem);
  }

  .where-row {
    width: 100%;
    align-items: center !important;
    gap: clamp(2rem, 4vw, 4rem);
  }

  .where-text-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .where-image-col {
    display: flex;
    justify-content: flex-end;
  }

  .where-image {
    border-radius: 32px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  /* ========== COMO CHEGAR (faixa branca 100%) ========== */

  .section-how {
    background: #ffffff; /* faixa branca de fora a fora */
  }

  .card-how {
    max-width: 1200px;
    margin-inline: auto;
  }

  .map-shell {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 2rem;
  }

  .map-card {
    width: 100%;
    border-radius: 32px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    max-width: 1100px;
  }

  .map-frame {
    width: 100%;
    height: 32rem;
    border: 0;
  }

  .map-address {
    margin-top: 1rem;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #0a0e1c;
    font-weight: 500;
    text-align: center;
  }

  /* ========== RESPONSIVO ========== */

  @media (max-width: 959px) {
    .hero {
      padding-top: 130px;
      padding-bottom: 48px;
    }

    .hero-container {
      align-items: flex-end;
    }

    .hero-row {
      flex-direction: column;
    }

    .hero-figure {
      max-height: 420px;
      margin-bottom: 1.25rem;
    }

    .hero-slider {
      max-width: 620px;
    }

    .hero-text-col {
      justify-content: center;
      padding-right: 16px !important;
      border-radius: 0 0 48px 48px;
    }

    .hero-card {
      max-width: 640px;
      border-radius: 0;
    }

    .where-row {
      flex-direction: column;
    }

    .where-image-col {
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    .section-text {
      max-width: 100%;
    }

    .hero-thumb {
      height: 72px;
    }

    .map-card {
      max-width: 100%;
    }

    .map-frame {
      height: 24rem;
    }
  }
</style>
