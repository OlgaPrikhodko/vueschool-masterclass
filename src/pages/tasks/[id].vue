<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div>Task Page {{ route.params?.id }}</div>
</template>

<style scoped></style>
