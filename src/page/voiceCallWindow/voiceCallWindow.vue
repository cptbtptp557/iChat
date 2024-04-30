<template>
  voiceCallWindow
  <div class="draggable-area" id="a">

  </div>
</template>

<script setup lang="ts">
import {voiceCallWindow} from "./voiceCallWindow.ts";

const {} = voiceCallWindow();
</script>

<style scoped>
.draggable-area {
  width: 300px;
  height: 300px;
  background-color: pink;
}
</style>