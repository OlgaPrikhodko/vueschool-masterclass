export const useErrorStore = defineStore('error-store', () => {
  const activeError = ref(false)

  const setError = () => {
    activeError.value = true
  }

  return {
    activeError,
    setError
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePageStore, import.meta.hot))
}
