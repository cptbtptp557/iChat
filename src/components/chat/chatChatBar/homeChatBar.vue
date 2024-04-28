<template>
  <div class="thisOutside">
    <header>
      <h4>聊天对象</h4>
      <div class="shat_control">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="语音通话"
            placement="bottom"
        >
          <el-icon size="25">
            <Microphone/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="视频通话"
            placement="bottom"
        >
          <el-icon size="25">
            <VideoCamera/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="更多"
            placement="bottom-end"
        >
          <el-icon size="25">
            <More/>
          </el-icon>
        </el-tooltip>
      </div>
    </header>
    <el-divider style="position: absolute; top: 15px"/>
    <div class="dialog_box">
      <div class="to_user">
        <img src="../../../../public/chat-avatar/from-user.png" alt="接收方用户">
        <p>接收方用户</p>
      </div>
      <div class="from_user">
        <img src="../../../../public/chat-avatar/to-user.jpg" alt="发出方用户">
        <p>发出方用户</p>
      </div>
    </div>
    <el-divider style="position: absolute; bottom: 200px"/>
    <footer>
      <div class="shat_control">
        <el-tooltip
            class="box-item"
            effect="dark"
            content="图片"
            placement="bottom-start"
        >
          <el-icon size="20">
            <Picture/>
          </el-icon>
        </el-tooltip>
        <el-tooltip
            class="box-item"
            effect="dark"
            content="文件"
            placement="bottom"
        >
          <el-icon size="20">
            <Files/>
          </el-icon>
        </el-tooltip>
      </div>
      <textarea v-model="content"></textarea>
      <el-button type="primary" :disabled="!button_disabled" :icon="Position" class="send_box">发送</el-button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import {homeChatBar} from "./homeChatBar.ts";
import {Microphone, VideoCamera, More, Picture, Files, Position} from "@element-plus/icons-vue";

const {
  content,
  button_disabled,
} = homeChatBar();
</script>

<style scoped>
@import "./homeChatBar.less";
</style>