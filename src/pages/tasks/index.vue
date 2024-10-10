<script lang="ts" setup>
import type { Tables } from '../../../database/types'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

const tasks = ref<Tables<'tasks'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) console.error(error)

  tasks.value = data
})()
</script>

<template>
  <h1>Tasks</h1>
  <ul>
    <li v-for="task in tasks" :key="task.id">
      {{ task.name }}
    </li>
  </ul>
</template>

<style scoped></style>
