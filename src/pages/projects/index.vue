<script lang="ts" setup>
import { projectColumns } from '@/utils/tableColumns/projectsColumns'

usePageStore().pageData.title = 'Projects'

const projectsLoader = useProjectsStore()
const { projects } = storeToRefs(projectsLoader)
const { getProjects } = projectsLoader

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
