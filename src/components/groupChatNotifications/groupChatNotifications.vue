<template>
  <div class="groupChatNotifications">
    <div class="p">
      <p>群聊通知</p>
    </div>
    <main>
      <div v-for="a in 10" :key="a" class="apply_friends">
        <img src="../../../public/chat-avatar/from-user.png" alt="申请好友方头像">
        <div class="left">
          <div>
            <p>蔡徐坤</p>
            <p>2024/05/17</p>
          </div>
          <p class="message">申请你加入<span>我爱蔡徐坤应援团</span></p>
        </div>
        <el-button>{{ application_status }}</el-button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {groupChatNotifications} from "./groupChatNotifications.ts";

const {
  application_status,
} = groupChatNotifications();
</script>

<style scoped>
@import "./groupChatNotifications.less";
</style>