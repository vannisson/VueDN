/**
 * usePageCache – cache compartilhado para dados de páginas do VuePress.
 *
 * Problema original: cada componente (Home, Pesquisas, PostsList, Publications)
 * chamava `usePagesData()` e iterava TODOS os loaders individualmente,
 * resultando em centenas de `await load()` duplicados por navegação.
 *
 * Com este composable, os dados são carregados UMA vez e filtrados por path
 * via Map<string, PageData>, reduzindo drasticamente o tempo de montagem.
 */
import { ref, watch } from 'vue'
import { usePagesData } from '@vuepress/client'

export type CachedPage = {
  path: string
  title: string
  frontmatter: Record<string, any>
  git?: { updatedTime?: number; createdTime?: number }
}

const cache = ref<Map<string, CachedPage>>(new Map())
const loading = ref(false)
const loaded = ref(false)
let loadPromise: Promise<void> | null = null

/**
 * Carrega todas as páginas para o cache (se ainda não carregou).
 * Reutiliza a mesma Promise para evitar race conditions.
 */
function ensureLoaded(pagesData: ReturnType<typeof usePagesData>) {
  if (loaded.value) return Promise.resolve()
  if (loadPromise) return loadPromise

  loading.value = true

  loadPromise = (async () => {
    const loaders = Object.values(pagesData.value || {})
    const map = new Map<string, CachedPage>()

    // Carregar em batches para não travar a UI
    const BATCH_SIZE = 20
    for (let i = 0; i < loaders.length; i += BATCH_SIZE) {
      const batch = loaders.slice(i, i + BATCH_SIZE)
      const results = await Promise.allSettled(
        batch.map(async load => {
          if (typeof load !== 'function') return null
          const data: any = await load()
          if (!data || typeof data.path !== 'string') return null
          return {
            path: data.path,
            title: data.title || data.frontmatter?.title || '',
            frontmatter: data.frontmatter || {},
            git: data.git,
          } as CachedPage
        })
      )
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value) {
          map.set(r.value.path, r.value)
        }
      }
    }

    cache.value = map
    loaded.value = true
    loading.value = false
  })()

  return loadPromise
}

/**
 * Invalida o cache quando pagesData muda (ex: hot-reload em dev).
 */
function watchForInvalidation(pagesData: ReturnType<typeof usePagesData>) {
  watch(pagesData, () => {
    loaded.value = false
    loadPromise = null
    ensureLoaded(pagesData)
  })
}

/**
 * Retorna páginas filtradas por prefixo de path.
 */
function getByPrefix(prefix: string): CachedPage[] {
  const results: CachedPage[] = []
  for (const [path, page] of cache.value) {
    if (path.startsWith(prefix) && path !== prefix) {
      results.push(page)
    }
  }
  return results
}

/**
 * Hook principal – usar nos componentes.
 */
export function usePageCache() {
  const pagesData = usePagesData()

  // Inicia o carregamento (no-op se já carregou)
  ensureLoaded(pagesData)
  watchForInvalidation(pagesData)

  return {
    /** Map completo de páginas: path → dados */
    cache,
    /** true enquanto carrega pela primeira vez */
    loading,
    /** true depois que finalizou o primeiro carregamento */
    loaded,
    /** Filtra páginas cujo path começa com o prefixo */
    getByPrefix,
    /** Espera o carregamento terminar (usar em onMounted se necessário) */
    whenReady: () => ensureLoaded(pagesData),
  }
}
