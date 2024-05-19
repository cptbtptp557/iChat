<template>
  <div class="friendNotifications">
    <div class="p">
      <p>好友通知</p>
    </div>
    <main>
      <div v-for="(recording, index) in friend_add_recording" :key="index" class="apply_friends">
        <img src="../../../public/chat-avatar/from-user.png" alt="申请好友方头像">
        <div class="left">
          <div>
            <p><span>{{ recording.from_name }}</span>请求加为好友</p>
            <p>{{ recording.add_time }}</p>
          </div>
          <p class="message">留言: 我是{{ recording.from_name }}</p>
        </div>
        <div class="application_status_button" v-if="recording.add_status === '0'">
          <div class="agree">
            <el-icon color="#51ce00" size="20">
              <Check/>
            </el-icon>
            <el-icon color="#ff0000" size="20">
              <Close/>
            </el-icon>
          </div>
        </div>
        <p class="application_status_p" v-else>
          {{ recording.add_status === '1' ? '已同意' : (recording.add_status === '2' ? '已拒绝' : '未知状态') }}
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {friendNotifications} from "./friendNotifications.ts";
import {Check, Close} from "@element-plus/icons-vue";

const {
  application_status,
  friend_add_recording,
} = friendNotifications();
</script>

<style scoped>
@import "./friendNotifications.less";
</style>