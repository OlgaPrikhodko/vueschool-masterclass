<script lang="ts" setup>
import type { Projects } from '@/utils/supabaseQueries'

import { projectsQuery } from '@/utils/supabaseQueries'
import { projectColumns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projects = ref<Projects | null>(null)

const getProjects = async () => {
  const { data, error } = await projectsQuery

  if (error) console.error(error)

  projects.value = data
}

await getProjects()
</script>

<template>
  <DataTable v-if="projects" :columns="projectColumns" :data="projects" />
</template>

<style lang="css" scoped>
td {
  @apply p-0;
}

td > * {
  @apply p-4;
}
</style>
