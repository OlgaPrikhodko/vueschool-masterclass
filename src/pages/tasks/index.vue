<script lang="ts" setup>
import type { TasksWithProjects } from '@/utils/supabaseQueries'

import { tasksWithProjectsQuery } from '@/utils/supabaseQueries'
import { taskColumns } from '@/utils/tableColumns/tasksColumns'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TasksWithProjects | null>(null)

const getTasks = async () => {
  const { data, error, status } = await tasksWithProjectsQuery

  if (error) useErrorStore().setError({ error, customCode: status })

  tasks.value = data
}

await getTasks()
</script>

<template>
  <DataTable v-if="tasks" :columns="taskColumns" :data="tasks" />
</template>
