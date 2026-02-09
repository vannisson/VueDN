<script setup>
  import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
  import NavBar from '../components/NavBar.vue'
</script>

<template>
  <ClientOnly>
    <template #fallback>
      <div class="ssr-loading">
        <img src="/imgs/header/icon_lame.svg" alt="LAME" class="ssr-loading-logo" />
        <div class="ssr-loading-spinner"></div>
      </div>
    </template>

    <v-app>
      <NavBar />
      <!-- Reserve espaço abaixo da app-bar -->
      <v-main class="pt-10 pt-md-12">
        <ParentLayout>
          <template #navbar></template>
          <!-- garante que a navbar do tema não apareça -->
          <template #page-bottom>
            <CustomFooter />
          </template>
        </ParentLayout>
      </v-main>
    </v-app>
  </ClientOnly>
</template>
