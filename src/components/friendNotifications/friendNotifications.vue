<template>
  <div class="friendNotifications">
    <div class="p">
      <p>好友通知</p>
    </div>
    <main>
      <div v-for="a in 10" :key="a" class="apply_friends">
        <img src="../../../public/chat-avatar/from-user.png" alt="申请好友方头像">
        <div class="left">
          <div>
            <p><span>蔡徐坤</span>请求加为好友</p>
            <p>2024/05/17</p>
          </div>
          <p class="message">留言: 我是蔡徐坤</p>
        </div>
        <el-button>{{ application_status }}</el-button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {friendNotifications} from "./friendNotifications.ts";

const {
  application_status,
} = friendNotifications();
</script>

<style scoped>
@import "./friendNotifications.less";
</style>