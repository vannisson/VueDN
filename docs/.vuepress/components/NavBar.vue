<template>
  <v-app-bar flat height="85" color="white" class="nav-shadow" :elevation="scrolled ? 2 : 0">
    <v-container class="d-flex" style="align-items: center; padding: 0">
      <!-- Logo -->
      <v-col cols="2">
        <v-img src="/imgs/header/icon_lame.svg" max-width="100" />
      </v-col>
      <!-- Menu central -->
      <v-col class="d-flex" style="align-items: center; justify-content: center">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item) }"
        >
          {{ item.label }}
        </RouterLink>
      </v-col>
      <v-col cols="2"></v-col>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute, useRouter } from 'vue-router'

  const route = useRoute()
  const router = useRouter()

  const items = [
    { label: 'Início', to: '/' },
    { label: 'Quem somos', to: '/quem-somos/' },
    { label: 'Pesquisadores', to: '/pesquisadores/' },
    { label: 'Projetos', to: '/projetos/' },
    { label: 'Publicações', to: '/publicacoes/' },
    { label: 'Vídeos', to: '/videos/' },
  ]

  const drawer = ref(false)
  const scrolled = ref(false)

  function isActive(item: { to: string }) {
    return route.path === item.to || route.path.startsWith(item.to)
  }

  function onScroll() {
    scrolled.value = window.scrollY > 2
  }

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
  })
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
  })
</script>

<style scoped>
  .nav-shadow {
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  }

  /* Links do menu (desktop) */
  .nav-link {
    position: relative;
    display: inline-block;
    margin: 0 1.2rem;
    line-height: 72px;
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.4px;
    color: #002b3b;
    text-decoration: none;
    opacity: 0.85;
    transition: opacity 0.2s ease-in-out;
  }

  .nav-link:hover {
    opacity: 1;
  }

  /* Linha inferior do item ativo */
  .nav-link.active::after {
    content: '';
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: 8px; /* mais próximo do inferior da aba */
    height: 4px;
    background: #f68700;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
</style>
