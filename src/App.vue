<script setup lang="ts">
import Canvas from "./components/Canvas.vue";
</script>

<template>
  <Canvas id="canvas" />
</template>

<style scoped>
#canvas{
  position: absolute;
  width: 100%;
  height: 100%;
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
</style>
