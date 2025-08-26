<template>
  <v-footer color="#1e2a38" class="py-10" height="auto">
    <v-container style="color: white">
      <v-row style="display: flex; flex-direction: row; gap: 2rem; justify-content: center">
        <v-col cols="3" class="logo-col">
          <div style="margin-bottom: 2rem">
            <v-img src="/imgs/footer/icon_lame_white.svg" max-width="4rem" />
          </div>

          <div class="d-flex flex-column" style="gap: 1rem">
            <span>Início</span>
            <span>Quem somos</span>
            <span>Projetos</span>
            <span>Fale conosco</span>
          </div>
        </v-col>

        <!-- Coluna 2: Contatos -->
        <v-col cols="3" style="display: flex; flex-direction: column; align-items: center">
          <div style="margin-bottom: 2rem">
            <h4>CONTATOS</h4>
          </div>
          <div class="d-flex flex-column" style="gap: 1rem">
            <p>Email: exemplo@email.com</p>
            <p>Telefone: (00) 00000-0000</p>
            <p>Endereço: Rua Exemplo, 123<br />Cidade - UF, 00000000</p>
          </div>
        </v-col>

        <!-- Coluna 3: Apoio -->
        <v-col cols="3" style="display: flex; flex-direction: row; justify-content: center">
          <div style="display: flex; flex-direction: column">
            <div style="margin-bottom: 2rem">
              <h4>APOIO</h4>
            </div>
            <div style="margin-bottom: 1rem">
              <v-img src="/imgs/footer/icon_ufal.svg" max-width="4rem" />
            </div>
            <div>
              <v-img src="/imgs/footer/icon_cnpq.svg" max-width="8rem" />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup></script>

<style scoped></style>
