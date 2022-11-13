<script lang="ts" setup>
import Canvas from "./components/Canvas.vue";
import {useAnimStateStore} from "./stores/animState";
import Loading from "./components/Loading.vue";

const animState = useAnimStateStore();
</script>

<template>
  <Canvas id="canvas"/>
  <Transition>
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
<style>
.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(2);
  opacity: 0;
}


html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}

* {
  /*noinspection CssInvalidPropertyValue*/
  overflow-y: overlay;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 17px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
</style>
