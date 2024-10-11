<script lang="ts" setup>
const route = useRoute()
</script>

<template>
  <div>Task Page {{ route.params?.id }}</div>
</template>

<style scoped></style>
