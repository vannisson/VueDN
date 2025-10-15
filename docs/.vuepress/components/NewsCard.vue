<template>
  <v-card class="news-card" elevation="4">
    <v-img :src="image" height="220" class="news-image" cover>
      <div class="news-chip" :class="chipClass">
        <v-icon small class="mr-1">mdi-book-open-page-variant</v-icon>
        {{ category }}
      </div>
    </v-img>

    <div class="news-content">
      <h3 class="news-title">{{ title }}</h3>
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
      image: { type: String, required: true },
      category: { type: String, required: true }, // "Notícia", "Aula", etc.
      title: { type: String, required: true },
      description: { type: String, required: true },
      date: { type: String, required: true }, // "22/01/2025"
      categoryColor: {
        type: String,
        default: 'default', // "notice" | "audio" | "default"
      },
    },
    computed: {
      chipClass() {
        // mapeia para classes de cor
        return {
          notice: this.categoryColor === 'notice',
          audio: this.categoryColor === 'audio',
          default: this.categoryColor === 'default',
        }
      },
    },
  }
</script>

<style scoped>
  .news-card {
    border-radius: 20px;
    overflow: hidden;
    background: #fff;
    display: flex;
    flex-direction: column;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .news-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.15);
  }

  .news-image {
    position: relative;
  }

  .news-chip {
    position: absolute;
    top: 12px;
    left: 12px;
    background-color: #f68700;
    color: #fff;
    font-weight: 700;
    font-size: 0.75rem;
    line-height: 1;
    border-radius: 12px;
    padding: 6px 10px;
    display: inline-flex;
    align-items: center;
  }
  .news-chip.notice {
    background-color: #0056d2;
  }
  .news-chip.audio {
    background-color: #f68700;
  }
  .news-chip.default {
    background-color: #6b7280;
  }

  .news-content {
    padding: 1rem 1.25rem 1.25rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .news-title {
    font-weight: 800;
    font-size: 1.05rem;
    line-height: 1.4;
    color: #0a0e1c;
    margin-bottom: 0.5rem;
  }

  .news-text {
    font-size: 0.92rem;
    color: #003b52;
    margin-bottom: 1rem;
  }

  .news-footer {
    font-size: 0.8rem;
    color: #6b7280;
  }
</style>
