import type { Projects } from '@/utils/supabaseQueries'
import { projectsQuery } from '@/utils/supabaseQueries'
import { useMemoize } from '@vueuse/core'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  const validateCache = () => {
    if (projects.value?.length) {
      projectsQuery.then(({ data }) => {
        if (JSON.stringify(projects.value) === JSON.stringify(data)) {
          console.log('Cached and fresh data matched!')
          return
        } else {
          console.log('Somehting has changed!')
          loadProjects.delete('projects')
        }
      })
    }
  }

  const loadProjects = useMemoize(async (key: string) => await projectsQuery)

  const getProjects = async () => {
    const { data, error, status } = await loadProjects('projects')

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data

    validateCache()
  }

  return {
    projects,
    getProjects
  }
})
