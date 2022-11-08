import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAnimStateStore = defineStore('animState', () => {
  const scrollPercent = ref(0);
  //TODO: Use errorState to display an error screen
  const errorState = ref<ErrorEvent | null>(null);
  //TODO: Use is loading state to show loading screen
  const isLoading = ref(true);

  return { scrollPercent, errorState, isLoading }
})
