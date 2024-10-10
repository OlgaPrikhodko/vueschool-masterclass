<script lang="ts" setup>
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
  const { data, error } = await supabase.from('projects').select()

  if (error) console.error(error)

  projects.value = data

  console.log('Projects: ', projects.value)
})()
</script>

<template>
  <div>
    <h1>ProjectsView</h1>
    <RouterLink to="/">Home</RouterLink>
    <ul>
      <li v-for="project in projects" :key="project.id">
        {{ project.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
