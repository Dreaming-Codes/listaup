<script setup>
import {useAnimStateStore} from "../stores/animState";

const animState = useAnimStateStore();
</script>

<template>
  <div>
    <h1 style="color: white">
      WIP LOADING<br>
      {{ animState.loadingPercent  * 100 }}%
    </h1>
  </div>
</template>

<style scoped>

</style>
