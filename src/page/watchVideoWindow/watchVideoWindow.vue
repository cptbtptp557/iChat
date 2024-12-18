<template>
  <div class="watchVideoWindow">
    <header>
      <p>{{ video_lists.videoName }}</p>
      <el-icon size="20" color="#a0a5a8" @click="miniVoice">
        <Minus/>
      </el-icon>
      <el-icon size="20" color="#a0a5a8" @click="windowSize">
        <FullScreen v-if="window_size"/>
        <CopyDocument style="transform: rotate(180deg)" v-else/>
      </el-icon>
      <el-icon size="20" color="#a0a5a8" @click="closeVoice">
        <Close/>
      </el-icon>
    </header>
    <main>
      <video controls autoplay>
        <source :src="video_lists.videoSrc" type="video/mp4"/>
      </video>
    </main>
  </div>
</template>

<script setup lang="ts">
import {Close, CopyDocument, FullScreen, Minus} from "@element-plus/icons-vue";
import {watchVideoWindow} from "./watchVideoWindow.ts";

const {
  miniVoice,
  windowSize,
  closeVoice,
  window_size,
  video_lists,
} = watchVideoWindow();
</script>

<style scoped>
@import "./watchVideoWindow.less";
</style>