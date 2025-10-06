<template>
  <v-app-bar
    flat
    height="120"
    :color="scrolled ? 'white' : 'transparent'"
    :elevation="scrolled ? 2 : 0"
    class="header-app-bar"
  >
    <v-container fluid class="site-container py-0">
      <v-row align="center" style="height: 100%">
        <v-col lg="2" class="d-none d-lg-block"></v-col>

        <v-col cols="6" md="2" class="d-flex justify-center">
          <v-img src="/imgs/header/icon_lame.svg" class="logo-header" />
        </v-col>

        <v-col cols="12" md="7" lg="7" class="d-none d-md-flex justify-center">
          <nav class="nav-links" role="navigation" aria-label="Menu principal">
            <RouterLink
              v-for="item in items"
              :key="item.to"
              :to="item.to"
              class="nav-link"
              :class="{ active: isActive(item) }"
            >
              {{ item.label }}
            </RouterLink>
          </nav>
        </v-col>

        <v-col cols="6" md="1" class="d-flex justify-end">
          <v-btn icon class="d-md-none" @click="mobileMenu = true" aria-label="Abrir menu">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>

  <v-dialog
    v-model="mobileMenu"
    fullscreen
    transition="dialog-bottom-transition"
    scrim
    :retain-focus="false"
    class="mobile-dialog"
  >
    <v-card class="mobile-card">
      <div class="mobile-topbar">
        <v-row align="center" no-gutters style="width: 100%">
          <v-col cols="2"></v-col>
          <v-col cols="8" class="d-flex justify-center">
            <v-img src="/imgs/header/icon_lame.svg" class="logo-mobile" />
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-btn icon @click="mobileMenu = false" aria-label="Fechar menu">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </div>

      <div class="mobile-content">
        <div class="mobile-links" role="menu">
          <RouterLink
            v-for="item in items"
            :key="item.to"
            :to="item.to"
            role="menuitem"
            class="mobile-link"
            @click="mobileMenu = false"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()
  const items = [
    { label: 'Início', to: '/' },
    { label: 'Quem somos', to: '/quem-somos/' },
    { label: 'Pesquisadores', to: '/pesquisadores/' },
    { label: 'Projetos', to: '/projetos/' },
    { label: 'Publicações', to: '/publicacoes/' },
    { label: 'Vídeos', to: '/videos/' },
  ]

  const scrolled = ref(false)
  const mobileMenu = ref(false)

  function isActive(item: { to: string }) {
    return route.path === item.to || route.path.startsWith(item.to)
  }
  function onScroll() {
    scrolled.value = window.scrollY > 10
  }

  onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
  onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
  :root {
    --site-max: 1280px;
    --site-pad-x: 2.5rem;
  }
  @media (max-width: 1280px) {
    :root {
      --site-pad-x: 1.5rem;
    }
  }
  @media (max-width: 600px) {
    :root {
      --site-pad-x: 1rem;
    }
  }

  .site-container {
    max-width: var(--site-max);
    margin-inline: auto;
    padding-inline: var(--site-pad-x) !important;
  }

  .header-app-bar {
    transition: background-color 0.4s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(6px);
  }

  .logo-header {
    max-height: 96px;
    width: auto;
  }
  @media (max-width: 960px) {
    .logo-header {
      max-height: 72px;
    }
  }
  @media (max-width: 600px) {
    .logo-header {
      max-height: 60px;
    }
  }

  .logo-mobile {
    height: 60px;
    width: auto;
    object-fit: contain;
  }

  .nav-links {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .nav-link {
    position: relative;
    margin: 0 1.1rem;
    font-size: 1.05rem;
    font-weight: 500;
    letter-spacing: 0.3px;
    color: #002b3b;
    text-decoration: none;
    opacity: 0.85;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .nav-link:hover {
    opacity: 1;
    transform: translateY(-2px);
  }
  .nav-link.active::after {
    content: '';
    position: absolute;
    left: 20%;
    right: 20%;
    bottom: -6px;
    height: 3px;
    background: #f68700;
    border-radius: 3px;
  }

  .mobile-dialog {
    overflow: hidden;
  }
  .mobile-card {
    width: 100vw;
    height: 100vh;
    max-width: none;
    border-radius: 0;
    display: flex;
    flex-direction: column;
    background: #fff;
    overflow-x: hidden;
  }

  .mobile-topbar {
    position: sticky;
    top: 0;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    padding-inline: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    background: #fff;
  }

  .mobile-content {
    flex: 1;
    display: grid;
    place-items: center;
    padding: 1.25rem;
  }
  .mobile-links {
    width: min(520px, 92vw);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    text-align: center;
  }
  .mobile-link {
    display: block;
    padding: 1rem 1.25rem;
    border-radius: 14px;
    font-size: 1.15rem;
    font-weight: 700;
    color: #0a2b3b;
    text-decoration: none;
    background: #f7fafc;
    border: 1px solid rgba(0, 0, 0, 0.06);
  }
  .mobile-link:active {
    transform: scale(0.98);
  }
</style>
