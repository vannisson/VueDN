<template>
  <div class="skeleton-news-card shimmer-card">
    <div class="skeleton-news-image shimmer" />
    <div class="skeleton-news-body">
      <div class="skeleton-news-line title shimmer" />
      <div class="skeleton-news-divider shimmer" />
      <div class="skeleton-news-line text shimmer" />
      <div class="skeleton-news-line text short shimmer" />
      <div class="skeleton-news-footer">
        <div class="skeleton-news-line date shimmer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .skeleton-news-card {
    background: #fff;
    border-radius: 16px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-width: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  .skeleton-news-image {
    width: 100%;
    height: 220px;
    background: #e8e8e8;
  }

  .skeleton-news-body {
    padding: 1rem 1.2rem 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }

  .skeleton-news-line {
    height: 14px;
    border-radius: 6px;
    background: #e8e8e8;
  }

  .skeleton-news-line.title {
    width: 70%;
    height: 18px;
  }

  .skeleton-news-divider {
    width: 40%;
    height: 2px;
    background: #e8e8e8;
    border-radius: 2px;
  }

  .skeleton-news-line.text {
    width: 95%;
  }

  .skeleton-news-line.short {
    width: 60%;
  }

  .skeleton-news-footer {
    margin-top: auto;
    padding-top: 0.4rem;
  }

  .skeleton-news-line.date {
    width: 30%;
    height: 12px;
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
</style>
