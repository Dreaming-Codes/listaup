<script lang="ts" setup>
import Canvas from "./components/Canvas.vue";
import {useAnimStateStore} from "./stores/animState";
import Loading from "./components/Loading.vue";
import Description from "./components/Description.vue";

const animState = useAnimStateStore();
</script>

<template>
  <Canvas id="canvas"/>
  <Description/>
  <Transition name="bouncefade">
    <Loading v-if="!animState.loadingScreenFinished || animState.loadingPercent < 1"/>
    <main v-else/>
  </Transition>
</template>

<style scoped>
#canvas {
  top: 0;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
}

main {
  width: 100%;
  height: 900vh;
  z-index: 99;
  position: absolute;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  font-size: 5vh;
}
</style>
