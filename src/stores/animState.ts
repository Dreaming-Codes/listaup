import {ref} from 'vue'
import {defineStore} from 'pinia'

export interface AnimText {
    title: string,
    email: string,
    range: number[],
}

export const useAnimStateStore = defineStore('animState', () => {
    const scrollPercent = ref(0);
    //TODO: Use errorState to display an error screen
    const errorState = ref<ErrorEvent | null>(null);
    const loadingPercent = ref(0);
    const loadingScreenFinished = ref(false);
    const animText = ref<AnimText[]>([]);

    return {scrollPercent, errorState, loadingPercent, loadingScreenFinished, animText}
})
