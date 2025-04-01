<template>
  <div class="VVCwindow">
    <div :id="VVCW_status == 0 ? 'appear' : 'hide'" class="VVCsubassembly">
      <img :src="fromImage" alt="发起者头像">
      <p>{{ categoryCommunication === 0 ? "语音通话" : "视频通话" }}</p>
      <img id="connect" src="../../../public/Connect.svg" alt="接通" @click="connect">
      <img id="hang-up" src="../../../public/Hang-up.svg" alt="挂断" @click="hangUp">
    </div>
  </div>
</template>

<script setup lang="ts">
import {VVCwindow} from "./VVCwindow.ts";

defineProps({
  fromImage: String,
  categoryCommunication: Number
})

const {
  VVCW_status,
  connect,
  hangUp,
} = VVCwindow();
</script>

<style scoped>
@import "./VVCwindow.less";
</style>