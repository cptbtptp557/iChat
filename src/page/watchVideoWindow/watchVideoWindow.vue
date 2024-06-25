<template>
  <div class="watchVideoWindow">
    <header>

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
      <p>1{{ watchVideoData().video_src}}</p>
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
} = watchVideoWindow();
</script>

<style scoped>
@import "./watchVideoWindow.less";
</style>