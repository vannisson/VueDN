<template>
  <ClientOnly>
    <template #fallback>
      <div class="ssr-loading">
        <img src="/imgs/header/icon_lame.svg" alt="LAME" class="ssr-loading-logo" />
        <div class="ssr-loading-spinner"></div>
      </div>
    </template>

    <section class="publication-detail">
    <v-container class="site-container">
      <article class="detail-card">
        <div class="detail-header">
          <div class="detail-icon-circle">
            <v-icon size="30" class="detail-icon">mdi-file-document-outline</v-icon>
          </div>

          <div>
            <h1 class="detail-title">{{ title }}</h1>

            <p v-if="authors" class="detail-authors">
              {{ authors }}
            </p>

            <p v-if="conference || year" class="detail-meta">
              <span v-if="conference">{{ conference }}</span>
              <span v-if="conference && year" class="dot">•</span>
              <span v-if="year">{{ year }}</span>
            </p>
          </div>
        </div>

        <div class="detail-actions">
          <v-btn
            v-if="hasDownload"
            class="detail-btn"
            color="#56b057"
            variant="flat"
            rounded
            size="small"
            :href="download"
            download
          >
            <v-icon size="16" class="mr-1">mdi-download</v-icon>
            Baixar PDF
          </v-btn>

          <v-btn
            class="detail-btn"
            color="#56b057"
            variant="outlined"
            rounded
            size="small"
            :href="hasSource ? sourceUrl : undefined"
            target="_blank"
            rel="noopener"
            :disabled="!hasSource"
          >
            <v-icon size="16" class="mr-1">mdi-open-in-new</v-icon>
            Fonte original
          </v-btn>
        </div>
      </article>
    </v-container>
  </section>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { computed } from 'vue'
  import { usePageData } from '@vuepress/client'

  const page = usePageData()

  const fm = computed<any>(() => page.value.frontmatter ?? {})

  const title = computed(() => fm.value.title || page.value.title || 'Publicação acadêmica')
  const authors = computed(() => fm.value.authors || '')
  const conference = computed(() => fm.value.conference || '')
  const year = computed(() => fm.value.year || '')
  const download = computed(() => fm.value.download || '')
  const sourceUrl = computed(() => fm.value.sourceUrl || '')

  const hasDownload = computed(() => !!download.value)
  const hasSource = computed(() => !!sourceUrl.value)
</script>

<style scoped>
  .publication-detail {
    padding-top: 0;
    padding-bottom: 48px;
    margin-top: 100px;
    background: #f3f4f6;
  }

  .site-container {
    max-width: 900px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  .detail-card {
    background: #ffffff;
    border-radius: 28px;
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.14);
    padding: 1.8rem 1.9rem;
  }

  .detail-header {
    display: flex;
    gap: 1.2rem;
    align-items: flex-start;
    margin-bottom: 1.4rem;
  }

  .detail-icon-circle {
    width: 54px;
    height: 54px;
    border-radius: 999px;
    background: #eaf5ea;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .detail-icon {
    color: #56b057;
  }

  .detail-title {
    margin: 0 0 0.35rem;
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
  }

  .detail-authors {
    margin: 0 0 0.4rem;
    font-size: 0.9rem;
    color: #4b5563;
    line-height: 1.5;
  }

  .detail-meta {
    margin: 0;
    font-size: 0.85rem;
    color: #6b7280;
  }

  .detail-meta .dot {
    margin-inline: 0.35rem;
  }

  .detail-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-top: 0.75rem;
  }

  .detail-btn {
    text-transform: none;
    font-weight: 600;
  }

  @media (max-width: 700px) {
    .detail-card {
      padding: 1.3rem 1.3rem;
    }

    .detail-header {
      align-items: flex-start;
    }
  }
</style>
