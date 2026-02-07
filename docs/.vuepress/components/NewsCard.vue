<template>
  <v-card class="news-card" elevation="4">
    <v-img v-if="image" :src="image" height="220" class="news-image" cover>
      <div class="news-chip" :style="chipStyle">
        <v-icon class="chip-icon">{{ chipIcon }}</v-icon>
        <span class="chip-text">{{ category }}</span>
      </div>
    </v-img>

    <div v-else class="news-image news-placeholder" :style="placeholderStyle">
      <v-icon size="52" color="#ffffff99">{{ placeholderIcon }}</v-icon>
      <div class="news-chip" :style="chipStyle">
        <v-icon class="chip-icon">{{ chipIcon }}</v-icon>
        <span class="chip-text">{{ category }}</span>
      </div>
    </div>

    <div class="news-content">
      <h3 class="news-title" :title="title">{{ title }}</h3>
      <hr class="news-divider" :style="dividerStyle" />
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
      categoryColor: { type: String, default: 'default' },
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

        if (norm.includes('material')) return 'mdi-file-document-multiple-outline'
        if (norm.includes('video') || norm.includes('vídeo')) return 'mdi-play-circle'
        if (norm.includes('noticia') || norm.includes('notícia'))
          return 'mdi-newspaper-variant-outline'

        return 'mdi-file-document-outline'
      },

      chipStyle() {
        const colorMap = {
          video: '#2563eb',
          notice: '#ca8a04',
          material: '#0891b2',
          default: '#2563eb',
        }
        return { background: colorMap[this.categoryColor] || colorMap.default }
      },

      placeholderIcon() {
        const norm = this.category
          .toLowerCase()
          .normalize('NFD')
          .replace(/\p{Diacritic}/gu, '')

        if (norm.includes('material')) return 'mdi-folder-open-outline'
        if (norm.includes('video')) return 'mdi-filmstrip'
        if (norm.includes('noticia')) return 'mdi-newspaper-variant-outline'
        return 'mdi-file-document-outline'
      },

      placeholderStyle() {
        const colorMap = {
          video: '#2563eb',
          notice: '#ca8a04',
          material: '#0891b2',
          default: '#9ca3af',
        }
        return { background: colorMap[this.categoryColor] || colorMap.default }
      },

      dividerStyle() {
        const colorMap = {
          video: '#2563eb',
          notice: '#ca8a04',
          material: '#0891b2',
          default: '#2563eb',
        }
        return { borderColor: colorMap[this.categoryColor] || colorMap.default }
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

    background: #2563eb; /* default — overridden by :style */
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
    text-decoration: none !important;
  }

  .news-card * {
    text-decoration: none !important;
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

  /* ---------------- PLACEHOLDER (sem imagem) ---------------- */
  .news-placeholder {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .news-placeholder .v-icon {
    text-decoration: none !important;
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
    margin-bottom: 0;

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

  .news-divider {
    border: none;
    border-top: 2.5px solid #2563eb;
    opacity: 0.4;
    margin: 0.4rem 0 0.5rem;
    width: 100%;
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
