<template>
  <v-container class="pa-6">
    <v-card class="pa-4">
      <v-card-title class="text-h5">Página de Teste Vuetify</v-card-title>
      <v-card-text>
        <div class="mb-4">
          Se você está vendo um botão estilizado abaixo, o Vuetify está
          carregado 🎉
        </div>
        <v-btn color="primary" @click="count++">Cliquei {{ count }}x</v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from "vue";
const count = ref(0);
</script>
