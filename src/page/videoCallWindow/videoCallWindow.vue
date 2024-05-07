<template>
  <div class="video_background">
    <header class="move">
      <p>00:00</p>
      <el-icon size="20" color="#a0a5a8" @click="closeVoice">
        <Close/>
      </el-icon>
      <el-icon size="20" color="#a0a5a8" @click="miniVoice">
        <Minus/>
      </el-icon>
    </header>
    <div class="video_show">
      <video id="to_video"/>
      <video id="from_video"/>
    </div>
    <footer>
      <el-icon size="40" color="#a0a5a8" class="microphone" @click="changeMicrophone">
        <Microphone v-if="audio_show"/>
        <Mute v-else/>
      </el-icon>
      <el-icon size="50" color="#a0a5a8" class="hang-up">
        <PhoneFilled style="transform: rotate(135deg);"/>
      </el-icon>
      <div class="camera" @click="changeCamera">
        <img src="../../../public/视频.png" alt="摄像头开" v-if="camera_show">
        <img src="../../../public/视频关.png" alt="摄像头关" v-else>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {Close, Microphone, Minus, Mute, PhoneFilled} from "@element-plus/icons-vue";
import {videoCallWindow} from "./videoCallWindow.ts";

const {
  audio_show,
  camera_show,
  closeVoice,
  miniVoice,
  changeMicrophone,
  changeCamera,
} = videoCallWindow();
</script>

<style scoped>
@import "./videoCallWindow.less";
</style>