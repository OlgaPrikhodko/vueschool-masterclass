<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <h1>SingleProject</h1>
  <p>Project {{ route.params?.slug }}</p>
</template>
