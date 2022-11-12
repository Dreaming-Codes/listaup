<script lang="ts" setup>
import Canvas from "./components/Canvas.vue";
import {useAnimStateStore} from "./stores/animState";
import Loading from "./components/Loading.vue";

const animState = useAnimStateStore();
</script>

<template>
  <Loading v-if="animState.loadingPercent < 1"/>
  <Canvas id="canvas"/>
  <main>
  </main>
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
  height: 900vw;
  z-index: 99;
  position: absolute;
  justify-content: center;
  text-align: center;
  pointer-events: none;
  font-size: 5vh;
}
</style>
<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: black;
}

* {
  overflow-y: hidden;
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
