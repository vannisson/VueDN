<template>
  <div class="page-wrapper">
    <img src="/imgs/home/background_sphere.svg" alt="" class="background-decor" />
    <v-container fluid class="general-container">
      <!-- Primeira linha: título + vídeo -->
      <v-row align="center" justify="center" class="intro-container">
        <v-col cols="3">
          <p
            style="
              font-weight: 700;
              font-size: 4rem;
              line-height: 1.1;
              color: #0a0e1c;
              margin-bottom: 1.5rem;
            "
          >
            Laboratório do<br />
            Manuscrito Escolar
          </p>
          <p
            style="
              font-weight: 100;
              font-size: 1rem;
              line-height: 1.7;
              color: #003b52;
              margin-bottom: 1.5rem;
            "
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
          </p>
          <v-btn
            style="background-color: #f68700; height: 3rem; width: 20rem; border-radius: 30px"
            class="text-white"
          >
            Conheça nossos projetos
          </v-btn>
        </v-col>
        <v-col cols="4" class="d-flex justify-center">
          <v-img
            src="/imgs/home/home_01.png"
            max-width="40rem"
            style="border-radius: 40px 40px 10px 40px; pointer-events: none"
          />
        </v-col>
      </v-row>

      <!-- Segunda linha: cards -->
      <v-row class="cards-row" align="center" justify="center" style="gap: 4rem">
        <v-col cols="2" class="d-flex">
          <v-card class="custom-card" elevation="4" style="border-radius: 10px 40px 40px 40px">
            <v-container class="d-flex flex-column justify-space-between pa-0" style="height: 100%">
              <div>
                <v-img
                  src="/imgs/home/icon_green.svg"
                  max-width="80"
                  class="mx-auto mb-6 mt-6"
                  style="pointer-events: none"
                />
                <p class="card-title">Quem somos?</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>
              <v-btn variant="text" class="card-link">Saiba mais</v-btn>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="2" class="d-flex">
          <v-card class="custom-card" elevation="4" style="border-radius: 40px 40px 40px 40px">
            <v-container class="d-flex flex-column justify-space-between pa-0" style="height: 100%">
              <div>
                <v-img
                  src="/imgs/home/icon_orange.svg"
                  max-width="80"
                  class="mx-auto mb-6 mt-6"
                  style="pointer-events: none"
                />
                <p class="card-title">O que é o LAME?</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>
              <v-btn variant="text" class="card-link">Saiba mais</v-btn>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="2" class="d-flex">
          <v-card class="custom-card" elevation="4" style="border-radius: 40px 10px 40px 40px">
            <v-container class="d-flex flex-column justify-space-between pa-0" style="height: 100%">
              <div>
                <v-img
                  src="/imgs/home/icon_blue.svg"
                  max-width="80"
                  class="mx-auto mb-6 mt-6"
                  style="pointer-events: none"
                />
                <p class="card-title">O que pesquisamos?</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>
              <v-btn variant="text" class="card-link">Saiba mais</v-btn>
            </v-container>
          </v-card>
        </v-col>
      </v-row>

      <v-row class="mid-row" align="center" justify="center" style="background-color: white">
        <v-col cols="4" class="d-flex justify-center">
          <v-img
            src="/imgs/home/home_02.png"
            max-width="40rem"
            style="border-radius: 40px 10px 40px 40px; pointer-events: none"
          />
        </v-col>
        <v-col cols="3">
          <p
            style="
              font-weight: 700;
              font-size: 3rem;
              line-height: 1.1;
              color: #0a0e1c;
              margin-bottom: 1.5rem;
            "
          >
            Realizando estudos para...
          </p>
          <p
            style="
              font-weight: 100;
              font-size: 1rem;
              line-height: 1.7;
              color: #003b52;
              margin-bottom: 1.5rem;
            "
          >
            Quais são as primeiras palavras escritas por uma criança? Quantas tentativas são
            necessárias para que ela formule corretamente uma frase? A interação pedagógica é muito
            distinta entre os países do globo? Essas e outras indagações são temáticas discutidas
            pelo Laboratório do Manuscrito Escolar (LAME).
          </p>
          <v-btn
            style="background-color: #f68700; height: 3rem; width: 20rem; border-radius: 30px"
            class="text-white"
          >
            Conheça nossos projetos
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="content-row">
        <v-row style="padding: 4rem 4rem; display: flex; flex-direction: row">
          <p style="font-weight: 700; font-size: 3rem; line-height: 1.1; color: #0a0e1c">
            Últimas notícias
          </p>
        </v-row>
        <v-row style="padding: 4rem 4rem">
          <!-- <v-card elevation="4" style="border-radius:40px">
            <v-container class="d-flex flex-column justify-space-between pa-0" style="height: 100%">
              <div>
                <v-img
                  src="/imgs/home/icon_green.svg"
                  max-width="80"
                  class="mx-auto mb-6 mt-6"
                  style="pointer-events: none"
                />
                <p class="card-title">Quem somos?</p>
                <p class="card-description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                  nostrud.
                </p>
              </div>
              <v-btn variant="text" class="card-link">Saiba mais</v-btn>
            </v-container>
          </v-card> -->
        </v-row>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
  .page-wrapper {
    position: relative;
    overflow: hidden;
    background-color: #f6f6f6;
  }

  .background-decor {
    position: absolute;
    bottom: 50%;
    left: 60%;
    width: 50%;
    pointer-events: none;
    user-select: none;
  }

  .general-container {
    position: relative;
    z-index: 1;
  }

  .intro-container {
    padding: 5rem 0rem 8rem;
  }

  .cards-row {
    padding: 2rem 0rem 8rem;
  }

  .mid-row {
    padding: 4rem 0rem;
  }

  .custom-card {
    min-height: 26rem;
    padding: 1rem;
    text-align: center;
    background-color: white;
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
  }

  .custom-card:hover {
    transform: translateY(-4px);
  }

  .card-title {
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 1.1;
    color: #0a0e1c;
    margin-bottom: 1rem;
  }

  .card-description {
    font-weight: 400;
    font-size: 0.9rem;
    color: #003b52;
  }

  .card-link {
    font-weight: 650;
    font-size: 1.1rem;
    color: #0a0e1c;
    text-transform: none;
    position: relative;
  }
  /* 
  .card-link::after {
    content: '';
    display: block;
    width: 100%;
    height: 3px;
    background-color: #0a0e1c;
    margin-top: 4px;
  } */
</style>
