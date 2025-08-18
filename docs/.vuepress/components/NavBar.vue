<template>
  <v-app-bar
    flat
    height="72"
    color="white"
    class="nav-shadow"
    :elevation="scrolled ? 2 : 0"
  >
    <v-container class="d-flex align-center">
      <!-- Logo (esquerda) -->
      <div
        class="d-flex align-center mr-auto"
        style="height: 40px; width: 100px"
      >
        <RouterLink to="/" class="logo-placeholder">Lame</RouterLink>
      </div>

      <!-- Menu centralizado -->
      <div class="d-none d-md-flex align-center mx-auto">
        <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="nav-link"
          :class="{ active: isActive(item) }"
        >
          {{ item.label }}
        </RouterLink>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const items = [
  { label: "Início", to: "/" },
  { label: "Quem somos", to: "/quem-somos/" },
  { label: "Pesquisadores", to: "/pesquisadores/" },
  { label: "Projetos", to: "/projetos/" },
  { label: "Publicações", to: "/publicacoes/" },
  { label: "Vídeos", to: "/videos/" },
];

const drawer = ref(false);
const scrolled = ref(false);

function isActive(item: { to: string }) {
  // marca como ativo quando a rota atual começa com o path
  return route.path === item.to || route.path.startsWith(item.to);
}

function go(to: string) {
  drawer.value = false;
  router.push(to);
}

function onScroll() {
  scrolled.value = window.scrollY > 2;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", onScroll);
});
</script>

<style scoped>
.nav-shadow {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.logo-placeholder {
  font-size: 28px;
  font-weight: 700;
  color: #1a2a3a;
  text-decoration: none;
}

/* Links do menu (desktop) */
.nav-link {
  position: relative;
  display: inline-block;
  padding: 0 18px;
  line-height: 72px;
  color: #1a2a3a;
  text-decoration: none;
  font-weight: 600;
  opacity: 0.85;
}
.nav-link:hover {
  opacity: 1;
}

/* “Aba”/sublinha laranja do item ativo */
.nav-link.active::after {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  bottom: 0;
  height: 3px;
  background: #f39a3c; /* laranja do seu botão */
  border-radius: 3px 3px 0 0;
}
</style>
