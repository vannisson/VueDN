<template>
  <v-footer color="#1e2a38" class="py-10" height="auto">
    <v-container>
      <v-row>
        <!-- Coluna 1: Logo + Menu -->
        <v-col
          cols="12"
          md="4"
          class="d-flex flex-column align-start text-white"
        >
          <!-- Espaço para o logo -->
          <div
            class="mb-4"
            style="
              height: 40px;
              width: 120px;
              background: rgba(255, 255, 255, 0.1);
            "
          >
            <!-- Coloque seu logo aqui -->
          </div>

          <div class="d-flex flex-column ga-2">
            <span>Início</span>
            <span>Quem somos</span>
            <span>Projetos</span>
            <span>Fale conosco</span>
          </div>
        </v-col>

        <!-- Coluna 2: Contatos -->
        <v-col cols="12" md="4" class="text-center text-md-start text-white">
          <h4 class="mb-4">CONTATOS</h4>
          <p>Email: exemplo@email.com</p>
          <p>Telefone: (00) 00000-0000</p>
          <p>Endereço: Rua Exemplo, 123<br />Cidade - UF, 00000000</p>
        </v-col>

        <!-- Coluna 3: Apoio -->
        <v-col cols="12" md="4" class="text-center text-white">
          <h4 class="mb-4">APOIO</h4>
          <div class="d-flex justify-center ga-6">
            <!-- Espaços reservados para logos -->
            <div
              style="
                height: 60px;
                width: 60px;
                background: rgba(255, 255, 255, 0.1);
              "
            ></div>
            <div
              style="
                height: 60px;
                width: 100px;
                background: rgba(255, 255, 255, 0.1);
              "
            ></div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
// Nenhuma lógica necessária
</script>

<style scoped>
p {
  margin: 0 0 8px 0;
}
</style>
