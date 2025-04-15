<template>
  <div class="groupChatNotifications">
    <div class="p">
      <p>群聊通知</p>
    </div>
    <main>
      <div v-for="(lists, index) in group_notice" :key="index" class="apply_friends">
        <img :src="'https://ichatimage.oss-cn-shenzhen.aliyuncs.com/i'+lists.from_iid" alt="申请好友方头像">
        <div class="left">
          <div>
            <p>{{ lists.group_user_name }}</p>
            <p>{{ lists.add_time }}</p>
          </div>
          <p class="message">申请加入<span>{{ lists.group_name }}</span></p>
        </div>
        <div class="application_status_button" v-if="lists.add_status == 0">
          <div class="agree">
            <el-icon color="#51ce00" size="20" @click="agreeAdd(lists)">
              <Check/>
            </el-icon>
            <el-icon color="#ff0000" size="20" @click="refuseAdd(lists)">
              <Close/>
            </el-icon>
          </div>
        </div>
        <p class="application_status_p" v-else>{{ lists.add_status == 1 ? "已同意" : "已拒绝" }}</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import {groupChatNotifications} from "./groupChatNotifications.ts";
import {Check, Close} from "@element-plus/icons-vue";

const {
  group_notice,
  agreeAdd,
  refuseAdd,
} = groupChatNotifications();
</script>

<style scoped>
@import "./groupChatNotifications.less";
</style>