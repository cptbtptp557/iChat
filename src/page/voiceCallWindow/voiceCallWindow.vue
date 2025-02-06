<template>
  <div class="voice_background">
    <img src="../../../public/chat-avatar/from-user.png" class="voice-background-image" alt="聊天背景">
    <header class="move">
      <p>{{ top_state }}</p>
      <el-icon size="20" color="#a0a5a8" @click="closeVoice">
        <Close/>
      </el-icon>
      <el-icon size="20" color="#a0a5a8" @click="miniVoice">
        <Minus/>
      </el-icon>
    </header>
    <main>
      <img src="../../../public/chat-avatar/from-user.png" alt="聊天对象">
      <audio id="receiverAudioStream" controls autoplay>
        <source :src="audio_src"/>
      </audio>
    </main>
    <footer>
      <el-icon size="40" color="#a0a5a8" class="microphone" @click="microphoneButton">
        <Microphone v-if="microphone_state"/>
        <Mute v-else/>
      </el-icon>

      <el-icon size="50" color="#a0a5a8" class="hang-up" @click="voiceHangUp">
        <PhoneFilled style="transform: rotate(135deg);"/>
      </el-icon>

      <div class="horn" @click="hornButton">
        <img src="../../../public/扬声器.png" alt="扬声器" v-if="horn_state">
        <img src="../../../public/关闭扬声器.png" alt="关闭扬声器" v-else>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {voiceCallWindow} from "./voiceCallWindow.ts";
import {Close, Microphone, Minus, Mute, PhoneFilled} from "@element-plus/icons-vue";

const {
  closeVoice,
  miniVoice,
  top_state,
  microphone_state,
  microphoneButton,
  horn_state,
  hornButton,
  voiceHangUp,
  audio_src,
} = voiceCallWindow();
</script>

<style scoped>
@import "./voiceCallWindow.less";
</style>