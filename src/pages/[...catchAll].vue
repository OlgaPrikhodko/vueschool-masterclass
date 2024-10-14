<script lang="ts" setup>
import AppErrorPage from '@/components/AppError/AppErrorPage.vue'

useErrorStore().setError()
</script>

<template>
  <AppErrorPage />
</template>
