import type { Projects } from '@/utils/supabaseQueries'
import { projectsQuery } from '@/utils/supabaseQueries'

export const useProjectsStore = defineStore('projects-store', () => {
  const projects = ref<Projects | null>(null)

  const getProjects = async () => {
    if (projects.value?.length) return

    const { data, error, status } = await projectsQuery

    if (error) useErrorStore().setError({ error, customCode: status })

    projects.value = data
  }

  return {
    projects,
    getProjects
  }
})
