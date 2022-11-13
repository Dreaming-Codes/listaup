import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAnimStateStore = defineStore('animState', () => {
  const scrollPercent = ref(0);
  //TODO: Use errorState to display an error screen
  const errorState = ref<ErrorEvent | null>(null);
  const loadingPercent = ref(0);
  const loadingScreenFinished = ref(false);

  return { scrollPercent, errorState, loadingPercent, loadingScreenFinished }
})
