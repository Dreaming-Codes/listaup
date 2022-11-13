<script lang="ts" setup>
import {useAnimStateStore} from "../stores/animState";
import GlitchedWriter from "vue-glitched-writer";
import {computed} from "vue";

const animStore = useAnimStateStore();

const getCurrentText = computed(() => {
  return animStore.animText.find((text) => {
    return text.range[0] <= animStore.scrollPercent && text.range[1] >= animStore.scrollPercent;
  })
})
</script>

<template>
  <Transition name="fromdown">
    <div v-if="getCurrentText" class="container">
      <GlitchedWriter :text="getCurrentText.title" appear class="text title"></GlitchedWriter>
      <br>
      <a :href="'mailto:' + getCurrentText.email">
        <GlitchedWriter :text="getCurrentText.email" appear class="text email"></GlitchedWriter>
      </a>
    </div>
  </Transition>
</template>

<style scoped>
.container {
  position: fixed;
  bottom: 0;
  height: 30vh;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.98) 0%, rgba(0, 0, 0, 0.58) 100%);
  width: 100%;
  font-family: 'Roboto Mono', monospace;
  text-align: center;
}

.text {
  font-weight: 100;
  color: #FAFAFA;
}

.title {
  font-size: 4vw;
}

.email {
  font-size: 2vw;
}

a {
  text-decoration: none;
}
</style>
