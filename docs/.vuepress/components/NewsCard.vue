<template>
  <v-card class="news-card" elevation="4">
    <v-img :src="image" height="220" class="news-image" cover>
      <div class="news-chip">
        <v-icon class="chip-icon">{{ chipIcon }}</v-icon>
        <span class="chip-text">{{ category }}</span>
      </div>
    </v-img>

    <div class="news-content">
      <h3 class="news-title" :title="title">{{ title }}</h3>
      <p class="news-text">{{ description }}</p>

      <div class="news-footer">
        <span class="news-date">{{ date }}</span>
      </div>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: 'NewsCard',
    props: {
      image: String,
      category: String,
      title: String,
      description: String,
      date: String,
    },

    computed: {
      chipIcon() {
        const norm = this.category
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')

        if (norm.includes('material')) return 'mdi-book-open-variant'
        if (norm.includes('video') || norm.includes('vídeo')) return 'mdi-play-circle'
        if (norm.includes('noticia') || norm.includes('notícia'))
          return 'mdi-newspaper-variant-outline'

        return 'mdi-file-document-outline'
      },
    },
  }
</script>

<style scoped>
  /* ---------------- CHIP ---------------- */
  .news-chip {
    position: absolute;
    top: 12px;
    left: 12px;

    background: #2563eb; /* azul forte */
    color: #ffffff; /* texto branco */

    display: inline-flex;
    align-items: center;
    gap: 6px;

    padding: 6px 12px;
    border-radius: 999px;

    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;

    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .chip-icon {
    font-size: 16px;
    line-height: 1;
    color: #ffffff;
    margin-top: 1px; /* micro-ajuste */
  }

  .chip-text {
    line-height: 1;
    padding-top: 1px;
    color: #ffffff;
  }

  /* ---------------- CARD BASE ---------------- */
  .news-card {
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
    transition: 0.25s ease;
  }

  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  }

  /* ---------------- IMAGE ---------------- */
  /* Força a área da imagem ser fixa e idêntica em todos os cards */
  .news-image {
    height: 220px !important;
    min-height: 220px !important;
    max-height: 220px !important;

    width: 100%;
    overflow: hidden;
    display: block;
    position: relative;
  }

  /* Garante que a imagem interna preencha exatamente a caixa */
  .news-image .v-image__image {
    object-fit: cover !important;
    width: 100%;
    height: 100%;
  }

  /* Garante que o wrapper do Vuetify não expanda */
  .news-image .v-responsive__sizer {
    padding-bottom: 0 !important;
    height: 100% !important;
  }

  /* ---------------- CONTENT ---------------- */
  .news-content {
    padding: 1rem 1.25rem 1.25rem;
  }

  /* ---------------- TITLE ---------------- */
  .news-title {
    font-weight: 800;
    font-size: 1.05rem;
    line-height: 1.35;
    color: #0a0e1c;
    margin-bottom: 0.5rem;

    /* corte para 2 linhas */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;

    /* garante altura consistente em todos os cards */
    min-height: calc(1.35rem * 2.2);
  }

  .news-text {
    font-size: 0.92rem;
    line-height: 1.6;
    color: #003b52;

    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    margin-bottom: 1rem;
  }

  .news-footer {
    font-size: 0.8rem;
    color: #6b7280;
  }
</style>
