<template>
  <v-footer class="footer" padless>
    <div class="footer-shell" aria-hidden="true"></div>

    <v-container class="footer-container">
      <v-row class="footer-row" justify="space-between">
        <!-- COLUNA LAME -->
        <v-col cols="12" md="4" class="logo-col">
          <div class="brand-wrapper">
            <v-img
              src="/imgs/footer/icon_lame_white.svg"
              width="80"
              contain
              eager
              class="brand-logo"
            />
          </div>

          <nav class="link-list" aria-label="Links principais">
            <RouterLink to="/" class="footer-link">Início</RouterLink>
            <RouterLink to="/quem-somos/" class="footer-link">Quem somos</RouterLink>
            <RouterLink to="/pesquisadores/" class="footer-link">Pesquisadores</RouterLink>
            <RouterLink to="/projetos/" class="footer-link">Projetos</RouterLink>
            <RouterLink to="/conteudos/" class="footer-link">Conteúdos</RouterLink>
            <RouterLink to="/publicacoes/" class="footer-link">Publicações</RouterLink>
          </nav>
        </v-col>

        <!-- COLUNA CONTATOS -->
        <v-col cols="12" md="4" class="center-col">
          <h4 class="col-title">CONTATOS</h4>

          <div class="contact-list">
            <p>Email: exemplo@email.com</p>
            <p>Telefone: (00) 00000-0000</p>
            <p>Endereço: Rua Exemplo, 123</p>
            <p>Cidade - UF, 00000000</p>
          </div>
        </v-col>

        <!-- COLUNA APOIO -->
        <v-col cols="12" md="4" class="support-col">
          <h4 class="col-title">APOIO</h4>

          <div class="support-logos">
            <v-img src="/imgs/footer/icon_ufal.svg" width="80" contain />
            <v-img src="/imgs/footer/icon_cnpq.svg" width="110" contain />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

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
    z-index: 0;
  }

  .footer-container {
    position: relative;
    z-index: 1;
    color: #fff;
    padding-block: clamp(28px, 5vw, 56px);
  }

  /* ===== GRID / COLUNAS ===== */

  .footer-row {
    row-gap: 28px;
    align-items: flex-start; /* topo alinhado */
  }

  .logo-col,
  .center-col,
  .support-col {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.9rem; /* espaçamento vertical uniforme */
  }

  /* ===== COLUNA LAME ===== */

  .brand-wrapper {
    margin: 0; /* sem margin extra, alinhado com os títulos das outras colunas */
  }

  .link-list {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
  }

  .footer-link {
    cursor: pointer;
    color: #ffffff;
    text-decoration: none;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .footer-link:hover {
    text-decoration: underline;
  }

  /* ===== TÍTULOS / CONTATOS ===== */

  .col-title {
    margin: 0;
    letter-spacing: 0.03em;
    font-weight: 700;
    font-size: 0.95rem;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    gap: 0.45rem; /* igual aos links da esquerda */
  }

  .contact-list p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.5;
  }

  /* ===== APOIO ===== */

  .support-logos {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
    justify-content: flex-start;
  }

  /* ===== MOBILE ===== */

  @media (max-width: 960px) {
    .logo-col,
    .center-col,
    .support-col {
      align-items: center;
      text-align: center;
    }

    .link-list {
      align-items: center;
    }

    .support-logos {
      justify-content: center;
    }
  }
</style>
