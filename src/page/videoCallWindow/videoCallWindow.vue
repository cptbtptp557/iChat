<template>
  <div class="video_background">
    <header class="move">
      <p>00:00</p>
      <el-icon size="20" color="#a0a5a8">
        <Close/>
      </el-icon>
      <el-icon size="20" color="#a0a5a8">
        <Minus/>
      </el-icon>
    </header>
    <div>

    </div>
    <footer>
      <el-icon size="40" color="#a0a5a8" class="microphone">
        <Microphone/>
        <Mute/>
      </el-icon>
      <div>
        <img src="../../../public/视频.png" alt="摄像头开">
        <img src="../../../public/视频关.png" alt="摄像头关">
      </div>
      <el-icon size="50" color="#a0a5a8" class="hang-up">
        <PhoneFilled style="transform: rotate(135deg);"/>
      </el-icon>
    </footer>
  </div>
</template>

<script setup lang="ts">

import {Close, Microphone, Minus, Mute, PhoneFilled} from "@element-plus/icons-vue";
</script>

<style scoped>
@import "./videoCallWindow.less";
</style>