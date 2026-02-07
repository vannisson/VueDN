<template>
  <v-app>
    <NavBar />

    <v-main>
      <div class="not-found-content">
        <h1 class="not-found-oops">Oops!</h1>
        <h2 class="not-found-title">404 - PÁGINA NÃO ENCONTRADA</h2>
        <p class="not-found-message">
          A página que você procura pode ter sido removida,<br />
          teve seu nome alterado ou está temporariamente indisponível.
        </p>
        <v-btn
          class="not-found-btn"
          color="#f68700"
          variant="flat"
          rounded
          size="large"
          @click="goHome"
        >
          <span style="color: #fff">IR PARA O INÍCIO</span>
        </v-btn>
      </div>
    </v-main>

    <CustomFooter />
  </v-app>
</template>

<script setup lang="ts">
  // @ts-nocheck
  import { useRouter } from 'vue-router'
  import NavBar from '../components/NavBar.vue'
  import CustomFooter from '../components/CustomFooter.vue'

  const router = useRouter()

  function goHome() {
    router.push('/')
  }
</script>

<style scoped>
  .not-found-content {
    min-height: calc(100vh - 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 2rem;
    background: #f6f6f6;
  }

  .not-found-oops {
    font-size: clamp(6rem, 15vw, 12rem);
    font-weight: 900;
    line-height: 1;
    margin: 0 0 1rem;
    background: linear-gradient(
      135deg,
      #f68700 0%,
      #f6a800 20%,
      #56b057 45%,
      #2563eb 70%,
      #f68700 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .not-found-title {
    font-size: clamp(1.2rem, 2.5vw, 1.6rem);
    font-weight: 700;
    color: #003b52;
    margin: 0 0 1.25rem;
    letter-spacing: 0.05em;
  }

  .not-found-message {
    font-size: 1.1rem;
    line-height: 1.7;
    color: #4b5563;
    margin: 0 0 2.5rem;
    max-width: 520px;
  }

  .not-found-btn {
    font-weight: 700;
    letter-spacing: 0.06em;
    padding-inline: 2.5rem;
  }

  @media (max-width: 600px) {
    .not-found-oops {
      font-size: 5rem;
    }

    .not-found-message br {
      display: none;
    }
  }
</style>
