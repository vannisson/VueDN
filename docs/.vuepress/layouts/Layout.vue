<script setup>
  import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
  import NavBar from '../components/NavBar.vue'
</script>

<template>
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
</template>
