<script lang="ts" setup>
import {useAnimStateStore} from "../stores/animState";
import GlitchedWriter from "vue-glitched-writer";
import {onUnmounted, ref} from "vue";
import {delay} from "../utils";

const animState = useAnimStateStore();

const glitchedWriterOptions = {
  letterize: true,
  interval: [10, 30]
};

let queueIndex = 0;
const queue = [
  "Lista",
  "Up",
  "ListaUp",
  "Lista Up"
];

let text = ref(queue[0]);

let updateTimeInterval: number;

async function finishedCurrentWriting() {
  queueIndex++;
  if (queueIndex < queue.length) {
    await delay(400);
    text.value = queue[queueIndex];
    return;
  } else if(queueIndex === queue.length) {
    console.log("Finished writing");
    queueIndex = queue.length + 1;
    await delay(1000);
    animState.loadingScreenFinished = true;
    await delay(1000);
  }


  if(updateTimeInterval){
    return;
  }

  updateTimeInterval = setInterval(()=>{
    if (queueIndex >= queue.length + 1) {
      text.value = "Loading " + Math.floor(animState.loadingPercent * 100) + "%";
    }
  }, 1000);
}

onUnmounted(()=>{
  clearInterval(updateTimeInterval);
});
</script>

<template>
  <div class="container">
    <GlitchedWriter :options="glitchedWriterOptions" :text="text" appear class="text" preset="neo"
                    @finish="finishedCurrentWriting"></GlitchedWriter>
  </div>
</template>

<style scoped>
@import 'https://fonts.googleapis.com/css?family=Roboto+Mono:100';

.container {
  font-family: 'Roboto Mono', monospace;
  position: absolute;
  background: #212121;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
}

.text {
  font-weight: 100;
  font-size: 10vh;
  color: #FAFAFA;
}
</style>
<style>
.gw-glitched {
  color: #757575;
}
</style>
