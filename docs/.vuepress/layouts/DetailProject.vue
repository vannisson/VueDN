<!-- docs/.vuepress/layouts/DetailProject.vue -->
<script setup lang="ts">
  // @ts-nocheck

  import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
  import NavBar from '../components/NavBar.vue'
  import CustomFooter from '../components/CustomFooter.vue'
  import { Content, usePageData, usePagesData } from '@vuepress/client'
  import { computed, ref, onMounted } from 'vue'

  const page = usePageData()
  const pagesData = usePagesData()

  const frontmatter = computed<any>(() => page.value.frontmatter ?? {})

  const title = computed(() => frontmatter.value.title || page.value.title || '')

  const formattedDate = computed(() => {
    const fmDate = frontmatter.value.date
    const gitCreated = (page.value as any)?.git?.createdTime as number | string | undefined

    const raw = fmDate ?? gitCreated
    if (!raw) return ''

    const d = new Date(raw as any)
    if (Number.isNaN(d.getTime())) return String(raw)

    return d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  })

  const cover = computed<string | null>(() => frontmatter.value.cover ?? null)

  /**
   * OUTROS PROJETOS
   * Carrega outros arquivos de /projetos/ (ou type: 'projeto'),
   * excluindo a página atual, ordenados por data/ano.
   */
  const relatedProjects = ref<{ path: string; title: string; image: string; category?: string }[]>(
    []
  )

  onMounted(async () => {
    const loaded: any[] = []
    const currentPath = page.value.path

    const entries = Object.entries(pagesData.value ?? {})

    await Promise.all(
      entries.map(async ([path, getPageData]) => {
        if (typeof getPageData !== 'function') return

        let p: any
        try {
          p = await getPageData()
        } catch {
          return
        }

        if (!p || typeof p !== 'object') return
        const fm: any = p.frontmatter ?? {}

        // só páginas de projeto, excluindo a atual
        const isProjectPath = path.startsWith('/projetos/')
        const isProjectType = fm.type === 'projeto'
        if (!(isProjectPath || isProjectType)) return
        if (p.path === currentPath) return

        // data só pra ordenar (não vamos mostrar aqui)
        const rawDate = fm.date ?? p.git?.createdTime
        let sortKey = 0
        if (rawDate) {
          const d = new Date(rawDate as any)
          sortKey = Number.isNaN(d.getTime()) ? 0 : d.getTime()
        }

        loaded.push({
          path: p.path,
          title: fm.title || p.title || 'Projeto',
          image: fm.cover || '/imgs/projects/default.png',
          sortKey,
        })
      })
    )

    loaded.sort((a, b) => b.sortKey - a.sortKey)
    relatedProjects.value = loaded.slice(0, 3)
  })
</script>

<template>
  <v-app>
    <NavBar />

    <!-- sem padding-top: o banner verde ocupa o fundo atrás da navbar -->
    <v-main class="detail-main-root">
      <ParentLayout>
        <!-- esconde a navbar padrão do tema -->
        <template #navbar></template>

        <!-- CONTEÚDO DA PÁGINA DE PROJETO -->
        <template #page>
          <div class="detail-wrapper">
            <!-- FAIXA VERDE "PROJETOS" -->
            <section class="detail-banner">
              <v-container class="site-container">
                <h1 class="banner-title">Projetos</h1>
              </v-container>
            </section>

            <!-- TÍTULO, DATA, IMAGEM E TEXTO -->
            <section class="detail-main">
              <v-container class="site-container">
                <article class="detail-article">
                  <header class="detail-header">
                    <h2 class="detail-title">{{ title }}</h2>

                    <div v-if="formattedDate" class="detail-date-wrapper">
                      <v-icon size="16" class="detail-date-icon">
                        mdi-calendar-blank-outline
                      </v-icon>
                      <span class="detail-date-text">{{ formattedDate }}</span>
                    </div>
                  </header>

                  <div class="detail-text-block">
                    <div v-if="cover" class="detail-cover">
                      <v-img :src="cover" :alt="title" cover class="detail-cover-img" />
                    </div>

                    <article class="detail-content markdown-body">
                      <Content />
                    </article>
                  </div>
                </article>

                <!-- OUTROS PROJETOS -->
                <section class="detail-related" v-if="relatedProjects.length">
                  <h3 class="related-title">Outros projetos</h3>

                  <div class="related-grid">
                    <RouterLink
                      v-for="item in relatedProjects"
                      :key="item.path"
                      :to="item.path"
                      class="related-card"
                    >
                      <div class="related-media">
                        <v-img :src="item.image" :alt="item.title" cover class="related-img" />
                      </div>

                      <div class="related-body">
                        <p class="related-type">Projeto</p>
                        <p class="related-text">{{ item.title }}</p>
                      </div>
                    </RouterLink>
                  </div>
                </section>
              </v-container>
            </section>
          </div>
        </template>
      </ParentLayout>
    </v-main>

    <!-- footer sempre visível, independente do ParentLayout -->
    <CustomFooter />
  </v-app>
</template>

<style scoped>
  .detail-main-root {
    padding-top: 0 !important;
    background: #f3f4f6;
  }

  .detail-wrapper {
    background: #f3f4f6;
  }

  /* CONTAINER BASE */
  .site-container {
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(1rem, 4vw, 2.5rem);
  }

  /* FAIXA VERDE SUPERIOR */
  .detail-banner {
    background: #4faa3d;
    color: #ffffff;
    /* espaço grande para parecer um header cheio + área atrás da navbar */
    padding-top: 10rem;
    padding-bottom: 1.8rem;
    margin-bottom: 2.25rem;
  }

  .banner-title {
    margin: 0;
    font-weight: 600;
    font-size: 2.6rem;
  }

  /* BLOCO PRINCIPAL */
  .detail-main {
    padding-bottom: 3rem;
  }

  .detail-article {
    background: transparent;
  }

  .detail-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1.5rem;
    padding-bottom: 0.75rem;
    margin-bottom: 1.5rem;
    border-bottom: 3px solid #4faa3d; /* linha verde embaixo do título + data */
  }

  .detail-title {
    margin: 0;
    font-size: 2rem;
    font-weight: 600;
    color: #0a0e1c;
    border-bottom: none !important; /* remove a barrinha cinza do tema */
    padding-bottom: 0; /* garante que não sobra espaço da borda */
  }

  .detail-date-wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: #9ca3af;
  }

  .detail-date-icon {
    color: #f97316;
  }

  /* corpo sem card, fundo igual ao da página */
  .detail-text-block {
    background: transparent;
    border-radius: 0;
    padding: 0 0 2.5rem;
    box-shadow: none;
  }

  .detail-cover {
    margin-bottom: 1.75rem;
    border-radius: 6px;
    overflow: hidden;
  }

  .detail-cover-img {
    width: 100%;
    max-height: 420px;
  }

  .detail-content {
    color: #111827;
  }

  /* markdown básica */
  .markdown-body :deep(p) {
    margin-bottom: 0.9rem;
    line-height: 1.7;
    font-size: 0.95rem;
  }

  .markdown-body :deep(h2),
  .markdown-body :deep(h3) {
    margin-top: 1.8rem;
    margin-bottom: 0.7rem;
    font-weight: 700;
    color: #111827;
    border-bottom: none !important; /* sem linhas nos subtítulos */
  }

  .markdown-body :deep(img) {
    max-width: 100%;
    border-radius: 8px;
    margin-block: 1.5rem;
  }

  /* OUTROS PROJETOS */
  .detail-related {
    margin-top: 2.5rem;
    padding-bottom: 1.6rem; /* espaço antes do footer */
  }

  .related-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1.2rem;
  }

  .related-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .related-card {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    background: #ffffff;
    box-shadow: 0 14px 32px rgba(0, 0, 0, 0.12);
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: transform 0.16s ease, box-shadow 0.16s ease;
  }

  .related-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
  }

  .related-media {
    height: 155px;
  }

  .related-img {
    width: 100%;
    height: 100%;
  }

  .related-body {
    padding: 0.85rem 1rem 1.1rem;
  }

  .related-type {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #f97316;
    margin: 0 0 0.25rem;
  }

  .related-text {
    margin: 0;
    font-size: 0.9rem;
    color: #111827;
    font-weight: 500;
  }

  /* RESPONSIVO */
  @media (max-width: 900px) {
    .detail-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .related-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .related-grid {
      grid-template-columns: minmax(0, 1fr);
    }
  }
</style>
