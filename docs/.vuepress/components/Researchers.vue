<template>
  <div class="page-wrapper researchers-page">
    <!-- ============ HERO / DESTAQUES ============ -->
    <section class="hero">
      <v-container class="hero-container" fluid>
        <div class="hero-inner">
          <p class="hero-title">Conheça nossos pesquisadores</p>

          <v-row class="hero-row" align="stretch" justify="center">
            <!-- Cards de destaque (Eduardo / Elian) -->
            <v-col v-for="lead in leads" :key="lead.name" cols="12">
              <div class="lead-card">
                <div class="lead-avatar-shell">
                  <v-img
                    :src="lead.avatar"
                    class="lead-avatar"
                    cover
                    :alt="'Foto de ' + lead.name"
                  />
                </div>

                <div class="lead-content">
                  <p class="lead-name">{{ lead.name }}</p>
                  <p v-if="lead.role" class="lead-role">
                    {{ lead.role }}
                  </p>
                  <p class="lead-description">
                    {{ lead.bio }}
                  </p>

                  <!-- Mostra apenas os chips com link disponível -->
                  <div class="lead-links">
                    <!-- Lattes -->
                    <template v-if="lead.lattes">
                      <a
                        :href="lead.lattes"
                        class="link-chip"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <v-icon size="18" class="mr-1"> mdi-file-document-outline </v-icon>
                        Lattes
                      </a>
                    </template>

                    <!-- ORCID -->
                    <template v-if="lead.orcid">
                      <a
                        :href="lead.orcid"
                        class="link-chip"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <v-icon size="18" class="mr-1"> mdi-identifier </v-icon>
                        ORCID
                      </a>
                    </template>

                    <!-- E-mail -->
                    <template v-if="lead.email">
                      <a :href="'mailto:' + lead.email" class="link-chip">
                        <v-icon size="18" class="mr-1"> mdi-email-outline </v-icon>
                        E-mail
                      </a>
                    </template>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </div>
      </v-container>
    </section>

    <!-- ============ PORTUGUESES ============ -->
    <section class="section section-list">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadores portugueses</p>

        <v-row class="researcher-grid" justify="center" align="stretch">
          <v-col
            v-for="r in ptResearchers"
            :key="r.name"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="d-flex"
          >
            <article class="researcher-card card-full">
              <div class="card-avatar-wrapper">
                <v-avatar size="120" class="researcher-avatar">
                  <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
                </v-avatar>
              </div>

              <div class="card-content">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>

                <p class="researcher-bio">
                  {{ r.bio }}
                </p>

                <!-- Links CV / ORCID / Email -->
                <div class="researcher-links">
                  <!-- CV -->
                  <template v-if="r.cv">
                    <a
                      :href="r.cv"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-file-document-outline </v-icon>
                      CV
                    </a>
                  </template>

                  <!-- ORCID -->
                  <template v-if="r.orcid">
                    <a
                      :href="r.orcid"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-identifier </v-icon>
                      ORCID
                    </a>
                  </template>

                  <!-- E-mail -->
                  <template v-if="r.email">
                    <a :href="'mailto:' + r.email" class="link-chip small">
                      <v-icon size="16" class="mr-1"> mdi-email-outline </v-icon>
                      E-mail
                    </a>
                  </template>
                </div>
              </div>
            </article>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============ FRANCESAS ============ -->
    <section class="section section-list alt">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadoras francesas</p>

        <v-row class="researcher-grid" justify="center" align="stretch">
          <v-col
            v-for="r in frResearchers"
            :key="r.name"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="d-flex"
          >
            <article class="researcher-card card-full">
              <div class="card-avatar-wrapper">
                <v-avatar size="120" class="researcher-avatar">
                  <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
                </v-avatar>
              </div>

              <div class="card-content">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>

                <p class="researcher-bio">
                  {{ r.bio }}
                </p>

                <div class="researcher-links">
                  <!-- CV -->
                  <template v-if="r.cv">
                    <a
                      :href="r.cv"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-file-document-outline </v-icon>
                      CV
                    </a>
                  </template>

                  <!-- ORCID -->
                  <template v-if="r.orcid">
                    <a
                      :href="r.orcid"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-identifier </v-icon>
                      ORCID
                    </a>
                  </template>

                  <!-- E-mail -->
                  <template v-if="r.email">
                    <a :href="'mailto:' + r.email" class="link-chip small">
                      <v-icon size="16" class="mr-1"> mdi-email-outline </v-icon>
                      E-mail
                    </a>
                  </template>
                </div>
              </div>
            </article>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============ PESQUISADORES BRASILEIROS ============ -->
    <section class="section section-list">
      <v-container class="site-container">
        <p class="section-title center">Pesquisadores brasileiros</p>

        <v-row class="researcher-grid" justify="center" align="stretch">
          <v-col
            v-for="r in sortedBrResearchers"
            :key="r.name"
            cols="12"
            sm="6"
            md="6"
            xl="3"
            lg="4"
            class="d-flex"
          >
            <article class="researcher-card card-full">
              <div class="card-avatar-wrapper">
                <v-avatar size="120" class="researcher-avatar">
                  <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
                </v-avatar>
              </div>

              <div class="card-content">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.role" class="researcher-role">
                  {{ r.role }}
                </p>

                <p class="researcher-bio">
                  {{ r.bio }}
                </p>

                <div class="researcher-links">
                  <!-- Lattes -->
                  <template v-if="r.lattes">
                    <a
                      :href="r.lattes"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-file-document-outline </v-icon>
                      Lattes
                    </a>
                  </template>

                  <!-- CV -->
                  <template v-if="r.cv">
                    <a
                      :href="r.cv"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-file-document-outline </v-icon>
                      CV
                    </a>
                  </template>

                  <!-- ORCID -->
                  <template v-if="r.orcid">
                    <a
                      :href="r.orcid"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1"> mdi-identifier </v-icon>
                      ORCID
                    </a>
                  </template>

                  <!-- E-mail -->
                  <template v-if="r.email">
                    <a :href="'mailto:' + r.email" class="link-chip small">
                      <v-icon size="16" class="mr-1"> mdi-email-outline </v-icon>
                      E-mail
                    </a>
                  </template>
                </div>
              </div>
            </article>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============ DOUTORANDOS BRASILEIROS ============ -->
    <section class="section section-list alt">
      <v-container class="site-container">
        <p class="section-title center">Doutorandos brasileiros</p>

        <v-row class="researcher-grid" justify="center" align="stretch">
          <v-col
            v-for="r in brDoutorandos"
            :key="r.name"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="d-flex"
          >
            <article class="researcher-card card-full">
              <div class="card-avatar-wrapper">
                <v-avatar size="120" class="researcher-avatar">
                  <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
                </v-avatar>
              </div>

              <div class="card-content">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.bio" class="researcher-bio">{{ r.bio }}</p>

                <div class="researcher-links">
                  <template v-if="r.lattes">
                    <a
                      :href="r.lattes"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1">mdi-file-document-outline</v-icon>
                      Lattes
                    </a>
                  </template>
                  <template v-if="r.orcid">
                    <a
                      :href="r.orcid"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1">mdi-identifier</v-icon>
                      ORCID
                    </a>
                  </template>
                  <template v-if="r.email">
                    <a :href="'mailto:' + r.email" class="link-chip small">
                      <v-icon size="16" class="mr-1">mdi-email-outline</v-icon>
                      E-mail
                    </a>
                  </template>
                </div>
              </div>
            </article>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- ============ MESTRANDOS BRASILEIROS ============ -->
    <section class="section section-list">
      <v-container class="site-container">
        <p class="section-title center">Mestrandos brasileiros</p>

        <v-row class="researcher-grid" justify="center" align="stretch">
          <v-col
            v-for="r in brMestrandos"
            :key="r.name"
            cols="12"
            sm="6"
            md="6"
            lg="4"
            xl="3"
            class="d-flex"
          >
            <article class="researcher-card card-full">
              <div class="card-avatar-wrapper">
                <v-avatar size="120" class="researcher-avatar">
                  <v-img :src="r.avatar" :alt="'Foto de ' + r.name" cover />
                </v-avatar>
              </div>

              <div class="card-content">
                <h3 class="researcher-name">{{ r.name }}</h3>
                <p v-if="r.bio" class="researcher-bio">{{ r.bio }}</p>

                <div class="researcher-links">
                  <template v-if="r.lattes">
                    <a
                      :href="r.lattes"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1">mdi-file-document-outline</v-icon>
                      Lattes
                    </a>
                  </template>
                  <template v-if="r.orcid">
                    <a
                      :href="r.orcid"
                      class="link-chip small"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <v-icon size="16" class="mr-1">mdi-identifier</v-icon>
                      ORCID
                    </a>
                  </template>
                  <template v-if="r.email">
                    <a :href="'mailto:' + r.email" class="link-chip small">
                      <v-icon size="16" class="mr-1">mdi-email-outline</v-icon>
                      E-mail
                    </a>
                  </template>
                </div>
              </div>
            </article>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue'
  import researchersData from '../data/researchers.json'

  type Researcher = {
    name: string
    role?: string
    bio: string
    avatar: string
    lattes?: string
    cv?: string
    orcid?: string
    email?: string
  }

  const leads = ref<Researcher[]>(researchersData.leads)
  const brResearchers = ref<Researcher[]>(researchersData.brResearchers)
  const brStudents = ref<Researcher[]>(researchersData.brStudents)
  const ptResearchers = ref<Researcher[]>(researchersData.ptResearchers)
  const frResearchers = ref<Researcher[]>(researchersData.frResearchers)

  const sortedBrResearchers = computed(() =>
    brResearchers.value
      .filter(r => r.bio && r.bio.trim().length > 0)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  )

  const sortedBrStudents = computed(() =>
    brStudents.value.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  )

  const brDoutorandos = computed(() =>
    brStudents.value
      .filter(r => {
        const role = (r.role || '').toLowerCase()
        return role.includes('doutoranda') || role.includes('doutorando')
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  )

  const brMestrandos = computed(() =>
    brStudents.value
      .filter(r => {
        const role = (r.role || '').toLowerCase()
        return role.includes('mestranda') || role.includes('mestrando')
      })
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  )
</script>

<style scoped>
  .researchers-page {
    background: #f5f7fa;
  }

  .site-container {
    width: 100%;
    max-width: 100% !important;
    padding-inline: clamp(0.75rem, 2vw, 2rem);
  }

  .site-container.v-container {
    max-width: 100% !important;
  }

  /* ============ HERO / DESTAQUES ============ */

  .hero {
    padding-top: clamp(60px, 8vw, 96px);
    padding-bottom: clamp(40px, 6vw, 60px);
  }

  .hero-container {
    display: flex;
    justify-content: center;
  }

  .hero-inner {
    width: 100%;
    max-width: min(98vw, 1800px);
    margin-inline: auto;
    padding-inline: clamp(0.75rem, 2vw, 2rem);
  }

  .hero-title {
    font-weight: 800;
    font-size: clamp(2rem, 3vw + 0.5rem, 3.1rem);
    line-height: 1.1;
    color: #0a0e1c;
    text-align: center;
    margin: 0 0 clamp(2.5rem, 5vw, 4rem);
  }

  .lead-card {
    display: grid;
    grid-template-columns: minmax(200px, 240px) minmax(0, 1fr);
    gap: clamp(1rem, 3vw, 1.75rem);
    background: #ffffff;
    border-radius: 40px;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
    padding: clamp(1.25rem, 3vw, 2.5rem);
    margin-bottom: clamp(1.25rem, 2vw, 1.75rem);
    align-items: center;
  }

  .lead-avatar-shell {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .lead-avatar {
    width: 100%;
    max-width: 230px;
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
    border: 6px solid #ffffff;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.14);
  }

  .lead-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .lead-name {
    font-weight: 700;
    font-size: clamp(1.2rem, 2vw, 1.4rem);
    color: #0a0e1c;
    margin-bottom: clamp(0.5rem, 1vw, 0.8rem);
  }

  .lead-role {
    font-weight: 500;
    font-size: clamp(0.85rem, 1.2vw, 0.95rem);
    color: #ff8800;
    margin-bottom: clamp(0.3rem, 0.8vw, 0.5rem);
  }

  .lead-description {
    font-size: clamp(0.9rem, 1.1vw, 0.95rem);
    line-height: 1.7;
    color: #003b52;
    margin-bottom: clamp(0.75rem, 1.5vw, 1rem);
  }

  .lead-links {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.3rem, 1vw, 0.5rem);
  }

  /* ============ SEÇÕES COM GRID ============ */

  .section {
    padding-block: clamp(2.5rem, 5vw, 4.5rem);
  }

  .section-list {
    background: #ffffff;
  }

  .section-list.alt {
    background: #f5f7fa;
  }

  .section-title {
    font-weight: 800;
    font-size: clamp(1.6rem, 2.2vw + 0.4rem, 2.4rem);
    line-height: 1.2;
    color: #0a0e1c;
    margin: 0 0 clamp(1.5rem, 3vw, 2rem);
  }

  .center {
    text-align: center;
  }

  /* ============ GRID RESPONSIVO ============ */

  .researcher-grid {
    row-gap: clamp(1.25rem, 2vw, 2rem);
    column-gap: clamp(0.75rem, 1.5vw, 1.25rem);
  }

  .researcher-card {
    display: flex;
    flex-direction: column;
    background: #f8fafc;
    border-radius: 28px;
    padding: clamp(1.25rem, 2.5vw, 1.75rem);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);
    height: 100%;
    min-height: 420px;
    transition:
      transform 0.2s ease,
      box-shadow 0.2s ease;
  }

  .researcher-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  }

  .researcher-card.card-full {
    padding: clamp(1.25rem, 2.5vw, 1.75rem);
  }

  .card-avatar-wrapper {
    display: flex;
    justify-content: center;
    margin-bottom: clamp(1rem, 2vw, 1.5rem);
  }

  .researcher-avatar {
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
    object-fit: cover;
    object-position: center;
    border: 6px solid #ffffff;
  }

  .card-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .researcher-name {
    margin: 0 0 clamp(0.3rem, 0.8vw, 0.5rem);
    font-weight: 700;
    font-size: clamp(1rem, 1.3vw, 1.15rem);
    color: #0a0e1c;
    text-align: center;
    line-height: 1.3;
  }

  .researcher-role {
    margin: 0 0 clamp(0.5rem, 1vw, 0.8rem);
    font-size: clamp(0.8rem, 1vw, 0.9rem);
    color: #ff8800;
    font-weight: 500;
    text-align: center;
  }

  .researcher-bio {
    margin: 0 0 clamp(0.75rem, 1.5vw, 1rem);
    font-size: clamp(0.85rem, 1vw, 0.95rem);
    line-height: 1.6;
    color: #003b52;
    text-align: justify;
    flex-grow: 1;
  }

  .researcher-links {
    display: flex;
    flex-wrap: wrap;
    gap: clamp(0.3rem, 0.8vw, 0.5rem);
    justify-content: center;
  }

  /* ============ LINK CHIPS ============ */

  .link-chip {
    display: inline-flex;
    align-items: center;
    padding: clamp(0.35rem, 0.6vw, 0.5rem) clamp(0.6rem, 1vw, 0.75rem);
    border-radius: 999px;
    background: #ff8800;
    color: #ffffff;
    font-size: clamp(0.8rem, 0.95vw, 0.9rem);
    font-weight: 500;
    text-decoration: none;
    transition:
      transform 0.12s ease,
      box-shadow 0.12s ease,
      background 0.12s ease;
    box-shadow: 0 6px 14px rgba(255, 136, 0, 0.4);
    cursor: pointer;
    white-space: nowrap;
  }

  .link-chip.small {
    background: #0a0e1c;
    box-shadow: 0 3px 9px rgba(10, 14, 28, 0.4);
  }

  .link-chip:hover:not(.disabled) {
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
    text-decoration: none !important;
  }

  .link-chip,
  .link-chip * {
    text-decoration: none !important;
  }

  .link-chip.disabled {
    background: #d1d7e0;
    color: #7b8494;
    box-shadow: none;
    cursor: default;
    pointer-events: none;
    opacity: 0.85;
  }

  /* ============ RESPONSIVO ============ */

  @media (max-width: 960px) {
    .hero {
      padding-top: clamp(50px, 6vw, 80px);
      padding-bottom: clamp(35px, 5vw, 50px);
    }

    .lead-card {
      grid-template-columns: minmax(0, 1fr);
      text-align: left;
      padding: clamp(1.25rem, 3vw, 2rem);
    }

    .lead-avatar-shell {
      justify-content: flex-start;
      margin-bottom: clamp(1rem, 2vw, 1.25rem);
    }

    .lead-avatar {
      max-width: 220px;
    }

    .lead-name {
      text-align: left;
    }

    .lead-role {
      text-align: left;
    }

    .lead-description {
      text-align: left;
    }

    .lead-links {
      justify-content: flex-start;
    }
  }

  @media (max-width: 600px) {
    .hero-title {
      text-align: left;
      margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
    }

    .lead-card {
      padding: clamp(1rem, 2vw, 1.5rem);
      gap: clamp(0.8rem, 2vw, 1.25rem);
    }

    .lead-avatar {
      max-width: 180px;
    }

    .researcher-card {
      padding: clamp(1rem, 2vw, 1.5rem);
    }

    .researcher-name {
      font-size: clamp(0.95rem, 1.1vw, 1rem);
    }

    .researcher-bio {
      text-align: left;
      font-size: clamp(0.8rem, 0.9vw, 0.9rem);
    }

    .researcher-links {
      justify-content: flex-start;
    }

    .link-chip {
      font-size: clamp(0.75rem, 0.85vw, 0.85rem);
    }
  }

  @media (max-width: 480px) {
    .researcher-grid {
      width: 100%;
      row-gap: 0.75rem;
      column-gap: 0.5rem;
    }
    esearcher-card {
      padding: 1rem;
    }

    .card-avatar-wrapper {
      margin-bottom: 0.75rem;
    }

    .lead-links,
    .researcher-links {
      gap: 0.25rem;
    }

    .link-chip {
      padding: 0.3rem 0.5rem;
      font-size: 0.75rem;
    }
  }
</style>
