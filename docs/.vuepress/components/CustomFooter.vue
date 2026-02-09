<template>
  <v-footer class="footer" padless>
    <div class="footer-shell" aria-hidden="true"></div>

    <div class="footer-inner">
      <!-- LINHA SUPERIOR: Logo + Contato + Apoio -->
      <div class="footer-top">
        <div class="footer-brand">
          <img src="/imgs/footer/icon_lame_white.svg" alt="LAME" class="brand-logo" />
        </div>

        <div class="footer-contact">
          <div class="contact-block">
            <p class="contact-label">Endereço</p>
            <p>Av. Lourival Melo Mota, S/N</p>
            <p>Tabuleiro do Martins, Maceió – AL</p>
            <p>CEP 57072-900</p>
          </div>

          <div class="contact-block">
            <p class="contact-label">E-mail</p>
            <p>
              <a href="mailto:calil@cedu.ufal.br" class="footer-link">calil@cedu.ufal.br</a>
            </p>
            <p>
              <a href="mailto:kall.braga@ufrpe.br" class="footer-link">kall.braga@ufrpe.br</a>
            </p>
          </div>
        </div>

        <div class="footer-support">
          <p class="contact-label">Apoio</p>
          <div class="support-logos">
            <img
              src="/imgs/footer/icon_ufal.svg"
              alt="UFAL"
              class="support-logo support-logo--ufal"
            />
            <img
              src="/imgs/footer/icon_cnpq.svg"
              alt="CNPq"
              class="support-logo support-logo--cnpq"
            />
          </div>
        </div>
      </div>

      <!-- DIVISOR -->
      <hr class="footer-divider" />

      <!-- LINHA INFERIOR: Links de navegação -->
      <nav class="footer-nav" aria-label="Links principais">
        <RouterLink to="/" class="footer-link">Início</RouterLink>
        <RouterLink to="/about/" class="footer-link">Quem somos</RouterLink>
        <RouterLink to="/pesquisadores/" class="footer-link">Pesquisadores</RouterLink>
        <RouterLink to="/pesquisas/" class="footer-link">Pesquisas</RouterLink>
        <RouterLink to="/publicacoes/" class="footer-link">Publicações</RouterLink>
        <RouterLink to="/videos/" class="footer-link">Vídeos</RouterLink>
        <RouterLink to="/noticias/" class="footer-link">Notícias</RouterLink>
        <RouterLink to="/materiais/" class="footer-link">Materiais</RouterLink>
        <a href="/admin/" class="footer-link">Admin</a>
      </nav>

      <p class="footer-credits">
        Designed &amp; developed by
        <a href="https://glcf.dev" target="_blank" rel="noopener noreferrer" class="credits-link"
          >Geovane Filho</a
        >
        &amp; Eduardo Bezerra
      </p>
    </div>
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
    z-index: 0;
  }

  .footer-inner {
    position: relative;
    z-index: 1;
    color: #fff;
    width: 100%;
    max-width: 1280px;
    margin-inline: auto;
    padding: clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 4vw, 3rem);
  }

  /* ===== LINHA SUPERIOR ===== */

  .footer-top {
    display: flex;
    align-items: flex-start;
    gap: clamp(2rem, 5vw, 5rem);
    flex-wrap: wrap;
  }

  .footer-brand {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .brand-logo {
    height: 100px;
    width: auto;
    object-fit: contain;
  }

  .footer-contact {
    display: flex;
    gap: clamp(2rem, 4vw, 4rem);
    min-width: 0;
  }

  .contact-block {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
  }

  .contact-block p {
    margin: 0;
    font-size: 0.875rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.85);
  }

  .contact-label {
    font-weight: 700;
    font-size: 0.8rem !important;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #fff !important;
    margin-bottom: 0.2rem !important;
  }

  .footer-support {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
  }

  .support-logos {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .support-logo {
    width: auto;
    object-fit: contain;
    display: block;
  }

  .support-logo--ufal {
    height: 48px;
  }

  .support-logo--cnpq {
    height: 34px;
  }

  /* ===== DIVISOR ===== */

  .footer-divider {
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    margin: 1.5rem 0 1.25rem;
  }

  /* ===== NAVEGAÇÃO INFERIOR ===== */

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 2rem;
    justify-content: center;
  }

  .footer-link {
    cursor: pointer;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.5;
    transition: color 0.15s;
  }

  .footer-link:hover {
    color: #fff;
    text-decoration: underline;
  }

  .footer-credits {
    text-align: center;
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.75rem;
    margin: 1.25rem 0 0;
    letter-spacing: 0.02em;
  }

  .credits-link {
    color: rgba(255, 255, 255, 0.55);
    text-decoration: none;
    transition: color 0.15s;
  }

  .credits-link:hover {
    color: #fff;
    text-decoration: underline;
  }

  /* ===== RESPONSIVO ===== */

  @media (max-width: 960px) {
    .footer-top {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .footer-contact {
      flex-direction: column;
      align-items: center;
    }

    .contact-block {
      align-items: center;
    }

    .footer-support {
      align-items: center;
    }

    .support-logos {
      justify-content: center;
    }

    .footer-nav {
      justify-content: center;
    }
  }

  @media (max-width: 600px) {
    .footer-nav {
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }
  }
</style>
