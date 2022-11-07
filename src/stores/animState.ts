import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimStateStore = defineStore('animState', () => {
  const scrollPercent = ref(0)

  return { scrollPercent }
})
