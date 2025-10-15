<template>
  <v-footer class="footer" padless>
    <!-- Fundo arredondado ocupando 100% -->
    <div class="footer-shell" aria-hidden="true"></div>

    <!-- Conteúdo por cima do fundo -->
    <v-container class="footer-container">
      <v-row class="footer-row" align="start" justify="space-between">
        <!-- Coluna 1 -->
        <v-col cols="12" md="4" class="logo-col">
          <div class="mb-6">
            <v-img
              src="/imgs/footer/icon_lame_white.svg"
              width="64"
              contain
              eager
              class="brand-logo"
            />
          </div>
          <div class="d-flex flex-column link-list">
            <span>Início</span>
            <span>Quem somos</span>
            <span>Projetos</span>
            <span>Fale conosco</span>
          </div>
        </v-col>

        <!-- Coluna 2 -->
        <v-col cols="12" md="4" class="center-col">
          <h4 class="col-title">CONTATOS</h4>
          <div class="d-flex flex-column contact-list">
            <p>Email: exemplo@email.com</p>
            <p>Telefone: (00) 00000-0000</p>
            <p>Endereço: Rua Exemplo, 123<br />Cidade - UF, 00000000</p>
          </div>
        </v-col>

        <!-- Coluna 3 -->
        <v-col cols="12" md="4" class="support-col">
          <h4 class="col-title">APOIO</h4>
          <div class="support-logos">
            <!-- width explícito + contain -->
            <v-img src="/imgs/footer/icon_ufal.svg" width="64" contain />
            <v-img src="/imgs/footer/icon_cnpq.svg" width="128" contain />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup></script>

<style scoped>
  .footer {
    position: relative;
    background: #f6f6f6 !important;
    padding: 0 !important;
    width: 100%;
  }
  .footer-shell {
    position: absolute;
    inset: 0;
    background: #1e2a38;
    border-radius: 48px 48px 0 0;
    margin: 0;
    z-index: 0;
  }

  .footer-container {
    position: relative;
    z-index: 1;
    color: #fff;
    padding-block: clamp(28px, 5vw, 56px);
  }
  .footer-row {
    row-gap: 28px;
  }

  .col-title {
    text-align: center;
    margin: 0 0 1rem;
    letter-spacing: 0.03em;
    font-weight: 700;
  }
  .logo-col .link-list span {
    margin: 0.5rem 0;
    cursor: pointer;
  }

  .center-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  .center-col .contact-list {
    text-align: left;
    gap: 1rem;
  }

  .support-col {
    text-align: center;
  }

  /* garante que nada do conteúdo fique atrás do shell */
  .footer-container,
  .footer-row,
  .logo-col,
  .center-col,
  .support-col {
    position: relative;
    z-index: 1;
  }

  /* coluna de apoio (desktop) */
  .support-logos {
    display: flex;
    flex-direction: column; /* desktop: em coluna */
    gap: 1rem;
    align-items: center;
    justify-content: center;
  }

  /* ====== Mobile: tudo empilhado e centralizado ====== */
  @media (max-width: 960px) {
    /* cada coluna vira um bloco centralizado */
    .logo-col,
    .center-col,
    .support-col {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* links do menu também centralizados */
    .logo-col .link-list {
      align-items: center;
    }

    /* contatos centralizados (inclusive os textos) */
    .center-col .contact-list {
      text-align: center;
      gap: 0.75rem;
    }

    /* logos lado a lado e centralizadas */
    .support-logos {
      flex-direction: row; /* mobile: lado a lado */
      gap: 1.25rem;
      justify-content: center;
    }
  }

  @media (max-width: 960px) {
    .col-title {
      text-align: left;
    }
    .support-logos {
      flex-direction: row;
      gap: 1.5rem;
    }
  }
</style>
