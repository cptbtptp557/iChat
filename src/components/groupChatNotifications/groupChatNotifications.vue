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
        <div class="application_status_button" v-if="application_status">
          <div class="agree">
            <el-icon color="#51ce00" size="20">
              <Check/>
            </el-icon>
            <el-icon color="#ff0000" size="20">
              <Close/>
            </el-icon>
          </div>
        </div>
        <p class="application_status_p" v-else>{{ application_status }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {groupChatNotifications} from "./groupChatNotifications.ts";
import {Check, Close} from "@element-plus/icons-vue";

const {
  application_status,
} = groupChatNotifications();
</script>

<style scoped>
@import "./groupChatNotifications.less";
</style>