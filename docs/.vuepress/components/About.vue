<template>
  <div class="page-wrapper about-page">
    <!-- ============ HERO / NOSSA HISTÓRIA ============ -->
    <section class="hero">
      <v-row class="hero-row" no-gutters align="center" justify="space-between">
        <!-- Imagem (esquerda) -->
        <v-col cols="12" md="6" class="hero-image-col">
          <v-img
            src="/imgs/about/people01.png"
            lazy-src="/imgs/about/people01.png"
            :aspect-ratio="16 / 9"
            class="hero-figure"
            alt="Equipe reunida"
            cover
          />
        </v-col>

        <!-- Card de texto (direita) -->
        <v-col cols="12" md="6" class="hero-text-col m-0">
          <div class="hero-card">
            <h1 class="hero-title">Nossa História</h1>

            <p class="hero-text">
              O Laboratório do Manuscrito Escolar (LAME), criado em 2010 pelo professor Dr. Eduardo
              Calil (Ufal), dedica-se ao estudo da escrita em processo, diretamente no contexto da
              sala de aula. Calil desenvolveu o Sistema Ramos como base para as coletas e registros
              de dados. Esse sistema registra simultaneamente as ações do escrevente — como rasuras
              — e suas verbalizações durante situações de produção textual. Além de desenvolver
              pesquisas sobre a gênese da produção textual escrita, o LAME tem um importante acervo
              de manuscritos e registros escolares coletados desde 1989, possibilitando a realização
              de pesquisas que se dedicam a compreender a gênese e a escrita do manuscrito escolar
              há mais de três décadas.
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
      <v-row class="hero-row" align="center" justify="space-between">
        <!-- Imagem (esquerda ) -->

        <v-col cols="12" md="6" class="hero-image-col">
          <v-img
            src="/imgs/about/building.png"
            lazy-src="/imgs/about/building.png"
            :aspect-ratio="16 / 9"
            class="hero-figure"
            alt="Equipe reunida"
            cover
          />
        </v-col>
        <!-- Card de texto (direita) -->

        <v-col cols="12" md="6" class="hero-text-col">
          <div class="hero-card">
            <h1 class="hero-title">Onde estamos?</h1>

            <p class="hero-text">
              Universidade Federal de Alagoas Faculdade de Letras (FALE) Centro de Pesquisa em
              Educação e Linguagem (CEPEL)
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
          </div>
        </div>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  // nada aqui por enquanto
</script>

<style scoped>
  /* ========== PARALLAX NO FUNDO DA PÁGINA TODA ========== */

  .about-page {
    position: relative;
    min-height: 100vh;
    z-index: 0;
  }

  .about-page::before {
    content: '';
    position: fixed;
    inset: 0;
    background: url('/imgs/about/background.png') center / cover no-repeat;
    z-index: -1;
    transform: translateZ(0);
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

  .hero-figure {
    border-radius: 40px 40px 10px 40px;
    max-width: 560px;
    overflow: hidden;
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
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2.4rem, 3vw + 1rem, 3.1rem);
    line-height: 1.1;
    color: #0a0e1c;
    margin: 0 0 1rem;
    max-width: 90%;
    text-align: justify;
  }

  .hero-text {
    color: #003b52;
    font-weight: 300;
    font-size: 1rem;
    line-height: 1.8;
    margin: 0 0 0.75rem;
    max-width: 90%;
    text-align: justify;
  }

  .section .hero-text {
    font-size: 1.1rem;
  }

  /* ========== SEÇÕES GENÉRICAS ========== */

  .section {
    padding-block: clamp(3.5rem, 7vw, 5rem);
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
    font-size: clamp(2.1rem, 2.4vw + 1rem, 2.6rem);
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
    font-size: 1.3rem;
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
    justify-content: center;
    margin-top: 2rem;
  }

  .map-card {
    width: 100%;
    border-radius: 32px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);
    overflow: hidden;
  }

  .map-frame {
    width: 100%;
    height: 420px;
    border: 0;
  }

  /* ========== RESPONSIVO ========== */

  @media (max-width: 959px) {
    .hero {
      padding-top: 96px;
      padding-bottom: 48px;
    }

    .hero-container {
      align-items: flex-end;
    }

    .hero-row {
      flex-direction: column;
    }

    .hero-figure {
      max-width: 520px;
      margin-bottom: 1.75rem;
    }

    .hero-text-col {
      justify-content: center;
      padding-right: 16px !important;
    }

    .hero-card {
      max-width: 640px;
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
  }
</style>
