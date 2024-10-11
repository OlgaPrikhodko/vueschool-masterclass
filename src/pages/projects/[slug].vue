<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <h1>SingleProject</h1>
  <p>Project {{ route.params?.slug }}</p>
</template>
