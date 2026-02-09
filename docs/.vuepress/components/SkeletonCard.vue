<template>
  <div class="skeleton-card" :class="variant">
    <!-- Imagem placeholder -->
    <div class="skeleton-media shimmer" />

    <!-- Conteúdo placeholder -->
    <div class="skeleton-body">
      <div class="skeleton-line title shimmer" />
      <div class="skeleton-line subtitle shimmer" />
      <div class="skeleton-line text shimmer" />
      <div class="skeleton-line text short shimmer" />
    </div>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      /** 'card' | 'post' | 'publication' — controla proporções */
      variant?: string
    }>(),
    { variant: 'card' }
  )
</script>

<style scoped>
  .skeleton-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  /* ── variante Card (pesquisas, news) ── */
  .skeleton-card.card .skeleton-media {
    width: 100%;
    height: 200px;
    background: #e8e8e8;
  }

  .skeleton-card.card .skeleton-body {
    padding: 1.2rem;
  }

  /* ── variante Post (vídeos, notícias, materiais) ── */
  .skeleton-card.post {
    flex-direction: row;
    min-height: 160px;
  }

  .skeleton-card.post .skeleton-body {
    flex: 1;
    padding: 1.2rem;
  }

  .skeleton-card.post .skeleton-media {
    width: 200px;
    min-height: 100%;
    background: #e8e8e8;
    flex-shrink: 0;
  }

  /* ── variante Publication ── */
  .skeleton-card.publication {
    flex-direction: row;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    border-radius: 0;
    background: transparent;
  }

  .skeleton-card.publication .skeleton-media {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #e8e8e8;
    flex-shrink: 0;
  }

  .skeleton-card.publication .skeleton-body {
    flex: 1;
  }

  /* ── bones ── */
  .skeleton-body {
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .skeleton-line {
    height: 14px;
    border-radius: 6px;
    background: #e8e8e8;
  }

  .skeleton-line.title {
    width: 65%;
    height: 18px;
  }

  .skeleton-line.subtitle {
    width: 45%;
  }

  .skeleton-line.text {
    width: 90%;
  }

  .skeleton-line.short {
    width: 55%;
  }

  /* ── Shimmer animation ── */
  .shimmer {
    position: relative;
    overflow: hidden;
  }

  .shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.5) 50%,
      transparent 100%
    );
    animation: shimmer 1.5s infinite;
    transform: translateX(-100%);
  }

  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }

  /* ── Responsivo post ── */
  @media (max-width: 600px) {
    .skeleton-card.post {
      flex-direction: column;
    }

    .skeleton-card.post .skeleton-media {
      width: 100%;
      height: 160px;
    }
  }
</style>
