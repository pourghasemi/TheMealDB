import { ref } from 'vue'
import type { Ref } from 'vue'

export default function useApiLoader() {
  const isLoading: Ref<boolean> = ref(false)
  const data: Ref<any> = ref(null) // Use 'any' type for data
  const error: Ref<any> = ref(null) // Use 'any' type for error

  async function fetchData(service: Promise<any>) {
    isLoading.value = true
    try {
      const response = await service // Call your API service
      data.value = response
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    data,
    error,
    fetchData
  }
}
